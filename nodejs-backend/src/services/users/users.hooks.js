const { authenticate } = require("@feathersjs/authentication").hooks;
const { hashPassword, protect } = require("@feathersjs/authentication-local").hooks;
const validateUser = require('../../hooks/users/validate-user');
const validateUserUp = require('../../hooks/users/validate-user-update');
const validateAdminOwnUser = require('../../hooks/users/validate-admin-ownuser');

module.exports = {
    before: {
        all: [],
        find: [authenticate("jwt"),validateAdminOwnUser()],
        get: [authenticate("jwt"),validateAdminOwnUser()],
        create: [validateUser(), hashPassword("password")],
        update: [authenticate("jwt"), validateUserUp(), hashPassword("password")],
        patch: [authenticate("jwt"), validateUserUp(), hashPassword("password")],
        remove: [authenticate("jwt"),validateAdminOwnUser()],
    },

    after: {
        all: [protect("password")],
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
