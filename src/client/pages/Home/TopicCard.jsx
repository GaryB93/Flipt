import React, { useState } from 'react';
import { FaArrowRight, FaArrowLeft, FaTimes, FaCheck } from 'react-icons/fa';
import style from './TopicCard.module.scss';

const TopicCard = ({
  topicObj,
  setCurrTopic,
  currTopic
  }) => {
    // used to determine which side of flash card is being viewed
    const [view, setView] = useState('front'); // 'front' or 'back'
    const string = topicObj.answer;
    const [answer, setAnswer] = useState(string);

    const handleTopicSelect = (e) => {
      setCurrTopic(topicObj);
    };

    if (view === 'front') {
      return (
        <div className={`${style.front} ${topicObj.done && style.done}`} onClick={handleTopicSelect}>
          <p>{topicObj.topic}</p>
          <div>
            <button aria-label='delete flash card' className={style.close}><FaTimes/></button>
            <button aria-label='flip card to back' onClick={() => {setView('back')}}><FaArrowRight/></button>
          </div>
        </div>
      )
    } else {
      return (
        <div className={`${style.back} ${topicObj.done && style.done}`} onClick={handleTopicSelect}>
          <textarea id='answer' name='answer' value={answer} maxRows={-1}
          onChange={(e) => {setAnswer(e.target.value)}}></textarea>
          <div>
            <button aria-label='flip card to front' onClick={() => {setView('front')}}><FaArrowLeft/></button>
            <button aria-label='change status of answer'><FaCheck/></button>
          </div>
        </div>
      )
    }
};

export default TopicCard;