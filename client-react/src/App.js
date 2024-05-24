import React, { useState, useEffect } from 'react';

const App = () => {

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5006/api/cards', {
          headers: new Headers({
            'Authorization': 'Bearer ...'
          }), 
        })
        .then(response => response.json())
        .then((data) => setData(data));
      }, []);
  
      return (
        <div>
          <h1>My React App</h1>
          <p>Data from API: {data ? JSON.stringify(data) : 'Loading...'}</p>
        </div>
      );
};
export default App;
