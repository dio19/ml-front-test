import React, { useContext } from 'react';
import './styles/App.scss';
import { MlContext } from './context/MlContext';

import { Searcher } from "./components/Searcher";
import { Switch, Route } from 'react-router-dom';
import SearchResults from "./components/SearchResults";
import ItemDetail from "./components/ItemDetail";
import Loader from './components/tools/Loader';

function App() {

    const { getResults, loading } = useContext(MlContext);

    return (
        <div className="App">
            <Searcher onSubmit={(query) => getResults(query)}/>
            {
                loading ? <Loader /> :
                    <Switch>
                        <Route exact path="/items" component={SearchResults} />
                        <Route path="/items/:id" component={ItemDetail} />
                    </Switch>
            }
            
        </div>
    );
}

export default App;
