import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User";

import GoogleProvider from "next-auth/providers/google";
import { Account,Profile } from "next-auth";
export  const authOptions:NextAuthOptions={
    providers:[
        CredentialsProvider({
            id:"credentials",
            name:"Credentials",
            credentials:{
                email:{label:"Email",type:"text"},
                password:{label:"Password",type:"password"}
            },
            async authorize(credentials:any):Promise<any>{
                console.log("Recieved Credentials",credentials);
                
                await dbConnect()
                try{
                    const user = await userModel.findOne({
                        $or: [{ email: credentials.identifier },
                             { username: credentials.identifier }]
                      });
                    if(!user){
                        throw new Error('No User found with this email')
                    }
                    if(!user.isVerified){
                        throw new Error('Please verify your account before login')
                    }
                    const isPasswordCorrect=await bcrypt.compare(credentials.password,user.password)
                    if(isPasswordCorrect){
                        return user;
                    }else{
                        throw new Error('Password is incorrect')
                    }
                }catch(err:any){
                    throw new Error(err)
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
          })
    ],
    callbacks:{
        async signIn({user,account,profile}){
            await dbConnect();
            
            if(account?.provider==="google"){
            const existingUser=await userModel.findOne({email:user.email})
            if(!existingUser){
                const newUser=await userModel.create({
                    email:user.email,
                    username:user.username,
                    isVerified:true,
                    isAcceptingMessage:true
                });
                return true;
            }
            return true;
            }
            return true;
        },
          async jwt({ token, user,account }) {
            if(user){
                token._id=user._id?.toString()
                token.isVerified=user.isVerified
                
                token.username=user.username
                token.provider=account?.provider
            }
            return token
    },
    async session({ session, token }) {
        if(token){
            session.user._id=token._id;
            session.user.isVerified=token.isVerified;
           
            session.user.username=token.username
        }
        return session
      },
     
},
    pages: {
        signIn: '/sign-in',
        
      },
      session:{
        strategy:"jwt"
      },
      secret:process.env.NEXTAUTH_SECRET,

}