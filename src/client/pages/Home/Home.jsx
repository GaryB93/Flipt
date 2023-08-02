import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Board from './Board';
import style from './Home.module.scss';
import logo from '../../assets/images/Flipd_logo.png';

const Home = () => {
  const [categories, setCategories] = useState([]); // categories of user, 'Array of Category Objects'
  const [currTopic, setCurrTopic] = useState(); // current topic being viewed, 'Object'
  const [selectOption, setSelectOption] = useState(null); // category selection 'Object' { value: , label: }
  const navigate = useNavigate();

  // executes once to retrieve categories for user upon login
  useEffect(() => {
    fetch('/userData')
    .then(response => response.json())
    .then(data => {
      if (!data) {
        navigate('/');
      } else {
        setCategories(data);
      }
    });
  },[]);

  // update user categories in database with new categories array
  const updateDatabase = (categories) => {
    // make patch request to update categories list
    fetch('/update', {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        categories: categories
      })
    })
    .then(res => res.json())
    .then(data => {
      setCategories(data);
    })
    .catch((err) => {console.log({err: 'Error updating database'})});
  };

  // delete current category being viewed
  const handleDeleteCategory = () => {
    // filter category to be removed from categories
    const newCategories = [];
    for (const category of categories) {
      if (category.category !== selectOption.value) {
        newCategories.push(category);
      }
    }
    setSelectOption(null);
    updateDatabase(newCategories);
  };

  // flip flash card back over and save answer
  const handleSave = (answerText) => {
      // copy categories (Array)
      const categoriesCopy = JSON.parse(JSON.stringify(categories));

      // iterate through categories array to find current category
      for(const category of categoriesCopy) {
        if (category.category === selectOption.value) {
          // category found, iterate through topics array
          for (const topic of category.topics) {
            // topic found, change answer
            if (topic.topic === currTopic.topic) {
              topic.answer = answerText;
              break;
            }
          }
        }
      }
      setCurrTopic(null);
      updateDatabase(categoriesCopy);
  };

  // delete flash card
  const handleDeleteCard = (flashCardObj) => {
    /* flashCard Obj 
      {
        topic: String,
        answer: String,
        done: Boolean
      }
    */
    const categoriesCopy = JSON.parse(JSON.stringify(categories));
    for (const category of categoriesCopy) {
      if (category.category === selectOption.value) {
        const newTopics = [];
        category.topics.forEach((topic) => {
          if (topic.topic !== flashCardObj.topic) {
            newTopics.push(topic);
          }
        });
        category.topics = newTopics;
      }
    }
    updateDatabase(categoriesCopy);
  };

  // indicate whether flash card answer is acceptable
  const handleStatusChange = (flashCardObj) => {
    /* flashCard Obj 
      {
        topic: String,
        answer: String,
        done: Boolean
      }
    */
    const categoriesCopy = JSON.parse(JSON.stringify(categories));
    // iterate through categories array
    for (const category of categoriesCopy) {
      if (category.category === selectOption.value) {
        // iterate through topics
        for (const topic of category.topics) {
          if (topic.topic === flashCardObj.topic) {
            topic.done = (topic.done === false ? true : false);
          }
        }
      }
    }
    updateDatabase(categoriesCopy);
  };

  const handleLogout = () => {
    fetch('/removeCookie')
    .then(navigate('/'))
    .catch((err) => {
      console.log({err: 'Error removing cookie'});
    });
  }

  return (
    <div className={style.homePage}>
      <header>
        <img src={logo} alt='Flipped logo'/>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <Dashboard
        categories={categories}
        updateDatabase={updateDatabase}
        selectOption={selectOption}
        setSelectOption={setSelectOption}
      />
      <Board
        setCurrTopic={setCurrTopic}
        currTopic={currTopic}
        categories={categories}
        handleDeleteCard={handleDeleteCard}
        handleStatusChange={handleStatusChange}
        handleSave={handleSave}
        handleDeleteCategory={handleDeleteCategory}
        selectOption={selectOption}
        setSelectOption={setSelectOption}
      />
    </div>
  );
};

export default Home;