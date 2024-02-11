import React, {useEffect, useState, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './header.css'
import logo from '../../images/logo.png'
import heart from '../../images/heart.png'
import { favoriteProductService } from '../../_services/favoriteProduct.service'
import { favoriteRecipeService } from '../../_services/favoriteRecipe.service'
import Cookies from 'js-cookie'
import MyContext from '../../_utils/contexts'
import { searchBarService } from '../../_services/searchBar.service'


const Header = () => {

    // STATES FROM CONTEXT //
    const { favoritesProductsCount } = useContext(MyContext)
    const { favoritesRecipesCount } = useContext(MyContext)


    // STATES FROM DATABASE //
    const [favoritesProducts, setFavoriteProducts] = useState(0)
    const [favoritesRecipes, setFavoriteRecipes] = useState(0)
    const [useEffectFlag, setUseEffectFlag] = useState(false)
    const [isLoad, setIsload] = useState(false)
    const [research, setResearch] = useState()
    const [searchActive, setSearchActive] = useState(false)


    // REDIRECTION //
    const navigate = useNavigate()


    // GET FAVORITES FUNCTION //
    const getFavorites = async () => {

        try {
            // Get cookies from browser
            const FavoritesProductsCookie = Cookies.get('client_id_favorites_products')
            const FavoritesRecipesCookie = Cookies.get('client_id_favorites_recipes')

            if (FavoritesProductsCookie) {

                // Api call for get favorites products
                const favoties_products = await favoriteProductService.favoriteProductCount()

                // Update state
                setFavoriteProducts(favoties_products.data.data.length)

                // Update loading
                setIsload(true)
            }

            if (FavoritesRecipesCookie) {
                // Api call for get favorites recipes
                const favorites_recipes = await favoriteRecipeService.favoriteRecipeCount()

                // Update state
                setFavoriteRecipes(favorites_recipes.data.data.length)

                // Update loading
                setIsload(true)
            }
        }
        catch (err) {
            console.error(err)
        }
    }


    // API CALL FOR GET FAVORITE //
    useEffect(() => {
        if (!useEffectFlag) {
            getFavorites()
        }
        return () => setUseEffectFlag(true)
    }, [])


    // UPDATE STATE //
    useEffect(() => {
        getFavorites()
    }, [favoritesProductsCount, favoritesRecipesCount])


    // SERACH BAR HANDLE //
    const searchGet = (searchTerm) => {
        
        if (searchTerm.trim() !== "") {
            searchBarService.searchBar(searchTerm)
                .then(res => {
                    setResearch(res.data.data)
                    setSearchActive(true)
                })
                .catch(err => console.error('Error : ', err))
        } else {
            setResearch(null)
            setSearchActive(false)
        }
    }

    // REDIRECT TO ITEM DETAILS //
    const redirection = (itemId) => {
        navigate(`./produit_details/${itemId}`)  
        setSearchActive(false)
    }


    return (
        <div className='header_div'>
            <header>
                <nav>
                    <ul>
                        <li><img src={logo} className='logo'/></li>
                        <div className='angles'>
                            <li className='home'><Link to="/home">Home</Link></li>
                            <li className='produits'><Link to="/produits">Produits</Link></li>
                            <li className='services'><Link to="/services">services</Link></li>
                        </div>
                        <li className='search_barre'>
                            <input placeholder='recherche'onChange={(e) => searchGet(e.target.value)}/>
                            <i class="fa-solid fa-magnifying-glass"/>
                            <div className='serachBar_result_container'>
                                {searchActive &&
                                    research.map(search => (
                                        <div key={search.id}>                                        
                                            <div className='searchBar_item_container' onClick={() => redirection(search.id)}>
                                                <div className='searchBar_item_image' style={{backgroundImage: `url('http://localhost:8989/uploads/${search.image}')`}}></div>
                                                <p>{search.name}</p>
                                            </div>                                       
                                        </div>
                                    ))
                                }
                            </div>
                        </li>
                        <div className='favorites_products_icon'>
                            <Link to="/favorites"><img src={heart} style={{height:'22px', width:'23px'}}/></Link> 
                            <span style={{display: (favoritesProducts + favoritesRecipes === 0) ? 'none' : 'initial'}} className='favorites_products_count'>{favoritesProducts + favoritesRecipes}</span>
                        </div>
                        <li className='panier'><Link to="/panier"><i class="fa-sharp fa-solid fa-bag-shopping"></i><span>0</span></Link></li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Header