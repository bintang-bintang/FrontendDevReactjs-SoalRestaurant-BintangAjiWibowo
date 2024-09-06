import { useState } from "react";

const Filternav = () => {
    return (
        <div className="flex justify-center h-screen bg-red-500">
            <Dropdown Kontenmenu={
                <Menus>
                    <p>$</p>
                    <p>$$</p>
                    <p>$$$</p>
                    <p>$$$$</p>
                    <p>$$$$$</p>
                </Menus>
            }>Price</Dropdown>
        </div>
    );
}


const Menus = ({ children }) => {
    return (
        <div className="bg-white relative rounded-lg p-3">
            {children} {/* Menampilkan children yang diterima */}
        </div>
    );
}

export default Filternav;
