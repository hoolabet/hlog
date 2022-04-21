import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "../components/Navigation";
import Profile from "../routes/Profile";
import Post from "./Post";

const AppRouter = ({refreshUser,isLoggedIn,userObj,HlogObj}) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj}/>}
            <Routes>
                {isLoggedIn ? (
                <>
                <Route exact path="/" element={<Home userObj={userObj} />} />
                <Route exact path="/profile" element={<Profile refreshUser={refreshUser} userObj={userObj}/>} />
                <Route path="/post/:title" element={<Post userObj={userObj} HlogObj={HlogObj}/>} />
                
                </>) : (
                <Route exact path="/" element={<Auth />} />
                )}
            </Routes>
        </Router>
    );
};

export default AppRouter;