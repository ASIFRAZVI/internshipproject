const User = require('../models/signup');

exports.createuser=async(req,res)=>{
try{
const { name, email,phnumber, password } = req.body;
const user = new User({ name, email, phnumber,password }) 
await user.save();
res.redirect('/');
}catch(error){
res.send(error)
console.log(error)
    }
}
// Get all expenses
exports.getuser = async (req, res) => {
    try {
     //to find all user
      const users = await User.find();

      //tofind particular user
     // const expences = await expence.find({ userId });
      res.json(users);
    } catch (error) {
      console.log('error')
    }
  };



// Update a user
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, phnumber, password } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, phnumber, password },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

  
  // Delete an expense
  exports.deleteuser = async (req, res) => {
      try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
          return res.status(404).json({ error: 'user not found.' });
        }
        res.render('signup')
      } catch (error) {
        console.log(error);
      }
    };
    
  