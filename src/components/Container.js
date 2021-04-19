import React, { useState } from 'react';
import questionData from '../utils/data.json';
import Question from './Question';
import MultiSlider, { Progress } from 'react-multi-bar-slider';

function Container() {
    const [question, setQuestion] = useState(questionData[0]);
    const [questionsAnswered, setQuestionsAnswered] = useState({});

    /**
     * Go to next question
     * @param {get question id} id 
     */
    const nextQuestion = (id) => {
        setQuestion(questionData[id]);
    }

    /**
     * Get data to process for Progress bar
     * @param {*} id get question id
     * @param {*} isCorrect Check if selected answer is correct or not
     */
    const handleAnswerClick = (id, isCorrect) => {
        setQuestionsAnswered({ ...questionsAnswered, [id]: isCorrect });
    }

    // Get Result (Progress bar)
    const bar1 = Math.floor((Object.values(questionsAnswered).filter(isCorrect => isCorrect).length / questionData.length) * 100);
    const bar2 = Math.floor((Object.values(questionsAnswered).filter(isCorrect => isCorrect).length / Object.keys(questionsAnswered).length) * 100);
    const bar3 = Math.floor(((Object.values(questionsAnswered).filter(isCorrect => isCorrect).length + (questionData.length - Object.keys(questionsAnswered).length)) / questionData.length) * 100);

    return (
        <>
            <div className="container">
                <MultiSlider readOnly>
                    <Progress height="20" color="#00BDAF" progress={((question.id / questionData.length) * 100)} />
                </MultiSlider>
                <div key={question.id} className="content">
                    <Question
                        nextQuestion={nextQuestion}
                        question={question}
                        questionLength={questionData.length}
                        handleAnswerClick={handleAnswerClick}
                    >
                    </Question>
                    <div className="footer">
                        <div className="d-flex j-c-sb">
                            <span className="font-bold">Score: {bar1}%</span>
                            <span className="font-bold">Max Score: {bar3}%</span>
                        </div>
                        <MultiSlider
                            equalColor={bar1 <= 50 ? 'red' : bar1 > 50 && bar1 <= 80 ? '#fab842' : 'green'}
                            readOnly
                        >
                            <Progress height="20" color="#000" progress={bar1} />
                            <Progress height="20" color="#717171" progress={bar2} />
                            <Progress height="20" color="#d2d2d2" progress={bar3} />
                        </MultiSlider>
                    </div>
                </div>
            </div>
        </ >
    )
}

export default Container;
