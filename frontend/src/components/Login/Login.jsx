import { useContext, useState } from "react"
import "./Login.css"
import { assets } from "../../assets/assets";
import { StoreContex } from "../../contex/StoreContex";
import axios from "axios"
import { toast } from "react-toastify";

export default function Login({setShowLogin}){
    
    const {url, token, setToken} = useContext(StoreContex);

    const [currState, setCurrState] = useState("Login");
    const [data, setData] = useState({
        username:"",
        email:"",
        password:"",
    });

    const handleChange = (e)=>{
        const fieldName = e.target.name;
        const newVal = e.target.value;
        setData((prevData)=>{
            return {...prevData, [fieldName]: newVal}
        })
    }

    const handleLogin = async(e)=>{
        e.preventDefault();
        let newUrl = url;
        if(currState === "Login"){
            newUrl+="/api/user/login";
        }else{
            newUrl+="/api/user/register";
        }

        const res = await axios.post(newUrl, data);

        if(res.data.success){
            setToken(res.data.token);
            localStorage.setItem("token", res.data.token);
            setShowLogin(false);
            toast.success(`You are ${currState} Now!`)
        }else{
            toast.error(res.data.message);
        }
    }
    return(
        <div className="login-popup">
           <form onSubmit={handleLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=> setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {
                    currState==="Login"?<></>:<input type="text" placeholder="your name" name="username" value={data.username} onChange={handleChange} id="" required />
                }
                
                <input type="email" placeholder="your email" name="email" value={data.email} onChange={handleChange} id="" required />
                <input type="password" placeholder="password" name="password" value={data.password} onChange={handleChange} id="" required />
            </div>
            <button type="submit">{currState ==="Sign Up"?"Create Accounct":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By continuing, i agree to the terms of use & privacy policy.</p>
            </div>
            {
                currState==="Login"? <p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
                :<p>Already have an account? <span onClick={()=> setCurrState("Login")}>Login here</span></p>
            }
           
            
           </form>
        </div>
    )
}