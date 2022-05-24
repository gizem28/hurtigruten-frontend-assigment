import { useState } from 'react';
import mglass from '../assets/magnifying-glass.svg';
import cross from '../assets/cross.svg';
import arrow from '../assets/down-arrow.svg';

const Searchbar = (setSearchResult) => {
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState('');

  // useEffect(() => {
  //   fetch(`http://localhost:4000/api/ships/${search}`)
  //   .then(res =>{
  //     if(!res.ok){
  //       throw Error("could not fetch");
  //     }
  //     return res.json();
  //   })
  //   // .then(data => setSearchResult(data))
  //   .catch((err) => setError(err.message));
  // }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:4000/api/ships/${search}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setResult(res);
        console.log(res);
      })
      // .then((searchResult) => setSearchResult(res))
      .catch((err) => setError(err.message));
  };

  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <div className="container">
      {error && <p>{error}</p>}
      <h3>Search Flow</h3>
      <br />
      <form action="/" method="GET" className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          className="search-field"
          aria-label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="cross-button"
          type="reset"
          disabled={!search}
          onClick={() => setSearch('')}
        >
          {search && <img className="cross" src={cross} alt="Search" />}
        </button>
        <button type="submit" className="glass-button">
          <img src={mglass} className="glass" alt="Search" />
        </button>
      </form>
      <div>
        {/* {result.filter((ships) => {
          if (query === ' ') {
            return ships;
          }else if(ships.heading.toLowerCase().includes(query.toLowerCase())){
            return ships;
          }}). */}
          {result.map((ship) => (
          <table className="result-table" key={ship.shipId}>
            <tr>
              <th></th>
              <th>Ship Name</th>
              <th>Ship Yard</th>
            </tr>
            <tr>
              <td>
                <button className="down-button" onClick={toggleShow}>
                  <img src={arrow} className="arrow" alt="Down Arrow" />
                </button>
              </td>
              <td>{ship.heading}</td>
              <td>{ship.shipyard}</td>
            </tr>
          {show && (
            <tr>
                <td></td>
                <td>{ship.facilities}</td>
              </tr>)}
          </table>))}
      </div>
    </div>
  
          )}
export default Searchbar;
