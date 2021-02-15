import React, { useContext } from 'react';
import { MlContext } from './context/MlContext';
import SearchResults from "./pages/SearchResults";
import { Switch, Route } from 'react-router-dom';
import Searcher from "./components/Searcher";
import Item from "./pages/Item";
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
                        <Route path="/items/:id" component={Item} />
                    </Switch>
            }
            
        </div>
    );
}

export default App;