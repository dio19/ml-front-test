import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const MlContext = React.createContext();

function MlProvider({defaultValue = [], children}) {

    let history = useHistory();
    const [ results, setResults ] = useState(defaultValue);
    const [ dataItem, setDataItem ] = useState({ error: '', data: {} })
    const [ loading, setLoading ] = useState(false);

    const getItem = (id) => {
        setLoading(true);
        fetch(`http://localhost:4000/api/items/${id}`)
        .then(response => response.json())
        .then(response => {
            if(response === 'not found'){
                setLoading(false);
                setDataItem({...dataItem, error: 'No pudimos encontrar el artículo que estabas buscando. Probá nuevamente más tarde' });
            } else {
                setLoading(false);
                setDataItem({...dataItem, data: response });
            }
        })
        .catch(error => {
            console.error(error);
            setLoading(false);
            setDataItem({...dataItem, error: 'Ups! Algo salió mal. Probá nuevamente más tarde'});
        });
    }

    const getResults = (query) => {
        setLoading(true);
        fetch(`http://localhost:4000/api/items?q=${query}`)
            .then(response => response.json())
            .then(response => {
                if (response === 'Not found') {
                    console.error(response);
                    setLoading(false);
                    setResults({error: 'No hay publicaciones que coincidan con tu búsqueda.'});
                    history.push(`/items?search=${query}`);
                } else {
                    setLoading(false);
                    setResults(response);
                    history.push(`/items?search=${query}`);
                }
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
                setResults({error: 'Hubo un problema con el servidor. Nuestro equipo esta trabajando para solucionarlo!'});
            });
    }

    return (
        <MlContext.Provider value={{ results, dataItem, getResults, getItem, loading }}>
            {children}
        </MlContext.Provider>
    )
}

export {MlContext, MlProvider};