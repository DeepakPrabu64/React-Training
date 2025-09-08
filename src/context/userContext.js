import { createContext, useContext, useState } from 'react';

const CardStyleContext = createContext();

export const CardStyleProvider = ({ children }) => {
  const [backgroundChanged, setBackgroundChanged] = useState(false);
  const [namesUnderlined, setNamesUnderlined] = useState(false);
  const [descriptionSizeIncreased, setDescriptionSizeIncreased] = useState(false);
  const [buttonChanged, setButtonChanged] = useState(false);

  const toggleBackground = () => {
    setBackgroundChanged(!backgroundChanged);
  };

  const toggleNamesUnderline = () => {
    setNamesUnderlined(!namesUnderlined);
  };

  const toggleDescriptionSize = () => {
    setDescriptionSizeIncreased(!descriptionSizeIncreased);
  };

  const toggleButtonChanged = () => {
    setButtonChanged(!buttonChanged);
  }

  const resetAllStyles = () => {
    setBackgroundChanged(false);
    setNamesUnderlined(false);
    setDescriptionSizeIncreased(false);
    setButtonChanged(false);
  };

  const contextValue = {

    backgroundChanged,
    namesUnderlined,
    descriptionSizeIncreased,
    buttonChanged,

    toggleBackground,
    toggleNamesUnderline,
    toggleDescriptionSize,
    toggleButtonChanged,
    resetAllStyles
  };

  return (
    <CardStyleContext.Provider value={contextValue}>
      {children}
    </CardStyleContext.Provider>
  );
};

export const useCardStyle = () => {
  const context = useContext(CardStyleContext);
  if (!context) {
    throw new Error('useCardStyle must be used within a CardStyleProvider');
  }
  return context;
};

export default CardStyleContext;