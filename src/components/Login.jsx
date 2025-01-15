import React,{useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
function Login(){
    const navigate=useNavigate();
    const [username,setusername]=useState("");
    const [user,setUser]=useState(null);
    const [verified,setVerified]=useState(false);
    useEffect(()=>{
        const authentication=localStorage.getItem('isauthenticated')==='true';
        const userDetails=localStorage.getItem('user');
        if(authentication && userDetails){
            setVerified(true);
            setUser(userDetails);
        }
    },[])
    useEffect(()=>{
        if(verified){
            navigate('/dashboard');
        }
    },[verified,navigate]);
    async function handleSubmit(e){
        e.preventDefault();
        if(verified){
            return;
        }
        setVerified(true);
        setUser(username);
        localStorage.setItem('isauthenticated',true);
        localStorage.setItem('user',username);
    }
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e)=>setusername(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
export default Login;