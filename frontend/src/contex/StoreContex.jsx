import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContex = createContext(null);

const StoreContexProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "https://food-delivery-backend-65jm.onrender.com";
    const [token, setToken] = useState("");

    const [food_list, setFood_list] = useState([]);

    const addToCart = async(itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev => ({ ...prev, [itemId]: 1 })));
        } else {
            setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }

        if(token){
            await axios.post(url+"/api/cart/add", {itemId}, {headers: {token}});
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if(token){
            await axios.post(url+"/api/cart/remove", {itemId}, {headers: {token}});
        }
    }

    const loadCartData = async(token)=>{
        const res = await axios.post(url+"/api/cart/get",{}, {headers: {token}});
        setCartItems(res.data.cartData);
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }

        return totalAmount;
    }

    const fetchFood_list = async()=>{
        const res = await axios.get(url+"/api/food/list");
        setFood_list(res.data.data);
    }


    useEffect(()=>{
       
        async function loadData() {
            await fetchFood_list();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }

        }
        loadData();
    },[]);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    }

    return (
        <StoreContex.Provider value={contextValue}>
            {props.children}
        </StoreContex.Provider>
    )
}

export default StoreContexProvider;
