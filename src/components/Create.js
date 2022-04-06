import React, { useState } from "react";

const Create = ({setWriteOn,setInput_,setTitle_}) => {
    const [input,setInput] = useState("");
    const [title,setTitle] = useState("");
    
    const onChange = (event) => {
        const { target:value} = event;
        setInput(event.target.value);
        console.log(event.target.value);
    };
    const onChangeT = (event) => {
        const { target:value} = event;
        setTitle(event.target.value);
    };
    
    const onSubmit = (event) =>{
        event.preventDefault();
        setWriteOn(false);
        setInput_(input);
        setTitle_(title);
    };
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    type="text"
                    required
                    onChange={onChangeT}
                    value={title}    
                />
                <input
                    type="submit"
                    value="sub"
                />
                <br />
                <br />
                <br />
                <textarea 
                    required
                    onChange={onChange}
                    value={input}
                    cols="50" rows="10"    
                    style={{display:'flex',width:400 ,height:300,verticalAlign:'top',textAlign:'left'}}
                />
            </form>
        </div>
    );
};

export default Create;