const { authenticate } = require("@feathersjs/authentication").hooks;
const validateAdmin = require('../../hooks/users/validate-admin');

module.exports = {
    before: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [authenticate("jwt"),validateAdmin()],
        patch: [authenticate("jwt"),validateAdmin()],
        remove: [authenticate("jwt"),validateAdmin()],
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
