const { Op } = require('sequelize');

const getBestProfession = async (req) => {
  const { Job, Contract, Profile } = req.app.get('models');
  const { startDate, endDate } = req.query;
  const sequelize = req.app.get('sequelize');

  const bestProfessions = await Profile.findAll({
    limit: 1,
    subQuery: false,
    attributes: ['profession', [sequelize.fn('SUM', sequelize.col('price')), 'earned']],
    include: [
      {
        model: Contract,
        as: 'Contractor',
        attributes: [],
        required: true,
        include: [
          {
            model: Job,
            required: true,
            attributes: [],
            where: {
              paid: true,
              paymentDate: {
                [Op.gte]: startDate,
                [Op.lte]: endDate,
              },
            },
          },
        ],
      },
    ],
    where: {
      type: 'contractor',
    },
    group: ['profession'],
    order: [[sequelize.col('earned'), 'DESC']],
  });


  return bestProfessions[0];
};


const getBestClients = async (req) => {
  const { startDate, endDate, limit } = req.query;
  let updatelimit = limit;
  const { Job, Contract, Profile } = req.app.get('models');

  if (!limit) {
    updatelimit = 2;
  }

  const sequelize = req.app.get('sequelize');
  const bestClients = await Profile.findAll({
    limit: updatelimit,
    subQuery: false,
    attributes: ['id', 'firstName', 'lastName', [sequelize.fn('SUM', sequelize.col('price')), 'paid']],
    include: [
      {
        model: Contract,
        as: 'Client',
        attributes: [],
        include: [
          {
            model: Job,
            attributes: [],
            where: {
              paid: true,
              paymentDate: {
                [Op.gte]: startDate,
                [Op.lte]: endDate,
              },
            },
            required: true,
          },
        ],
      },
    ],
    group: ['Profile.id'],
    order: [[sequelize.col('paid'), 'DESC']],
  });

  return bestClients;
};


module.exports = {
  getBestProfession,
  getBestClients
};
