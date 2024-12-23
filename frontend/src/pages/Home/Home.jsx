import { useState } from "react"
import ExpolreMenu from "../../components/ExploreMenu/ExploreMenu"
import Header from "../../components/Header/Header"
import "./Home.css"
import FoodDisplay from "../../components/foodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";

export default function Home(){

    const [category, setCategory] = useState("All");
    return(
        <div>
            <Header />
            <ExpolreMenu category={category} setCategory={setCategory}/>
            <FoodDisplay category={category}/>
            <AppDownload/>
        </div>
    )
}