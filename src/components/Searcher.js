import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import searcherCss from '../styles/searcher.scss';
import logo from '../assets/Logo_ML.png';

export default function Searcher({ onSubmit }) {

    const [searchValue, setSearchValue] = useState('');

    const handleChange = event => {
        setSearchValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(searchValue);
        setSearchValue('')
    };

    return (
        <nav id="navbar-ml">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className=" col-3 col-sm-2 col-md-1 no-padd-xs-phone">
                                <Link to={'/'}>
                                    <div id='box-logo-navbar'>
                                        <img src={logo} alt="Logo Mercado Libre" />
                                    </div>
                                </Link>
                            </div>
                            <div className=" col-9 col-sm-10 col-md-11 no-padd-xs-phone">
                                <div id="box-input-search">
                                    <form onSubmit={(event) => handleSubmit(event)}>
                                        <input type="text" placeholder="Nunca dejes de buscar" value={searchValue} onChange={handleChange}/>
                                        <button id="button-search" type="submit"><img src=".././assets/ic_Search.png" alt=""/></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx lang="scss" scoped>{

            `
            ${searcherCss}
            `
            }
            </style>
        </nav>
    )

}