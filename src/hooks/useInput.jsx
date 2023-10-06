import { useState } from 'react';

// useInput.js
// * Name: useInput
// * Description: Custom hook for managing form input fields.
// * It returns the input value and a function to update it.
// * Since: v1.0.0
// * Author: @crdgom

export const useInput = (initialValue = '') => {
    const [value, setValue] = useState(initialValue);
  
    const handleChange = (e) => {
      setValue(e.target.value);
    };
  
    const reset = () => {
      setValue(initialValue);
    };
  
    return {
      value,
      onChange: handleChange,
      reset,
    };
  };
