const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars').engine;
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const homeRoutes = require('./routes/Home');
const dashboardRoutes = require('./routes/Dashboard');
const path = require('path')
const hbHelper = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3002;

const sess = {
    secret: process.env.SESSION_SECRET || 'Super secret',
    cookie: { maxAge: 15 * 60 * 1000 }, //Session will expire after 15 minutes
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

app.engine('handlebars', exphbs({
    helpers: hbHelper,
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', homeRoutes);
app.use('/dashboard', dashboardRoutes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server running in http://localhost:${PORT}`));
});