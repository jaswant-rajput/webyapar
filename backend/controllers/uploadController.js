
const User = require("./../models/userModel")
exports.uploadImage = async(req,res) =>{
    const imagePath = req.file.path;
  const name = req.body.name

  const user = await User.findOneAndUpdate({userID : req.body.userID*1},{$set : {name,imgPath:imagePath}},{new:true})
  res.status(200).json({
    success : true,
    message : "image uploaded successfully",
    user
  });
}