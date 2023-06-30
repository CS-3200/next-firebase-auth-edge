'use client'
import { getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import { questionsCol } from "../../firestore/helper"
import { clearGame, hideVotes, setLiveQuestion, showVotes } from "../../firestore/profile"
import { Question } from "../../models/question"
import AddQuestion from "../components/AddQuestion"
import AnswerCard from "../components/AnswerCard"


const GameMaster = () => {
    const [currentQuestion, setCurrentQuestion] = useState<number | null>(null)
    const [gameon, setGameOn] = useState(false)
    const [questions, setQuestions] = useState<Question[]>([]);
    const [nextdisabled, setNextDisabled] = useState(true)

    const handleStart = async () => {
        await clearGame()
        handleNext(0)
        setGameOn(true)

    }

    const handleNext = async(next:number) => {
        await hideVotes()
        setCurrentQuestion(next)
        setLiveQuestion(questions[next].id!)
        setNextDisabled(true)
    }

    const handleShowVotes = async () => {
        // if (currentQuestion) {
        //     await updateScores(questions[currentQuestion].brideVotes,questions[currentQuestion].groomVotes, questions[currentQuestion].result)
        // }
        await showVotes()
        setNextDisabled(false)
    }

  useEffect(() => {
    const loadQuestions = async (gameId: string) => {
      const snapshot = await getDocs(questionsCol(gameId));
      setQuestions(
        snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    };
    loadQuestions("pKZOJquU9O9zSvYpBc1K");
  }, []);

    return(
        <div className="flex flex-col justify-center items-center">
            {!gameon ?
            <button onClick={handleStart} name="Starten" className="bg-rose-300 rounded-full p-4">Starten</button>: null
        }
        {gameon && currentQuestion!=null?
        <div className="w-full flex-col justify-start items-center mx-4">
            <p>{`Frage ${currentQuestion+1}/${questions.length}`}</p>
            <AnswerCard id={questions[currentQuestion].id!} title={questions[currentQuestion].title}/>
            <div className="flex flex-row justify-around w-full">
            <button className="bg-rose-300 rounded-full p-4" onClick={handleShowVotes}>Votes anzeigen</button>
            {currentQuestion +1 < questions.length ? 
            <button onClick={()=>handleNext(currentQuestion+1)} disabled={nextdisabled} name="Next" className={`${nextdisabled ? "bg-gray-300" :"bg-rose-300"} rounded-full p-4`}>Nächste Frage</button>
        :null}
        </div>
        </div>:null
        }
            
            <AddQuestion />
        </div>
    )
}

export default GameMaster