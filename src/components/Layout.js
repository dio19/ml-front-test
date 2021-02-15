import React from 'react';
import '../styles/layout.scss';

export default function Layout({ children, onSubmit }){

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    {children}
                </div>
            </div>
        </div>
    )
}