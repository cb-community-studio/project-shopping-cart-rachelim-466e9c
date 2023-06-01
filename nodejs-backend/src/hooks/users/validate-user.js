module.exports = function (options = {}) {

    return async context => {

        const { data } = context;

        const email = data.email

        // Validate the user data
        const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const phone_regex = /^(01)[0-46-9]*[0-9]{7,8}$/
        const password_regex = /^.{4,10}$/

        const databaseData = await context.app.service("users").find({
            query: {
                email
            }


        });
        console.log(data)

        // Need to be a member even preset is admin
        data.isAdmin = false

        if (!data.username || !data.email || !data.password || !data.phone) {

            throw new Error('Username, Email, Phone and Password is required.');

        } else {
            if (!data.email.match(email_regex)) {
                throw new Error('Correct Email Format is required. Eg: username@email.com');
            }
            else if (databaseData.data.length) {
                throw new Error('This email has been exist. Please login or register with new email');
            }
            else if (!data.phone.match(phone_regex)){
                throw new Error('Correct Phone Format is required. Eg: 01267938478');
            }
            else if (!data.password.match(password_regex)) {
                throw new Error('Password with a minimum 4 till maximum 10 characters');
            }
        }



        return context;

    };

};