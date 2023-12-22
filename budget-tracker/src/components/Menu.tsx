import React from 'react';

interface MenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
    return (
        <div className={`navbar-menu relative z-50 ${isOpen ? '' : 'hidden'}`}>
            <div className="navbar-backdrop fixed inset-0 bg-primary-300 opacity-25" onClick={onClose}></div>
            <nav className="fixed  text-black top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
               Dashboard
            </nav>
        </div>
    );
};

export default Menu;
