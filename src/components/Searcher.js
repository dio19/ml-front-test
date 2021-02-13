import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import '../styles/Searcher.scss';
import logo from '../assets/Logo_ML.png';

export function Searcher({ onSubmit }) {

    const [searchValue, setSearchValue] = useState('');

    const handleChange = event => {
        setSearchValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(searchValue);
        setSearchValue('')
    };

    return <div className="background-banner">
        <form className="search-box-container" onSubmit={(event) => handleSubmit(event)}>
            <Link to={'/'}>
                <img src={logo} alt="Logo Mercado Libre" />
            </Link>
            <input className="search-box-input" type="text" placeholder="Nunca dejes de buscar"
                   value={searchValue} onChange={handleChange}/>
            <button type="submit" className="search-box-btn" data-testid="search-box-icon"/>
        </form>
    </div>;

}