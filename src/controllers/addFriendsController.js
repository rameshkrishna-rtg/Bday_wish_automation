const db = require("../configs/dbConfig")

//POST - /web/friend/create
const addFriends = async (req, res) => {
    try {
        const { name, email, dob } = req.body

        if (!name || !email || !dob) {
            return res.status(400).json({
                status: "error",
                message: "Name, email and date are required fields"
            })
        };

        if (!name.trim() || !email.trim() || !dob.trim()) {
            return res.status(400).json({
                status: "error",
                message: "Name, email and date cannot be empty"
            })
        };
        
        const friend = await db.friends.findUnique({
            where:{
                email: email
            }
        })

        if(friend){
            return res.status(409).json({
                status: "error",
                message: "friend already exist"
            })
        }

        const newFriend = await db.friends.create({
            data:{
                name: name.trim(),
                email: email.trim(),
                dob: new Date(dob)
            }
        });

        if(newFriend){
            return res.status(201).json({
                status: "success",
                message: "Friend added successfully",
                data: newFriend
            })
        }

    } catch (error) {
        console.log("Add Friend Error: ",error.message);

        return res.staus(500).json({
            status: "error",
            message: "Internal server error"
        })

    }
}

module.exports = { addFriends }