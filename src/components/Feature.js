import React, { Fragment } from 'react';

// Don't touch this import
import { fetchQueryResultsFromTermAndValue } from '../api';

/**
 * We need a new component called Searchable which:
 * 
 * Has a template like this:
 * 
 * <span className="content">
 *  <a href="#" onClick={async (event) => {}}>SOME SEARCH TERM</a>
 * </span>
 *
 * You'll need to read searchTerm, searchValue, setIsLoading, and setSearchResults off of the props.
 * 
 * When someone clicks the anchor tag, you should:
 * 
 * - preventDefault on the event
 * - call setIsLoading, set it to true
 * 
 * Then start a try/catch/finally block:
 * 
 * try:
 *  - await the result of fetchQueryResultsFromTermAndValue, passing in searchTerm and searchValue
 *  - send the result to setSearchResults (which will update the Preview component)
 * catch: 
 *  - console.error the error
 * finally:
 *  - call setIsLoading, set it to false
 */
const Searchable = (props) => {
    const { searchTerm, searchValue, setIsLoading, setSearchResults } = props;
  
    const handleClick = async (event) => {
      event.preventDefault();
      setIsLoading(true);
  
      try {
        const results = await fetchQueryResultsFromTermAndValue(searchTerm, searchValue);
        setSearchResults(results);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <span className="content">
        <a href="#" onClick={handleClick}>{searchValue}</a>
      </span>
    );
  };

/**
 * We need a new component called Feature which looks like this when no featuredResult is passed in as a prop:
 * 
 * <main id="feature"></main>
 * 
 * And like this when one is:
 * 
 * <main id="feature">
 *   <div className="object-feature">
 *     <header>
 *       <h3>OBJECT TITLE</h3>
 *       <h4>WHEN IT IS DATED</h4>
 *     </header>
 *     <section className="facts">
 *       <span className="title">FACT NAME</span>
 *       <span className="content">FACT VALUE</span>
 *       <span className="title">NEXT FACT NAME</span>
 *       <span className="content">NEXT FACT VALUE</span>
 *     </section>
 *     <section className="photos">
 *       <img src=IMAGE_URL alt=SOMETHING_WORTHWHILE />
 *     </section>
 *   </div>
 * </main>
 * 
 * The different facts look like this: title, dated, images, primaryimageurl, description, culture, style, 
 * technique, medium, dimensions, people, department, division, contact, creditline
 * 
 * The <Searchable /> ones are: culture, technique, medium (first toLowerCase it), and person.displayname (one for each PEOPLE)
 * 
 * NOTE: people and images are likely to be arrays, and will need to be mapped over if they exist
 * 
 * This component should be exported as default.
 */
const Feature = (props) => {
    const { featuredResult } = props;
  
    if (!featuredResult) {
      return <main id="feature"></main>;
    }
  console.log('featured', featuredResult)
    const { title, dated, images, primaryimageurl, description, culture, style, technique, medium, dimensions, people, department, division, contact, creditline } = featuredResult;
  
    return (
      <main id="feature">
        <div className="object-feature">
          <header>
            <h3>{title}</h3>
            <h4>{dated}</h4>
          </header>
          <section className="facts">
            <span className="title">Fact Name</span>
            <Searchable searchTerm="culture" searchValue={culture} setIsLoading={props.setIsLoading} setSearchResults={props.setSearchResults} />
            <span className="title">Technique</span>
            <Searchable searchTerm="technique" searchValue={technique} setIsLoading={props.setIsLoading} setSearchResults={props.setSearchResults} />
            <span className="title">Medium</span>
            <Searchable searchTerm="medium" searchValue={medium && medium.toLowerCase()} setIsLoading={props.setIsLoading} setSearchResults={props.setSearchResults} />
            {people && people.map((person, index) => (
              <Fragment key={index}>
                <span className="title">Person</span>
                <Searchable searchTerm="person.displayname" searchValue={person.displayname} setIsLoading={props.setIsLoading} setSearchResults={props.setSearchResults} />
              </Fragment>
            ))}
          </section>
          <section className="photos">
            {images && images.map((image, index) => (
              <img key={index} src={image.url} alt={image.description} />
            ))}
          </section>
        </div>
      </main>
    );
};
  
export default Feature;