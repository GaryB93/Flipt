import React from 'react';
import { FaPlus, FaThumbsUp, FaThumbsDown, FaSave } from 'react-icons/fa';

const Dashboard = ({ 
  setNewTopic,
  handleAdd,
  setAnswerView,
  answerView,
  handleChangeStatus,
  handleSave
}) => {
  return (
    <div className='dashboard'>
      <div>
        <input type='text' id='newTopic' placeholder='New topic...'
          onChange={(e) => {setNewTopic(e.target.value)}} />
        <button type='button' id='addTopicBtn' 
          onClick={handleAdd}><FaPlus/></button>
      </div>
      <textarea id='answerView' value={answerView}
        onChange={(e) => {setAnswerView(e.target.value)}}></textarea>
      <div>
        <button type='button' id='saveAnswerBtn'
          onClick={handleSave}><FaSave/></button>
        <button type='button' id='changeStatusBtn'
          onClick={handleChangeStatus}><FaThumbsUp/>  /  <FaThumbsDown/></button>
      </div>
    </div>
  );
};

export default Dashboard;