import { useState } from 'react';

const DynamicQuiz = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [attemptsRemaining, setAttemptsRemaining] = useState(3);
    const [errorMessage, setErrorMessage] = useState('');
    const [quizCompleted, setQuizCompleted] = useState(false);

    const questions = [
        {
            question: 'What is the capital of France?',
            options: ['Paris', 'London', 'Berlin', 'Rome', 'Madrid'],
            correctAnswer: 'Paris'
        },
        {
            question: 'Who painted the Mona Lisa?',
            options: ['Pablo Picasso', 'Vincent van Gogh', 'Leonardo da Vinci', 'Michelangelo', 'Claude Monet'],
            correctAnswer: 'Leonardo da Vinci'
        },
        {
            question: 'Which planet is known as the Red Planet?',
            options: ['Earth', 'Mars', 'Venus', 'Jupiter', 'Saturn'],
            correctAnswer: 'Mars'
        },
        {
            question: 'Who wrote the play "Romeo and Juliet"?',
            options: ['William Shakespeare', 'Jane Austen', 'Charles Dickens', 'Mark Twain', 'F. Scott Fitzgerald'],
            correctAnswer: 'William Shakespeare'
        },
        {
            question: 'What is the tallest mountain in the world?',
            options: ['Mount Everest', 'K2', 'Kangchenjunga', 'Lhotse', 'Makalu'],
            correctAnswer: 'Mount Everest'
        }
    ];

    const checkAnswer = (selectedOption) => {
        const currentQuestion = questions[currentQuestionIndex];
        if (!currentQuestion) return;

        if (selectedOption === currentQuestion.correctAnswer) {
            if (currentQuestionIndex === questions.length - 1) {
                setQuizCompleted(true);
            } else {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setAttemptsRemaining(3);
                setErrorMessage('');
            }
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
                <h2 className="text-2xl mb-4">Question {currentQuestionIndex + 1}:</h2>
                <p className="mb-4">{currentQuestion.question}</p>
                {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                <div className="flex flex-wrap gap-4">
                    {currentQuestion.options.map((option) => (
                        <button
                            key={option}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                            onClick={() => console.log(checkAnswer(option))}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </>
        );
    };

    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setAttemptsRemaining(3);
        setQuizCompleted(false);
    };

    return (
        <div className="container mx-auto p-4">
            {quizCompleted ? (
                <div>
                    <p className="text-green-500 mb-4">Congratulations! You've completed the quiz.</p>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                        onClick={resetQuiz}
                    >
                        Start Again
                    </button>
                </div>
            ) : (
                loadNextQuestion()
            )}
            {currentQuestionIndex === null && (
                <div>
                    <p className="text-red-500 mb-4">You lost! Start again.</p>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                        onClick={resetQuiz}
                    >
                        Start Again
                    </button>
                </div>
            )}
        </div>
    );
};

export default DynamicQuiz;
