import { clerkClient } from "@clerk/express";

export const protectAdmin = async(req , res , next)=>{
    try {

        const {userId} = req.auth();
         if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

         const user = await clerkClient.users.getUser(userId)

         if(user.privateMetadata.role!=='admin'){
            return res.json({success:false, message:"not authorized"})
         }

         next();

    } catch (error) {
        console.log(error);
        
         return res.json({success:false, message:"not authorized"})
    }
}