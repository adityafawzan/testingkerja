module.exports = {
  logout(req, res) {
    res.clearCookie("accessToken").status(200).json({ message: "Berhasil keluar" });
  },
};
