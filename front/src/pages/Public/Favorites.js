import React, { useEffect, useState, useContext } from "react"
import FavoritesProducts from "../../components/public/FavoritesProducts"
import FavoritesRecipes from "../../components/public/favoritesRecipes"
import "./favorites.css"
import { favoriteProductService } from "../../_services/favoriteProduct.service"
import { favoriteRecipeService } from "../../_services/favoriteRecipe.service"
import MyContext from '../../_utils/contexts'


const Favorites = () => {

    // STATES //
    const [favProductsCount, setFavProductsCount] = useState(0)
    const [favRecipesCount, setFavRecipesCount] = useState(0)


    // CONTEXT //
    const { favoritesProductsCount } = useContext(MyContext)
    const { favoritesRecipesCount } = useContext(MyContext)


    // GET FAVORITES PRODUCTS RECIPES COUNTS FUNCTION //
    const getFavCount = async () => {
        try {
            // Get favorites products
            const prodFavCount = await favoriteProductService.favoriteProductCount()

            // Update state
            setFavProductsCount(prodFavCount.data.data.length)

            // Get favorites products
            const recipFavCount = await favoriteRecipeService.favoriteRecipeCount()

            // Update state
            setFavRecipesCount(recipFavCount.data.data.length)

        }
        catch (err) {
            console.error('Error : ', err)
        }
    }


    // GET FAVORITES ON LOAD //
    useEffect(() => {
        getFavCount()
    }, [favoritesProductsCount, favoritesRecipesCount])
    

    return (
        <div className="favories_global_container">
            <div className="favories_fav_products_container">
                <p className="favories_title">Mes produits favoris ({favProductsCount})</p>
                <FavoritesProducts />
            </div>
            <div className="favories_fav_recipes_container">
                <p className="favories_title">Mes recettes favorites({favRecipesCount})</p>
                <FavoritesRecipes />
            </div>
        </div>
    )
}


export default Favorites




