import React from "react"
import FavoritesProducts from "../../components/public/FavoritesProducts"
import FavoritesRecipes from "../../components/public/favoritesRecipes"
import "./favorites.css"


const Favorites = () => {

    return (
        <div className="favories_global_container">
            <div className="favories_fav_products_container">
                <p className="favories_title">Mes produits favoris (0)</p>
                <FavoritesProducts />
            </div>
            <div className="favories_fav_recipes_container">
                <p className="favories_title">Mes recettes favorites(0)</p>
                <FavoritesRecipes />
            </div>
        </div>
    )
}


export default Favorites




