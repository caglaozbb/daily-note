import { useState } from 'react'
import './App.css'
import NoteForm from './components/NoteForm'
import { useEffect } from 'react';

function App() {

  const [currentDate, setCurrentDate] = useState(new Date());
  console.log(currentDate);

  function getFormattedDate(date, dayOffset = 0) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + dayOffset);

    return newDate.toLocaleDateString([], {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  function goPreviousDay() {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth(), prevDate.getDate() - 1));
  }

  function goNextDay() {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth(), prevDate.getDate() + 1));
  }

  const today = getFormattedDate(currentDate);
  const yesterday = getFormattedDate(currentDate, -1);


  return (
    <>
      <div></div>
      <div className="profile-section">
        <img src="space.jpeg" alt="Profile" className="profile-pic" />
      </div>

      <div className="container">
        <div className="side ">
          <NoteForm id={getFormattedDate(currentDate, -1)}>{yesterday}</NoteForm>
          <div className="page-turn left-arrow" onClick={goPreviousDay}>&larr;</div>
        </div>

        <div className="side">
          <NoteForm id={getFormattedDate(currentDate)}>{today}</NoteForm>
          <div className="page-turn right-arrow" onClick={goNextDay} >&rarr;</div>
        </div>
      </div>
    </>
  )
}

export default App
