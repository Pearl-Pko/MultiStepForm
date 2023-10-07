import React from 'react';
import thankYouImage from './public/images/icon-thank-you.svg'
import './ConfirmationPage.css'

function ConfirmationPage(props) {
    return (
        <div className='confirm'>
            <img src={thankYouImage}/>
            <h2>Thank you!</h2>
            <p>Thanks for confirming your subscription!</p>
            <p>We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com</p>
        </div>
    );
}

export default ConfirmationPage;