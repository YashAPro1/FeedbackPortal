import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CSRFToken = () => {
    const [csrftoken, setcsrftoken] = useState('');
    // This is for getting the cookiefrom documents
    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            let cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    // It will fetch the cookie and provide the CSRF to us
    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get("http://127.0.0.1:8000/api/csrf_cookie");
                // await axios.get(`${process.env.REACT_APP_API_URL}/api/csrf_cookie`);
            } catch (err) {

            }
        };

        fetchData();
        setcsrftoken(getCookie('csrftoken'));
    }, []);

    return (
        // THIS IS HIDDEN INPUT WHICH WILL CONTENT THE VALUE OF CSF TOKEN
        <input type='hidden' name='csrfmiddlewaretoken' value={csrftoken} />
        
    );
};

export default CSRFToken;