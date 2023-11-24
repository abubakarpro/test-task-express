const deposit = async (req) => {
  const clientId = req.params.userId;
  const depositAmount = req.body.amount;
  console.log("depositeAmount", depositAmount)
  const { Job, Contract, Profile } = req.app.get('models');
  const sequelize = req.app.get('sequelize');
  const depositTransaction = await sequelize.transaction();
  let response = {};

  try {
    const client = await Profile.findByPk(clientId, { transaction: depositTransaction });
    if (client.dataValues.type != "client") {
      response = "No Client found";
      return response;
    }

    const totalJobsToPay = await Job.findAll(
      {
        attributes: {
          include: [[sequelize.fn('SUM', sequelize.col('price')), 'totalPrice']],
        },
        include: [
          {
            attributes: [],
            model: Contract,
            required: true,
            where: {
              ClientId: clientId,
              status: 'in_progress',
            },
          },
        ],
        where: {
          paid: null,
        },
      },
      { transaction: depositTransaction },
    );
    console.log("totalJobsTopay", totalJobsToPay[0].dataValues)

    const { totalPrice } = totalJobsToPay[0].dataValues;
    if (totalPrice == null) {
      response = `There are no unpaid jobs for client ${clientId}.`;
    }

    const depositThreshold = totalPrice * 0.25;
    if (depositAmount > depositThreshold) {
      response = `Maximum deposit amount reached. Deposit ${depositAmount} is more than 25% of client ${clientId} total of jobs to pay`;

    } else {
      console.log("into here last step")
      await client.increment({ balance: depositAmount }, { transaction: depositTransaction });

      client.balance += depositAmount;

      await depositTransaction.commit();
      response = client;
    }

    return response;

  } catch (error) {
    console.log("error", error)
    await depositTransaction.rollback();
  }
};

module.exports = {
  deposit,
};
