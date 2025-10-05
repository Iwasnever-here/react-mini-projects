import React, { useEffect, useState } from 'react';
import QuizText from './quiz.txt?raw';

const Quiz = () => {
  const [cards, setCards] = useState([]);
  const [allcards, setAllCards] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [correct, setCorrect] = useState(0)
  const [wrong, setWrong] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [quizFinished, setQuizFinished] = useState(false); 
  const [start, setStart] = useState(false)



  useEffect(() => {
    const splitText = (text) => {
      return text
        .split('~~')
        .map(row => row.trim())
        .filter(Boolean)
        .map(row => {
          const [question, answer] = row.split('||').map(s => s.trim());
          return { question, answer };
        });
    };

    const allCard = splitText(QuizText);
    const random20 = shuffleArray(allCard).slice(0, 20);
    setCards(random20);
    setAllCards(allCard)
  }, []);

  const startQuiz = () => {
    if (allcards.length === 0) return
    const random20 = shuffleArray(allcards).splice(0,20)

    setCards(random20)
    setCurrentIndex(0)
    setCorrect(0)
    setWrong(0)
    setSelectedOption(null)
    setQuizFinished(false)
  }

  useEffect(() => {
    if (allcards.length > 0 && cards.length === 0) startQuiz()
  }, [allcards])

  useEffect(() => {
    if (cards.length === 0 || quizFinished) return;

    const generateOptions = () => {
      const correctCard = cards[currentIndex];
      
      const decoys = shuffleArray(allcards.filter(c => c.question !== correctCard.question))
        .slice(0, 3)
        .map(card => card.question);

      const allOptions = shuffleArray([correctCard.question, ...decoys]);
      setOptions(allOptions);
    };
    generateOptions();
  }, [cards, currentIndex, quizFinished]);

  function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

 const handleClick = (question) => {
    if (selectedOption) return;
    setSelectedOption(question)

    if (question === cards[currentIndex].question){
        setCorrect(prev => prev +1)
    }else
        setWrong(prev => prev + 1)
    
    setTimeout(() => {
    if (currentIndex + 1 < cards.length){
        setCurrentIndex(prev => prev + 1)
        setSelectedOption(null);
    }else {
        setQuizFinished(true)
    }
    }, 500)
 }



  if (cards.length === 0) return <p>Loading...</p>;

  if (!start) {
    return (
      <div className='h-screen bg-neutral-800 content-center text-center text-white'>
        <div className='max-w-lg mx-auto border border-white p-10 '>
        <h1 className='text-2xl font-bold mb-4'>VOCABULARY QUIZ</h1>
        <p className='text-md my-5'>EACH ROUND IS 20 RANDOM WORD DEFINITIONS YOU HAVE TO SELECT RIGHT WORD</p>
        <button className='mt-6 px-4 py-2 bg-black text-white rounded hover:bg-neutral-900' onClick={() => setStart(true)}>start</button>
      </div>
      </div>
    )
  }

  if (quizFinished) {
    return (
      <div className="p-4 text-center content-center h-screen bg-neutral-800 text-white">
        <div className='max-w-lg mx-auto border border-white p-10 '>
        <h2 className="text-2xl font-bold mb-4">Quiz Finished!</h2>
        <p className="text-lg mb-2">Correct: {correct}</p>
        <p className="text-lg mb-2">Wrong: {wrong}</p>
        <p className="text-xl font-semibold mt-4">
          Score: {((correct / cards.length) * 100).toFixed(1)}%
        </p>
         <button
          className="mt-6 px-4 py-2 bg-black text-white rounded hover:bg-neutral-900"
          onClick={startQuiz}
        >
          Play Again
        </button>
        </div>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <div className='content-center h-screen bg-neutral-800'>
    <div className="p-10 max-w-[900px] mx-auto rounded-lg">
        <p className="mt-4 text-sm text-gray-400 text-center">
        Definition {currentIndex + 1} of {cards.length}
      </p>

      <div >
        <div className='rounded-lg m-3 p-3 mb-20 bg-white'>
        <p className="mb-4 text-xl"> {currentCard.answer}</p>
        </div>
        <div className="space-y-2">
          {options.map((question, idx) => {
            let bgColor = " bg-neutral-800";
            if (selectedOption) {
              if (question === currentCard.question) bgColor = "bg-green-300";
              else if (question === selectedOption) bgColor = "bg-red-300";
            }

            return (
              <button
                key={idx}
                className={`${bgColor} block w-full text-left text-white px-4 py-4 mb-6 border rounded-xl shadow shadow-sm shadow-white hover:shadow-md`}
                onClick={() => handleClick(question)}
                disabled={!!selectedOption}
              >
                {question}
              </button>
            );
          })}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Quiz;




