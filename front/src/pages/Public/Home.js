import React, {useContext} from "react"
import SlideShow from '../../components/public/SlideShow'
import Produits from '../../components/public/Produits'
import Recettes from '../../components/public/Recettes'
import Footer from '../../components/public/Footer'
import RecettesBanner from '../../components/public/Recettes_banner'
import ProductNotes from '../../components/public/productNotes'
import './layout.css'
import MyContext from "../../_utils/contexts"


const Home = () => {

    // STATES //
    const { productsNotesDisplay } = useContext(MyContext)


    // RENDERING //
    return (
    <div>

        {/* Banner produits */}
        <div className="slides_container">
            <SlideShow />
        </div>

        {/* Products notes */}
        {productsNotesDisplay &&
            <ProductNotes />
        }

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

export default Home