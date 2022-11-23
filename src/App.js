import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import {Route,Routes} from "react-router-dom";
import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";

function App() {
    const {tg} = useTelegram();

    useEffect( () =>{
        tg.ready();
    },[])

  return (
      <div className="App">
          <Header />
          <Routes>
              <Route index element={<Form />}/>
              <Route path={'form'} element={<ProductList />}/>
          </Routes>
      </div>
  );
}

export default App;
