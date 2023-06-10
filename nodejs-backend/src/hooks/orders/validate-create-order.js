// Quantity of product must more than the quality saved in cart
// Add user details into user field ,cartUser
// if want to allow admin to update cart, the user field of cart must make sure retrive back the original user !!!

module.exports = function (options = {}) {

    return async (context, res) => {

        try {

            const { data, method } = context;

            console.log("newwwwwwwwwwwwwwwwwwww ", context)

            const orderUser = context.params.user._id.valueOf()

            for (let i = 0; i < data.orderSummary.length; i++) {
                const databaseProductData = await context.app.service("carts").remove(data.orderSummary[i]._id);
              }

            
            


            // Insert user into cart service
            data.orderUser = orderUser

            return context

        } catch (error) {

            throw new Error(`An unknown error occurred--> ${error}`);
        }



    };

};