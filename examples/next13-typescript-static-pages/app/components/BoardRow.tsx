
interface Props {
    userId:string
}

const BoardRow = ({userId}:Props) => {
    return(
        <div>
            <p>{userId}</p>
        </div>
    )
}

export default BoardRow