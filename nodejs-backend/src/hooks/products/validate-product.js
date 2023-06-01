module.exports = function (options = {}) {

    return async (context, res) => {

        try {

            const { data } = context;

            const sku = data.sku

            // const databaseData = await context.app.service("products").find({
            //     query: {
            //         sku
            //     }
            // });

            console.log(data)

            if (data.productPrice < 0 || data.productRating < 0 || data.productInStock < 0 ) {
                throw new Error('The value cannot be negative integer.');
            }

            return context;

        } catch (error) {
            throw new Error(`An unknown error occurred--> ${error}`);
        }



    };

};