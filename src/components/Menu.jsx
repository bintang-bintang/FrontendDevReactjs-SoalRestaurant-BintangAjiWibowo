import React from 'react'

const Menu = ({ children }) => {
    return (
        <option className="bg-white w-max relative rounded-lg p-3">
            {children} 
        </option>
    );
}
export default Menu