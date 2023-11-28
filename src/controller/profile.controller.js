const httpStatus = require('http-status');

const ProfileService = require('../services/profile.service');

const deposit = async (req, res) => {
  try {
    const response = await ProfileService.deposit(req);
    if (typeof response === 'string' && response.includes('more than 25% his total of jobs to pay')) {
      res.status(httpStatus.CONFLICT).json({ message: `${response}` });

    } else if (typeof response === 'string' && response.includes("There are no unpaid jobs for client")) {
      res.status(httpStatus.NOT_FOUND).json({ message: `${response}` });

    } else if (typeof response === 'string' && response.includes("No Client found")) {
      res.status(httpStatus.NOT_FOUND).json({ message: `${response}` });

    } else {
      res.status(httpStatus.OK).json(response);
    }

  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error occurred while depositing money' });
  }
};

module.exports = {
  deposit,
};
