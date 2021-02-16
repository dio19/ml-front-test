import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const MlContext = React.createContext();

function MlProvider({defaultValue = [], children}) {

    let history = useHistory();
    const [ results, setResults ] = useState(defaultValue);
    const [ loading, setLoading ] = useState(false);

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
        <MlContext.Provider value={{ results, getResults, setLoading, loading }}>
            {children}
        </MlContext.Provider>
    )
}

export {MlContext, MlProvider};