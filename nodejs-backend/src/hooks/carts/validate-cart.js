// Quantity of product must more than the quality saved in cart
// Add user details into user field ,cartUser
// if want to allow admin to update cart, the user field of cart must make sure retrive back the original user !!!

module.exports = function (options = {}) {

    return async (context, res) => {

        try {

            const { data, method } = context;

            // every time create or patch must bring along the cartProduct
            if (!data.cartProduct){
                throw new Error('Please insert the product sku');

            }
            const productSKU = data.cartProduct
            const user_detail = context.params.user._id.valueOf()

            const databaseProductData = await context.app.service("products").find({
                query: {
                    productSKU
                }
            });
                
            console.log(context)

            // Check the existing cart
            const databaseCartData = await context.app.service("carts").find({
                query: {
                    cartProduct: productSKU, cartUser: user_detail
                }
            });

            console.log(context)

            // Insert user into cart service
            data.cartUser = context.params.user._id.valueOf()

            if (databaseProductData.data[0].productInStock >= data.cartUnit) {

                if (!databaseCartData.data.length && !context.id) {

                    let inStock = databaseProductData.data[0].productInStock - data.cartUnit

                    const updateProduct = await context.app.service("products").patch(databaseProductData.data, {
                        productInStock: inStock
                    });

                    if (updateProduct){
                        return context;
                    }

                } else {

                    if (!databaseCartData.data.length){
                        throw new Error('Please create your own cart.');
                    }else if (context.id && context.id != databaseCartData.data[0]._id.valueOf()){
                        throw new Error('You are not allowed to update this cart');
                    } 

                    // if got id, mean direct from patch else is addition from create
                    console.log("databaseProductData", databaseProductData)
                    console.log("databaseCartData", databaseCartData)

                    let inStock = context.id ? databaseProductData.data[0].productInStock - (data.cartUnit - databaseCartData.data[0].cartUnit) : databaseProductData.data[0].productInStock - data.cartUnit

                    context.data.cartUnit = context.id ? context.data.cartUnit : databaseCartData.data[0].cartUnit + context.data.cartUnit
                    // context.id = context.id ? context.id : databaseCartData.data[0]._id.valueOf()


                    console.log(context)
                    

                    const updateProduct = await context.app.service("products").patch(databaseProductData.data, {
                        productInStock: inStock
                    });

                    if (updateProduct){

                        return context
                    }

                }

            }
            else {

                throw new Error('Quantity selected exceed the minimum.');

            }

            throw new Error(`Please try again`);

        } catch (error) {

            throw new Error(`An unknown error occurred--> ${error}`);
        }



    };

};