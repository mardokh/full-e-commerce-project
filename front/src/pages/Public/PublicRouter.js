import React from 'react';
import { Routes, Route} from 'react-router-dom';
import { Layout, Home, Panier, Contact, Produits, Services, ProductDetails, RecipeDetails} from '../Public';
import Error from '../../_utils/error';


const PublicRouter = () => {

    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route index element={<Home/>} />
                <Route path='/home' element={<Home/>} />
                <Route path='/contact' element={<Contact/>} />
                <Route path='/panier' element={<Panier/>} />
                <Route path='/produits' element={<Produits/>} />
                <Route path='/services' element={<Services/>} />
                <Route path='/produit_details/:id' element={<ProductDetails/>} />
                <Route path='/recette_details/:id' element={<RecipeDetails/>} />
                <Route path='*' element={<Error/>} />
            </Route>
        </Routes>
    )
}

export default PublicRouter;