import "./Quiz.scss";
import Header from "../Header/Header";
import React from "react";
import "./Quiz.scss";
import { v4 as uuidv4 } from "uuid";
import { handlePageScroll } from "../../utils/utilities";
import { GET_API_TRANSLATION } from "../../api/endpoints";
import { useState, useEffect } from "react";
import axios from "axios";

function QuizEasy() {
  // Hook states for questions and translations
  const [questionTranslated1, setQuestionTranslated1] = useState(
    "What does API stand for?"
  );
  const [questionTranslated2, setQuestionTranslated2] = useState(
    "Which of the following is true of Web APIs?"
  );
  const [questionTranslated3, setQuestionTranslated3] = useState(
    "Which method will convert JSON into a Javascript Object? "
  );
  const [questionTranslated4, setQuestionTranslated4] = useState(
    "Which statement about Asynchronous JavaScript is true?"
  );
  const [questionTranslated5, setQuestionTranslated5] = useState(
    "Which method will convert a Javascript Object into JSON?"
  );
  const [languageTranslated1, setLanguageTranslated1] = useState("");
  const [languageTranslated2, setLanguageTranslated2] = useState("");
  const [languageTranslated3, setLanguageTranslated3] = useState("");
  const [languageTranslated4, setLanguageTranslated4] = useState("");
  const [languageTranslated5, setLanguageTranslated5] = useState("");

  // function to call api for translation
  const getTranslationEasy = (language, question) =>
    axios.get(GET_API_TRANSLATION(language, question));

  // calling api and setting state translations for questions
  useEffect(() => {
    const translateQuestions = async () => {
      const response1 = await getTranslationEasy("yoda", questionTranslated1);
      const response2 = await getTranslationEasy(
        "dothraki",
        questionTranslated2
      );
      const response3 = await getTranslationEasy("chef", questionTranslated3);
      const response4 = await getTranslationEasy(
        "shakespeare",
        questionTranslated4
      );
      const response5 = await getTranslationEasy(
        "oldenglish",
        questionTranslated5
      );
      // set question translation
      setQuestionTranslated1(response1.data.contents.translated);
      setQuestionTranslated2(response2.data.contents.translated);
      setQuestionTranslated3(response3.data.contents.translated);
      setQuestionTranslated4(response4.data.contents.translated);
      setQuestionTranslated5(response5.data.contents.translated);
      // set title translation
      setLanguageTranslated1(response1.data.contents.translation);
      setLanguageTranslated2(response2.data.contents.translation);
      setLanguageTranslated3(response3.data.contents.translation);
      setLanguageTranslated4(response4.data.contents.translation);
      setLanguageTranslated5(response5.data.contents.translation);
    };
    translateQuestions();
  }, []);

  // questions
  const questions = [
    {
      memes:
        "https://memegenerator.net/img/instances/73970248/say-api-again-say-api-one-more-time.jpg",
      questionText: questionTranslated1,
      answerOptions: [
        { answerText: "Asynchronous Programming Interface", isCorrect: false },
        { answerText: "Artificial Programming Interface", isCorrect: false },
        { answerText: "Application Programming Interface", isCorrect: true },
        { answerText: "Asynchronous Programming Iteration", isCorrect: false },
      ],
      translated: languageTranslated1,
    },
    {
      memes:
        "https://i.pinimg.com/originals/4c/50/4b/4c504bf6c18b1a1c64b69553e938e355.jpg",
      questionText: questionTranslated2,
      answerOptions: [
        {
          answerText:
            "	Web APIs are methods used in the browser to manipulate the DOM",
          isCorrect: false,
        },
        {
          answerText:
            "Web APIs provide clients access to resources on a server such as data in a database",
          isCorrect: true,
        },
        {
          answerText: "Web APIs are called using proprietary protocols",
          isCorrect: false,
        },
        {
          answerText: "Web APIs are a strategy for organizing code on a server",
          isCorrect: false,
        },
      ],
      translated: languageTranslated2,
    },
    {
      memes:
        "https://i.pinimg.com/564x/89/00/2c/89002c002697425f2a71850ccf53366d.jpg",
      questionText: questionTranslated3,
      answerOptions: [
        { answerText: "JSON.parse()", isCorrect: true },
        { answerText: "JSON.stringify()", isCorrect: false },
        { answerText: "JSON.convert()", isCorrect: false },
        { answerText: "JSON.toString()", isCorrect: false },
      ],
      translated: languageTranslated3,
    },
    {
      memes: "https://miro.medium.com/max/600/0*T9Cp1i9aEB9kvUYL.png",
      questionText: questionTranslated4,
      answerOptions: [
        {
          answerText:
            "Asynchronous functions always take the same amount of time.",
          isCorrect: false,
        },
        {
          answerText:
            "The result of an asynchronous function is available immediately after the function returns",
          isCorrect: false,
        },
        {
          answerText:
            "Asynchronous operations launched in sequence will always finish in the same sequence",
          isCorrect: false,
        },
        {
          answerText:
            "Asynchronous functions return control back to the caller before their main task is complete",
          isCorrect: true,
        },
      ],
      translated: languageTranslated4,
    },
    {
      memes: "https://miro.medium.com/max/600/0*tpkuBHy0PHPy7k3Q.png",
      questionText: questionTranslated5,
      answerOptions: [
        { answerText: "JSON.convert()", isCorrect: false },
        { answerText: "JSON.toString()", isCorrect: false },
        { answerText: "JSON.parse()", isCorrect: false },
        { answerText: "JSON.stringify()", isCorrect: true },
      ],
      translated: languageTranslated5,
    },
  ];

  // hook states for question quiz flow
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  // function handling when answer is clicked
  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }

    handlePageScroll();
  };

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  return (
    <div>
      <Header />
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <section className="quiz">
          <article className="question-card">
            <div className="question-card__wrapper-header">
              <div className="card__number">
                <h3>
                  <span>Question {currentQuestion + 1}</span>/{questions.length}
                </h3>
              </div>
            </div>
            <div className="question-card__wrapper-content">
              <div className="meme-wrapper">
                <img
                  className="meme"
                  src={questions[currentQuestion].memes}
                  alt="meme"
                />
              </div>
              <h3 className="card__text">
                Translation into: {questions[currentQuestion].translated}!
              </h3>
              <div className="card__text">
                {questions[currentQuestion].questionText}
              </div>
              <div className="card__answer">
                {shuffle(questions[currentQuestion].answerOptions).map(
                  (answerOption) => (
                    <div key={uuidv4()} className="button-wrapper">
                      <button
                        className="card__button answer__button--color
                            answer__button--correct"
                        key={Math.random()}
                        onClick={() =>
                          handleAnswerOptionClick(answerOption.isCorrect)
                        }
                      >
                        <span className="answer">
                          {answerOption.answerText}
                        </span>
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
          </article>
        </section>
      )}
    </div>
  );
}

export default QuizEasy;
