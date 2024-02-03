import { useState } from 'react'
import './App.css'
import NoteForm from './components/NoteForm'
import { useEffect } from 'react';
import Header from './components/Header';

function App() {

  const [currentDate, setCurrentDate] = useState(new Date());

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

  useEffect(() => {
    const onKeyUp = (e) => {
      switch (e.keyCode) {
        case 37:
          goPreviousDay()
          break;
        case 39:
          goNextDay()
          break;
      }
    }
    document.addEventListener("keyup", onKeyUp)

    return () => document.removeEventListener("keyup", onKeyUp)
  }, [])


  return (
    <main>
      <Header />

      <div className="container">
        <div className="side ">
          <NoteForm id={getFormattedDate(currentDate, -1)}>{yesterday}</NoteForm>
        </div>

        <div className="side">
          <NoteForm id={getFormattedDate(currentDate)}>{today}</NoteForm>
        </div>
      </div>

      <div className="page-turn">
        <div onClick={goPreviousDay}>&larr;</div>
        <div onClick={goNextDay} >&rarr;</div>
      </div>
    </main>
  )
}

export default App
