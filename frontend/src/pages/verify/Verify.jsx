
import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContex} from "../../contex/StoreContex"
import "./Verify.css";
import axios from "axios";

export default function Verify(){

    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContex);
    const navigate = useNavigate();

    const verifyPayment = async()=>{
        const res = await axios.post(url+"/api/order/verify", {success, orderId});
        if(res.data.success){
            navigate("/myorders");
        }else{
            navigate("/");
        }
    }

    useEffect(()=>{
        verifyPayment();
    }, [])

    return(
        <div className="verify">
            <div className="spinner">

            </div>
            
        </div>
    )
}