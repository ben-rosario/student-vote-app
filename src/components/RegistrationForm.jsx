// src/components/RegistrationForm.jsx

import React from 'react'
import { useState } from 'react';

function RegistrationForm() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // basic 10 digit validation
        const digits = phoneNumber.replace(/\D/g, '');
        if (digits.length === 10) {
            try {
                const response = await fetch('/api/registration', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ phoneNumber: digits }),
                });
                
                const data = await response.json();
                
                if (response.ok) {
                  setSubmitted(true);
                  setError('');
                } else {
                  setError(data.message || 'Phone number has already been registered.');
                }
              } catch (error) {
                setError('Cannot connect to server');
                console.error('Error:', error);
              }
        } else {
            setError('Please enter a valid 10-digit phone number');
        }
    };

    if (submitted) { 
        return (
            <div className ="success-message">
                <h2>Thank you for registering!</h2>    
                <p>You will recieve a text message when ASSC elections begin.</p>
            </div>
        );
    }

    return (
        <div className="form-container">
            <h2>Register to recieve a text reminder when ASSC elections start!</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="(123) 456-7890"
                    />
                    {error && <p className="error">{error}</p>}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default RegistrationForm;