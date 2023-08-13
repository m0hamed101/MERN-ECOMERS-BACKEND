const mongoose = require("mongoose");
const ObjectID = mongoose.Schema.Types.ObjectId

const ProductsSchema = new mongoose.Schema(
    {
        owner: {
        type: ObjectID,
        // required: true,
        ref: 'User'
    },
        id: { type: Number, require: true },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String },
        image: { type: String, required: true },
    },
);

// module.exports = mongoose.model("products", ProductsSchema);

const Item = mongoose.model("products", ProductsSchema)
module.exports = Item