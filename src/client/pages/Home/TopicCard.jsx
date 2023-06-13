import React from 'react';
import { FaTimes } from 'react-icons/fa';

const TopicCard = ({
  topicObj,
  setTopicInput,
  setAnswerText,
  setCurrTopic,
  currTopic
  }) => {
  
  let classes = 'topic';
  if (currTopic && currTopic.topic === topicObj.topic) {
    classes += ' currTopic';
  }

  if (topicObj.done) {
    classes += ' done';
  }

  const handleTopicSelect = (e) => {
    setCurrTopic(topicObj);
    setTopicInput(topicObj.topic);
    setAnswerText(topicObj.answer);
  };

  return (
    <button className={classes} onClick={handleTopicSelect}>
      {topicObj.topic}
    </button>
  )
};

export default TopicCard;