import React from 'react';
import TopicCard from './TopicCard';

const Board = ({
  currCategory,
  setCurrTopic,
  currTopic,
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

  return (
    <div className='board'>
      {topicsArray}
    </div>
  );
};

export default Board;