const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const hpp = require('hpp');
const helmet = require('helmet');
const http = require('http');
const serverPort = process.env.PORT || 8080;

const app = express();
const router = express.Router();

router.use([
  compression(),
  helmet({
    frameguard: false,
    dnsPrefetchControl: {
      allow: true,
    },
  }),
  bodyParser.urlencoded({ limit: '100kb', extended: true }),
  bodyParser.json({ limit: '100kb' }),
  hpp(),
]);

router.use(express.static(path.join(__dirname, 'build')));
router.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use('/', router);

http.createServer(app).listen(serverPort, () => {
  console.log(`App listening on port http://localhost:${serverPort}/`);
});
