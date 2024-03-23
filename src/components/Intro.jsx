export default function Intro(props){
    return(
        <section className="intro--container">
            <h1 className="intro--heading">Quizzical</h1>
            <p className="intro--desc">Test your skills by answering questions on a wide range of topics.</p>
            <button className="intro--button" onClick={props.toggleStart}>Start quiz</button>
        </section>
    )
}