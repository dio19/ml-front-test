import React, { useCallback, useEffect, useState }  from 'react'
import { useParams } from 'react-router-dom';

import Layout from '../components/Layout';
import Breadcrumb from '../components/tools/Breadcrumb';
import Message from '../components/tools/Message';
import ItemDetail from '../components/ItemDetail';
import Loader from '../components/tools/Loader';


export default function Item() {

    const { id } = useParams();
    const [ loading, setLoading ] = useState(true)
    const [ data, setData ] = useState({});
    const [ error, setError ] = useState('');

    const fetchItemDetail = useCallback(async () => {
        setLoading(true);
        const response = await fetch(`http://localhost:4000/api/items/${id}`)
        .then(response => response.json())
        .then(response => {
            if(response === 'not found'){
                setLoading(false);
                setError('No se encontro un producto con ese id!');
            } else {
                setLoading(false);
                setData(response);
            }
        })
        .catch(error => {
            console.error(error);
            console.log('entre catch')
            setLoading(false);
            setError('Hubo un problema en el servidor, estamos trabajando para resolverlo!');
        });
        return response
    }, [id])
    
    useEffect(() => {
        fetchItemDetail()
    }, [fetchItemDetail, id, setLoading])

        return (
            <Layout>
                {loading ? <Loader /> :
                error ?<Message error={error}/>
                    : data !== {} && data.price ?
                        <div>
                            <div className='row'>
                                <div style={{paddingLeft: '0px'}} className="col-12 no-padd-phone">
                                    <Breadcrumb categories={data.categories}/>
                                </div>
                            </div>
                            <ItemDetail data={data} />
                        </div>
                    :<Message error='No se encontro un producto con ese id!'/>
                }

            </Layout>
        )
}