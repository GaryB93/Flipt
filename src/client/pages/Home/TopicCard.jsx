import React, { useState } from 'react';
import { FaArrowRight, FaArrowLeft, FaTimes, FaCheck } from 'react-icons/fa';

const TopicCard = ({
  topicObj,
  setCurrTopic,
  currTopic
  }) => {
    // used to determine which side of flash card is being viewed
    const [view, setView] = useState('front'); // 'front' or 'back'
    const string = topicObj.answer;
    const [answer, setAnswer] = useState(string);

    let classes = view;

    if (topicObj.done) {
      classes += ' done';
    }

    const handleTopicSelect = (e) => {
      setCurrTopic(topicObj);
    };

    if (view === 'front') {
      return (
        <div className={classes} onClick={handleTopicSelect}>
          <p>{topicObj.topic}</p>
          <div>
            <button ariaLabel='delete flash card' className='close'><FaTimes/></button>
            <button ariaLabel='flip card to back' onClick={() => {setView('back')}}><FaArrowRight/></button>
          </div>
        </div>
      )
    } else {
      return (
        <div className={classes} onClick={handleTopicSelect}>
          <textarea id='answer' name='answer' value={answer}
          onChange={(e) => {setAnswer(e.target.value)}}></textarea>
          <div>
            <button ariaLabel='flip card to front' onClick={() => {setView('front')}}><FaArrowLeft/></button>
            <button ariaLabel='change status of answer'><FaCheck/></button>
          </div>
        </div>
      )
    }
};

export default TopicCard;