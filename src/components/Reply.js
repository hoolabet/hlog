import React, { useState } from "react";
import { dbService, storageService } from "../fbase";
import { deleteDoc , doc, updateDoc } from "firebase/firestore";


const Reply = ({replys,deleted,H,reply,D,isOwner}) => {
    const At = reply.createdAt;
    const YD = new Date(At).getFullYear();
    const MD = new Date(At).getMonth()+1;
    const DD = new Date(At).getDate();
    const HD = new Date(At).getHours();
    const mD = new Date(At).getMinutes();

    const [editing, setEditing] = useState(false);
    const [newReply, setNewReply] = useState(reply.text);
    const onDeleteClick = async() => {
        const ok = window.confirm("Are you sure you want to delete this reply?");
        const replyTextRef = doc(dbService,`Hlogs/${H}/reply/${reply.id}`);
        if(ok){
            await deleteDoc(replyTextRef);
        }
        console.log(reply.id);
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async(event) => {
        event.preventDefault();
        const replyTextRef = doc(dbService,`Hlogs/${H}/reply/${reply.id}`);
        await updateDoc(replyTextRef,{
            text: newReply
        });
        setEditing(false);
    };
    const onChange = async(event) => {
        const { target: {value},} = event;
        setNewReply(value);
    };
    if(deleted == `${H}`){
        replys.map((reply)=>{
            const replyTextRef = doc(dbService,`Hlogs/${H}/reply/${reply.id}`);
            deleteDoc(replyTextRef);
        });
    }

    return (
        <div>
            {editing ? (
                <>
                <form onSubmit={onSubmit}>
                    <input 
                        onChange={onChange}
                        type="text" 
                        value={newReply} 
                        placeholder="Edit your reply"
                        required 
                    />
                    <input 
                        type="submit" 
                        value="Update reply" 
                    />
                </form>
                <button onClick={toggleEditing}>Cancel</button>
                </>
            ) : (
                <div style={{borderBottom:"1px solid black"}}>
                    <h4>{reply.creatorNick}</h4>
                    <h5>{reply.text}</h5>
                    <h6>{`${YD}-${MD}-${DD}  ${HD}:${mD}`}</h6>
                {isOwner && (
                    <>
                    <button onClick={onDeleteClick}>Delete</button>
                    <button onClick={toggleEditing}>Update</button>
                    </>
                    )} 
                </div>
            )
            }
        </div>
    );
};

export default Reply;