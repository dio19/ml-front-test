import React from 'react';
import '../styles/item.scss';

export default function ItemDetail({ data }) {

    return (
        <div className="row">
            <div className="col-12" id="content-item">
                <div id="content-image-and-price">
                    <div id="sub-content-image">
                        <img  src={data.picture} alt={data.title} className="w-100-phone img-item"/>
                    </div>
                    <div id='box-data-item'>
                        <div id="sub-box-data-item" className="w-100-phone">

                            <div id="box-condition-and-selled-item">
                                {data.condition} - {data.sold_quantity} Vendidos
                            </div>
                            <div id="box-title-item">
                                {data.title}
                            </div>
                            <div id="box-price-item">
            <span>
                $ {data.price.amount} <span>{data.price.decimals}</span>
            </span>

                            </div>

                            </div>
                            <div>
                                <button id="btn-buy-item">Comprar</button>
                            </div>
                        </div>
                    </div>
                    {data.description ?
                        <div  id="box-description-item" className="w-100-phone img-item">
                            <div  >
                                <div >
                                    <div  id='title-description-item'>Descripcion del producto</div>
                                </div>
                                <div >
                                    <div  id="content-description-item" >

                                        {data.description}
                                    </div>
                                </div>
                            </div>
                        </div> : <div>
                            Este producto no tiene descripcion
                        </div>}

                </div>
        </div>

    )
};