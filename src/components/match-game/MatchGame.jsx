import { useEffect, useState } from "react";
import "./MatchGame.css";

const MatchGame = () => {
  const [cards] = useState(
    [
      { id: 1, img: "./strawberry.png" },
      { id: 2, img: "./strawberry.png" },
      { id: 3, img: "./sprout.png" },
      { id: 4, img: "./sprout.png" },
      { id: 5, img: "./jam.png" },
      { id: 6, img: "./jam.png" },
      { id: 7, img: "./toast.png" },
      { id: 8, img: "./toast.png" },
      { id: 9, img: "./cake.png" },
      { id: 10, img: "./cake.png" },
      { id: 11, img: "./branch.png" },
      { id: 12, img: "./branch.png" },
    ].sort(() => Math.random() - 0.5)
  );

  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [lives, setLives] = useState(5);
  const [gameEnd, setGameEnd] = useState(false)
  const [gameWon, setGameWon] = useState(false)

  function clicked(card) {
    if (matched.some((m) => m.img === card.img)) return;
    if (selected.some((m) => m.id === card.id)) return;
    if (selected.length === 2) return;

    setSelected((prev) => [...prev, card]);
  }

  useEffect(() => {
    if (selected.length === 2) {
      if (selected[0].img === selected[1].img) {
        setMatched((prev) => [...prev, selected[0], selected[1]]);
      } else {
        setLives((l) => l - 1);
      }
      setMoves((m) => m + 1);

      setTimeout(() => setSelected([]), 1000);
    }
  }, [selected]);

  useEffect (() => {
    if (matched.length === 12){
      setGameWon(true)
    }
  }, [matched])

  useEffect(()=> {
    if (lives === 0){
      setGameEnd(true)
    }
  })

  function reset() {
    setGameEnd(false)
    setGameWon(false)
    setLives(5)
    setMoves(0)
    setSelected([])
    setMatched([])
  }

  if (gameWon) {
    return (
       <div className="h-screen bg-bananamania content-center text-center">
        <h1 className="text-4xl">GAME WON!</h1>
        <button 
        className=" cursor-pointer bg-carnationpink p-3 border-2 border-solid shadow-[4px_4px_0_0_#000] mt-5"
        onClick={() => reset()}>PLAY AGAIN</button>
      </div>
    )
  }

  if (gameEnd) {
    return (
      <div className="h-screen bg-bananamania content-center mx-auto  text-center">
        <h1 className="text-4xl">GAME LOST</h1>
        <button 
        className=" cursor-pointer bg-carnationpink p-3 border-2 border-solid shadow-[4px_4px_0_0_#000] mt-5"
        onClick={() => reset()}>PLAY AGAIN</button>
      </div>
    )
  }
  else 

  return (
    <div className="h-screen  flex items-center justify-center content-center text-center bg-carnationpink text-xl">
      <div className="sm:w-150 md:w-200 bg-bananamania p-6 border-2 shadow-[4px_4px_0_0_#000]">
      <div className="grid grid-cols-3 max-w-200  mb-10 gap-5 text-center ">
      <div className="bg-carnationpink p-3 border-2 border-solid shadow-[4px_4px_0_0_#000]">Lives: {lives}</div>
      <button onClick = {() => reset()}className="cursor-pointer bg-carnationpink p-3 border-2 border-solid shadow-[4px_4px_0_0_#000]"> RESTART</button>
      <div className="bg-carnationpink p-3 border-2 border-solid shadow-[4px_4px_0_0_#000]">Moves: {moves}</div>
      </div>
      <div className="grid grid-cols-4 gap-4 max-w-200   text-3xl">
        {cards.map((card) => {
          const isFlipped =
            selected.some((s) => s.id === card.id) ||
            matched.some((m) => m.id === card.id);

          return (
           <div
                key={card.id}
                className={`grid-card ${isFlipped ? "flipped" : ""}`}
                onClick={() => clicked(card)}
                >
                <div className="grid-card-inner">
                    <div className="grid-card-front">
                    ?
                    </div>
                    <div className="grid-card-back">
                    <img className= 'h-full w-full object-cover rounded-lg'src= {card.img}/>
                    </div>
                </div>
                </div>
          );
        })}
        </div>
      </div>
    </div>
  );
};

export default MatchGame;
