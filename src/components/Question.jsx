import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Answer from "./Answer.jsx"

export default function Question(props){
const answersElements = props.answers.map((answer) => {
        return(<Answer 
            key={nanoid()} 
            answerValue={answer} 
            question={props.question} 
            handleChange={props.handleChange}
            questionId={props.questionId}
            formData={props.formData}
            isFinalScoreShown={props.isFinalScoreShown}
            correctAnswer={props.correctAnswer}
        />)
    })

    return(
        <>
            <h2 className="questions--header">{props.question}</h2>
            {answersElements}
            <hr/>
        </>
    )
}