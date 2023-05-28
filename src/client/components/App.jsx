import React, { useState, useEffect } from 'react';
import Header from './Header';
import Dashboard from './Dashboard';
import Board from './Board';

const App = () => {
  const [topics, setTopics] = useState();   // data file object
  const [newTopic, setNewTopic] = useState();   // new topic to be added
  const [answerView, setAnswerView] = useState();   // answer to be saved
  const [currTopic, setCurrTopic] = useState();   // current topicId highlighted

  // this effect executes once to retrieve topics from data file
  useEffect(() => {
    fetch('/topics')
    .then(response => response.json())
    .then(data => {
      setTopics(data);
    });
  },[]);

  // this effect executes when a topic is selected
  useEffect(() => {
    if (topics) {
      const answer = topics[currTopic].answer;
      setAnswerView(answer);
    }
  },[currTopic]);

  // this function handles adding a new topic to the data file
  const handleAdd = () => {
    if (newTopic) {
      fetch('/addtopic', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          newTopic: newTopic
        })
      })
      .then(response => response.json())
      .then(data => {
        setTopics(data);
      });
    }
  };

  // this function handles saving an answer to a topic
  const handleSave = () => {
    if (currTopic) {
      fetch('/answer', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          topicId: currTopic,
          answer: answerView
        })
      })
      .then(response => response.json())
      .then(data => {
        setTopics(data);
      });
    }
  };

  // this function handles changing the status of a topic
  const handleChangeStatus = () => {
    fetch('/status', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        topicId: currTopic
      })
    })
    .then(response => response.json())
    .then(data => {
      setTopics(data);
    })
  };

  return (
    <>
      <Header/>
      <div className='page'>
        <Dashboard 
          setNewTopic={setNewTopic}
          handleAdd={handleAdd} 
          setAnswerView={setAnswerView}
          answerView={answerView} 
          handleChangeStatus={handleChangeStatus}
          handleSave={handleSave}
        />
        <Board topics={topics} setCurrTopic={setCurrTopic} currTopic={currTopic}/>
      </div>
    </>
  );
};

export default App;