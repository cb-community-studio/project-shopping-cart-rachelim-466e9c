
module.exports = function (options = {}) {

    return async context => {

        const { data } = context;
        console.log("-------------------------------------",context.result)

        for (var i=0; i < context.result.data.length; i++) {

            const databaseData = await context.app.service("products").find({
                query: {
                    productSKU: context.result.data[i].cartProduct
                }
            });
            context.result.data[i].cartDetail = databaseData.data[0]

            const databaseDataUser = await context.app.service("users").find({
                query: {
                    _id: context.result.data[i].cartUser
                }
            });
            context.result.data[i].cartEmail = databaseDataUser.data[0].email


         }


        return context

    } 
    




};
