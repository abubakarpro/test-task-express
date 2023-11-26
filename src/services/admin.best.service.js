const { Op } = require('sequelize');

const getBestProfession = async (req) => {
  console.log("into profession");
  const { Job, Contract, Profile } = req.app.get('models');
  const { startDate, endDate } = req.query;
  const sequelize = req.app.get('sequelize');

  const bestProfessions = await Profile.findAll({
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
    limit: 1,
    subQuery: false,
  });


  return bestProfessions[0];
};


const getBestClients = async (req) => {
  console.log("into client");
  const { Job, Contract, Profile } = req.app.get('models');
  const { startDate, endDate, limit = 2 } = req.query;

  const sequelize = req.app.get('sequelize');
  const bestClients = await Profile.findAll({
    attributes: ['id', 'firstName', 'lastName', [sequelize.fn('SUM', sequelize.col('price')), 'paid']],
    include: [
      {
        model: Contract,
        as: 'Client',
        attributes: [],
        where: {
          // createdAt: {
          //   [Op.between]: [new Date(startDate), new Date(endDate)],
          // },
        },
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
    // limit: 1
  });

  return bestClients;
};


module.exports = {
  getBestProfession,
  getBestClients
};
