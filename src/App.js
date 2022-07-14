import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatsPage from "./pages/ChatsPage";


function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route exact path="/" > */}
          <Route index exact path="/" element={<HomePage />} />
          <Route exact path="/Chats" element={<ChatsPage />} />
        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;
