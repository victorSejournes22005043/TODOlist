import React from 'react';
import './Header.css'

const Header = ({ remainingTasks, totalTasks }) => {
    return (
        <header className="Header">
            <p>{remainingTasks} / {totalTasks} Taches restantes</p>
        </header>
    );
}

export default Header;
