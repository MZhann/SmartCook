import {useState} from 'react';
import Image from "next/image";
import win from "@/../public/images/win.jpg";
import loss from "@/../public/images/over.jpg";
import { incrementTokenCount } from "../utils/token";



const DynamicQuiz = ({setIsQuizStarted, isQuizStarted}) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [attemptsRemaining, setAttemptsRemaining] = useState(3);
    const [errorMessage, setErrorMessage] = useState('');
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);

    const questions = [{
        question: 'What is the capital of France?',
        options: ['Paris', 'London', 'Berlin', 'Rome', 'Madrid'],
        correctAnswer: 'Paris'
    }, {
        question: 'Who painted the Mona Lisa?',
        options: ['Pablo Picasso', 'Vincent van Gogh', 'Leonardo da Vinci', 'Michelangelo', 'Claude Monet'],
        correctAnswer: 'Leonardo da Vinci'
    }, {
        question: 'Which planet is known as the Red Planet?',
        options: ['Earth', 'Mars', 'Venus', 'Jupiter', 'Saturn'],
        correctAnswer: 'Mars'
    }, {
        question: 'Who wrote the play "Romeo and Juliet"?',
        options: ['William Shakespeare', 'Jane Austen', 'Charles Dickens', 'Mark Twain', 'F. Scott Fitzgerald'],
        correctAnswer: 'William Shakespeare'
    }, {
        question: 'What is the tallest mountain in the world?',
        options: ['Mount Everest', 'K2', 'Kangchenjunga', 'Lhotse', 'Makalu'],
        correctAnswer: 'Mount Everest'
    }];

    const checkAnswer = (selectedOption) => {
        const currentQuestion = questions[currentQuestionIndex];
        if (!currentQuestion) return;

        if (selectedOption === currentQuestion.correctAnswer) {
            if (currentQuestionIndex === questions.length - 1) {
                setQuizCompleted(true);
                incrementTokenCount();

            } else {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setAttemptsRemaining(3);
                setErrorMessage('');
            }
            setCorrectCount(prevCount => prevCount + 1);
            return 'Correct!';
        } else {
            setAttemptsRemaining(attemptsRemaining - 1);
            if (attemptsRemaining === 1) {
                setCurrentQuestionIndex(null);
                setErrorMessage('');
                return 'Incorrect. You lost! Start again.';
            } else {
                setErrorMessage(`Incorrect answer. ${attemptsRemaining - 1} attempts remaining.`);
                return 'Incorrect. Please try again.';
            }
        }
    };

    const loadNextQuestion = () => {
        const currentQuestion = questions[currentQuestionIndex];
        if (!currentQuestion) return;
        return (
            <>
                <h2 className="text-2xl mb-4 items-center">Question {currentQuestionIndex + 1}: <span
                    className={'text-red-600 text-sm mb-3'}>{errorMessage}</span></h2>
                <p className="mb-4">{currentQuestion.question}</p>
                <div className="flex flex-col gap-4 ">
                    {currentQuestion.options.map((option) => (
                        <button
                            key={option}
                            className="w-36 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                            onClick={() => console.log(checkAnswer(option))}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </>);
    };

    const resetQuiz = () => {
        setCorrectCount(0);
        setCurrentQuestionIndex(0);
        setAttemptsRemaining(3);
        setQuizCompleted(false);
    };

    return (
        isQuizStarted &&
        <div className={`w-[500px] flex-col p-4 mt-14 flex justify-around bg-white rounded-3xl`}>
            <div className={'flex justify-center w-full relative'}>
                {!quizCompleted && <h1 className={`flex justify-center text-black text-xl mb-3`}>Quiz game</h1>}
                <div  className={'absolute top-0 right-2 cursor-pointer'} onClick={() => setIsQuizStarted(false)}>
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M19.7806 18.7194C19.8502 18.7891 19.9055 18.8718 19.9432 18.9629C19.9809 19.0539 20.0003 19.1515 20.0003 19.2501C20.0003 19.3486 19.9809 19.4462 19.9432 19.5372C19.9055 19.6283 19.8502 19.711 19.7806 19.7807C19.7109 19.8504 19.6281 19.9056 19.5371 19.9433C19.4461 19.9811 19.3485 20.0005 19.2499 20.0005C19.1514 20.0005 19.0538 19.9811 18.9628 19.9433C18.8717 19.9056 18.789 19.8504 18.7193 19.7807L12.4999 13.5604L6.28055 19.7807C6.13982 19.9214 5.94895 20.0005 5.74993 20.0005C5.55091 20.0005 5.36003 19.9214 5.2193 19.7807C5.07857 19.6399 4.99951 19.4491 4.99951 19.2501C4.99951 19.051 5.07857 18.8602 5.2193 18.7194L11.4396 12.5001L5.2193 6.28068C5.07857 6.13995 4.99951 5.94907 4.99951 5.75005C4.99951 5.55103 5.07857 5.36016 5.2193 5.21943C5.36003 5.0787 5.55091 4.99963 5.74993 4.99963C5.94895 4.99963 6.13982 5.0787 6.28055 5.21943L12.4999 11.4397L18.7193 5.21943C18.86 5.0787 19.0509 4.99963 19.2499 4.99963C19.449 4.99963 19.6398 5.0787 19.7806 5.21943C19.9213 5.36016 20.0003 5.55103 20.0003 5.75005C20.0003 5.94907 19.9213 6.13995 19.7806 6.28068L13.5602 12.5001L19.7806 18.7194Z"
                            fill="#222222"/>
                    </svg>
                </div>
            </div>
            <div className={'h-[90%] p-6 flex-col justify-center '}>
                {quizCompleted ? (
                    <div className={'flex flex-col gap-5 w-full h-[350px] justify-center items-center text-center'}>
                        <Image className={'flex justify-center'} src={win} width={150} height={150} alt={'win'}/>
                        <h1 className={'text-2xl'}>Congratulations!</h1>
                        <p>You have won <span className={'text-[#80CC2D]'}>+1 chance</span> for additional recipe
                            generation! Use it when you&apos;re ready.</p>
                    </div>
                ) : (loadNextQuestion())}
                {currentQuestionIndex === null && (
                    <div className={'flex flex-col gap-5 w-full h-[350px] justify-center items-center text-center'}>
                        <Image className={'flex justify-center'} src={loss} width={150} height={150} alt={'loss'}/>
                        <h1 className={'text-2xl'}>{correctCount}/5 correct answers</h1>
                        <p>Try again for an additional attempt!</p>
                        <button
                            className="flex justify-center items-center mt-10 px-4 py-2 bg-[#AAE06E] cursor-pointer rounded-full text-white hover:bg-green-400"
                            onClick={resetQuiz}
                        >
                            Start Again
                        </button>
                    </div>
                    )}
                </div>
                    </div>
                    );
                };

                export default DynamicQuiz;
