import React from 'react';
import Topic from './Topic';

const Board = ({ topics, setCurrTopic, currTopic }) => {
  const topicsArray = [];
  
  for (const topicId in topics) {
    topicsArray.push(
      <Topic 
        topicObj={topics[topicId]}
        setCurrTopic={setCurrTopic}
        currTopic={currTopic}
        key={topicId}
        id={topicId}
      />
    );
  }

  return (
    <div className='board'>
      {topicsArray}
    </div>
  );
};
export default Board;