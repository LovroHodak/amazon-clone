const functions = require('firebase-functions');
const express = require('express')
const cors = require('cors');
const stripe = require('stripe')('sk_test_51Hj18ZKqS56uvZe8jTz3PG5Vl9OOFfEQYkVf3CSPSk4T8qZ9n3gnTIeTTHzIdj8OI8gIMk9BChwG5Sd52WYJheFv004BW3G4OF')

// API

// - App config
const app = express()

// - Middleware
app.use(cors({ origin: true }))
app.use(express.json())

// - API routes
app.get('/', (req, res) => res.status(200).send('Hello world!'))

app.post('/payments/create', async (req, res) => {
    const total = req.query.total
    console.log('payment request recieved BOOM BOOOOM >>> ', total)
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,    // subunits of currency
        currency: 'usd'
      })
    res.status(201).send({
        clientSecret: paymentIntent.client_secret
    })
})

// - Listen Commands
exports.api = functions.https.onRequest(app)

// Example endpoint
// http://localhost:5001/clone-3e0ac/us-central1/api












// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });