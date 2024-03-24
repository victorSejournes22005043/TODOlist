import React, { useState } from "react";
import "./Modal.css";
import App from "./App";

function Modal() {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    if(modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <>
            <button onClick={toggleModal} className="btn-modal">
                Add Task
            </button>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <h2>Task name</h2>
                        <button className="close-modal" onClick={toggleModal}>
                            CLOSE
                        </button>
                        <button className="confirm-modal" onClick={App.addTask}>
                            Add Task
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;