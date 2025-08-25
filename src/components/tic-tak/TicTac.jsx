import React, { useEffect, useState } from 'react'
import "./TicTac.css";

const TicTac = () => {

    // make array for grid 3x3 ? idk
    const [board, setBoard] = useState(Array(9).fill(null))
    const [xturn, setXturn] = useState(true)
    // check positions
    // display x and o s
    
    const [play, setPlay] = useState(false)
    const [end, setEnd] = useState(false)

    const winner = calcWinner(board);

    useEffect (() => {
      let allFilled = true;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          allFilled = false;
          break;
        }
      }

      if (allFilled || winner){
        const timer = setTimeout(() => {
          setEnd(true)
        
        }, 1000);
        return () => clearTimeout(timer)
        
      }

    }, [board])

    function handleClick (i) {
        if (board[i] || winner) return;
        const newBoard = board.slice()
        newBoard[i] = xturn ? './blueberry.png' : './butter.png'
        setBoard(newBoard)
        setXturn(!xturn)
    }

    function calcWinner(squares) {
        // all possible positions for win (3 in row)
        const lines = [
            [0,1,2], //top
            [3,4,5], //middle
            [6,7,8], //bottom
            [0,3,6], //left
            [1,4,7], //middle
            [2,5,8], //right
            [0,4,8], //diagonal top left -> bottom right
            [2,4,6]  //diagonal bottom left -> top right
        ]

        for (let [a,b,c] of lines) {
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
              return squares[a]

            }
        }
        return null;
    }

    function restart() {
      setBoard(Array(9).fill(null));
      setXturn(true);
      setEnd(false)
    }
            
    
  return (

    <div>
    {play && !end ? (
    <div className='text-center mt-5'>
       <p className='text-2xl text-brown mt-10'>TURN IS {xturn ? 'BLUEBERRY' : 'BUTTER'}</p>
    <div className='max-w-200 m-10 mx-auto'>
      <div className=' rounded rounded-full p-29 bg-copper border border-apricot border-9 mx-10'>
      <div className="grid grid-cols-3 gap-2 text-6xl bg-brown ">
        {board.map((square, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="border-solid aspect-square bg-copper cursor-pointer "
          >
            <img src ={square} />
          </button>
        ))}
      </div>
      </div>

      </div>
    </div>
  ) : end ? (
    <div className='h-screen content-center text-center bg-copper'>
    <p className='text-yellow-300 text-2xl'>{winner ? (winner === "./blueberry.png" ? "blueberry wins!" : "butter wins!") : "draw noone wins :("}</p>
    <div>
        <button
        onClick={() => restart()}
        className='text-4xl my-10 cursor-pointer bg-brown text-apricot p-8 rounded-full'
        >PLAY AGAIN</button>
      </div>
    </div>

  ) : (
      <div className='h-screen flex flex-col justify-center items-center text-center bg-copper'>
        <h1 className='text-yellow-200 text-7xl'>TIC TAC TOE</h1>
        <button onClick={() => setPlay(true)} 
          className='text-6xl my-10 cursor-pointer bg-brown text-apricot p-8 rounded-full'>play</button>
        <div className='flex items-center rounded-full p-1 gap-3'>
          <img src = './butter.png' className='h-30 '/>
          VS
          <img src = './blueberry.png' className='h-30 '/>
        </div>
        </div>
        )}
      </div>

  )}

export default TicTac
