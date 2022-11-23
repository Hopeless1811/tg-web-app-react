import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";

function App() {
    const {onToggleButton,tg} = useTelegram();

    useEffect( () =>{
        tg.ready();
    },[])

  return (
    <div className="App">
      work
        <button onClick={onToggleButton}>toggle</button>
    </div>
  );
}

export default App;
