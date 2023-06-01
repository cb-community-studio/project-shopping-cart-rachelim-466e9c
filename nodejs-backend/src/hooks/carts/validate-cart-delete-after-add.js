
module.exports = function (options = {}) {

    return async context => {

        const { data } = context;
        console.log("-------------------------------------",context)

        const databaseCartDataSameUser = await context.app.service("carts").find({
            query: {
                cartUser: context.data.cartUser, cartProduct: context.data.cartProduct
            }
        });

        if (databaseCartDataSameUser.data.length != 1) {

            const deleteOldCart = await context.app.service("carts").remove(databaseCartDataSameUser.data[0]._id.valueOf());
            if (deleteOldCart) {
                return context;
            }

        };
        return context

    } 
    




};