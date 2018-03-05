/*
 * Load our library dependencies
 */
let express = require('express');
const router = require('./routes/routes')
let path = require('path');

let app = express();

// View engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public')));

// Reroute all our API calls to a dedicated controller.
app.use('/', router);

// Catch 404 and forward to error handler.
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('pages/error', { error: res.locals.message });
});

module.exports = app;