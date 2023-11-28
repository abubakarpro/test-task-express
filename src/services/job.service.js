const { Op } = require('sequelize');

const getUnpaidJobs = async (req) => {
  const { Job, Contract } = req.app.get('models');
  const profileId = req.profile.id;

  const unpaidJobs = await Job.findAll({
    include: [
      {
        attributes: [],
        model: Contract,
        required: true,
        where: {
          [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
          status: {
            [Op.eq]: 'in_progress',
          },
        },
      },
    ],
    where: {
      [Op.or]: [
        { paid: false },
        { paid: null },
      ],
    },
  });

  return unpaidJobs;
};

const payJob = async (req) => {
  const { Contract, Job, Profile } = req.app.get('models');
  const { id, balance, type } = req.profile;
  const jobId = req.params.id;
  const sequelize = req.app.get('sequelize');

  let response = '';

  try {
    const job = await Job.findOne({
      where: { id: jobId, paid: null },
      include: [{
        model: Contract,
        where: { status: 'in_progress', ClientId: id },
      }],
    });

    if (job && type === 'client') {
      const paidAmount = job.price;
      const contractorId = job.Contract.ContractorId;

      if (balance >= paidAmount) {
        await sequelize.transaction(async (paymentTransaction) => {
          await Profile.update(
            { balance: sequelize.literal(`balance - ${paidAmount}`) },
            { where: { id }, transaction: paymentTransaction },
          );

          await Profile.update(
            { balance: sequelize.literal(`balance + ${paidAmount}`) },
            { where: { id: contractorId }, transaction: paymentTransaction },
          );

          await Job.update(
            { paid: 1, paymentDate: new Date() },
            { where: { id: jobId }, transaction: paymentTransaction },
          );
        });

        response = `Payment of ${paidAmount} for ${job.description} has been made successfully.`;
      } else {
        response = `Insufficient balance to pay for ${job.description}.`;
      }
    } else {
      response = 'No paid found for this job';
    }
  } catch (error) {
    response = 'Payment process failed. Please try again.';
  }

  return response;
};

module.exports = {
  getUnpaidJobs,
  payJob,
};
