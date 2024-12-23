import { useContext } from "react"
import "./Cart.css"
import { StoreContex } from "../../contex/StoreContex"
import { useNavigate } from "react-router-dom";

export default function Cart() {

    const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContex);
    const navigate = useNavigate();

    return (
        <div className="cart">
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {
                    food_list.map((item, index) => {
                        if (cartItems[item._id] > 0) {
                            return (
                                <div key={index}>
                                    <div className="cart-items-title cart-items-item">
                                        <img src={url+"/images/"+item.image} alt="" />
                                        <p>{item.name}</p>
                                        <p>${item.price}</p>
                                        <p>{cartItems[item._id]}</p>
                                        <p>${item.price * cartItems[item._id]}</p>
                                        <p onClick={()=> removeFromCart(item._id)} className="cross">X</p>
                                    </div>
                                    <hr />
                                </div>
                            )
                        }
                    })
                }
            </div>
            <div className="cart-bottom">
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
                            <p>${getTotalCartAmount()? 2: 0}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>total</p>
                            <p>${getTotalCartAmount() && getTotalCartAmount()+2}</p>
                        </div>
                    </div>
                    <button onClick={()=> navigate("/order")}>proceed to checkout</button>
                </div>
                <div className="cart-promocode">
                    <div>
                        <p>If you have a promo code, Enter it here</p>
                        <div className="cart-promocode-input">
                            <input type="text" placeholder="prome code" />
                            <button>submit</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}