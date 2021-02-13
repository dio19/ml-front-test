import React, { useContext } from 'react';
import '../styles/SearchResults.scss';
import Item from "./Item";
import { Redirect } from 'react-router-dom';
import { MlContext } from '../context/MlContext';
import Message from "./tools/Message";
import Breadcrumb from "./tools/Breadcrumb";

export default function SearchResults(){

    const { results } = useContext(MlContext);

    return (
        <div className={"items-list-container"}>
            {
                results.error !== undefined && results.error !== '' ?
                <Message error={results.error}/>
                : results.items ? results.items.length ?
                <div>
                    <Breadcrumb categories={results.categories}/>
                    {results.items.map((item, i) => {
                        return (
                            <Item key={i} info={item} categories={results.categories}/>
                        )
                    })}
                </div>
                : <Message error={results.error}/>
                : <Redirect to={"/"}/>
            }
        </div>
    )
}