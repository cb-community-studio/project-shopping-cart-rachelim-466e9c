module.exports = function (options = {}) {

    return async context => {

        const { data } = context;

        if (context.params.user) {

            if (context.params.user.isAdmin) {

                return context;

            } else {

                throw new Error('You are not allowed to access this');
            }

        }



        

    };

};