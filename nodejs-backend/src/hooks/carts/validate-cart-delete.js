
module.exports = function (options = {}) {

    return async (context, res) => {

        try {

            const { data, method } = context;
            console.log("context....", context)

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

            if (databaseCartDataSameUser.data.length != 1) {

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