import React, { useState, useEffect } from 'react';
import Cards from './components/Cards/Cards';
import Nav from './components/Nav/Nav';
import './App.scss';

const App = () => {

    const [cards, setCards] = useState(null);

    useEffect(() => {
      const getCards = async () => {
        try {
          const response = await fetch('http://localhost:5006/api/cards', {
            headers: new Headers({
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYXV0aDB8NTZlMzdlZmRlNWJiMTgzZjE3YzY2NDRiIiwiY2xpZW50SUQiOiJlYVhZRFZrSEhTTFFaVnRKc1hBckFIT0dxMjBZeG8xbCIsImVtYWlsIjoicGF1bC5ibGFuZEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwidXBkYXRlZF9hdCI6IjIwMjQtMDUtMjdUMTk6MzM6MDQuNzA3WiIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci8xYWUxOTIxYWEzOTljOWFjNTM4ZjU3NjcwZmM0MmE3NT9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRnBhLnBuZyIsIm5hbWUiOiJwYXVsLmJsYW5kQGdtYWlsLmNvbSIsIm5pY2tuYW1lIjoicGF1bC5ibGFuZCIsImlkZW50aXRpZXMiOlt7InVzZXJfaWQiOiI1NmUzN2VmZGU1YmIxODNmMTdjNjY0NGIiLCJwcm92aWRlciI6ImF1dGgwIiwiY29ubmVjdGlvbiI6IlVzZXJuYW1lLVBhc3N3b3JkLUF1dGhlbnRpY2F0aW9uIiwiaXNTb2NpYWwiOmZhbHNlfV0sImNyZWF0ZWRfYXQiOiIyMDE2LTAzLTEyVDAyOjI5OjE3LjUyM1oiLCJsYXN0X3Bhc3N3b3JkX3Jlc2V0IjoiMjAyNC0wNS0xM1QxMzo0NjoxOS41MzVaIiwidXNlcl9tZXRhZGF0YSI6e30sImFwcF9tZXRhZGF0YSI6e30sImlzcyI6Imh0dHBzOi8vc2NyaWJvLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1NmUzN2VmZGU1YmIxODNmMTdjNjY0NGIiLCJhdWQiOiJlYVhZRFZrSEhTTFFaVnRKc1hBckFIT0dxMjBZeG8xbCIsImlhdCI6MTcxNjg0MDkzMSwiZXhwIjoxNzE2ODc2OTMxfQ.1TtjSLn_bvZDPGbryoJvFABwJBxHnZAtbfnXFoCQ-IM' 
            })
          })
          const data = await response.json();
          setCards(data);
        } catch (err) {
          // console.error(err);
        }
      };
      getCards();
    }, []);

    return (
      <div>
        <h1>My React App</h1>
        <Cards cards={cards} />
        <Nav />
      </div>
    );
};
export default App;
