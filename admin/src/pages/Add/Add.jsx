import { useState } from "react"
import { assets } from "../../assets/assets"
import "./Add.css"
import axios from "axios"
import { toast } from "react-toastify";

export default function Add() {

    const url = "http://localhost:4000";

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name:"",
        description: "",
        price: "",
        category: "Salad",
    })

    const handleChange = (e)=>{
        const filename = e.target.name;
        const value = e.target.value;

        setData(data=>(
            {...data, [filename]: value}
        ))
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price",Number( data.price));
        formData.append("category", data.category);
        formData.append("image", image);

        const res = await axios.post(`${url}/api/food/add`, formData);
        if(res.data.success){
            setData({
                name:"",
                description: "",
                price: "",
                category: "Salad",
            })
            setImage(false);
            console.log("form data saved successfully");
            toast.success(res.data.message);
        }else{
            console.log("error in saving form data");
            toast.error(res.data.message);
        }
    }

    return (
        <div className="add">
            <form className="flex-col" onSubmit={handleSubmit}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image? URL.createObjectURL(image): assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" id="image" hidden required />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input onChange={handleChange} value={data.name} type="text" name="name" placeholder="Type here" required />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea onChange={handleChange} value={data.description} name="description" rows={6} placeholder="write description here" required></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product description</p>
                        <select name="category"onChange={handleChange} value={data.category}>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Cake">Cake</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Pirce</p>
                        <input onChange={handleChange} value={data.price} type="number" name="price" placeholder="$20" required/>
                    </div>
                </div>
                <button type="submit" className="add-btn">Add</button>
            </form>
        </div>
    )
}