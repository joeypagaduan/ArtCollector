import React, { useEffect, useState } from 'react';

/**
 * Don't touch these imports!
 */
import { 
  fetchAllCenturies,
  fetchAllClassifications,
  fetchQueryResults
} from '../api';

const Search = props => {
  const { setSearchResults, setInfo, setIsLoading } = props;
  const [centuryList, setCenturyList] = useState([]);
  const [classificationList, setClassificationList] = useState([]);
  const [queryString, setQueryString] = useState('');
  const [century, setCentury] = useState('any');
  const [classification, setClassification] = useState('any');

  // Make sure to destructure setIsLoading and setSearchResults from the props


  /**
   * We are at the Search component, a child of app. This has a form, so we need to use useState for
   * our controlled inputs:
   * 
   * centuryList, setCenturyList (default should be an empty array, [])
   * classificationList, setClassificationList (default should be an empty array, [])
   * queryString, setQueryString (default should be an empty string, '')
   * century, setCentury (default should be the string 'any')
   * classification, setClassification (default should be the string 'any')
   */


  /**
   * Inside of useEffect, use Promise.all([]) with fetchAllCenturies and fetchAllClassifications
   * 
   * In the .then() callback pass the returned lists to setCenturyList and setClassificationList
   * 
   * Make sure to console.error on caught errors from the API methods.
   */
  useEffect(() => {
    Promise.all([fetchAllClassifications(), fetchAllCenturies()])
      .then(([classifications, centuries]) => {
        setClassificationList(classifications);
        setCenturyList(centuries);
      })
      .catch(console.error);
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const results = await fetchQueryResults({ century, classification, queryString });
      setSearchResults(results);
      // setInfo(results.info);
      // setRecords(results.records);
      console.log(results);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  /**
   * This is a form element, so we need to bind an onSubmit handler to it which:
   * 
   * calls event.preventDefault()
   * calls setIsLoading, set it to true
   * 
   * then, in a try/catch/finally block:
   * 
   * try to:
   * - get the results from fetchQueryResults({ century, classification, queryString })
   * - pass them to setSearchResults
   * 
   * catch: error to console.error
   * 
   * finally: call setIsLoading, set it to false
   */

return <form id="search" onSubmit={onSubmit}>
  <fieldset>
    <label htmlFor="keywords">Query</label>
    <input 
      id="keywords" 
      type="text" 
      placeholder="enter keywords..." 
      value={queryString} 
      onChange={(e) => setQueryString(e.target.value)}/>
  </fieldset>
  <fieldset>
    <label htmlFor="select-classification">Classification <span className="classification-count">({ classificationList.length })</span></label>
    <select 
      name="classification"
      id="select-classification"
      value={classification} 
      onChange={(e) => setClassification(e.target.value)}>
      <option value="any">All classifications</option>
        {classificationList.map((classification) => (
          <option key={classification.id} value={classification.name}>
            {classification.name}
          </option>
        ))}
    </select>
  </fieldset>
  <fieldset>
    <label htmlFor="select-century">Century <span className="century-count">({ centuryList.length })</span></label>
    <select 
      name="century" 
      id="select-century"
      value={century} 
      onChange={(e) => setCentury(e.target.value)}>
      <option value="any">Any</option>
      {centuryList.map((century) => (
          <option key={century.id} value={century.name}>
            {century.name}
          </option>
        ))}
    </select>
   </fieldset>
  <button>SEARCH</button>
</form>
};

export default Search;