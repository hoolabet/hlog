import React, { useEffect } from "react";
import {Link} from "react-router-dom";

const Navigation = ({userObj}) => {
    const titleHTML = document.querySelector('title');
    return(
    <nav>
        <ul>
            <li>
                <Link to="/" 
                    onClick={()=>{titleHTML.innerHTML=`Hlog`}}
                >Home</Link>
            </li>
            <li>
                <Link to="/profile"
                    onClick={()=>{titleHTML.innerHTML=`${userObj.displayName}의 프로필`}}
                >{userObj.displayName}의 프로필</Link>
            </li>
        </ul>
    </nav>);
};
export default Navigation;