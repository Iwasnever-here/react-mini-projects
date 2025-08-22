import React, { useState } from 'react'

const TicTac = () => {

    // make array for grid 3x3 ? idk
    const [board, setBoard] = useState(Array(9).fill(null))
    const [xturn, setXturn] = useState(true)
    // check positions
    // display x and o s
    const [pic, setPic] = useState('')

    const winner = calcWinner(board);

    function handleClick (i) {
        if (board[i] || winner) return;
        const newBoard = board.slice()
        newBoard[i] = xturn ? 'x' : 'o'
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

                                                               
  return (
    <div >
    <div className='max-w-200 m-10 mx-auto'>
      <div className="grid grid-cols-3 gap-2 text-6xl">
        {board.map((square, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="border border-solid aspect-square"
          >
            {square}
          </button>
        ))}
      </div>

      <div>
        <p>TURN IS {xturn ? 'x' : 'o'}</p>
        <p>RESTART</p>
        <p>WINNER IS {winner}</p>
        <p>PLAY AGAIN</p>
      </div>

      </div>
    </div>
  )
}

export default TicTac
