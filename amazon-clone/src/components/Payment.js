import React, { useState, useEffect } from 'react'
import { useStateValue } from '../StateProvider';
import './Payment.css';
import CheckoutProduct from './CheckoutProduct'
import { Link } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import CurrencyFormat from 'react-currency-format'
import { getBasketTotal } from '../Reducer'
import axios from '../axios'


function Payment() {

    const [{basket, user}, dispatch] = useStateValue()

    const stripe = useStripe()
    const elements = useElements()

    const [ succeeded, setSucceeded] = useState(false)
    const [processing, setProcessing ] = useState('')
    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(null)
    const [ clientSecret, setClientSecret] = useState(true)

    useEffect(() => {
        //generate special stripe secret that allows us to charge client

        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                //stripe expects the total in currencies subunits (if you use Dollars it converts to Cents)
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            })
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret()
    }, [basket])

    const handleSubmit = async (event) => {
        //fancy stripe functionality here
        event.preventDefault()
        setProcessing(true)

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        })
    }

    const handleChange = event => {
        //listen for changes in CardElements
        //display errors of card details
        setDisabled(event.empty)
        setError(event.error ? event.error.message : '')
    }

    return (
        <div className='payment' >
            <div className='payment__container' >
                <h1> 
                    Checkout (
                        <Link to='/checkout'>
                            {basket?.length} items
                        </Link>
                        )
                </h1>
                {/* Payment Section - delivery adress */}
                <div className='payment__section' >
                    <div className='payment__title' >
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address' >
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>
                {/* Payment Section - rewiew items */}
                <div className='payment__section' >
                    <div className='payment__title' >
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment__items' >
                        {basket.map(item => (
                            <CheckoutProduct 
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
                {/* Payment Section - payment method */}
                <div className='payment__section' >
                    <div className='payment__title' >
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment__details' >
                        {/* STRIPE MAGIC GOES HERE */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />

                            <div className='payment__priceContainer' >
                            <CurrencyFormat
                                renderText={(value) => (
                                    <>
                                        <h3>Order Total: {value}</h3>
                                    </>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'$'}
                                />
                                <button disabled={processing || disabled || succeeded} >
                                    <span>{processing ? <p>Processing</p> : 'Buy Now' } </span>
                                </button>
                            </div>
                            {/* Errors */}
                            {error && <div>{error} </div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
