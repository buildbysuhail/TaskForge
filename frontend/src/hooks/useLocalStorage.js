import React, {useState, useEffect} from 'react'

function useLocalStorage(key, initialValue) {
// Read the saved value when the component initializes
const [value, setValue] = useState(() => {
    const savedValue = localStorage.getItem(key);

    // if a saved value exists, use it
    if (savedValue !== null) {
        try {
            return JSON.parse(savedValue);
        } catch {
            // if stored value is corrupted, use the default value
            return initialValue;
        }
    }
    // Nothing saved yet
    return initialValue;
})

// Save the value whenever it changes
useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
}, [key, value]);

return [value, setValue]; 
}

export default useLocalStorage
