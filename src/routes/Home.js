import { dbService, storageService } from "../fbase";
import React, { useEffect, useState } from "react";
import { collection ,query , orderBy, onSnapshot } from "firebase/firestore";
import HlogFactory from "../components/HlogFactory";
import Hlogz from "../components/Hlogz";


const Home = ({userObj}) => {
    const [Hlogs,setHlogs] = useState([]);

    useEffect(() => {
        const q = query(collection(dbService,"Hlogs"),
        orderBy("createdAt","desc"));
        onSnapshot(q,(snapshot) => {
            const HlogArr = snapshot.docs.map((doc) => ({
                id:doc.id,
                ...doc.data(),
            }));
            setHlogs(HlogArr);
        });
    },[]);
    
    return (
    <div>
        <HlogFactory userObj={userObj}/>
        <div>
            {Hlogs.map((Hlog) => (
                <Hlogz 
                    key={Hlog.id} 
                    HlogObj={Hlog} 
                    isOwner={Hlog.creatorId === userObj.uid}
                />
            ))}
        </div>
    </div>
);
};

export default Home;