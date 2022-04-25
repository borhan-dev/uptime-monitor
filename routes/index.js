const sample = require('../controller/sampleController.js');
const userController = require('../controller/userController.js');

const routes = {
    "sample": sample,
    "user":userController
}

module.exports=routes