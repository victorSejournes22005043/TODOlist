import React, { useState } from 'react';

function Footer({ onAddTask, onSearch }) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = event => {
        setInputValue(event.target.value);
        onSearch(event.target.value);
    };

    const handleKeyPress = event => {
        if (event.key === 'Enter') {
            onAddTask(inputValue);
            setInputValue('');
        }
    };

    return (
        <footer>
            <input
                type="text"
                placeholder="Quick search..."
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
            />
        </footer>
    );
}

export default Footer;