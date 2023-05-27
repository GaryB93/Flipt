import React, { useState, useEffect } from 'react';
import Header from './Header';
import Dashboard from './Dashboard';
import Board from './Board';

const App = () => {
  const [input, setInput] = useState();
  const [view, setView] = useState('');
  const [info, setInfo] = useState();

  const handleAdd = () => {
    fetch('/add', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        newTopic: input
      })
    })
    .then(response => response.json())
    .then(data => {

    })
  };

  const handleDone = () => {
    fetch('/done', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        cardId: 
      })
    })
  };

  return (
    <>
      <Header/>
      <div className='page'>
        <Dashboard setInput={setInput} handleAdd={handleAdd} view={view}/> 
        <Board/>
      </div>
    </>
  );
};

export default App;