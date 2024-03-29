import React from 'react';
import TopicCard from './TopicCard';
import Select from 'react-select';
import style from './Board.module.scss';

const Board = ({
  setCurrTopic,
  currTopic,
  categories,
  handleDeleteCard,
  handleStatusChange,
  handleSave,
  handleDeleteCategory,
  selectOption,
  setSelectOption
  }) => {

    const flashCards = [];

    // populate flash cards for selected category
    if (selectOption) {
      // iterate through categories to find selection
      for (const category of categories) {
        // category selection is found
        if (category.category === selectOption.value) {
          // iterate through topics to populate flash cards
          for (const topic of category.topics) {
            flashCards.push(
              <TopicCard
                key={topic._id}
                topic={topic}
                setCurrTopic={setCurrTopic}
                currTopic={currTopic}
                handleDeleteCard={handleDeleteCard}
                handleStatusChange={handleStatusChange}
                handleSave={handleSave}
              />
            );
          }
        }
      }
    }

    // populate options for Select element
    const options = categories.map(category => {
        return {
          value: category.category,
          label: category.category
        }
    });

    return (
      <div className={style.board}>
        <Select
          className={style.selector}
          value={selectOption}
          options={options}
          aria-label='Select a category'
          placeholder='Select Category...'
          onChange={option => {
            setSelectOption(option);
          }}
          styles={{
            control: (styles, state) => ({
              ...styles,
              backgroundColor: 'rgb(240, 240, 240)',
            }),
            option: (styles, state) => ({
              ...styles,
              backgroundColor: state.isFocused ? 'rgb(120, 120, 120)'
                : state.isSelected ? 'rgb(30, 30, 30)'
                : 'rgb(240, 240, 240)',
              color: state.isFocused ? 'rgb(240, 240, 240)'
                : state.isSelected ? 'rgb(240, 240, 240)'
                : 'rgb(0, 0, 0)',
            })
          }}
        />
        <div className={style.cards}>
          {flashCards}
        </div>
        {selectOption && 
          <button className={style.delete} onClick={handleDeleteCategory}>
            Delete Category
          </button>
        }
      </div>
    );
};

export default Board;