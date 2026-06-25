const matchService = require("./match.service");
const catchAsync = require("../../utils/catchAsync");
const { NotFoundError } = require("../../errors");

const getByUserId = catchAsync(async (req, res) => {
  const matches = await matchService.getMatchesByUserId(req.params.userId, req.query);

  if (!matches) {
    throw new NotFoundError("Usuário");
  }

  return res.status(200).json({ success: true, data: matches });
});

module.exports = { getByUserId };
