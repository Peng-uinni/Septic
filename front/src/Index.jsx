import { Link } from "react-router-dom"

function Index(){
    return(
        <>
        <h1>Poop</h1>
        <Link to="/join">Join</Link><br />
        <Link to="/create">Create</Link>
        </>
    )
}

export default Index