import { assets } from "../../assets/assets"
import "./Footer.css"

export default function Footer(){
    return(
        <div className="footer" id="footer">
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" />
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat quis, illum eligendi cum quaerat optio. Aspernatur commodi ratione 
                        obcaecati optio ipsum autem, accusantium Repellat quis, illum eligendi cum quaerat optio. Aspernatur commodi ratione 
                        obcaecati optio ipsum autem, accusantium 
                    </p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>Company</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>Get in touch</h2>
                    <ul>
                        <li>+123465984</li>
                        <li>contact@tomato.com</li>
                    </ul>
                </div>  
            </div>
            
            <hr />
            <p className="footer-copyright">Copyright 2024 &copy; Tomato.com - All Right Reserved.</p>

        </div>
    )
}