import React, { useState } from "react";

const StickyNote = ({
  stickyNote,
  handleSave,
  handeEditNote,
  dropNote,
  dragOver,
  handleDeleteNote,
}) => {
  const { id, edit, note } = stickyNote;
  const [message, setMessage] = useState(note);
  const [pinned, setPinned] = useState(false);

  const handleChangeNote = (e) => {
    setMessage(e.target.value);
  };

  const handleClickPin = () => {
    setPinned((prevSate) => !prevSate);
  };

  return (
    <div
      onDragOver={dragOver}
      onDragEnd={dropNote}
      draggable={!pinned}
      className={`bg-yellow-300  px-1 w-52 min-h-56 top-4 left-5 absolute pb-1 `}
      style={{ zIndex: pinned ? "1000" : 0 }}
    >
      <div className="flex justify-between">
        <div onClick={handleClickPin} className="bg-slate-200 w-max py-1 px-2">
          {pinned ? "Pinned" : "Pin"}
        </div>
        <div
          onClick={() => handleDeleteNote(id)}
          className="bg-slate-200 w-max py-1 px-2"
        >
          X
        </div>
      </div>
      {edit ? (
        <div>
          <textarea
            value={message}
            rows={6}
            onChange={handleChangeNote}
            className="w-[200px] bg-transparent mt-1 "
          />
          <button
            onClick={() => {
              handleSave(id, message);
            }}
            className="bg-slate-200 px-2 py-1 "
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex flex-col justify-between note">
          <div className="min-h-44" onClick={() => handeEditNote(id)}>
            {note}
          </div>
        </div>
      )}
    </div>
  );
};

export default StickyNote;
