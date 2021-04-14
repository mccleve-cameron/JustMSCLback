require('./models/User');
require('./models/Track');

var path = require('path');
var http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use(bodyParser.json());
app.use('/signup', authRoutes);
// app.use('/signin', authRoutes);
// app.use('/', userRoutes);
app.use('/accounts', userRoutes);

const mongoUri =
  'mongodb+srv://Admin:Thecamman-1@cluster0.sbihk.mongodb.net/<dbname>?retryWrites=true&w=majority';
if (!mongoUri) {
  throw new Error(
    `MongoURI was not supplied.  Make sure you watch the video on setting up Mongo DB!`
  );
}
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});
mongoose.connection.on('error', (err) => {
  console.error('Error connecting to mongo', err);
});

// app.get('/', requireAuth, (req, res) => {
//   res.send(`Your email: ${req.user.email}`);
// });

// Define the port address and tell express to use this port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function () {
  console.log('API running on localhost: ' + port);
});

// app.listen(3000, () => {
//   console.log('Listening on port 3000');
// });
