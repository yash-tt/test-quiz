import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

const Answer = ({ question, correctAnswer, answers, nextQuestion, questionLength, handleAnswerClick }) => {

    const [givenAnswer, setGivenAnswer] = useState('');
    const [answerOptions, setAnswers] = useState([...answers])
    const [isCorrect, setIsCorrect] = useState(null);

    useEffect(() => {
        const randomNumber = Math.floor(Math.random() * 4) + 0;
        answers.splice(randomNumber, 0, correctAnswer);
        setAnswers(answers);
    }, [answers, correctAnswer]);

    /**
     * perform Action when User selects correct/incorrect answer
     * @param {*} answer user selected answer 
     */
    const handleAnswer = (answer) => {
        setIsCorrect(answer === correctAnswer)
        setGivenAnswer(answer);
        handleAnswerClick(question.id, answer === correctAnswer);
    }

    /**
     * Go to next question
     */
    const gotoNext = () => {
        if (givenAnswer) {
            nextQuestion(question.id)
        }
    }

    return (
        <>
            <div className={classNames('questions_answer',
                { 'no-pointer-events': (isCorrect !== null) }
            )}>
                {answerOptions.map(res => {
                    return (
                        <div key={res}
                            className={classNames('multiple',
                                { 'userOnClick': (givenAnswer === correctAnswer && givenAnswer === res) || (givenAnswer === res) },
                                { 'incorrect': isCorrect },
                                { 'selectedIncorrectAnswer': (givenAnswer !== res && isCorrect !== null) },
                                { 'alwaysShowCorrectAnswer': (correctAnswer === res) }
                            )}
                            onClick={() => handleAnswer(res)}>
                            <span> {unescape(res)}</span>
                        </div>
                    )
                })}
            </div>
            <div className="next_button">
                <span className={classNames('correct')}>
                    {isCorrect ? 'Correct!' : (isCorrect === null) ? null : !isCorrect ? 'Sorry!' : ''}
                </span>
                <br />
                {question.id < questionLength &&
                    (<button onClick={() => gotoNext()}>
                        Next Question
                    </button>)
                }
            </div>
        </>
    );
}

export default Answer;