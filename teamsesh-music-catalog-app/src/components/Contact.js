// components/Contact.js
import React from 'react';
import '../styles/Contact.css';

const FormApiKey = process.env.REACT_APP_FORM_API_KEY;

function Contact() {
    return (
        <div className="contact-section">
            <h2>Contact</h2>
            <p>Please feel free to reach out with questions, opportunities, or other inquiries.</p>
            <div className="contact-form">
                <form action="https://api.web3forms.com/submit" method="POST" className="contact-form">
                    <input type="hidden" name="access_key" value={FormApiKey} />
                    <input type="hidden" name="source" value="TeamSESH Database Website" />
                    <div className="form-group">
                        <input type="text" name="name" placeholder="Your Name" required />
                        <input type="email" name="email" placeholder="Your Email" required />
                        <input type="text" name="subject" placeholder="Subject" required />
                    </div>
                    <textarea name="message" placeholder="Your Message" required></textarea>
                    <button type="submit" className="submit-button">Send Message</button>
                </form>
            </div>
        </div>
    );
}

export default Contact;
