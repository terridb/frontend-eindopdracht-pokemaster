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
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext.jsx";

function App() {
    const {isAuth} = useContext(AuthContext);

    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/pokedex" element={<Pokedex/>}/>
                <Route path="/battlemaster" element={<Battlemaster/>}/>
                <Route path="/signup" element={!isAuth ? <Registration/> : <Navigate to ="/profile"/>}/>
                <Route path="/login" element={!isAuth ? <LogIn/> : <Navigate to ="/profile"/>}/>
                <Route path="/pokedex/:pokemonId" element={<PokedexDetails/>}/>
                <Route path="/battlemaster/:pokemonId/:generation" element={<BattlemasterResult/>}/>
                <Route path="/favorites" element={isAuth ? <Favorites/> : <Navigate to="/login"/>}/>
                <Route path="/profile" element={isAuth ? <Profile/> : <Navigate to="/login"/>}/>
            </Routes>
        </>
    )
}

export default App
