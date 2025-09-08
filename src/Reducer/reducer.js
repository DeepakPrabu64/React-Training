export const productReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, { ...action.payload, id: Date.now() }]
      };

    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload)
      };

    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(product => product.id === action.payload.id ? action.payload : product)
      };

    case 'SEARCH_PRODUCTS':
      return {
        ...state,
        searchTerm: action.payload
      };

    case 'SORT_PRODUCTS':
      let sortedProducts = [...state.products];
      if (action.payload === 'low-to-high') {
        sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      } else if (action.payload === 'high-to-low') {
        sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      }
      return {
        ...state,
        products: sortedProducts,
        sortOrder: action.payload
      };

    case 'SORT_PRODUCT':
      return {
        ...state,
        categoryFilter: action.payload,
        sortOrder: action.payload
      };

    case 'INCREASE_QTY':
      return {
        ...state,
        products: state.products.map(product => product.id === action.payload ? { ...product, qty: product.qty + 1 }: product)
      };

    case 'DECREASE_QTY':
      return {
        ...state,
        products: state.products.map(product => product.id === action.payload ? { ...product, qty: Math.max(0, product.qty - 1) }: product)
      };

    default:
      return state;
  }
};