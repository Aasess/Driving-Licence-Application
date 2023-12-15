module.exports = (req, res) => {
  res.render("examiner", { selectedType: null, data: [], successMsg: null });
};
