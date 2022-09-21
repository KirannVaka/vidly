import React, {useState} from 'react';
import './App.css';
import Movies from './components/movies';

function App(props) {
  return (
    <main className="container">
      <Movies />
    </main>
  );
}

export default App;
