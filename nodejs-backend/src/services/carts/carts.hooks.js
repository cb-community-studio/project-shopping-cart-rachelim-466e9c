const { authenticate } = require("@feathersjs/authentication").hooks;
const validateCart = require('../../hooks/carts/validate-cart');
const validateAdminOwnUser = require('../../hooks/carts/validate-admin-ownuser');
const validateDelete = require('../../hooks/carts/validate-cart-delete');
const validateRetrieve = require('../../hooks/carts/validate-retrieve-cart');
const validateDeleteAfterAdd = require('../../hooks/carts/validate-cart-delete-after-add.js');
const appendProductData = require('../../hooks/products/appendCartProductData');




module.exports = {
    before: {
        all: [authenticate("jwt")],
        find: [validateRetrieve()],
        get: [validateRetrieve()],
        create: [validateCart()],
        update: [validateCart()],
        patch: [validateCart()],
        remove: [validateAdminOwnUser(), validateDelete()],
    },

    after: {
        all: [],
        find: [appendProductData()],
        get: [appendProductData()],
        create: [validateDeleteAfterAdd()],
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
