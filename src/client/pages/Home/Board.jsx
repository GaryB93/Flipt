import React from 'react';
import TopicCard from './TopicCard';
import Select from 'react-select';
import style from './Board.module.scss';

const Board = ({
  currCategory,
  setCurrTopic,
  currTopic,
  categories,
  handleSelectCategory
  }) => {
    const topicsArray = [];

    if (currCategory) {
      for (const topicObj of currCategory.topics) {
        topicsArray.push(
          <TopicCard
            key={topicObj._id}
            topicObj={topicObj}
            setCurrTopic={setCurrTopic}
            currTopic={currTopic}
          />);
      }
    }

    const options = categories.map(category => {
      return {
        value: category.category,
        label: category.category
      }
    });

    return (
      <div className={style.board}>
        <Select id={style.categories} onChange={handleSelectCategory}
          options={options} aria-label='Select a category'/>
        <div className={style.cards}>
          {topicsArray}
        </div>
        <button className={style.delete}>Delete Category</button>
      </div>
    );
};

export default Board;