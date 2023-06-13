import React from 'react';
import { FaTimes } from 'react-icons/fa';

const Category = ({
  category,
  currCategory,
  handleSelectCategory,
  handleDeleteCategory
}) => {
  let classes = 'category';
  
  if (currCategory && currCategory.category === category.category) {
    classes = 'current category'
  }

  return (
    <div className={classes}>
      <button type='button' onClick={(e) => {handleSelectCategory(category)}}>
        {category.category}
      </button>
      <button type='button' onClick={(e) => {handleDeleteCategory(category)}}>
        <FaTimes/>
      </button>
    </div>
  )
};

export default Category;