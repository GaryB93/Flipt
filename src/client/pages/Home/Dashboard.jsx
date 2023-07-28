import React, { useState } from 'react';
import style from './Dashboard.module.scss';

const Dashboard = ({ categories, currCategory, updateDatabase }) => {
    // input fields for new category and new flash card
    const [categoryInput, setCategoryInput] = useState('');
    const [flashCardInput, setFlashCardInput] = useState('');

    const handleAddCategory = (e) => {
      e.preventDefault();
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
        setCategoryInput('');
        updateDatabase(categoriesCopy);
      }
    };

    const handleAddFlashCard = () => {
      if (flashCardInput) {
        // deep copy array of categories
        const categoriesCopy = JSON.parse(JSON.stringify(categories));
        // current category name selected
        const categoryName = currCategory.category;
        // create new flash card object
        const newFlashCard = {
          topic: flashCardInput,
          answer: '',
          done: false,
        }
        // iterate through categories until selected one is found and add new flash card object
        categoriesCopy.forEach(category => {
          if (category.category === categoryName) {
            console.log('made it here');
            category.topics.push(newFlashCard);
          }
        });
        setFlashCardInput('');
        updateDatabase(categoriesCopy);
      }
    };

    return (
      <div className={style.dashboard}>
        <form onSubmit={handleAddCategory}>
          <label htmlFor='newCategory'>New Category</label>
          <input type='text' id='newCategory' name='newCategory' autoComplete='off'
            value={categoryInput} maxLength={30} onChange={(e) => {setCategoryInput(e.target.value)}} />
          <button type='submit' id='addCategoryBtn' aria-label='add new category'>Add</button>
        </form>

        <form onSubmit={handleAddFlashCard}>
          <label htmlFor='newFlashCard'>New Flash Card</label>
          <input type='text' id='newFlashCard' name='newFlashCard' value={flashCardInput} maxLength={150}
              autoComplete='off' onChange={(e) => {setFlashCardInput(e.target.value)}} />
          <button type='submit' id='addFlashCardBtn' aria-label='add new flash card'>Add</button>
        </form>
      </div>
    );
};

export default Dashboard;