import React from 'react';
import './ErrorMessage.css'

function ErrorMessage({message}) {
    return (
        <span className='error-message'>
            {message}
        </span>
    );
}

export default ErrorMessage;