import React, { useState } from 'react';
import Modal from 'react-modal';

import "./App.css";
import './Modal.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const addTask = () => {
        if (inputValue.trim() !== '') {
            setTasks([...tasks, { id: Date.now(), text: inputValue, completed: false }]);
            setInputValue('');
            closeModal();
        }
    };

    const deleteTask = id => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const toggleTask = id => {
        setTasks(
            tasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const handleInputChange = event => {
        setInputValue(event.target.value);
    };

    return (
        <div className="container">
            <h1>TODO List</h1>
            <button onClick={openModal} className="add-task-button">Add Task</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="Modal__content"
                overlayClassName="Modal__overlay"
            >
                <h2>Add Task</h2>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter task"
                />
                <button onClick={addTask}>Add Task</button>
                <button className="Modal__closeButton" onClick={closeModal}>X</button>
            </Modal>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                        />
                        <span
                            style={{textDecoration: task.completed ? 'line-through' : 'none'}}
                        >
              {task.text}
            </span>
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;