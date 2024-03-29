import React, { useState } from 'react';
import style from './Dashboard.module.scss';

const Dashboard = ({
  categories,
  updateDatabase,
  selectOption,
  setSelectOption
  }) => {
    // input fields for new category and new flash card
    const [categoryInput, setCategoryInput] = useState('');
    const [flashCardInput, setFlashCardInput] = useState('');

    // add new category
    const handleAddCategory = (e) => {
      e.preventDefault();
      if (categoryInput) {
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
        setSelectOption({ value: categoryInput, label: categoryInput });
        updateDatabase(categoriesCopy);
      }
    };

    // add new flash card to current category
    const handleAddFlashCard = (e) => {
      e.preventDefault();
      if (flashCardInput) {
        // deep copy array of categories
        const categoriesCopy = JSON.parse(JSON.stringify(categories));
        // create new flash card object
        const newFlashCard = {
          topic: flashCardInput,
          answer: '',
          done: false,
        }
        // iterate through categories until selected one is found and add new flash card object
        categoriesCopy.forEach(category => {
          if (category.category === selectOption.value) {
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
          <div>
            <input
              type='text'
              id='newCategory'
              name='newCategory'
              autoComplete='off'
              placeholder='New category...'
              aria-label='New category'
              value={categoryInput}
              maxLength={30}
              onChange={(e) => {setCategoryInput(e.target.value)}}
            />
            <button
              type='submit'
              id='addCategoryBtn'
              aria-label='add new category'
            >Add</button>
          </div>
        </form>

        <form onSubmit={handleAddFlashCard}>
          <div>
            <input
              type='text'
              id='newFlashCard'
              name='newFlashCard'
              autoComplete='off'
              placeholder='New flash card...'
              aria-label='New flash card'
              value={flashCardInput}
              maxLength={150}
              onChange={(e) => {setFlashCardInput(e.target.value)}}
            />
            <button
              type='submit'
              id='addFlashCardBtn'
              aria-label='add new flash card'
              disabled={selectOption ? false: true}
            >Add</button>
          </div>
        </form>
      </div>
    );
};

export default Dashboard;