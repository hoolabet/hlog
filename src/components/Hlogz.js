import { dbService, storageService } from "../fbase";
import { deleteDoc , doc, updateDoc } from "firebase/firestore";
import { deleteObject , ref } from "firebase/storage";
import React, { useState } from "react";

const Hlogz = ({HlogObj, isOwner , attachmentUrl}) => {
    const [editing, setEditing] = useState(false);
    const [newHlog, setNewHlog] = useState(HlogObj.text);
    const onDeleteClick = async() => {
        const ok = window.confirm("Are you sure you want to delete this Hlog?");
        const HlogTextRef = doc(dbService,`Hlogs/${HlogObj.id}`);
        if(ok){
            await deleteDoc(HlogTextRef);
            await deleteObject(ref(storageService,HlogObj.attachmentUrl));
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async(event) => {
        event.preventDefault();
        const HlogTextRef = doc(dbService,`Hlogs/${HlogObj.id}`);
        await updateDoc(HlogTextRef,{
            text: newHlog
        });
        setEditing(false);
    };
    const onChange = async(event) => {
        const { target: {value},} = event;
        setNewHlog(value);
    };
    return (
        <div>
            {editing ? (
                <>
                <form onSubmit={onSubmit}>
                    <input 
                        onChange={onChange}
                        type="text" 
                        value={newHlog} 
                        placeholder="Edit your Hlog"
                        required 
                    />
                    <input 
                        type="submit" 
                        value="Update Hlog" 
                    />
                </form>
                <button onClick={toggleEditing}>Cancel</button>
                </>
            ) : (
                <>
                    <h4>{HlogObj.text}</h4>
                    {HlogObj.attachmentUrl && <img src={HlogObj.attachmentUrl} width="100px" height="100px" />}
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete</button>
                            <button onClick={toggleEditing}>Update</button>
                        </>    
                    )}    
                </>
            )}
        </div>
    );
};



export default Hlogz;