'use client'

import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { gamesCol } from "../../firestore/helper";
import { Game } from "../../models/game";
import Answers from "./Answers";
import ResultArea from "./ResultArea";

const ResultWrapper = () => {
    const [gameData, setGameData] = useState<Game>()
    const [harmonieData, setHarmonieData] = useState<{x:number,y:number}[]>([])
    useEffect(() => {
        const liveGameListener = onSnapshot(
            doc(gamesCol, "pKZOJquU9O9zSvYpBc1K"),
            (doc) => {
              console.log("Live", doc.data());
              setGameData(doc.data())
              setHarmonieData(prev=>[...prev, {x:doc.data()!.liveState.answeredTotal, y:doc.data()!.liveState.answeredSame}])
            }
          );
          console.log("Data loaded")
          return liveGameListener;
      }, []);

      return (
        <div className="w-full my-4">
            {gameData?.liveState.questionId ?
            <Answers questionId={gameData.liveState.questionId} show={gameData.liveState.showVotes} result={gameData.liveState.result}/>
            :null}
            <ResultArea harmonieData={harmonieData}/>
        </div>
      )
}

export default ResultWrapper