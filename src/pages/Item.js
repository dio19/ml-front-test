import React, { useContext, useEffect }  from 'react'
import { MlContext } from '../context/MlContext';
import { useParams } from 'react-router-dom';

import Layout from '../components/Layout';
import Breadcrumb from '../components/tools/Breadcrumb';
import Message from '../components/tools/Message';
import ItemDetail from '../components/ItemDetail';

export default function Item({ props }) {

    const { id } = useParams();
    const { getItem, dataItem } = useContext(MlContext);

    const data = dataItem.data
    
    useEffect(() => {
        if(data.id && id && id !== data.id){
            getItem(id)
        } else if (!data.id){
            getItem(id)
        }
    }, [data.id, dataItem.data.id, getItem, id])

        return (
            <Layout>
                {data !== {} && data.price ?
                    <div>
                        <div className='row'>
                            <div style={{paddingLeft: '0px'}} className="col-12 no-padd-phone">
                                <Breadcrumb categories={data.categories}/>
                            </div>
                        </div>
                        <ItemDetail data={data} />
                    </div>
                    : dataItem.error ?<Message error={data}/>
                    :<Message error='Lo sentimos, hubo un problema interno del servidor, estamos trabajando en ello, volve a intentarlo en unos instantes'/>
                }

            </Layout>
        )
}