import React from "react";
import Answer from "./Answer";
import Difficulty from './Difficulty';

const Question = ({ question, nextQuestion, questionLength, handleAnswerClick }) => {

	return (
		<>
			<div className="header">
				<span className="header_title">Question {question.id} of {questionLength}</span>
				<br />
				<span className="header_category">{unescape(question.category)}</span>
				<br />
				<Difficulty
					difficulty={question.difficulty}
				/>
			</div>
			<div className="questions">
				<span className="questions_question">{unescape(question.question)}</span>
				<Answer
					question={question}
					correctAnswer={question.correct_answer}
					answers={question.incorrect_answers}
					nextQuestion={nextQuestion}
					questionLength={questionLength}
					handleAnswerClick={handleAnswerClick}
				/>
			</div>
		</>
	);
}

export default Question;