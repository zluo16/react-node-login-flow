const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const morgan = require('morgan');
const helmet = require('helmet');
const routes = require('./routes/index');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/login-flow');
const db = mongoose.connection

// Webpack configuration
const configDev = require('./webpack.config.dev');
const webpack = require('webpack');

// Webpack Middleware
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

// Pass in passport for configuration
require('./config/passport')(passport);

// Initialize app
const app = express();

// Set up CORS
app.use(cors());
app.use(helmet());

// Logger
app.use(morgan('dev'));

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Run Webpack Dev Server in development mode
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(configDev);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: configDev.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
};

// Serve static files from React
app.use(express.static(path.join(__dirname, 'public')));

// Set up Mongo store
const mongoStore = new MongoStore({ mongooseConnection: db });

// Express Sessions
app.use(session({
  store: mongoStore,
  secret: 'session secret'
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

// Local host port
app.set('port', process.env.PORT || 3000);

// Set up server
app.listen(app.get('port'), function() {
  console.log('Server set on port ' + app.get('port'));
})
