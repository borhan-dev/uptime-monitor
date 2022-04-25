const userController = (req, callback) => {
  const { method } = req;

  const acceptedMethods = ['get', 'post', 'put', 'delete'];

  acceptedMethods.includes(method)
    ? _user[method](req, callback)
    : callback(404, { error: 'Method Not Accepted' });
};

const _user = {};

_user.get = (req, callback) => {

    console.log(req.body)
};

_user.post = () => { }

_user.put = () => { }


_user.delete=()=>{}












module.exports=userController
