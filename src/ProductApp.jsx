import React, { useReducer, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { productReducer } from './Reducer/reducer';
import { initialState } from './assets/data/ProductData';


const ProductApp = () => {
  const [state, dispatch] = useReducer(productReducer, initialState);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({name: '',price: '',image: '',category: ''});

  // Filter products based on search term and category
  const filteredProducts = state.products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(state.searchTerm.toLowerCase());
    const matchesCategory = !state.categoryFilter || state.categoryFilter === '' || (state.categoryFilter === 'Veg' && product.category === 'veg') ||(state.categoryFilter === 'Non-Veg' && product.category === 'non-veg');
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    if (formData.name && formData.price && formData.image && formData.category) {
      dispatch({ type: 'ADD_PRODUCT', payload: { ...formData, qty: 0 } });
      setFormData({ name: '', price: '', image: '',category: '' });
      setShowAddForm(false);
    }
  };

  const handleUpdateProduct = () => {
    if (formData.name && formData.price && formData.image && formData.category) {
      dispatch({ type: 'UPDATE_PRODUCT', payload: { ...formData, id: editingProduct.id, qty: editingProduct.qty }});
      setFormData({ name: '', price: '', image: '',category: ''});
      setEditingProduct(null);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      image: product.image,
      category:product.category
    });
  };

  const handleDeleteProduct = (id) => {
    dispatch({ type: 'DELETE_PRODUCT', payload: id });
  };

  const handleSearch = (e) => {
    dispatch({ type: 'SEARCH_PRODUCTS', payload: e.target.value });
  };

  const handleSort = (e) => {
    dispatch({ type: 'SORT_PRODUCTS', payload: e.target.value });
  };

  const handleSortin = (e) => {
    dispatch({ type: 'SORT_PRODUCT', payload: e.target.value });
  }

  const handleIncreaseQty = (id) => {
    dispatch({ type: 'INCREASE_QTY', payload: id });
  };

  const handleDecreaseQty = (id) => {
    dispatch({ type: 'DECREASE_QTY', payload: id });
  };

  const resetForm = () => {
    setFormData({ name: '', price: '', image: '',category: '' });
    setShowAddForm(false);
    setEditingProduct(null);
  };

  return (
    <div className="container-fluid">
      <h1 className='text-center px-3 py-3'>RESTAURENT MANAGEMENT</h1>
      {/* Control Section */}
      <div className="control-section">
        <div className="row align-items-center">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search products..."
              value={state.searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="col-md-3">
            <select 
              className="form-control sort-select"
              value={state.sortOrder}
              onChange={handleSort}
            >
              <option value="">Sort by Price</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>
          <div className="col-md-3">
            <select 
              className="form-control sort-select"
              value={state.categoryFilter || ''}
              onChange={handleSortin}
            >
              <option value="">All Categories</option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>
          </div>
          <div className="col-md-2">
            <button 
              className="btn btn-primary add-btn"
              onClick={() => setShowAddForm(true)}
            >
              <i className="fas fa-plus"></i> Add Product
            </button>
          </div>
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {(showAddForm || editingProduct) && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h5>{editingProduct ? 'Edit Product' : 'Add New Product'}</h5>
              <button 
                type="button" 
                className="close-btn"
                onClick={resetForm}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter product name"
                />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  placeholder="Enter price"
                />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  className="form-control"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  placeholder="Enter image URL"
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  placeholder="Enter the category"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={resetForm}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
              >
                {editingProduct ? 'Update' : 'Add'} Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products Section */}
      <div className="products-section">
        <div className="row">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="product-card">
                <button 
                  className="delete-btn"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  &times;
                </button>
                <button 
                    className="edit-btn"
                    onClick={() => handleEditProduct(product)}
                  >
                    <i className="fas fa-edit"></i> 
                  </button>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-info">
                  <div className="product-name">{product.name}</div>
                  <div className="product-details-row">
                    <div className="product-price">${product.price}</div>
                    <div className="quantity-controls">
                      <button 
                        className="qty-btn minus"
                        onClick={() => handleDecreaseQty(product.id)}
                        disabled={product.qty === 0}
                      >
                        -
                      </button>
                      <span className="qty-display">{product.qty}</span>
                      <button 
                        className="qty-btn plus"
                        onClick={() => handleIncreaseQty(product.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          <p>No products found.</p>
        </div>
      )}
    </div>
  );
};

export default ProductApp;