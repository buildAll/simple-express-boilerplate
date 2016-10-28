const homeModel = require('../../models/home/home');

const index = (req, res) => {
    res.render('home', homeModel.getData());
}

module.exports = {
    index
}
