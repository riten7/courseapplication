import React from 'react';

function useHandlePopup() {
  const [show, setShown] = React.useState(false);

  const setShowPopup = (value) => {
    setShown(value);
  }
  return { show, setShowPopup };
}

export default useHandlePopup;