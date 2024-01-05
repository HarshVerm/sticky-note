import { useState } from "react";
import "./App.css";
import StickyNote from "./Components/StickyNote";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [stickyNotes, setStickyNotes] = useState([]);

  const handelAddNewNote = () => {
    const id = uuidv4();
    const newNote = {
      id,
      edit: true,
      note: "",
    };

    setStickyNotes((prevSate) => [...prevSate, newNote]);
  };

  const handleSave = (id, message) => {
    const updatedNotes = stickyNotes.map((note) => {
      if (id === note.id) {
        return {
          ...note,
          note: message,
          edit: false,
        };
      }
      return note;
    });
    setStickyNotes(updatedNotes);
  };

  const handeEditNote = (id) => {
    const updatedNotes = stickyNotes.map((note) => {
      if (id === note.id) {
        return {
          ...note,
          edit: true,
        };
      }
      return note;
    });
    setStickyNotes(updatedNotes);
  };

  const dropNote = (event) => {
    event.target.style.left = `${event.pageX - 50}px`;
    event.target.style.top = `${event.pageY - 50}px`;
  };

  const dragOver = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const handleDeleteNote = (id) => {
    setStickyNotes((prevSate) => prevSate.filter((note) => note.id !== id));
  };

  return (
    <div className="App h-screen bg-yellow-700 ">
      <div className="flex justify-end px-3 py-4">
        <button
          className="text-2xl font-bold bg-slate-300 px-5 py-3 z-50 "
          onClick={handelAddNewNote}
        >
          +
        </button>
      </div>
      <div>
        {stickyNotes.map((note, index) => (
          <StickyNote
            key={note.id}
            stickyNote={note}
            handleSave={handleSave}
            handeEditNote={handeEditNote}
            dropNote={dropNote}
            dragOver={dragOver}
            handleDeleteNote={handleDeleteNote}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
