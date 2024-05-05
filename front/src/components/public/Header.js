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
import { shoppingSerive } from '../../_services/shoppingCart.service'
import CustomLoader from '../../_utils/customeLoader/customLoader'
import UserAccount from '../../pages/User/account'


const Header = () => {

    // CONTEXT //
    const { favoritesProductsCount } = useContext(MyContext)
    const { favoritesRecipesCount } = useContext(MyContext)
    const { shoppingCartCount } = useContext(MyContext)
    const { userAccountlogin } = useContext(MyContext)
    const { userAccountloginLoading } = useContext(MyContext)


    // STATES //
    const [favoritesProducts, setFavoriteProducts] = useState(0)
    const [favoritesRecipes, setFavoriteRecipes] = useState(0)
    const [shoppingCarts, setShoppingCarts] = useState(0)
    const [useEffectFlag, setUseEffectFlag] = useState(false)
    const [research, setResearch] = useState()
    const [searchActive, setSearchActive] = useState(false)
    const [userOptionsDisp, setuserOptionsDisp] = useState(false)

    
    // GET CURRENT ACTIVE LINK //
    const url = window.location.href
    const parts = url.split('/')
    const lastSegment = parts[parts.length - 1]
    const [activeLink, setActiveLink] = useState(lastSegment.length === 0 ? 'home' : lastSegment)


    // HANDLE ACTIVE LINK //
    const handleNavLinkClick = (link) => {
        setActiveLink(link)
    }


    // REDIRECTION //
    const navigate = useNavigate()


    // GET FAVORITES FUNCTION //
    const getFavEndShop = async () => {

        try {
            // Get cookies from browser
            const FavoritesProductsCookie = Cookies.get('client_id_favorites_products')
            const FavoritesRecipesCookie = Cookies.get('client_id_favorites_recipes')
            const ShoppingCartCookies = Cookies.get('client_id_shopping_carts')

            if (FavoritesProductsCookie) {

                // Api call for get favorites products
                const favoties_products = await favoriteProductService.favoriteProductCount()

                // Update state
                setFavoriteProducts(favoties_products.data.data.length)
            }

            if (FavoritesRecipesCookie) {
                // Api call for get favorites recipes
                const favorites_recipes = await favoriteRecipeService.favoriteRecipeCount()

                // Update state
                setFavoriteRecipes(favorites_recipes.data.data.length)
            }

            if (ShoppingCartCookies) {

                // Api call for get shopping carts
                const shopping_carts = await shoppingSerive.shoppingCount()

                setShoppingCarts(shopping_carts.data.data.length)
            }
        }
        catch (err) {
            console.error(err)
        }
    }


    // API CALL FOR GET FAVORITE //
    useEffect(() => {
        if (!useEffectFlag) {
            getFavEndShop()
        }
        return () => setUseEffectFlag(true)
    }, [])


    // UPDATE STATE //
    useEffect(() => {
        getFavEndShop()
    }, [favoritesProducts, favoritesRecipes, favoritesProductsCount, favoritesRecipesCount, shoppingCarts, shoppingCartCount])


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
        navigate(`/produit_details/${itemId}`)
        navigate(0)
        setSearchActive(false)
    }


    // REDIRECT TO USER INSCRIPTION //
    const inscriptionFormdisplay = () => {
        setuserOptionsDisp(false)
        navigate('/login_inscription/main/inscription')
    }


    // OPEN/CLOSE USER OPTION //
    const userOptions = () => {
        setuserOptionsDisp(!userOptionsDisp)
    }


    // REDIRECT TO USER CONNECTION //
    const connectionFormDisp = () => {
        setuserOptionsDisp(false)
        navigate('/login_inscription/main/connexion')
    }


    return (
        <div className='header_div'>
            <header>
                <nav>
                    <ul>
                        <li><img src={logo} className='logo'/></li>
                        <div className='angles'>
                            <li className={activeLink === 'home' ? 'home active' : 'home'}>
                                <Link to="/home" onClick={() => handleNavLinkClick('home')}>Home</Link>
                            </li>
                            <li className={activeLink === 'produits' ? 'produits active' : 'produits'}>
                                <Link to="/produits" onClick={() => handleNavLinkClick('produits')}>Blog</Link>
                            </li>
                            <li className={activeLink === 'services' ? 'services active' : 'services'}>
                                <Link to="/services" onClick={() => handleNavLinkClick('services')}>Services</Link>
                            </li>
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
                        <div className='shopping_cart_icon_container'>
                            <Link to="/panier"><i class="fa-sharp fa-solid fa-bag-shopping" id='shopping_cart_icon'></i></Link>
                            <span style={{display: shoppingCarts === 0 ? 'none' : 'initial'}} className='shopping_cart_icon_count'>{shoppingCarts}</span>
                        </div>
                        <div className='user_account_icon_container'>
                            <i class="fa-solid fa-user" id='user_account_icon' onClick={userOptions}></i>
                            {userOptionsDisp &&
                                <div className='user_options_container'>
                                    {userAccountloginLoading ?
                                        <div>
                                            <CustomLoader/>
                                        </div>
                                    : userAccountlogin ?
                                        <div>
                                            <UserAccount/>
                                        </div>
                                    : <div>
                                        <button onClick={connectionFormDisp}>Se connecter</button>
                                        <button onClick={inscriptionFormdisplay}>S'inscrire</button>
                                      </div>
                                    }
                                </div>
                            }
                        </div>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Header