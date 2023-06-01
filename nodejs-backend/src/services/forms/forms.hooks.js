const { authenticate } = require("@feathersjs/authentication").hooks;
const validateAdmin = require('../../hooks/users/validate-admin');

module.exports = {
    before: {
        all: [authenticate("jwt")],
        find: [],
        get: [],
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
