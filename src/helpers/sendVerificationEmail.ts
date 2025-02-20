import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmails";
import { ApiResponse } from "../types/ApiResponse";

export async function sendVerificationEmail(
    username:string,
    email:string,
    verifyCode:string
):Promise<ApiResponse>{
  try {
   const response= await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'HouseRent:Verification code of email',
        react: VerificationEmail({username,otp:verifyCode})
        
      });
      console.log('Resend API Response:', response);
      console.log('The email is',email);
      
     return{success:true,message:'Verification email sent successfully'}

  } catch (error) {
    console.error('Detailed error sending verification email:', error);
    return {
        success: false,
        message: `Failed to send email`
    }
}
}