const Cart = require("../modules/Cart");

exports.addItemToCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).exec();

    if (cart) {
      // if cart already exists then update cart by quantity
      const product = req.body.cartItems.product;
      const item = cart.cartItems.find((c) => c.product === product);

      if (item) {
        try {
          const updatedCart = await Cart.findOneAndUpdate(
            {
              user: req.user._id,
              cartItems: req.body.cartItems,
            },
            {
              $set: {
                "cartItems.$": {
                  // ...req.body.cartItems,
                  quantity:item.quantity +1,
                }
              },
            },
            { new: true } // Setting { new: true } returns the updated cart after the update
          ).exec();

          return res.status(201).json({ cart: updatedCart });
        } catch (err) {
          return res.status(400).json({ err });
        }
      } else {
        try {
          const updatedCart = await Cart.findOneAndUpdate(
            { user: req.user._id },
            {
              $push: { cartItems: req.body.cartItems },
            },
            { new: true } // Setting { new: true } returns the updated cart after the update
          ).exec();

          return res.status(201).json({ cart: updatedCart });
        } catch (err) {
          return res.status(400).json({ err });
        }
      }
    } else {
      // if cart not exist then create a new cart
      const newCart = new Cart({
        user: req.user._id,
        cartItems: [req.body.cartItems],
      });

      const savedCart = await newCart.save();
      return res.status(201).json({ cart: savedCart });
    }
  } catch (err) {
    return res.status(400).json({ err });
  }
};


exports.deleteCartItem = async (req, res) => {
  try {
    const product = req.body.cartItems.product;
    const updatedCart = await Cart.findOneAndUpdate(
      {
        user: req.user._id,
        "cartItems.product": product,
      },
      {
        $pull: { cartItems: { product: product } },
      },
      { new: true }
    ).exec();

    if (updatedCart) {
      return res.status(200).json({ cart: updatedCart });
    } else {
      return res.status(404).json({ message: "Product not found in the cart." });
    }
  } catch (err) {
    return res.status(400).json({ err });
  }
};



// exports.addItemToCart = async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ user: req.user._id }).exec();

//     if (cart) {
//       // if cart already exists then update cart by quantity
//       const product = req.body.cartItems.product;
//       const item = cart.cartItems.find(c.product == req.cartItems.product)
//       if (item) {
//         try {
//           const _cart = await Cart.findOneAndUpdate(
//             {
//               user: req.user._id,
//               cartItems: [req.body.cartItems]
//             },
//             {
//               $set: {
//                 cartItems:
//                 {
//                   ...req.body.cartItems,
//                   quantity: item.quantity + req.body.cartItems.quantity
//                 }
//               },
//             }
//           );
//           return res.status(201).json({ cart: _cart });
//         } catch (err) {
//           return res.status(400).json({ err });
//         }

//       } else {
//         try {
//           const _cart = await Cart.findOneAndUpdate(
//             { user: req.user._id },
//             {
//               $push: { cartItems: req.body.cartItems },
//             }
//           );
//           return res.status(201).json({ cart: _cart });
//         } catch (err) {
//           return res.status(400).json({ err });
//         }
//       }


//       // return res.status(200).json({ message: cart });
//     } else {
//       // if cart not exist then create a new cart
//       const newCart = new Cart({
//         user: req.user._id,
//         cartItems: [req.body.cartItems],
//       });

//       const savedCart = await newCart.save();
//       return res.status(201).json({ cart: savedCart });
//     }
//   } catch (err) {
//     return res.status(400).json({ err });
//   }
// };
























// exports.addItemToCart = (req, res) => {
//   Cart.findOne({ user: res.user._id })
//     .exec((err, cart) => {
//       if (err) return res.status(400).json({ err });
//       if (cart) {
//         const product = res.body.cartItem.product;
//         const item = cart.cartItem.find(c => c.product == product);

//         if (item) {
//           Cart.findOneAndUpdate({ "user": res.user._id, "cartItems.product": product }, {
//             "$set": {
//               "cartItme": { ...req.body.cartItems, quantity: item.quantity + req.body.cartItem.quantity }
//             }
//           })
//             .exec((err, _cart) => {
//               if (err) return res.status(400).json({ err });
//               if (_cart) {
//                 if (err) return res.status(200).json({ cart: _cart });
//               }
//             })
//         } else {
//           Cart.findOneAndUpdate({ user: req.user._id }, {
//             "$push": {
//               "cartItems": req.body.cartItem
//             }
//           }).exec((err, _cart) => {
//             if (err) return res.status(400).json({ err });
//             if (_cart) {
//               if (err) return res.status(200).json({ cart: _cart });
//             }
//           })
//         }
//       }else{
//         const cart = new Cart({
//           user: req.user._id,
//           cartItems: req.body.cartItems,
//         });

//         cart.save().then((cart) => {
//           return res.status(201).json({ cart })
//         })
//         .catch((err)=>{return res.status(400).json({ err })}
//         )
//       }
//     }
//     )
// }
