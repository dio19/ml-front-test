import React from 'react';
import '../../styles/Message.scss';

export default function Message({ error }){
    return (
        <div className={`message-container ${error ? 'error' : ''}`}>
            <h4 className={'message-title'}><i className={`message-icon ${error ? 'error' : ''}`}/>Lo sentimos!</h4>
            <p className={'message-text'}>
                {error}
            </p>
        </div>
    )
}