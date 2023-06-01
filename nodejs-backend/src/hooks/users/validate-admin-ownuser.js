module.exports = function (options = {}) {

    return async context => {

        const { data } = context;

        if (context.params.user) {

            if (context.params.user.isAdmin || (context.params.user._id.valueOf() == context.arguments[0])) {

                return context;

            } else {

                throw new Error('You are not allowed to access this');
            }

        }



        

    };

};