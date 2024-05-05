import React, { useState } from "react"
import UserLogin from "../User/Login"
import UserInscription from "../../components/public/user_inscription"
import "./inscription_login.css"



const InscriptionLogin = () => {

    // STATES //
    const [switchisActive, setSwitchIsActive] = useState(false)
    const [inscriptionIsActive, setInscriptionIsActive] = useState(false)
    const [connexionIsActive, setConnexionIsActive] = useState(true)


    const moveSwitch = () => {
        setSwitchIsActive(!switchisActive)
        setConnexionIsActive(!connexionIsActive)
        setInscriptionIsActive(!inscriptionIsActive)
    }


    return (
        <div className="inscriptionLogin_globale_container">
            <div className="inscriptionLogin_parent_container">
                <div className="inscriptionLogin_component_container">
                    <UserLogin/>
                </div>
                <div className="inscriptionLogin_component_container">
                    <UserInscription/>
                </div>
                <div className={switchisActive ? "inscriptionLogin_switcher_blog_active" : "inscriptionLogin_switcher_blog"}></div>
                <div className={inscriptionIsActive ? "inscriptionLogin_inscription_banner_container_active" : "inscriptionLogin_inscription_banner_container"}>
                    <div className="inscriptionLogin_inscription_banner_sub_container">
                        <p className="inscriptionLogin_inscription_banner_text">Cree un compte vous permet plus de reactivité avec nous</p>
                        <button className="inscriptionLogin_inscription_switch_btn" onClick={moveSwitch}>inscription</button>
                    </div>
                </div>
                <div className={connexionIsActive ? "inscriptionLogin_connexion_banner_container_active" : "inscriptionLogin_connexion_banner_container"}>
                    <div className="inscriptionLogin_connexion_banner_sub_container">
                        <p className="inscriptionLogin_connexion_banner_text">Connectez vous et accedez a votre espace client</p>
                        <button className="inscriptionLogin_connexion_switch_btn" onClick={moveSwitch}>connexion</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InscriptionLogin;
