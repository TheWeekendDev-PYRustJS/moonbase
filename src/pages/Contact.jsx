import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css"; // Import CSS file for styles

const Contact = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch("http://127.0.0.1:5001/Contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" }, // Fixed typo
            body: JSON.stringify(formData),
        });
        navigate("/thankyou");
    };

    return (
        <div className="contact-container">
            <div className="contact-box">
                <h1>Contact Us</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Your Name" onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Your Email" onChange={handleChange} required />
                    <textarea name="message" placeholder="Your Message" onChange={handleChange} required />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
