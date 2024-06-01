import React, {useEffect, useState, useContext, useRef} from 'react'
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
import { UserService } from '../../_services/user.service'
import CornerAccount from '../../pages/User/cornerAccount'
import CustomLoader from '../../_utils/customeLoader/customLoader'



const Header = () => {

    // CONTEXT //
    const { favoritesProductsCount } = useContext(MyContext)
    const { favoritesRecipesCount } = useContext(MyContext)
    const { shoppingCartCount } = useContext(MyContext)


    // STATES //
    const [favoritesProducts, setFavoriteProducts] = useState(0)
    const [favoritesRecipes, setFavoriteRecipes] = useState(0)
    const [shoppingCarts, setShoppingCarts] = useState(0)
    const [useEffectFlag, setUseEffectFlag] = useState(false)
    const [research, setResearch] = useState()
    const [searchActive, setSearchActive] = useState(false)
    const [userOptionsDisp, setuserOptionsDisp] = useState(false)
    //const [accountLogin, setAccountLogin] = useState(false)
    const [isLoad, setISload] = useState(false)
    const [isLogout, setIsLogout] = useState(true)


    // REFERENCES //
    const userOptionsRef = useRef(null)

    
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


    // GET USER LOGIN COOKIE //
    const loginUserId = Cookies.get('userId')


    // SET CORNER ACCOUNT CONNECTED FUNCTION
    const cornerAccountConnected = async () => {

        try {

            // Check login cookie
            if (loginUserId) {

                setIsLogout(false)

                 // Check token validity
                const res = await UserService.isLogged()
                

                // Set loader
                setISload(true)
            }
        }
        catch (err) {
            console.error('Error :', err)
        }
    }


    // SET CORNER ACCOUNT ONLOAD
    useEffect(() => {
        cornerAccountConnected()
    }, [loginUserId])


    // USER OPTIONS CLICK EVENT HANDLING //
    const handleClickOutside = (event) => {
        if (userOptionsRef.current && !userOptionsRef.current.contains(event.target)) {
            setuserOptionsDisp(false)
        }
    }


    useEffect(() => {
        document.addEventListener("click", handleClickOutside);

        return () => {
        document.removeEventListener("click", handleClickOutside);
        }
    }, [])


    // REDIRECT TO USER ACCOUNT //
    const redirectToAccount = () => {
        setuserOptionsDisp(false)
        navigate(`/user/account/${loginUserId}`)
    }


    // LOGOUT //
    const userLogout = () => {
        UserService.logout()
        Cookies.remove('userId')
        window.location.reload()
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
                            <Link to="/favorites">
                                <svg className="svg-icon-header" viewBox="0 0 20 20">
							        <path fill="none" d="M13.22,2.984c-1.125,0-2.504,0.377-3.53,1.182C8.756,3.441,7.502,2.984,6.28,2.984c-2.6,0-4.714,2.116-4.714,4.716c0,0.32,0.032,0.644,0.098,0.96c0.799,4.202,6.781,7.792,7.46,8.188c0.193,0.111,0.41,0.168,0.627,0.168c0.187,0,0.376-0.041,0.55-0.127c0.011-0.006,1.349-0.689,2.91-1.865c0.021-0.016,0.043-0.031,0.061-0.043c0.021-0.016,0.045-0.033,0.064-0.053c3.012-2.309,4.6-4.805,4.6-7.229C17.935,5.1,15.819,2.984,13.22,2.984z M12.544,13.966c-0.004,0.004-0.018,0.014-0.021,0.018s-0.018,0.012-0.023,0.016c-1.423,1.076-2.674,1.734-2.749,1.771c0,0-6.146-3.576-6.866-7.363C2.837,8.178,2.811,7.942,2.811,7.7c0-1.917,1.554-3.47,3.469-3.47c1.302,0,2.836,0.736,3.431,1.794c0.577-1.121,2.161-1.794,3.509-1.794c1.914,0,3.469,1.553,3.469,3.47C16.688,10.249,14.474,12.495,12.544,13.966z"></path>
						        </svg>
                            </Link> 
                            <span style={{display: (favoritesProducts + favoritesRecipes === 0) ? 'none' : 'initial'}} className='favorites_products_count'>{favoritesProducts + favoritesRecipes}</span>
                        </div>
                        <div className='shopping_cart_icon_container'>
                            <Link to="/panier">
                                <svg className="svg-icon-header" viewBox="0 0 20 20">
							        <path fill="none" d="M17.696,9.368H2.305c-0.189,0-0.367,0.092-0.478,0.245c-0.11,0.155-0.141,0.352-0.08,0.532l2.334,6.918c0.081,0.238,0.305,0.4,0.556,0.4h10.735c0.253,0,0.478-0.162,0.557-0.402l2.323-6.917c0.062-0.179,0.03-0.376-0.079-0.531C18.062,9.459,17.886,9.368,17.696,9.368z M14.95,16.287H5.062l-1.938-5.743h13.753L14.95,16.287z"></path>
							        <path fill="none" d="M6.345,7.369c0.325,0,0.588-0.263,0.588-0.588c0-1.691,1.376-3.067,3.067-3.067c1.691,0,3.067,1.376,3.067,3.067c0,0.325,0.264,0.588,0.588,0.588c0.326,0,0.589-0.263,0.589-0.588c0-2.34-1.904-4.243-4.244-4.243c-2.34,0-4.244,1.903-4.244,4.243C5.757,7.106,6.02,7.369,6.345,7.369z"></path>
						        </svg>
                            </Link>
                            <span style={{display: shoppingCarts === 0 ? 'none' : 'initial'}} className='shopping_cart_icon_count'>{shoppingCarts}</span>
                        </div>
                        <div className='user_account_icon_container' ref={userOptionsRef}>
                            <svg className="svg-icon-header" viewBox="0 0 20 20" onClick={userOptions} style={{cursor: "pointer"}}>
                                <path fill="none" d="M10,10.9c2.373,0,4.303-1.932,4.303-4.306c0-2.372-1.93-4.302-4.303-4.302S5.696,4.223,5.696,6.594C5.696,8.969,7.627,10.9,10,10.9z M10,3.331c1.801,0,3.266,1.463,3.266,3.263c0,1.802-1.465,3.267-3.266,3.267c-1.8,0-3.265-1.465-3.265-3.267C6.735,4.794,8.2,3.331,10,3.331z"></path>
                                <path fill="none" d="M10,12.503c-4.418,0-7.878,2.058-7.878,4.685c0,0.288,0.231,0.52,0.52,0.52c0.287,0,0.519-0.231,0.519-0.52c0-1.976,3.132-3.646,6.84-3.646c3.707,0,6.838,1.671,6.838,3.646c0,0.288,0.234,0.52,0.521,0.52s0.52-0.231,0.52-0.52C17.879,14.561,14.418,12.503,10,12.503z"></path>
                            </svg>
                            {userOptionsDisp &&
                                <div className='user_options_container'>
                                    { isLogout ? (
                                        <div>
                                            <button onClick={connectionFormDisp}>Se connecter</button>
                                            <button onClick={inscriptionFormdisplay}>S'inscrire</button>
                                        </div>
                                    ): !isLoad ? (
                                        <CustomLoader/>
                                    ):
                                    <div className='cornerAccount_account_container'>
                                        <CornerAccount/>
                                        <div id="cornerAccount_btn_container">
                                            <button onClick={redirectToAccount}>mon compte</button>
                                            <button onClick={userLogout}>deconnexion</button>
                                        </div>
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