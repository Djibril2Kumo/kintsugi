import { createContext, react, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Quiz from "./component/Quiz";
import Header from "./component/Header";

export const DarkContext = createContext();

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <DarkContext.Provider value={{ darkMode, setDarkMode }}>
      <div className="App">
        {/* <Header /> */}
        <Quiz />
      </div>
    </DarkContext.Provider>
  );
}

export default App;
