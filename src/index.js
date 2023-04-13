import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// These imports won't work until you fix ./components/index.js
import {
  Feature,
  Loading,
  Preview,
  Search,
  Title
} from './components';

const App = () => {
  /**
   * We are at the App level component, which is top-most. Any state which needs to be shared between immediate children should
   * be made here, so create state pairs using useState() for:
   * 
   * searchResults, setSearchResults (default should be this object:  {info: {}, records: []} )
   * featuredResult, setFeaturedResult (default should be null)
   * isLoading, setIsLoading (default should be false)
   */
  const [searchResults, setSearchResults] = useState({ info: {}, records: [] });
  const [featuredResult, setFeaturedResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="app">
      <Title />
      <Search
        setIsLoading={setIsLoading}
        setSearchResults={setSearchResults}
      />
      <Preview
        searchResults={searchResults}
        setFeaturedResult={setFeaturedResult}
      />
      <Feature
        featuredResult={featuredResult}
        setIsLoading={setIsLoading}
        setSearchResults={setSearchResults}
      />
      {isLoading ? <Loading /> : null}
    </div>
  );
};

/**
 * Boostrap the <App /> component into the '#app' element in the DOM,
 * using ReactDOM.render();
 */
ReactDOM.render(
  <App />, 
  document.getElementById('app')
);