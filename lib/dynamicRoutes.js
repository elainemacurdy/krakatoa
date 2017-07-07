// https://github.com/fridays/next-routes
const routes = module.exports = require('next-routes')();

routes
  .add('listing', '/listing/:id', 'listing');
