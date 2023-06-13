import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import Board from './Board';

const Home = () => {
  const username = sessionStorage.getItem('username');
  const [categories, setCategories] = useState([]);   // categories of user, 'Array'
  const [categoryInput, setCategoryInput] = useState('');   // input field for category, 'String'
  const [topicInput, setTopicInput] = useState('');   // input field for topic, 'String'
  const [answerText, setAnswerText] = useState('');   // text area for answers/notes, 'String'
  const [currCategory, setCurrCategory] = useState(); // current category highlighted, 'Object'
  const [currTopic, setCurrTopic] = useState();   // current topic highlighted, 'Object'

  // this effect executes once to retrieve categories for user
  useEffect(() => {
    fetch(`/user_data/${username}`)
    .then(response => response.json())
    .then(data => {
      setCategories(data);
    });
  },[]);

  const handleSelectCategory = (category) => {
    setCurrCategory(category);
    setTopicInput('');
    setAnswerText('');
  };

  const handleAddCategory = () => {
    if(categoryInput !== '') {
      // deep copy array of categories
      const categoriesCopy = JSON.parse(JSON.stringify(categories));
      // create new category object to be added
      const newCategory = {
        category: categoryInput,
        topics: []
      }
      // add new category to array of categories
      categoriesCopy.push(newCategory);
      // make patch request to update categories list
      fetch('/update', {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          categories: categoriesCopy
        })
      })
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        setCategoryInput('');
      });
    }
  };

  const handleDeleteCategory = (category) => {
    // filter category to be removed from categories
    const newCategories = [];
    for (const el of categories) {
      if (el.category !== category.category) {
        newCategories.push(el);
      }
    }
    // make patch request to update categories array
    fetch('/update', {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        categories: newCategories
      })
    })
    .then(res => res.json())
    .then(data => {
      setCategories(data);
    });
  };

  return (
    <div className='page'>
      <Dashboard
        categoryInput={categoryInput}
        setCategoryInput={setCategoryInput}
        categories={categories}
        currCategory={currCategory}
        topicInput={topicInput}
        setTopicInput={setTopicInput}
        answerText={answerText}
        setAnswerText={setAnswerText}
        handleSelectCategory={handleSelectCategory}
        handleAddCategory={handleAddCategory}
        handleDeleteCategory={handleDeleteCategory}
      />
      <Board
        currCategory={currCategory}
        setTopicInput={setTopicInput}
        setAnswerText={setAnswerText}
        setCurrTopic={setCurrTopic}
        currTopic={currTopic}
      />
    </div>
  );
};

export default Home;