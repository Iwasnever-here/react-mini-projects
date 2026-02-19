import { useEffect, useState, useRef } from 'react'

import Note from './Note'

function uid() {
  return crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random());
}

function App() {
  const [notes, setNotes] = useState([]);
  const boardRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [draftText, setDraftText] = useState('');

  const [placingNote, setPlacingNote] = useState(null); 
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 }); 

  useEffect(() => {
    function onMove(e) {
      setCursorPos({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  function addText() {
    setDraftText('');
    setIsOpen(true);
  }

  function startPlacing() {
    const text = draftText.trim();
    if (!text) return;

    setIsOpen(false);
    setDraftText('');

    setPlacingNote({
      id: uid(),
      text,
      rotation: Math.random() * 6 - 3,
    });
  }

  function placeOnBoard(e) {
    if (!placingNote) return;

    const board = boardRef.current;
    if (!board) return;

    const rect = board.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const finalNote = {
      ...placingNote,
      x: x + 30,
      y: y + 30,
    };

    setNotes((prev) => [...prev, finalNote]);
    setPlacingNote(null);
  }

  return (
    <>
      <div className='frame bg-gray-900 p-6 h-screen relative'>
        <div
          className="bg-[url('/cork.png')] bg-cover h-full shadow-gray-800 shadow-lg"
          ref={boardRef}
          onClick={placeOnBoard}
        >
          {notes.map((n) => (
            <Note key={n.id} note={n} />
          ))}
        </div>

        {placingNote && (
          <div
            className="pointer-events-none fixed z-50"
            style={{
              left: cursorPos.x,
              top: cursorPos.y,
              transform: `rotate(${placingNote.rotation}deg)`,
              opacity: 0.85,
            }}
          >
            <div className="w-40 aspect-square bg-yellow-200 p-4 shadow-lg text-center">
              <div className="whitespace-pre-wrap text-sm text-gray-900">
                {placingNote.text}
              </div>
              <div className="mt-2 text-xs text-gray-600">Click to place</div>
            </div>
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation(); 
            addText();
          }}
          className='rounded-full h-20 aspect-square bg-yellow-200 text-5xl absolute right-5 bottom-5'
        >
          +
        </button>

        {isOpen && (
          <div
            className="absolute inset-0 bg-black/60 flex items-center justify-center"
          >
            <div
        
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-lg font-semibold">New sticky note</div>

              <textarea
                className="mt-3 w-80 aspect-square bg-yellow-200 border border-gray-200 p-3 outline-none shadow-lg"
                rows={10}
                placeholder="Type your note..."
                value={draftText}
                onChange={(e) => setDraftText(e.target.value)}
              />

              <div className="mt-4 flex items-center justify-end gap-2">
                
                <button
                  className="rounded-xl px-4 py-2 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}  
                >
                  Cancel
                </button>
                
                <button
                  className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  onClick={startPlacing}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default App
