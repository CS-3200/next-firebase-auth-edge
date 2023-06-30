import { VictoryArea, VictoryGroup, VictoryLine, VictoryScatter } from "victory"
import { Game } from "../../models/game"
import Harmonie from "./Harmonie"

interface AreaProps {
    harmonieData:{x:number,y:number}[]
}

const ResultArea = ({harmonieData}:AreaProps) => {

 return (
    <div className="w-full my-8 grid grid-cols-2 gap-6">
        <div>
            <h1 className="text-2xl">Harmonie Brautpaar</h1>
            <Harmonie data={harmonieData}/>
        </div>
        <div>

        <h1 className="text-2xl ">Rangliste</h1>
        </div>
        
    </div>
 )
}

export default ResultArea