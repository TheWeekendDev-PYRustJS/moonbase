import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [visible, setVisible] = useState(false);

    // Add effect to handle mouse position
    useEffect(() => {
        const handleMouseMove = (e) => {
            // Show navbar when mouse is near the top of the page (within ~50px)
            if (e.clientY < 50) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        // Add event listener
        window.addEventListener("mousemove", handleMouseMove);

        // Clean up
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <nav
            className={`navbar ${visible ? "visible" : "hidden"}`}
            role="navigation"
        >

            {/* Mobile Menu Icon */}
            <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </div>

            {/* Navigation Links */}
            <div className={`nav-links ${menuOpen ? "active" : ""}`}>
                <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                <Link to="/tour" onClick={() => setMenuOpen(false)}>Tour</Link>
                <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
            </div>
        </nav>
    );
};

export default Navbar;