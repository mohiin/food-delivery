import { useContext, useEffect, useState } from "react"
import "./PlaceOrder.css"
import { StoreContex } from "../../contex/StoreContex"
import axios from "axios";
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom';

export default function PlaceOrder() {

    const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContex);
    const navigate = useNavigate();

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
    });

    const handleChange = (e) => {
        const fieldName = e.target.name;
        const newVal = e.target.value;
        setData(data => ({ ...data, [fieldName]: newVal }));
    }



    const placeOrder = async (e) => {
        e.preventDefault();
        let orderItems = [];
        food_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        })
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2,
        }
        let res = await axios.post(url +"/api/order/place", orderData, { headers: { token } });
        if (res.data.success) {
            const { session_url } = res.data;
            window.location.replace(session_url)
        } else {
            alert("Error");
        }
    }

    useEffect(()=>{
        if(!token){
           toast.error("You have to Login");
           navigate("/cart");
        }else if(getTotalCartAmount() === 0){
            toast.error("Add Some foods");
            navigate("/cart");
        }
    },[token])


    return (
        <form onSubmit={placeOrder} className="place-order">
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input name="firstName" value={data.firstName} onChange={handleChange} type="text" placeholder="First name" required />
                    <input name="lastName" value={data.lastName} onChange={handleChange} type="text" placeholder="Last name" required />
                </div>
                <input name="email" value={data.email} onChange={handleChange} type="email" placeholder="Email address" required />
                <input name="street" value={data.street} onChange={handleChange} type="text" placeholder="Street" required />
                <div className="multi-fields">
                    <input name="city" value={data.city} onChange={handleChange} type="text" placeholder="City" required />
                    <input name="state" value={data.state} onChange={handleChange} type="text" placeholder="State" required />
                </div>
                <div className="multi-fields">
                    <input name="zipcode" value={data.zipcode} onChange={handleChange} type="text" placeholder="Zip code" required />
                    <input name="country" value={data.country} onChange={handleChange} type="text" placeholder="Country" required />
                </div>
                <input name="phone" value={data.phone} onChange={handleChange} type="text" placeholder="Phone" required />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery fee</p>
                            <p>${getTotalCartAmount() ? 2 : 0}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>total</p>
                            <p>${getTotalCartAmount() && getTotalCartAmount() + 2}</p>
                        </div>
                    </div>
                    <button type="submit">proceed to payment</button>
                </div>
            </div>
        </form>
    )
}