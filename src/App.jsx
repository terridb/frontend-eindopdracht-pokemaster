import './App.css'
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Pokedex from "./pages/pokedex/Pokedex.jsx";
import Battlemaster from "./pages/battlemaster/Battlemaster.jsx";
import Registration from "./pages/authentication/registration/Registration.jsx";
import LogIn from "./pages/authentication/login/LogIn.jsx";
import PokedexDetails from "./pages/pokedexDetails/PokedexDetails.jsx";
import Favorites from "./pages/favorites/Favorites.jsx";
import Profile from "./pages/profile/Profile.jsx";
import BattlemasterResult from "./pages/battlemasterResult/BattlemasterResult.jsx";

function App() {
    const isLoggedIn = false;

    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/pokedex" element={<Pokedex/>}/>
                <Route path="/battlemaster" element={<Battlemaster/>}/>
                <Route path="/signup" element={<Registration/>}/>
                <Route path="/login" element={<LogIn/>}/>
                <Route path="/pokedex/:id" element={<PokedexDetails/>}/>
                <Route path="/battlemaster/results" element={<BattlemasterResult/>}/>
                <Route path="/favorites" element={isLoggedIn === true? <Favorites/> : <Navigate to="/login"/>}/>
                <Route path="/profile" element={isLoggedIn === true? <Profile/> : <Navigate to="/login"/>}/>
            </Routes>
        </>
    )
}

export default App
