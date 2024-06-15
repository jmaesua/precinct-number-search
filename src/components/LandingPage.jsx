import React, { useState, useEffect } from "react";
import "./LandingPage.css";
import { LoginPopup } from "./LoginPopup";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

export const LandingPage = ({ onNavigateToSearch }) => {
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [initialIsSigningUp, setInitialIsSigningUp] = useState(true);

    useEffect(() => {
        localStorage.removeItem("isAuthenticated");
        setAuthenticated(false);
    }, []);

    const handleLoginPopupToggle = (isSigningUp) => {
        setInitialIsSigningUp(isSigningUp);
        setShowLoginPopup(!showLoginPopup);
    };

    const handleLogin = (username) => {
        const signedUpUsers = JSON.parse(localStorage.getItem("signedUpUsers")) || [];

        if (signedUpUsers.includes(username)) {
            setAuthenticated(true);
            localStorage.setItem("isAuthenticated", "true");
            setShowLoginPopup(false);
        } else {
            alert("Please sign up first.");
        }
    };

    const handleSignUp = (username, toggleForm) => {
        const signedUpUsers = JSON.parse(localStorage.getItem("signedUpUsers")) || [];

        if (!signedUpUsers.includes(username)) {
            signedUpUsers.push(username);
            localStorage.setItem("signedUpUsers", JSON.stringify(signedUpUsers));
            alert("Sign up successful. You can now log in.");
            toggleForm(); // Switch to login form after successful signup
        } else {
            alert("User already exists. Please log in.");
        }
    };

    const handleLogout = () => {
        setAuthenticated(false);
        localStorage.removeItem("isAuthenticated");
    };

    return (
        <div className="landing-page">
            {showLoginPopup && (
                <LoginPopup
                    onClose={handleLoginPopupToggle}
                    onLogin={handleLogin}
                    onSignUp={handleSignUp}
                    initialIsSigningUp={initialIsSigningUp}
                />
            )}

            <Navbar
                onNavigateToSearch={onNavigateToSearch}
                onLoginPopupToggle={() => handleLoginPopupToggle(true)}
                onMemberLoginPopupToggle={() => handleLoginPopupToggle(false)}
                isAuthenticated={isAuthenticated}
            />
            <HeroSection
                onNavigateToSearch={onNavigateToSearch}
                isAuthenticated={isAuthenticated}
            />
            <MediaSection />
            <Footer onLogout={handleLogout} isAuthenticated={isAuthenticated} />
        </div>
    );
};

export const Navbar = ({ onNavigateToSearch, onLoginPopupToggle,onMemberLoginPopupToggle, isAuthenticated }) => {
    const handleMemberClick = () => {
        if (isAuthenticated) {
            onNavigateToSearch();
        } else {
            onMemberLoginPopupToggle();
        }
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <a href="https://www.philatlas.com/luzon/ncr/quezon-city/san-bartolome.html" title="San Bartolome">
                    <img src="/dist/asssets/logo.png" alt="Logo image" />
                    <h2>Barangay San Bartolome</h2>
                </a>
            </div>
            <div className="auth-buttons">
                <button className="sign-in-button" onClick={handleMemberClick}>
                    Join Here. Be a Member
                </button>
                <button className="nav-link" onClick={onLoginPopupToggle}>Sign In/Sign Up</button>
            </div>
        </nav>
    );
};

export const HeroSection = ({ onNavigateToSearch, isAuthenticated }) => {
    const handleSearchClick = () => {
        if (isAuthenticated) {
            onNavigateToSearch();
        } else {
            alert("Please sign in or sign up to access the search functionality.");
        }
    };

    return (
        <section className="hero-section">
            <h1>Maligayang Pagdating sa aming Serbisyo...</h1>
            <p>Serbisyong <span>JONJON MENDOZA</span>...</p>
            <p>sa <span>BARANGAY SAN BARTOLOME</span></p>
            <p>Kasama Ka!</p>
            <button className="search-button" onClick={handleSearchClick}>
                Search Precinct Number
            </button>
        </section>
    );
};

export const MediaSection = () => {
    useEffect(() => {
        if (window.FB) {
            window.FB.XFBML.parse();
        }
    }, []);

    return (
        <section className="media-section">
            <div className="iframe-container">
                <div
                    className="fb-page"
                    data-href="https://www.facebook.com/profile.php?id=100094715005393&amp;mibextid=JRoKGi"
                    data-tabs="timeline"
                    data-width=""
                    data-height=""
                    data-small-header="false"
                    data-adapt-container-width="false"
                    data-hide-cover="false"
                    data-show-facepile="false"
                >
                    <blockquote
                        cite="https://www.facebook.com/profile.php?id=100094715005393&amp;mibextid=JRoKGi"
                        className="fb-xfbml-parse-ignore"
                    >
                        <a href="https://www.facebook.com/profile.php?id=100094715005393&amp;mibextid=JRoKGi">Jon Jon Francisco</a>
                    </blockquote>
                </div>
            </div>
        </section>
    );
};

export const Footer = ({ onLogout, isAuthenticated }) => {
    return (
        <footer className="footer">
            <p>&copy; 2024 Barangay San Bartolome. All rights reserved.</p>
            <div className="social-icons">
                <a href="https://www.facebook.com/profile.php?id=100094715005393" target="_blank" rel="noopener noreferrer">
                    <FaFacebook className="social-icon" />
                </a>
                <a href="https://www.instagram.com/your-instagram-handle" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="social-icon" />
                </a>
            </div>
            {isAuthenticated && (
                <button className="logout-button" onClick={onLogout}>
                    Logout
                </button>
            )}
        </footer>
    );
};
