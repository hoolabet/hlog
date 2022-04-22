import { dbService, storageService } from "../fbase";
import { deleteDoc , doc, updateDoc } from "firebase/firestore";
import { deleteObject , ref } from "firebase/storage";
import React, { useState } from "react";
import {Link} from "react-router-dom";

const Hlogz = ({HlogObj, isOwner , attachmentUrl}) => {
    const [editing, setEditing] = useState(false);
    const [newHlog, setNewHlog] = useState(HlogObj.text);
    const [newHlogT,setNewHlogT] = useState(HlogObj.title);
    const [deleted,setDeleted] = useState("");

    const da = HlogObj.createdAt;
    const YD = new Date(da).getFullYear();
    const MD = new Date(da).getMonth()+1;
    const DD = new Date(da).getDate();
    const HD = new Date(da).getHours();
    const mD = new Date(da).getMinutes();
    const hid = HlogObj.id;

    const onDeleteClick = async(e) => {
        const ok = window.confirm("Are you sure you want to delete this Hlog?");
        const HlogTextRef = doc(dbService,`Hlogs/${HlogObj.id}`);
        if(ok){
            await deleteDoc(HlogTextRef);
            await deleteObject(ref(storageService,HlogObj.attachmentUrl));
            setDeleted(HlogObj);
        }
        console.log(HlogObj.id);
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async(event) => {
        event.preventDefault();
        const HlogTextRef = doc(dbService,`Hlogs/${HlogObj.id}`);
        await updateDoc(HlogTextRef,{
            text: newHlog,
            title: newHlogT,
        });
        setEditing(false);
    };
    const onChange = async(event) => {
        const { target: {value},} = event;
        setNewHlog(value);
    };
    const onChangeT = async(event) => {
        const { target: {value},} = event;
        setNewHlogT(value);
    };
    return (
        
        <div>
            
            {editing ? (
                <>
                <form onSubmit={onSubmit}>
                    <input 
                        onChange={onChangeT}
                        type="text" 
                        value={newHlogT} 
                        placeholder="Edit your Hlog"
                        required 
                    />
                    <br />
                    <br />
                    <textarea 
                        onChange={onChange}
                        value={newHlog} 
                        placeholder="Edit your Hlog"
                        required 
                        cols={50}
                        rows={20}
                    />
                    <input 
                        type="submit" 
                        value="Update Hlog" 
                    />
                </form>
                <button onClick={toggleEditing}>Cancel</button>
                </>
            ) : (
                <div style={{borderBottom:"1px solid black" ,padding:"5px"}}>
                    <h4>
                        <Link 
                            to = {`/post/${HlogObj.title}`}
                            state={{
                                text:HlogObj.text,
                                title:HlogObj.title,
                                At:HlogObj.createdAt,
                                Id:HlogObj.creatorId,
                                url:HlogObj.attachmentUrl,
                                H:hid,
                                deleted:deleted,
                            }}    
                        >
                            {HlogObj.title}
                        </Link>
                        <span style={{paddingLeft:"5px"}}>
                            {/* [{howReply}] */}
                        </span>
                    </h4>
                    <h6>{`${YD}-${MD}-${DD}  ${HD}:${mD}`}</h6>
                    {HlogObj.attachmentUrl && <img src={HlogObj.attachmentUrl} width="100px" height="100px" />}
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete</button>
                            <button onClick={toggleEditing}>Update</button>
                        </>    
                    )}    
                </div>
            )}
        </div>
    );
};



export default Hlogz;