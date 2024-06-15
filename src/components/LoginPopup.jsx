import React, { useEffect, useState } from 'react';
import './LoginPopup.css';

export const LoginPopup = ({ onClose, onLogin, onSignUp, initialIsSigningUp }) => {
    const [username, setUsername] = useState("");
    const [isSigningUp, setIsSigningUp] = useState(initialIsSigningUp);

    const handleLoginClick = () => {
        onLogin(username);
    };

    const handleSignUpClick = () => {
        onSignUp(username, toggleForm);
    };

    const toggleForm = () => {
        setIsSigningUp(!isSigningUp);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSigningUp) {
            handleSignUpClick();
        } else {
            handleLoginClick();
        }
    };

    useEffect(() => {
        setIsSigningUp(initialIsSigningUp);
    }, [initialIsSigningUp]);

    return (
        <div className="login-popup-container">
            <div className="login-popup">
                <div className={`form-container ${isSigningUp ? "signup" : "signin"}`}>
                    <div className="form-header">
                        <h2>{isSigningUp ? "Sign Up" : "Sign In"}</h2>
                        <span className="close-btn" onClick={onClose}>×</span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {isSigningUp && (
                            <div className="form-details">
                                <div>
                                    <label>Username</label>
                                    <input 
                                        type="text" 
                                        value={username} 
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Enter Username" 
                                        className="form-input" 
                                        required 
                                    />
                                </div>
                                <div>
                                    <label>Password</label>
                                    <input type="password" placeholder="Enter Password" className="form-input" required />
                                </div>
                                <div>
                                    <label>Last Name</label>
                                    <input type="text" placeholder="Enter Last Name" className="form-input" required />
                                </div>
                                <div>
                                    <label>First Name</label>
                                    <input type="text" placeholder="Enter First Name" className="form-input" required />
                                </div>
                                <div>
                                    <label>Birthday</label>
                                    <input type="date" placeholder="Enter Birthday" className="form-input" required />
                                </div>
                                <div>
                                    <label>Age</label>
                                    <input type="number" placeholder="Enter Age" className="form-input" required />
                                </div>
                                <div>
                                    <label>Precinct Number</label>
                                    <input type="text" placeholder="Enter Precinct Number" className="form-input" required />
                                </div>
                                <div>
                                    <label>Contact Number</label>
                                    <input type="text" placeholder="Enter Contact Number" className="form-input" required />
                                </div>
                                <div>
                                    <label>Photo</label>
                                    <input type="file" className="form-input" required />
                                </div>
                                <div>
                                    <label>Signature</label>
                                    <input type="file" className="form-input" required />
                                </div>
                                <button type="submit" className="form-submit">Sign Up</button>
                            </div>
                        )}
                        {!isSigningUp && (
                            <div className="form-details">
                                <div>
                                    <label>Username</label>
                                    <input 
                                        type="text" 
                                        value={username} 
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Enter Username" 
                                        className="form-input" 
                                        required 
                                    />
                                </div>
                                <div>
                                    <label>Password</label>
                                    <input type="password" placeholder="Enter Password" className="form-input" required />
                                </div>
                                <button type="submit" className="form-submit">Sign In</button>
                            </div>
                        )}
                        <div className="form-switch">
                            {isSigningUp ? (
                                <p>
                                    Already have an account? <a onClick={toggleForm}>Sign In</a>
                                </p>
                            ) : (
                                <p>
                                    Don't have an account? <a onClick={toggleForm}>Sign Up</a>
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
