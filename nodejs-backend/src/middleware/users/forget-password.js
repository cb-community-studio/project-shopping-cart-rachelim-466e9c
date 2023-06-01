exports.forgetPassword = async (context, res) => {

    try {
        const { email = null, username = null, password=null } = context.query;

        const databaseData = await context.app.service("users").find({
            query: {
                email, username
            }
        });
        console.log(context.params)
        if (databaseData.data.length) {


            const password_regex = /^.{4,10}$/
            if (!password){
                throw new Error('Please enter your password with a minimum 4 till maximum 10 characters');
            }
            else if (!password.match(password_regex)) {
                throw new Error('Password with a minimum 4 till maximum 10 characters');
            } else {
                const updatePassword = await context.app.service("users").patch(databaseData.data, {
                    password: password
                });
                res.json({ result: updatePassword, message: 'Correct' });
            }


        }
        else {
            res.json({ message: 'Forget Password: Please provide your correct email and username.' });
        }


    } catch (error) {
        res.status(500).send(`An unknown error occurred--> ${error}`);
    }


};
