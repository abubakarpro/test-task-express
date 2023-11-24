const httpStatus = require('http-status');

const AdminService = require('../services/admin.best.service');

const getBestProfession = async (req, res) => {
  try {
    const foundBestProfession = await AdminService.getBestProfession(req);

    if (!foundBestProfession) {
      res.status(httpStatus.NOT_FOUND).json({ message: 'No best profession found' });
    } else {
      res.status(httpStatus.OK).json(foundBestProfession);
    }
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error occurred while finding best profession', error });
  }
};

const getBestClients = async (req, res) => {
  console.log("into client best");
  try {
    const foundBestClients = await AdminService.getBestClients(req);

    if (!foundBestClients) {
      res.status(httpStatus.NOT_FOUND).json({ message: 'No best clients found' });
    } else {
      res.status(httpStatus.OK).json(foundBestClients);
    }
  } catch (error) {
    console.log("error", error)
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error occurred while finding best best clients', error });
  }
};

module.exports = {
  getBestProfession,
  getBestClients
};
