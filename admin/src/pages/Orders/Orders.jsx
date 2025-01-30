import { useEffect, useState } from "react"
import "./Orders.css"
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets.js"
import { url } from "../../assets/assets";

export default function Orders() {
    
    const [orders, setOrders] = useState([]);
    const fetchAllOrders = async () => {
        const res = await axios.get(url + "/api/order/list");
        if (res.data.success) {
            setOrders(res.data.data);
        } else {
            toast.error("Error");
        }
    }

    const changeStatus = async(e, orderId)=>{
        const res = await axios.post(url+"/api/order/status", {
            orderId,
            status:e.target.value,
        });
        if(res.data.success){
            await fetchAllOrders();
        }
    }
    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <div className="order add">
            <h3>Order Page</h3>
            <div className="order-list">
                {orders.map((order, index) => (
                    <div key={index} className="order-item">
                        <img src={assets.parcel_icon} alt="" />
                        <div>
                            <p className="order-item-food">
                                {order.items.map((item, index) => {
                                    return item.name + " x " + item.quantity + ",";
                                })}
                            </p>
                            <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
                            <div className="order-item-address">
                                <p>{order.address.street + ","}</p>
                                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country}</p>
                            </div>
                            <p className="order-item-phone">{order.address.phone}</p>
                        </div>
                        <p>Items: {order.items.length}</p>
                        <p>${order.amount}</p>
                        <select onChange={(e) => changeStatus(e, order._id)} value={order.status}  name="" id="">
                            <option value="food processing">food processing</option>
                            <option value="out for delivery">out for delivery</option>
                            <option value="delivered">delivered</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    )
}
