const { authenticate } = require("@feathersjs/authentication").hooks;
const validateAdmin = require('../../hooks/users/validate-admin');
const validateProduct = require('../../hooks/products/validate-product');

module.exports = {
    before: {
        all: [],
        find: [],
        get: [],
        create: [authenticate("jwt"), validateAdmin(), validateProduct()],
        update: [authenticate("jwt"), validateAdmin(), validateProduct()],
        patch: [authenticate("jwt"), validateAdmin(), validateProduct()],
        remove: [authenticate("jwt"), validateAdmin()],
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
