const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const serverless = require('serverless-http');
const router = express.Router();
const authToken = require('./services/verifyToken');




require('dotenv/config');
const app = express();
// module.exports.handler = serverless(app);


app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    next();
});

//Middlewares
app.use(cors());
app.use(bodyParser.json());

//IMPORT Routes
const postsRoute = require('./routes/posts');
const authRoute = require('./routes/auth')
const chatsRoute = require('./routes/chats')
const usersRoute = require('./routes/users')
const messagesRoute = require('./routes/messages')

//ROUTES
router.get('/', (req, res) => {res.send('we are on home');});
router.use('/posts', postsRoute);
router.use('/auth', authRoute);
router.use('/chat', authToken, chatsRoute);
router.use('/users', usersRoute);
router.use('/messages', authToken, messagesRoute);





//Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION, 
    { useNewUrlParser: true,useUnifiedTopology: true },
    // {  },
    () =>{
        console.log('connected to DB');
    }
);


//LISTEN
app.listen(process.env.PORT || 9000);

app.use('/app', router);
