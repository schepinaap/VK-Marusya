import Footer from "./components/Footer";
import Header from "./components/Header";
import "./App.css";
import HomePage from "./pages/homePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GenresPage from "./pages/genresPage";
import GenrePage from "./pages/genrePage";
import Movie from "./components/Main/Movie/Movie";
import ProfilePage from "./pages/profilePage";
import { useState } from "react";
import LoginForm from "./components/Form/LoginForm";
import RegisterForm from "./components/Form/RegisterForm";
import Modal from "./components/Form/Modal";

function App() {

    const [loginOpen, setLoginOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

  const handleLoginOpen = () => {
    setLoginOpen(true);
    handleRegisterClose();
    handleModalClose();
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
    console.log("handleLoginClose");
  };

  const handleRegisterOpen = () => {
    setRegisterOpen(true);
    handleLoginClose();
  };

  const handleRegisterClose = () => {
    setRegisterOpen(false);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
    setRegisterOpen(false);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <Header handleLoginOpen={handleLoginOpen}/>

      {loginOpen && (
        <LoginForm
          handleLoginClose={handleLoginClose}
          handleRegisterOpen={handleRegisterOpen}
        />
      )}

      {registerOpen && (
        <RegisterForm
          handleRegisterClose={handleRegisterClose}
          handleLoginOpen={handleLoginOpen}
          handleModalOpen={handleModalOpen}
        />
      )}

      {modalOpen && (
        <Modal
          handleModalClose={handleModalClose}
          handleLoginOpen={handleLoginOpen}
        />
      )}
        <div className="main-content">
             <Routes>
          <Route path="/" element={<HomePage handleLoginOpen={handleLoginOpen}/>} />
          <Route path="/genres" element={<GenresPage />} />
          <Route path="/movie/:id" element={<Movie handleLoginOpen={handleLoginOpen}/>} />
          <Route path="/genre" element={<GenrePage/>}/>
          <Route path="/profile" element={<ProfilePage/>} />
        </Routes>
        </div>
     
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
