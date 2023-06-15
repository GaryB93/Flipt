import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import Board from './Board';

const Home = () => {
  const username = sessionStorage.getItem('username');
  const [categories, setCategories] = useState([]);   // categories of user, 'Array'
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

  const updateDatabase = (categories) => {
    const categoryName = currCategory.category;
    // make patch request to update categories list
    fetch('/update', {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        categories: categories
      })
    })
    .then(res => res.json())
    .then(data => {
      setCategories(data);
        for (const category of data) {
          if (category.category === categoryName) {
            setCurrCategory(category);
          }
        }
    })
    .catch((err) => {console.log({err: 'Error updating database'})});
  };

  const handleSelectCategory = (category) => {
    setCurrCategory(category);
    setCurrTopic(null);
    setTopicInput('');
    setAnswerText('');
  };

  const handleDeleteCategory = (category) => {
    // filter category to be removed from categories
    const newCategories = [];
    for (const el of categories) {
      if (el.category !== category.category) {
        newCategories.push(el);
      }
    }
    updateDatabase(newCategories);
    setCurrCategory('');
  };

  const handleSave = () => {
    // category selected, topic has input
    if (topicInput && currCategory) {
      // copy categories (Array))
      const categoriesCopy = JSON.parse(JSON.stringify(categories));
      // current category name (String)
      const categoryName = currCategory.category;
      // assume topic is new
      let topicExists = false;

      // iterate through categories array to find current category
      for(const category of categoriesCopy) {
        if (categoryName === category.category) {
          // category found, iterate through topics array
          for (const topic of category.topics) {
            // topic found, change answer
            if (topic.topic === topicInput) {
              topicExists = true;
              topic.answer = answerText;
              break;
            }
          }
          // if topic doesn't exist, add new topic
          if (!topicExists) {
            const newTopic = {
              topic: topicInput,
              answer: answerText,
              done: false
            }
            category.topics.push(newTopic);
            setCurrTopic(newTopic);
          }
        }
      }
      updateDatabase(categoriesCopy);
    }
  };

  const handleDeleteTopic = () => {
    if (topicInput) {
      const currTopicName = currTopic.topic;
      const currCategoryName = currCategory.category;
      const categoriesCopy = JSON.parse(JSON.stringify(categories));
      for (const category of categoriesCopy) {
        if (category.category === currCategoryName) {
          const newTopics = [];
          category.topics.forEach((topic) => {
            if (topic.topic !== currTopicName) {
              newTopics.push(topic);
            }
          });
          category.topics = newTopics;
        }
      }
      updateDatabase(categoriesCopy);
    }
  };

  const handleStatusChange = () => {
    if (topicInput) {
      const currTopicName = currTopic.topic;
      const currCategoryName = currCategory.category;
      const categoriesCopy = JSON.parse(JSON.stringify(categories));
      // iterate through categories array
      for (const category of categoriesCopy) {
        if (category.category === currCategoryName) {
          // iterate through topics
          for (const topic of category.topics) {
            if (topic.topic === currTopicName) {
              topic.done = (topic.done === false ? true : false);
            }
          }
        }
      }
      updateDatabase(categoriesCopy);
    }
  };

  return (
    <div className='page'>
      <Dashboard
        categories={categories}
        currCategory={currCategory}
        topicInput={topicInput}
        setTopicInput={setTopicInput}
        answerText={answerText}
        setAnswerText={setAnswerText}
        handleSelectCategory={handleSelectCategory}
        handleDeleteCategory={handleDeleteCategory}
        handleSave={handleSave}
        handleStatusChange={handleStatusChange}
        handleDeleteTopic={handleDeleteTopic}
        updateDatabase={updateDatabase}
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