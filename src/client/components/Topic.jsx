import React from 'react';

const Topic = ({ topicObj, id, setCurrTopic, currTopic }) => {
  return (
    <button className={'topic ' + (topicObj.done ? 'done ' : '') + (currTopic === id ? 'selected' : '')} onClick={() => {setCurrTopic(id)}}>
      {topicObj.topic}
    </button>
  )
};

export default Topic;