const express = require('express')
const app = express()
const mongoose = require("mongoose")
const dotenv = require('dotenv')
dotenv.config();
const port = 5000
app.use(express.json());
const cors = require("cors")
app.use(cors())


const productsRouter = require("./routes/products")
const userRoutes = require("./routes/user")
const cartRoutes = require("./routes/cart")
const itemRoutes = require("./routes/item")




mongoose.connect(process.env.CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("DB Connection Successfull!")).catch((err) => { console.log(err); });


app.use(function (req, res, next) {
    const allowedOrigins = [process.env.FRONTEND, process.env.TESTHOST];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.header('Access-Control-Allow-Credentials', true);
        res.header(
            "Access-Control-Allow-Methods",
            "GET, POST, PUT, DELETE, OPTIONS"
        );
    }

    next();
});




app.use(itemRoutes)
app.use(cartRoutes)
app.use(userRoutes)
app.use(productsRouter)
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})