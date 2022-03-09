// requires for express/express-session/path/controllers/helpers/express-handlebars
const express = require('express');
const session = require('express-session');
const path = require('path');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');

//sequelize requires
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//express app
const app = express();

//defining PORT for heroku or localhost number
const PORT = process.env.PORT || 3001;

//express-handlebars create for helpers
const hbs = exphbs.create({ helpers });

//session stuff
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
// Handlebars setup
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//express use for json/urlencoded/static path
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//use routes
app.use(routes);

//sequelize sync for connection
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});