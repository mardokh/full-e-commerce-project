import React from "react"
import "./header.css"
const mario = require("../../images/homewallpaper.jpg")


const Header = () => {

    return (
        <div>
            <div className="admin_searchBar_container">
                <div className="admin_test">Admin panel</div>
                <div className="admin_searchBar_administrator_container">
                    <div className="admin_searchBar_input_container">
                        <i class="fa-solid fa-magnifying-glass" id="glasses_admin"></i>
                        <input className="admin_searchBar" type="text" placeholder="search"/>
                    </div>
                    <div className="admin_administrator_seting_container">
                        <div className="admin_administrator_seting_img" style={{backgroundImage: `url(${mario})`, backgroundSize: "cover"}}></div>
                        <p>Bey Abdelnnour</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header