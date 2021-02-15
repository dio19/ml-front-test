import React, { useContext } from 'react'
import '../styles/searchResults.scss';
import { Link, Redirect } from 'react-router-dom';
import { MlContext } from '../context/MlContext';
import Layout from '../components/Layout';
import ResultsList from '../components/ResultsList';
import Breadcrumb from '../components/tools/Breadcrumb';
import Message from "../components/tools/Message";

export default function SearchResults() {

    const { results } = useContext(MlContext);

    return (
        <Layout>

            {results.items && results.items.length ?

                <div>
                    <div className='row'>
                        <div className="col-12 no-padd-phone">
                            <Breadcrumb categories={results.categories}/>
                        </div>
                    </div>

                    <div className="row">
                        <div id="super-box-list-items-search">
                            {results.items.map(item =>
                                <Link key={item.id} to={`/items/${item.id}`}>
                                    <ResultsList item={item}/>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                : results.error !== undefined && results.error !== '' ?
                <Message error={results.error} />
                :
                <Redirect to={"/"}/>
            }

        </Layout>
    )

}