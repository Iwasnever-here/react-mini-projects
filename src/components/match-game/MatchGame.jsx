import { useEffect, useState } from "react";
import "./MatchGame.css";

const MatchGame = () => {
  const [cards] = useState(
    [
      { id: 1, img: "x" },
      { id: 2, img: "x" },
      { id: 3, img: "y" },
      { id: 4, img: "y" },
      { id: 5, img: "d" },
      { id: 6, img: "d" },
      { id: 7, img: "h" },
      { id: 8, img: "h" },
      { id: 9, img: "i" },
      { id: 10, img: "i" },
      { id: 11, img: "l" },
      { id: 12, img: "l" },
    ].sort(() => Math.random() - 0.5)
  );

  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [lives, setLives] = useState(4);

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

  return (
    <div className="h-screen content-center text-center">
      <div>Lives: {lives}</div>
      <div>Moves: {moves}</div>

      <div className="grid grid-cols-4 gap-4 max-w-200 m-20 lg:mx-auto">
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
                    {card.img}
                    </div>
                </div>
                </div>

          );
        })}
      </div>
    </div>
  );
};

export default MatchGame;
