'use client';

import { doc, onSnapshot } from 'firebase/firestore';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { gamesCol } from './helper';

export interface FirestoreContextValue {
    questionId:string | null;
  title: string
}

export interface FirestoreProviderProps {
    children: React.ReactNode;
  }

export const FireStoreContext = createContext<FirestoreContextValue>({
    questionId: null,
  title:"Loading"
});

export const FirestoreProvider: React.FunctionComponent<FirestoreProviderProps> = ({
    children,
  }) => {
    
    const [questionId, setQuestionId] = useState("");
    const [title, setTitle] = useState("")
    console.log("FirestoreContext loaded")
  
    useEffect(() => {
        const liveGameListener = onSnapshot(
          doc(gamesCol, "pKZOJquU9O9zSvYpBc1K"),
          (doc) => {
            console.log("Live", doc.data());
            setQuestionId(doc.data()?.liveState.questionId ?? "No question Id")
            setTitle(doc.data()?.title ?? "No title")
          }
        );
        console.log("Data loaded")
        return liveGameListener;
      }, []);
    

    return (
        <FireStoreContext.Provider
          value={{
            questionId,
            title
          }}
        >
          {children}
        </FireStoreContext.Provider>
      );
    };

    export const useDB = () => useContext(FireStoreContext)