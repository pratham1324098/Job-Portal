const userModel = require("../models/userModel");

const updateUserController = async (req,res,next) =>{
  try{

    const {name,email,lastName,location} = req.body;
    if(!name|| !email|| !lastName ||!location){
        next("Please provide all fields");
    }
    console.log(req.body)
    const user = await userModel.findOne({_id:req.body.user.userId});
    user.name = name;
    user.lastName = lastName;
    user.email = email;
    user.location = location;
    await user.save();
    const token = user.createJWT();
    res.status(200).json({
        user,
        token,
    });
  }catch(error){
    console.log("error with update user");
      res.status(500).send({
        message: "auth error",
        success: false,
        error: error.message,
      });
  }
};

const getUserController = async (req, res, next) => {
    try {
      // if (!req.body.user || !req.body.user.userId) {
      //   return res.status(200).send({
      //     message: "User ID not provided in the request body",
      //     success: false,
      //   });
      // }
      // console.log("Requested body is "+req.body.headers.Authorization);
      const user = await userModel.findById({ _id: req.body.user.userId });
      // console.log({user})
      user.password = undefined;
      if (!user) {
        return res.status(200).send({
          message: "User Not Found",
          success: false,
        });
      } else {
        res.status(200).send({
          success: true,
          data: user,
        });
      }
    } catch (error) {
      console.log("error with get user");
      res.status(500).send({
        message: "auth error",
        success: false,
        error: error.message,
      });
    }
  };
  const getTotalUsers = async (req,res,next) => {
    try {
      const totalUsers = await userModel.countDocuments({});
      // console.log(totalUsers);
      if(!totalUsers){
        return res.status(200).send({
          message:"total users not founded",
          success:false,
        })
      }
      else{
        return res.status(200).send({
          success:true,
          totalUsers:totalUsers
        })
      }
    } catch (error) {
      console.error('Error fetching total users:', error);
      throw error;
    }
  };
  
module.exports = {getUserController,updateUserController,getTotalUsers}