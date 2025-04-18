import { Link, } from "react-router";
import Logo from "./assets/logo.png"
import "./App.css";

export default function App() {


  return (
    <div className="App">
      <div>
        <img src={Logo} alt="Logo" width={200} height={200} />
      </div>
      <div className='index_board'>
        <h2>Settings</h2>
        <Link to="/modes/Modes">
          <h2>Play</h2>
        </Link>
        <h2>Stats</h2>
      </div>
    </div>
  )
}