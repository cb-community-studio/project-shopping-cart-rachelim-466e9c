const { authenticate } = require("@feathersjs/authentication").hooks;
const validateAdmin = require('../../hooks/users/validate-admin');
const validateRetrieve = require('../../hooks/orders/validate-retrieve-order');

module.exports = {
    before: {
        all: [authenticate("jwt")],
        find: [validateRetrieve()],
        get: [validateRetrieve()],
        create: [],
        update: [validateAdmin()],
        patch: [validateAdmin()],
        remove: [validateAdmin()],
    },

    after: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: [],
    },

    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: [],
    },
};
