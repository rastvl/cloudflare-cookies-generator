const taskManager = require('./../../libs/TaskManager');
const { STATUS_OK } = require('./../../utils/constants');

const getCookies = (req, res, next) => {
  const requestId = new Date().getTime();
  res.send({ id: requestId });
  taskManager.runTask(requestId, req.body);
};

const sendCookies = (req, res) => {
  const { id } = req.params;
  const answer = taskManager.getTask(id);

  if (answer.not_found) {
    return res.status(400).send({
      error: "This id doesn't exist"
    });
  }

  if (answer && answer.error && answer.error === 'timeout') {
    return res.status(200).send({
      error: 'Failed to get cookies: timeout',
    });
  }

  if (answer && answer.cookies) {
    if (answer.status === STATUS_OK) {
      taskManager.deleteTask(id);

      return res.send({
        cookies: answer.cookies.split('\n'),
        status: 'done',
        time: answer.time,
      });
    } else {
      return res.send({
        error: 'Failed to get cookies',
      });
    }
  }

  return res.send({
    status: 'waiting',
  });
};

module.exports = {
  getCookies,
  sendCookies,
};
