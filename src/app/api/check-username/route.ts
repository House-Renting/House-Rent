import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User";
import {z} from 'zod';
import { usernameValidation } from "@/Schema/SignUpSchema";

const UsernameQuerySchema=z.object({
    username:usernameValidation
})

export async function GET(req:Request){
    await dbConnect();

    try {
      const {searchParams}=new URL(req.url)
      const queryParam={
        username:searchParams.get('username')
      }  
      const result=UsernameQuerySchema.safeParse(queryParam);
      console.log(result);
      if(!result.success)
        {
         const usernameErrors = result.error.format().username?._errors || [];
     
         return Response.json({
             success: false,
             message: usernameErrors.length > 0 
                 ? usernameErrors.join(', ') 
                 : 'Invalid Query Parameters'
         }, 
     {
         status:400
     })
        }

        const {username}=result.data;
        const existingVerifiedUsername=await userModel.findOne({
            username,
            isVerified:true
           })
           if(existingVerifiedUsername){
            return Response.json({
                success:false,
                message:"Username is already taken"
            },
        {
            status:400
        })
    }
    return Response.json({
        success:true,
        message:"Username is unique"
    },
{status:200})
      
    } catch (error) {
        console.log("Error in catch is",error);
        return Response.json({
            success:false,
            message:'Error checking the username'
        },
    {
        status:500
    })
        
    }
}