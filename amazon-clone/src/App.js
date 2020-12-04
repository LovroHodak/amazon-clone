import React, { useEffect } from 'react'
import './App.css';
import Header from './components/Header'
import Home from './components/Home'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Checkout from './components/Checkout'
import Login from './components/Login'
import { auth } from './firebase'
import { useStateValue } from './StateProvider'
import Payment from './components/Payment'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Orders from './components/Orders'

const promise = loadStripe(
  'pk_test_51Hj18ZKqS56uvZe83wuhJjH6JFhxzj139IXZQAFhBT3NNzhJir4vntXcjEOha7Gw4JK6QQzD2Y2BEI4CFycD3LoW00GYaFr3so'
)



function App() {
  const [{}, dispatch] = useStateValue()

  useEffect(() => {
    //only runs 1, when app component loads
    auth.onAuthStateChanged(authUser => {
      console.log('The user is: ', authUser)

      if(authUser){
        //user just logged in or the user was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        //the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    //BEM
    <Router>
      <div className="app">
        

        <Switch>
          <Route path='/orders' >
            <Header />
            <Orders />
          </Route>

          <Route path='/login' >
            <Login />
          </Route>

          <Route path='/checkout' >
            <Header />
            <Checkout />
          </Route>

          <Route path='/payment' >
            <Header />
            <Elements stripe={promise} >
              <Payment />
            </Elements>
          </Route>
          
          <Route path='/' >
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
