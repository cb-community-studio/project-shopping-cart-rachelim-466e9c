
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


         }


        return context

    } 
    




};
