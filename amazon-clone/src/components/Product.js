import React from 'react'
import './Product.css'

function Product() {
    return (
        <div className='Product' >
            <div className='product__info' >
                <p>The Lean Startup: How Constant Innovation</p>
                <p className='product__price' >
                    <small>$</small>
                    <strong>19.99</strong>
                </p>
                <div className='product__rating' >
                    <p>⭐</p>
                    <p>⭐</p>
                    <p>⭐</p>
                </div>
            </div>
        </div>
    )
}

export default Product
