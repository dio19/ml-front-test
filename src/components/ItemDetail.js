import React, { useContext, useEffect } from 'react';
import '../styles/itemDetail.scss';
import * as utils from '../utils';
import { MlContext } from '../context/MlContext';
import Message from "./tools/Message";
import Loader from "./tools/Loader";

export default function ItemDetail(props) {

    const id = props.match.params.id;
    const { getItem, dataItem } = useContext(MlContext);
    
    useEffect(() => {
        if(dataItem.data.id && id && id !== dataItem.data.id){
            getItem(id)
        } else if (!dataItem.data.id){
            getItem(id)
        }
    }, [dataItem.data.id, getItem, id])

    return dataItem.error ? <Message error={dataItem.error} message={dataItem.error} /> :
    dataItem.data.id ? <div className={'item-detail-container'}>
        <div className={'item-detail-first-row'}>
            <div className={'item-detail-img-container'}>
                <img src={dataItem.data.picture} alt={dataItem.data.title}/>
            </div>
            <div className={'item-detail-info'}>
                <p className={'item-detail-condition-sold'}>
                    {`${dataItem.data.condition === 'new' ? 'Nuevo' : 'Usado'} - ${dataItem.data.sold_quantity} vendidos`}
                </p>
                <h5 className={'item-detail-title'}>{dataItem.data.title}</h5>
                <h3 className={'item-detail-price'}>
                    {utils.formatPrice(dataItem.data.price)}
                    {dataItem.data.price.decimals ?
                        <span className={'item-price-decimals'}>{dataItem.data.price.decimals}</span> : null}
                </h3>
                <button className={'item-detail-buy'}>Comprar</button>
            </div>
        </div>
        <div className={'item-detail-description'}>
            <p className={'item-detail-description-title'}>Descripción del producto</p>
            <p className={'item-detail-description-text'}>{dataItem.data.description}</p>
        </div>
    </div> : <Loader />
};