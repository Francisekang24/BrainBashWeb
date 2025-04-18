
import "./Play.css"
import Classic from "../assets/classic.png"
import Timed from "../assets/timed.png"
import Endless from "../assets/endless.png"
import Versus from "../assets/versus.png"
import { Link } from "react-router-dom"

export const Mode = (title: string, img: string ) => {
    return (
        <>
            <div className="mode">
                <img src={img} alt={Classic} width={80} height={80} />
                <Link to = {`/modes/${title}`}><h1>{title}</h1></Link>
            </div>
        </>
    )
}

export default function Play() {


    return (
        <>
            <div className="play_board">
                {Mode("Classic", Classic, )}
                {Mode("Timed", Timed, )}
                {Mode("Endless", Endless, )}
                {Mode("Versus", Versus, )}
            </div>
        </>
    )
}
