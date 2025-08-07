import React, { useState, useEffect } from 'react'
import './HangMan.css';


const HangMan = () => {
    const alphabet = Array.from({length: 26}, (_, i) =>
    String.fromCharCode(65+i))

    const words = ['JAVASCRIPT', 'PYTHON', 'KEYBOARD', 'DEVELOPER', 'COMPUTER', 'SOFTWARE', 'VARIABLE', 'FUNCTION', 'DEBUGGING', 'COMPONENT']
    const [wordSelected, setWordSelected] = useState('');
    const [chosen, setChosen] = useState([])
    const [clickedLetters, setClickedLetters] = useState([]);
    const [lives, setLives] = useState(10)
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false)

       useEffect (() => {
        if (lives == 0){
            setGameOver(true)
        }
         },[lives])

         useEffect(() => {
            if (wordSelected && wordSelected.split('').every((char)=>chosen.includes(char))){
                setGameWon(true)
            }
         }, [chosen, wordSelected])

         const resetGame = () => {
                const randomWord = words[(Math.floor(Math.random()*words.length))]
                setWordSelected(randomWord)
                setChosen([])
                setClickedLetters([])
                setLives(10)
                setGameOver(false)
                setGameWon(false)
         }


    useEffect(() =>{
      const randomWord = words[(Math.floor(Math.random()*words.length))]
      setWordSelected(randomWord)
    },[])

    const DealWithWords = (character) => {

    if (clickedLetters.includes(character)) return;

    
    setClickedLetters((prev) => [...prev, character]);

    // .includes is javascript version of in - avoid loop
    if (wordSelected.includes(character)) {
        setChosen((prev) => [...prev, character]);
    } else {
        setLives((prevLives) => prevLives - 1);
    }
    };


    

  return (
  <div className='bg-outerspace min-h-screen pb-60 text-white'>
    {gameOver ? (
      // game over
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-4xl font-bold mb-4">💀 YOU FAILED!</h1>
        <p className="text-lg mb-6">THE WORD WAS: <strong>{wordSelected}</strong></p>
        <button
          onClick={resetGame}
          className="hover:bg-blueyonder bg-almond hover:text-white text-outerspace font-bold py-2 px-6 rounded"
        >
          Play Again
        </button>
      </div>
    ) : gameWon ? (
      // game won
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-4xl font-bold mb-4">🎉 YOU GUESSED IT!</h1>
        <p className="text-lg mb-6">THE WORD WAS: <strong>{wordSelected}</strong></p>
        <button
          onClick={resetGame}
          className="hover:bg-blueyonder bg-almond hover:text-white text-outerspace font-bold py-2 px-6 rounded"
        >
          Play Again
        </button>
      </div>
    ) : (
      // game screen
      <div className='bg-outerspace pb-20 pt-10'>
      <div>
        <div className='flex justify-center'>
        <div className='h-100 w-70 '>
            <img src = {`./hangman${lives}.png`}
            className='"w-full h-full object-contain mx-auto'></img>

        </div>
    </div>
        <div>
            <ul className='flex gap-3 justify-center m-16'>
                {wordSelected.split('').map((character, index) => (
            <li
              key={index}
              className='word-tile'
            >{chosen.includes(character) ? character : ' '}</li>
          ))}
            </ul>
        </div>

        <div className='ml-40 mr-30 xl:ml-100 xl:mr-90'>
            <ul className='letter-grid'>
                {alphabet.map((character) => (
            <li
              key={character}
              className={`letter-tile ${clickedLetters.includes(character) ? ' picked' : ''}`}
              onClick={()=> DealWithWords(character)}
            >{character}</li>
          ))}
            </ul>
        </div>

      </div>
    </div>
    )}
  </div>
);

}

export default HangMan
