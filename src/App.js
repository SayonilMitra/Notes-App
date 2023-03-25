import LoginPage from "./components/LoginPage";
import SignUp from "./components/SignUp";
import HomePage from "./components/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpdateNote from "./components/UpdateNote";
import AddNote from "./components/AddNote";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signUp" element={<SignUp />}></Route>
          <Route path="/homepage" element={<HomePage />}></Route>
          <Route path="/updateNote" element={<UpdateNote />}></Route>
          <Route path="/addNote" element={<AddNote />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
