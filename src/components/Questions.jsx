import { useState, useEffect } from 'react'
import { decode } from 'html-entities'
import { nanoid } from 'nanoid'
import Question from "./Question.jsx"

export default function Questions(props){

    const [triviaData, setTriviaData] = useState([])
    const [isFinalScoreShown, setIsFinalScoreShown] = useState(false)
    const [correctAnswers, setCorrectAnswers] = useState(0)
    const [formData, setFormData] = useState([
        {questionId: 0, answer: "", isCorrect: false},
        {questionId: 1, answer: "", isCorrect: false},
        {questionId: 2, answer: "", isCorrect: false},
        {questionId: 3, answer: "", isCorrect: false},
        {questionId: 4, answer: "", isCorrect: false}
    ])

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
        .then(res => res.json())
        .then(data => {
            const shuffledData = data.results.map(item => {
                const { correct_answer, incorrect_answers } = item
                const decodedIncorrectAnswers = incorrect_answers.map(answer => decode(answer))

                const answersArray = [decode(correct_answer), ...decodedIncorrectAnswers]
                answersArray.sort(() => Math.random() - 0.5)

                return {
                    ...item,
                    correct_answer: decode(correct_answer),
                    incorrect_answers: decodedIncorrectAnswers,
                    answers: answersArray
                }
            })
            setTriviaData(shuffledData)
            
        })
    }, [])

    function handleChange(event){
        const {name, value} = event.target
        const questionId = parseInt(name)

        setFormData(prevFormData => prevFormData.map(item => {
            return item.questionId === questionId ? {...item, answer: value} : item
        }))
    }

    function checkAnswers(event){
        event.preventDefault()
        setIsFinalScoreShown(prevState => !prevState)
        
        triviaData.map((question, index) => {
            const correctAnswerTrivia = question.correct_answer
            const answerGiven = formData[index].answer

            if(answerGiven === correctAnswerTrivia){
                setCorrectAnswers(prevCount => prevCount + 1)
                setFormData(prevFormData => {
                    const updatedFormData = [...prevFormData]
                    updatedFormData[index] = { ...updatedFormData[index], isCorrect: true }
                    return updatedFormData
                })
            }
        })
    }

    const inputElements = triviaData.map((item, index) => {
        return(<Question 
            key={nanoid()}
            questionId={index}
            question={decode(item.question)}
            answers={item.answers}
            correctAnswer={item.correct_answer} 
            handleChange={handleChange}
            formData={formData}
            isFinalScoreShown={isFinalScoreShown}
        />)
    })

    return(
        <section className="questions--container">
            <form>
                {inputElements}
                <div className="flex--container">
                    {isFinalScoreShown && <p className="questions--final_score">You scored {correctAnswers}/5 correct answers</p>}
                    {!isFinalScoreShown && <button className="questions--button" onClick={checkAnswers}>Check answers</button>}
                    {isFinalScoreShown && <button className="questions--button" onClick={props.toggleStart}>Play again</button>}
                </div>
            </form>
        </section>
    )
}