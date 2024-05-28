import React from 'react';
import Cards from './components/Cards/Cards';
import Nav from './components/Nav/Nav';
import 'normalize.css';
import './App.scss';

const App = () => {
    return (
      <main>
		    <a href="#" className="add-card"></a>
		    <a href="#" className="suggest-card"></a>
        <Cards />
        <Nav />
		    {/* <div class="status">O Saving...</div> */}
	    </main>
    );
};
export default App;
