const users = require("./users/users.service.js");
const products = require("./products/products.service.js");
const carts = require("./carts/carts.service.js");
const orders = require("./orders/orders.service.js");
const forms = require("./forms/forms.service.js");
const promotions = require("./promotions/promotions.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(products);
  app.configure(carts);
  app.configure(orders);
  app.configure(forms);
  app.configure(promotions);
  // ~cb-add-configure-service-name~
};
