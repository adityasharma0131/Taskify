const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo'); // Fix: Pass session to connect-mongo
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/DB');
const taskRouter = require('./routes/Todo');

const app = express();

// MongoDB session store
const mongoStore = MongoStore.create({
  mongoUrl: 'mongodb+srv://adityasharma0431:anant99@cluster0.z5dehxj.mongodb.net/',
});

app.use(session({
  secret: 'cat',
  resave: false,
  saveUninitialized: true,
  store: mongoStore,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors({
  origin: 'https://taskify-ic9w.vercel.app',
  methods: 'GET, POST, PUT, DELETE',
  credentials: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/task', taskRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
