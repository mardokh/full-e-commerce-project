import React from "react";
import SlideShow from '../../components/public/SlideShow';
import Produits from '../../components/public/Produits';
import Recettes from '../../components/public/Recettes';
import Footer from '../../components/public/Footer';
import RecettesBanner from '../../components/public/Recettes_banner';
import './layout.css';

const Home = () => {
     return (
        <div>

            {/* Banner produits */}
            <div className="slides_container">
                <SlideShow />
            </div>

            {/* Section produits */}
            <section className="nutrition">
                <Produits />
            </section>

            {/* Banner recettes */}
            <div className="recette_banner">
                <RecettesBanner />
            </div>

            {/* Section recettes */}
            <section className="recettes">
                <Recettes />
            </section>

            {/* Footer */}
            <footer className="footer">
                <Footer />
            </footer>

        </div>
     )
}

export default Home;