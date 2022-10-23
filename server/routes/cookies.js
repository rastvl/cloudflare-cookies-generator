const cookieRouter = require('express').Router();
const { getCookies, sendCookies } = require('../controllers/cookies')

cookieRouter.post('/createTask', getCookies);
cookieRouter.get('/checkTask/:id', sendCookies);

module.exports = cookieRouter;