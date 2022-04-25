const notFound = (req, callback) => {
    return callback(404,{message:"No Data Found"})
 }


module.exports=notFound