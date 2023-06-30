'use client'

import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { questionsCol } from "../../firestore/helper";
import { VoteData } from "../../models/profile";
import Bars from "./Bars";

interface AnswersProps {
    questionId:string,
    show:boolean,
    result:"bride" | "groom" | "both" | undefined | null
}

const Answers = ({questionId, show, result}:AnswersProps) => {
    const [brideVotes, setBrideVotes] = useState<VoteData[]>([]);
  const [groomVotes, setGroomVotes] = useState<VoteData[]>([]);
  const [title, setTitle] = useState("")
  const [isLoading, setIsLoading] = useState(true)
      useEffect(() => {
        const getQuestionData = async (questionId: string) => {
        const question = await getDoc(
            doc(questionsCol("pKZOJquU9O9zSvYpBc1K"), questionId)
        );
        setBrideVotes(question.data()?.brideVotes ?? []);
        setGroomVotes(question.data()?.groomVotes ?? []);
        setTitle(question.data()?.title ?? "No title");
        setIsLoading(false)
        };

      getQuestionData(questionId);
    
  }, [questionId]);

  if (isLoading) {
    return (
        <div>
            <p>Nächste Antworten werden geladen...</p>
        </div>
    )
  }
  return (
    <div className="w-full flex flex-col items-center">
        <div className="w-full bg-rose-300 py-3 overflow-hidden rounded-t-3xl text-center">

        <p className="text-2xl underline-offset-2 underline">{title}</p>
        </div>

        <Bars brideVotes={brideVotes?.length} groomVotes={groomVotes?.length} show={show} result={result}/>
    </div>
  )
}

export default Answers