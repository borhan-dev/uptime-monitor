const lib = require('../lib/lib');
const utils = require('../utils/utils');
let dir = 'users';

const userController = (req, callback) => {
  const { method } = req;

  const acceptedMethods = ['get', 'post', 'put', 'delete'];

  acceptedMethods.includes(method)
    ? _user[method](req, callback)
    : callback(404, { error: 'Method Not Accepted' });
};

const _user = {};

_user.get = (req, callback) => {
  console.log(req.body);
};

_user.post = (req, callback) => {
    // console.log(req.body)
  //Data Validation
  let { firstName, lastName, mobile, password } = req.body;

  firstName = typeof firstName === 'string' ? firstName : false;
  lastName = typeof lastName === 'string' ? lastName : false;
  password =
    typeof password === 'string' && password.length > 4 ? password : false;
    mobile = typeof mobile === 'string' && mobile.length === 11 ? mobile : false;
    
  if (firstName && lastName && mobile && password) {
    const userData = { firstName, lastName, mobile, password:utils.hash(password) };
    lib.read(dir, mobile, err => {
      if (err) {
        lib.create(dir, mobile, userData, err => {
          if (!err) {
            callback(201, { message: 'User Created' });
          } else {
            callback(400, { error: 'User Creation Failed' });
          }
        });
      } else {
        callback(404, { message: 'user already exist' });
      }
    });
  } else {
    callback(404, { error: 'Please Provide All Data' });
  }
};

_user.put = (req, callback) => {

    let { firstName, lastName, mobile, password } = req.body;

    firstName = typeof firstName === 'string' ? firstName : false;
    lastName = typeof lastName === 'string' ? lastName : false;
    password =
      typeof password === 'string' && password.length > 4 ? password : false;
    mobile =
      typeof mobile === 'string' && mobile.length === 11 ? mobile : false;
    
  if (mobile) {
    if (firstName || lastName || password) {
      
      lib.read(dir, mobile, (err,uData) => {
        if (!err && uData) {
          const userData = { ...utils.parseJSON(uData) }
          
          if (firstName) {
            userData.firstName=firstName
          }
          if (lastName) {
            userData.lastName=lastName
          }

          if (password) {
            userData.password=utils.hash(password)
          }

          //Updating data for corresponding user

          lib.update(dir, mobile, userData, (err) => {
             if (!err) {
               callback(200, {
                 message: 'User Updated Successfully'
               });
             } else {
               console.log(err)
               callback(404, { message: "Update Failed" });
             }
          })

        } else {
          callback(404,{message:"No User Found"})
        }
      })
    } else {
      callback(404,{message:"Nothing TO Update"})
    }
    
  } else {
    callback(403,{error:"Unauthorized User"})
  }
};

_user.delete = (req, callback) => {};

module.exports = userController;
