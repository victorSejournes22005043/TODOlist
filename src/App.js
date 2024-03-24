import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Header from './Header';
import Footer from './Footer';
import './App.css';
import './Modal.css';

Modal.setAppElement('#root');

function App() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const addTask = taskText => {
        if (taskText.trim() !== '') {
            setTasks([...tasks, { id: Date.now(), text: taskText, completed: false }]);
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

    const handleSearch = term => {
        setSearchTerm(term);
    };

    return (
        <div className="container">
            <Header
                remainingTasks={tasks.filter(task => !task.completed).length}
                totalTasks={tasks.length}
            />
            <h2>TODO List</h2>
            <button onClick={openModal} className="add-task-button">+</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="Modal__content"
                overlayClassName="Modal__overlay"
            >
                <h3>Add Task</h3>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter task"
                />
                <button onClick={() => { addTask(inputValue); setInputValue(''); closeModal(); }}>Add Task</button>
                <button className="Modal__closeButton" onClick={closeModal}>X</button>
            </Modal>
            <ul>
                {tasks
                    .filter(task => task.text.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(task => (
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
            <Footer onAddTask={addTask} onSearch={handleSearch} />

        </div>
    );
}

export default App;
