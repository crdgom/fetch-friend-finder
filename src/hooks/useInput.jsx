import { useState } from 'react';

// Custom hook to handle input fields in forms
// Since: Version 1.0.0
// Author: @crdgom

export const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    
    const handleChange = (e) => 
        setValue(e.target.value);
    
        return { value,
            onChange: handleChange,
        setValue
    };
}
