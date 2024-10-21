const Usermodel = require('../Userschema/User')
const created_User = async (req, res) => {
    const { Phone_Number,Email_Id, Age, Username, Address, Account_Number, Password, Balance, Deposit, Withdrawal } = req.body;
console.log(req.body)
    try {
        const existingUser = await Usermodel.findOne({ Username });

        if (existingUser) {
            return res.json({ success: false, message: "Username already registered!" });
        }

        const user = new Usermodel({
            Phone_Number,
            Account_Number,
            Address,
            Age,
            Email_Id,
            Username,
            Password,
            Balance,
            Deposit,
            Withdrawal,
        });
console.log(Email_Id)
        const savedUser = await user.save();

        res.json({
            success: true,
            message: "User created successfully!",
            user: savedUser,
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            success: false,
            message: "An error occurred while creating the user.",
        });
    }
};



const Get_ParticularUsers = async (req, res) => {
    try {
      // Log the incoming request body
      const { id } = req.body; // Destructure id from the request body if necessary
      console.log("Request Body:", id);
  
      // Fetch users from the database
      let users;
      if (id) {
        users = await Usermodel.findById(id); // Correct usage of findById
      } 
  
      console.log("Fetched Users:", users);
  
      res.json({
        success: true,
        test: users,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ success: false, message: "Failed to fetch users" });
    }
  };
  

const Get_Users = async(req,res)=>{

        const user = await  Usermodel.find()
        console.log(user)
        res.json({
            success:true,
            test:user
        })
}

const Withdrawal_Amount =  async(req,res)=>{
   
    let {Id, Withdraw} = req.body;
  
    let user = await Usermodel.findById(Id)

    if(!user){
        res.json("invalid user id!")
    }

    if(Withdraw <= user.Balance ){
        let Statement = {
            status:"Withdraw",
            amount:Withdraw,
            dateAndTime:Date()
       }
       let w = await Usermodel.findByIdAndUpdate(
        Id,
        {
            $set: { Balance: user.Balance - Withdraw },
            $push: { Statement: Statement } // Assuming Statement is a new entry to be added to the array
        },
        { new: true } // This option returns the updated document
    );
            res.json({
            success:true,
            w
        })
    }
    else{
        res.json("insufficent Balance!")
    }


}

const Deposit_Amout = async(req,res)=>{
    let {Id,Deposit} = req.body;
   
    let user = await Usermodel.findById(Id)
  
   let Statement = {
        status:"Deposite",
        amount:Deposit,
        dateAndTime:Date()
   }
    if(user){
        let w = await Usermodel.findByIdAndUpdate(
            Id,
            {
                $set: { Balance: user.Balance + Deposit },
                $push: { Statement: Statement } // Assuming Statement is a new entry to be added to the array
            },
            { new: true } // This option returns the updated document
        );
        
        res.json({
            success:true,
            w
        })
    }
    else{
        res.json({message:"oops somthingwent worng!"})
    }
}

const delete_User = async (req, res) => {
    const { id } = req.body;

    try {
        const deletedUser = await Usermodel.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({
            success: true,
            message: "User deleted successfully!",
            user: deletedUser,
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ success: false, message: "Failed to delete user" });
    }
};

module.exports = {created_User,Get_Users,Withdrawal_Amount,Deposit_Amout,Get_ParticularUsers,delete_User};