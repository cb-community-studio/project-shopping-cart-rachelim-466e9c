module.exports = function (options = {}) {

    return async context => {

        const { data } = context;

        // console.log("User hooks:  ", context.params, " next ", context)

        // if (context.params.user) {

        //     if (context.params.user.isAdmin || (context.params.user._id.valueOf() == context.arguments[0])) {

        //         return context;

        //     } else {

        //         throw new Error('You are not allowed to access this');
        //     }

        // }

        if (context.params.user) {

            if (context.params.user.isAdmin) {
                return context;

            } else {

                context.params.query = {...context.params.query, _id : context.params.user._id.valueOf()}


            }

        }



        

    };

};