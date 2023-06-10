
module.exports = function (options = {}) {

    return async (context, res) => {

        try {

            const { data, method } = context;
            console.log("newwwwwwwwwwwwwwwwwwww contxettt", context)

            const databaseCartData = await context.app.service("carts").find({
                query: {
                    _id: context.id
                }
            });

            if (!databaseCartData.data.length) {
                throw new Error(`Document not found`);

            }

            const databaseProductData = await context.app.service("products").find({
                query: {
                    productSKU: databaseCartData.data[0].cartProduct
                }
            });

            const databaseCartDataSameUser = await context.app.service("carts").find({
                query: {
                    cartUser: databaseCartData.data[0].cartUser, cartProduct: databaseCartData.data[0].cartProduct
                }
            });
            
            // new setting, test error
            if (databaseCartDataSameUser.data.length != 1 || databaseCartDataSameUser.data[0].cartStatus == true) {

                return context

            } else {
                let inStock = databaseProductData.data[0].productInStock + databaseCartData.data[0].cartUnit


                const updateProduct = await context.app.service("products").patch(databaseProductData.data, {
                    productInStock: inStock
                });

                if (updateProduct) {
                    return context;
                }

            }





        } catch (error) {

            throw new Error(`An unknown error occurred--> ${error}`);
        }



    };

};