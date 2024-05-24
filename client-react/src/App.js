import React, { useState, useEffect } from 'react';

const App = () => {

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5006/api/cards', {
          headers: new Headers({
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYXV0aDB8NTZlMzdlZmRlNWJiMTgzZjE3YzY2NDRiIiwiY2xpZW50SUQiOiJlYVhZRFZrSEhTTFFaVnRKc1hBckFIT0dxMjBZeG8xbCIsImVtYWlsIjoicGF1bC5ibGFuZEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwidXBkYXRlZF9hdCI6IjIwMjQtMDUtMjNUMTQ6MTI6MjUuMDAyWiIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci8xYWUxOTIxYWEzOTljOWFjNTM4ZjU3NjcwZmM0MmE3NT9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRnBhLnBuZyIsIm5hbWUiOiJwYXVsLmJsYW5kQGdtYWlsLmNvbSIsIm5pY2tuYW1lIjoicGF1bC5ibGFuZCIsImlkZW50aXRpZXMiOlt7InVzZXJfaWQiOiI1NmUzN2VmZGU1YmIxODNmMTdjNjY0NGIiLCJwcm92aWRlciI6ImF1dGgwIiwiY29ubmVjdGlvbiI6IlVzZXJuYW1lLVBhc3N3b3JkLUF1dGhlbnRpY2F0aW9uIiwiaXNTb2NpYWwiOmZhbHNlfV0sImNyZWF0ZWRfYXQiOiIyMDE2LTAzLTEyVDAyOjI5OjE3LjUyM1oiLCJsYXN0X3Bhc3N3b3JkX3Jlc2V0IjoiMjAyNC0wNS0xM1QxMzo0NjoxOS41MzVaIiwidXNlcl9tZXRhZGF0YSI6e30sImFwcF9tZXRhZGF0YSI6e30sImlzcyI6Imh0dHBzOi8vc2NyaWJvLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1NmUzN2VmZGU1YmIxODNmMTdjNjY0NGIiLCJhdWQiOiJlYVhZRFZrSEhTTFFaVnRKc1hBckFIT0dxMjBZeG8xbCIsImlhdCI6MTcxNjUyMTYzNCwiZXhwIjoxNzE2NTU3NjM0fQ.69iRniAe2jv-vyyaoihhbsbFiSdZbqDugsbcUK9D06k'
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
