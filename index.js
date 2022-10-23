const express = require('express');
const bodyParser = require('body-parser');
const cookieRouter = require('./server/routes/cookies')

const app = express();

app.use(bodyParser.json());
app.use(cookieRouter);

app.all('*', (req, res) => {
  res.status(404).send('BAD URL');
});

app.listen(3000, () => {
  console.log(`App listening on port 3000`);
})


