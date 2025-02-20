import mongoose,{Schema, Document} from 'mongoose'
export enum UserRole{
    OWNER='owner',
    TENANT='tenant'
}
export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isVerified:boolean;
    role:UserRole;
    address:string;
    phoneNumber:string;
    aadharCard:Buffer;
    electricBill:Buffer;
    
}

const UserSchema:Schema<User>=new Schema({
   username:{
    type:String,
    required:[true,"Username is required"],
    trim:true,
    unique:true
   },
   email:{
    type:String,
    require:[true,"Email is required"],
    unique:true,
    match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Please use a valid email address"]
   },
   password:{
    type:String,
    required:[true,"Password is required"]
   },
   verifyCode:{
    type:String,
    required:[true,"Verify code is required"],
   },
   verifyCodeExpiry:{
    type:Date,
    required:[true,"Verify code expiry is required"],
   },
   isVerified:{
    type:Boolean,
    default:false,
   },
   role:{
    type:String,
    enum:Object.values(UserRole),
    required:[true,"Role is required"],
   },
   address:{
    type:String,
    required:[true,"Verify code is required"],
   },
   phoneNumber:{
    type:String,
    required:[true,"PhoneNumber is required"]
   },
   aadharCard:{
    type:Buffer,
    required:[true,"Aadhar card needs to be compulsorily uploaded"]
   },
   electricBill:{
    type:Buffer,
    required:[true,"Electric bill needs to be compulsorily uploaded"]
   },
//    maintainenceBill:{
//     type:String,
//     required:[true,"Maintainence bill neeeds to be compulsorily uploaded"]
//    },
//    aadhar:{
//     type:String,
//     required:[true,"Aadhar card needs to be uploaded"]
//    }
   
})

const userModel=(mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema);
export default userModel;
