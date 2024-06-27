import logo from "./logo.svg";
import "./App.css";
import Quiz from "./component/Quiz";
import Header from "./component/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Quiz />
    </div>
  );
}

export default App;
