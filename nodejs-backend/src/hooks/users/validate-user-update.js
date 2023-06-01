module.exports = function (options = {}) {

    return async context => {

        const { data } = context;

        const email = data.email

        // Validate the user data
        const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const phone_regex = /^(01)[0-46-9]*[0-9]{7,8}$/
        const password_regex = /^.{4,10}$/

        if (context.params.user) {

            if (context.params.user.isAdmin || (context.params.user._id.valueOf() == context.arguments[0])) {

                //have not set the condition if they just remain back the email 
                if (email) {

                    const databaseData = await context.app.service("users").find({
                        query: {
                            email
                        }
                    });
                    if (databaseData.data.length) {
                        throw new Error('This email has been exist. Please update with new email or remain old email.');
                    }
                    else if (!data.email.match(email_regex)) {
                        throw new Error('Correct Email Format is required. Eg: username@email.com');
                    }
                    else if (!data.phone.match(phone_regex)){
                        throw new Error('Correct Phone Format is required. Eg: 01267938478');
                    }
                }

                if (data.isAdmin && !context.params.user.isAdmin) {
                    throw new Error('You are not allowed to change this section');
                }

                if (data.password && !data.password.match(password_regex)) {
                    throw new Error('Password with a minimum 4 till maximum 10 characters');
                }

                // throw new Error('Im Here');
            } else {

                throw new Error('You are not allowed to update this user');
            }

        }

        // console.log(context)
        // throw new Error('Testing');


        // if (!data.username || !data.email || !data.password) {

        //     throw new Error('Username, Email and Password is required.');

        // } else {
        //     if (!data.email.match(email_regex)) {
        //         throw new Error('Correct Email Format is required. Eg: username@email.com');
        //     }
        //     else if (databaseData.data.length) {
        //         throw new Error('This email has been exist. Please login or register with new email');
        //     }
            // else if (!data.phone.match(phone_regex)){
            //     throw new Error('Correct Phone Format is required. Eg: 01267938478');
            // }
        // else if (!data.password.match(password_regex)) {
        //     throw new Error('Password with a minimum 4 till maximum 10 characters');
        // }
        // }



        return context;

    };

};