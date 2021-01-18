/* eslint-disable class-methods-use-this */

class Respond {
  async error(res, status = 500, message = 'Server Error', err = {}) {
    return res.status(status).json({
      success: false,
      status,
      message,
      error: err,
    });
  }

  async success(res, status = 200, data = {}, message = 'Success') {
    return res.status(status).json({
      success: true,
      status,
      data,
      message,
    });
  }
}

const respond = new Respond();

export default respond;
