"use client";
import QuestionCard from "../../app/components/QuestionCard";
import { Question } from "../../models/question";
import { questionsCol } from "../../firestore/helper";
import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const QuestionsPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const loadQuestions = async (gameId: string) => {
      const snapshot = await getDocs(questionsCol(gameId));
      setQuestions(
        snapshot.docs.map((doc) => {
          console.log(doc.data())
          return { ...doc.data(), id: doc.id };
        })
      );
    };
    loadQuestions("pKZOJquU9O9zSvYpBc1K");
  }, []);

  return (
    <div>
      <div className="flex flex-col w-full items-start">
        <h1 className="font-medium text-xl mb-4">{`Wie funktioniert's?`}</h1>
        <p className="mb-4">
          Weiter unten findest du 20 Fragen. Bitte wähle jeweils deine Antwort
          aus.
        </p>
        <p className="mb-4">
          {`Wir stellen diese Fragen später dem Brautpaar. Diese werden im
          klassischen "Schuh-Spiel" beantwortet.`}
        </p>
        <p className="mb-4">
          Wer am Ende die größte Übereinstimmung mit dem Brautpaar hat, gewinnt
          den Hauptpreis!
        </p>
        <p className="mb-4">{`Danke für's Mitmachen und viel Spaß!`}</p>
      </div>

      <div className="justify-center mx-auto my-5 font-serif text-4xl">
        <p>Fragen</p>
      </div>
      <div className="">
        <ul className="w-full flex flex-col items-center">
          {questions.map((question) => {
            return (
              <QuestionCard
                key={question.id}
                title={question.title}
                id={question.id!}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default QuestionsPage;
