import React from 'react';
import TopicCard from './TopicCard';

const Board = ({
  currCategory,
  setTopicInput,
  setAnswerText,
  setCurrTopic,
  currTopic
  }) => {
  const topicsArray = [];

  if (currCategory) {
    for (const topicObj of currCategory.topics) {
      topicsArray.push(
        <TopicCard
          key={topicObj._id}
          topicObj={topicObj}
          setTopicInput={setTopicInput}
          setAnswerText={setAnswerText}
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