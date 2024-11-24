import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [locations, setLocations] = useState([]);

  const fetchLocations = async () => {
    try {
      const apiUrl = "/api/locations";
      const hr = await fetch(apiUrl);
      const data = await hr.json();
      // change the state so locations = fetched data
      setLocations(data);
    }
    catch (err) { console.error(err); }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  let arr = locations.map(location => <li key={location.id}>lat: {location.latitude}, lon: {location.longitude}</li>)


  return (
    <>
    <h1>Locations</h1>
      <ul>{arr}</ul>
    </>
  )
}

export default App
