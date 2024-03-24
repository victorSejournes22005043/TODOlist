import React from 'react';

const Header = ({ remainingTasks, totalTasks }) => {
    return (
        <header>
            <p>{remainingTasks} / {totalTasks} Taches restantes</p>
        </header>
    );
}

export default Header;
