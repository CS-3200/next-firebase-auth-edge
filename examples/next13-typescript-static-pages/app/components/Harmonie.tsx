'use client'
import { doc, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { VictoryArea, VictoryGroup, VictoryLine, VictoryScatter, VictoryStack } from "victory"
import { gamesCol } from "../../firestore/helper"

interface Props {
    data: {x:number,y:number}[]
}

const Harmonie = ({data}:Props) => {
    //const [data, setData] = useState<{x:number,y:number}[]>([])
    console.log("Harmonie data", data)
    return(
        <div className="w-full">
            <VictoryGroup>
                <VictoryArea
                data={[{x: 0, y: 20}, {x: 20, y: 20}]}
                style={{
                    data:{fill:"#f43f5e"}
                }}
                />
                <VictoryArea
                data={[{x: 0, y: 15}, {x: 20, y: 15}]}
                style={{
                    data:{fill:"#fb7185"}
                }}
                />
                <VictoryArea
                data={[{x: 0, y: 8}, {x: 20, y: 8}]}
                style={{
                    data:{fill:"#fecdd3"}
                }}
                />
                <VictoryLine
           
                data={data ?? [{x:0,y:0}]}
                style={{
                    data: { stroke: "#000", strokeWidth:3 },
                  }}
                />
                <VictoryScatter
                data={data}
                symbol="star"
                size={5}
                style={{
                    data:{fill:"#000"}
                }}
                />
            </VictoryGroup>
        </div>
    )
}

export default Harmonie