//currently do for delete, for edit do directly at validate cart
module.exports = function (options = {}) {

    return async context => {

        const { data } = context;

        const databaseCartData = await context.app.service("carts").find({
            query: {
                _id: context.id
            }
        });

        if(!databaseCartData.data.length){
            throw new Error(`Document not found`);

        }


        if (context.params.user) {

            if (context.params.user.isAdmin || (context.params.user._id.valueOf() == databaseCartData.data[0].cartUser)) {

                return context;

            } else {

                throw new Error('You are not allowed to access this');
            }

        }



        

    };

};