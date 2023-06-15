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
      <input type='text' id='newCategory' value={categoryInput} maxLength={30} placeholder='New category...'
        onChange={(e) => {setCategoryInput(e.target.value)}} />
      <button type='button' id='addCategoryBtn' 
        onClick={handleAddCategory}>Add Category</button>
      <h2>Topic</h2>
      <input type='text' id='newTopic' value={topicInput} placeholder='New topic...'
        onChange={(e) => {setTopicInput(e.target.value)}} />
      <textarea id='answerView' value={answerText} placeholder='Notes...'
        onChange={(e) => {setAnswerText(e.target.value)}}></textarea>
      <button type='button' id='saveTopicBtn'
        onClick={handleSave}><FaSave/></button>
      <button type='button' id='changeStatusBtn'
        ><FaThumbsUp/>  /  <FaThumbsDown/></button>
    </div>
  );
};

export default Dashboard;