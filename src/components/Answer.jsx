import { nanoid } from 'nanoid'
import { decode } from 'html-entities'
import { useState } from 'react'

export default function Answer(props){
    const id = nanoid()
    const isChecked = props.formData.some(item => item.questionId === props.questionId && item.answer === props.answerValue)
    const isIncorrect = isChecked && !isAnswerCorrect(props.formData, props.questionId)

    const styles = {
        ...(props.isFinalScoreShown && isIncorrect ? { backgroundColor: '#F8BCBC', opacity: 0.5 } : {}),
        ...(props.isFinalScoreShown && !isChecked && props.correctAnswer === props.answerValue ? { backgroundColor: '#94D7A2', border: "none" } : {}),
        ...(props.isFinalScoreShown && !isChecked && props.correctAnswer === !props.answerValue ? { opacity: 0.5 } : {}),
        ...(props.isFinalScoreShown ? { pointerEvents: "none" } : {})
    }

    function isAnswerCorrect(formData, questionId) {
        const correctAnswer = formData.find(item => item.questionId === questionId && item.isCorrect)
        return correctAnswer ? true : false
    }

    return(
        <>
            <input
                type="radio"
                id={id}
                name={props.questionId}
                value={props.answerValue}
                onChange={props.handleChange}
                checked={isChecked}
            />
            <label style={styles} htmlFor={id}>{props.answerValue}</label>
        </>
    )
}