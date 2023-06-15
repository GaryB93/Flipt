import React, { useState } from 'react';
import { FaThumbsUp, FaThumbsDown, FaSave } from 'react-icons/fa';
import Category from './Category';

const Dashboard = ({
  categories,
  currCategory,
  topicInput,
  setTopicInput,
  answerText,
  setAnswerText,
  handleSelectCategory,
  handleDeleteCategory,
  handleSave,
  handleStatusChange,
  handleDeleteTopic,
  updateDatabase
}) => {
  // input field for new category, 'String'
  const [categoryInput, setCategoryInput] = useState('');
  // store Category components
  const categoriesArr = [];
 
  for (const category of categories) {
    categoriesArr.push(
      <Category
        key={category._id}
        category={category}
        currCategory={currCategory}
        handleSelectCategory={handleSelectCategory}
        handleDeleteCategory={handleDeleteCategory}
      />
    );
  }

  const handleAddCategory = () => {
    if(categoryInput) {
      // deep copy array of categories
      const categoriesCopy = JSON.parse(JSON.stringify(categories));
      // create new category object to be added
      const newCategory = {
        category: categoryInput,
        topics: []
      }
      // add new category to array of categories
      categoriesCopy.push(newCategory);
      updateDatabase(categoriesCopy);
      setCategoryInput('');
    }
  };

  return (
    <div className='dashboard'>
      <header>
        <h1>Study Board</h1>
      </header>
      <h2>Categories</h2>
      <div id='categories'>
        {categoriesArr}
      </div>
      <label htmlFor='newCategory'>New Category</label>
      <input type='text' id='newCategory' name='newCategory' autocomplete='off'
        value={categoryInput} maxLength={30} onChange={(e) => {setCategoryInput(e.target.value)}} />
      <button type='button' id='addCategoryBtn' onClick={handleAddCategory}>Add</button>

      <label htmlFor='topic'>Topic</label>
      <input type='text' id='topic' name='topic' value={topicInput} maxLength={150}
        onChange={(e) => {setTopicInput(e.target.value)}} />
      <label htmlFor='answerView'>Answer/Notes</label>
      <textarea id='answerView' name='answerView' value={answerText}
        onChange={(e) => {setAnswerText(e.target.value)}}></textarea>
      <div id='topicBtns'>
        <button type='button' id='saveTopicBtn'
          onClick={handleSave}><FaSave/></button>
        <button type='button' id='changeStatusBtn' onClick={handleStatusChange}
          ><FaThumbsUp/>  /  <FaThumbsDown/></button>
      </div>
      <button type='button' id='deleteTopicBtn' onClick={handleDeleteTopic}>Delete</button>
    </div>
  );
};

export default Dashboard;