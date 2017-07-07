const express = require('express');
const next = require('next');
const routes = require('./lib/dynamicRoutes'); // https://github.com/fridays/next-routes

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
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