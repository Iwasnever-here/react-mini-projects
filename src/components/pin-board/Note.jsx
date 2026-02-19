import React from 'react'

const Note = ({note}) => {
  return (
    <div
       className="absolute bg-yellow-200 h-40 aspect-square text-center shadow-lg"
       style={{ left: note.x, top: note.y, transform: `rotate(${note.rotation}deg)` }}>
       <div className="whitespace-pre-wrap text-sm text-gray-900">
        <div className="nail bg-[url('/pin.png')] bg-cover h-6 w-6 ml-[45%]"></div>
        {note.text}
        </div>
    </div>
  )
}

export default Note
