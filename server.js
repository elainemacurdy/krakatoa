const express = require('express');
const next = require('next');
const routes = require('./lib/dynamicRoutes'); // https://github.com/fridays/next-routes

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
/** UNCOMMENT for native express dynamic routing **/
// const handler = app.getRequestHandler();
/** UNCOMMENT for next-routes dynamic routing **/
const handler = routes.getRequestHandler(app);

app.prepare()
  .then(() => {
    const server = express();

    // Get rid of trailing slashes, since they cause Next much confusion.
    // Alternatively could use something like https://github.com/avinoamr/connect-slashes
    server.use(function(req, res, next) {
      if (req.path.substr(-1) == '/' && req.path.length > 1) {
        const query = req.url.slice(req.path.length);
        res.redirect(301, req.path.slice(0, -1) + query);
      } else {
        next();
      }
    });

    /** UNCOMMENT for native express dynamic routing **/
    // // Special routing for dynamic pages, since Next doesn't handle this natively.
    // // Note: this method also requires use of the `as` attribute in `<Link>`, or the route will (briefly) return a 404.
    // // Could also use something like https://www.npmjs.com/package/nextjs-dynamic-routes
    // server.get('/listing/:id', (req, res) => {
    //   const actualPage = '/listing';
    //   const mergedQueryParams = Object.assign({}, req.query, req.params);
    //   app.render(req, res, actualPage, req.params);
    // });
    //
    // // Default route
    // server.get('*', (req, res) => {
    //   return handler(req, res)
    // });

    /** UNCOMMENT for next-routes dynamic routing **/
    server.use(handler);

    // Start server
    server.listen(4000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:4000');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });