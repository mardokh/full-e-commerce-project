import React, { useState } from 'react';
import axios from 'axios';
import './addProduct.css';

const AddProduct = () => {

  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: null 
  });

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('name', product.name)
      formData.append('price', product.price)
      formData.append('details', product.description)
      formData.append('image', product.image)

      const response = await axios.post('YOUR_BACKEND_ENDPOINT_HERE', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data)

    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setProduct({
      ...product,
      image: e.target.files[0]
    });
  };

  return (
    <div>
      <form className='add_product_container' onSubmit={handleSubmit}>
        {/* ... your form inputs */}
        <input type='submit' className='btn_new_product_add' value='Ajouter le produit' />
      </form>
    </div>
  );
};

