import React from 'react';
import resultsListCss from '../styles/resultsList.scss';

export default function ResultsList({ item }){

    return (
        <div id='box-item-list' className="row">
            <div className="content-picture-item col-lg-3 col-md-4 col-sm-4 col-4">
                <img src={item.picture} alt=""/>
            </div>

            <div id="title-item-box-list" className='col-lg-7 col-md-6 col-sm-6 col-5'>
                <div id="price-item-box-list">$ {item.price.amount} {item.free_shipping && <button id="item-price-free-shipping" />}</div>
                <div id="title-item-box-list">{item.title}</div>
            </div>

            <div id="adrress-item-box-list" className="col-lg-2 col-sm-2 col-3">{item.state_name}</div>

            <style jsx lang="scss" scoped>{

                `
        ${resultsListCss}
        `
            }

            </style>
        </div>
    )
}