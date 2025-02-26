import { NextRequest } from 'next/server';
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User";
import bcrypt from 'bcryptjs';

// Utility function to convert File to Buffer
async function fileToBuffer(file: File | null): Promise<Buffer | null> {
  if (!file) return null;
  
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    // Determine if it's multipart form data or JSON
    const contentType = request.headers.get('content-type');
    let userData;

    if (contentType?.includes('multipart/form-data')) {
      // Handle FormData upload
      const formData = await request.formData();
      console.log("The form data is",formData);
      
      // Extract files and other data
      const username = formData.get('username') as string;
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      const role = formData.get('role') as string;
      const address = formData.get('address') as string;
      const phoneNumber = formData.get('phoneNumber') as string;
      const aadharCard = formData.get('aadharCard') as File;
      if (!(aadharCard instanceof File)) {
        return Response.json({
          success: false,
          message: 'Aadhar Card must be a valid file'
        }, { status: 400 });
      }
      console.log(aadharCard, aadharCard instanceof File);
      const electricBill = formData.get('electricBill') as File;

      // Convert files to buffers
      const aadharCardBuffer = await fileToBuffer(aadharCard);
      const electricBillBuffer = await fileToBuffer(electricBill);

      userData = {
        username,
        email,
        password,
        role,
        address,
        phoneNumber,
        aadharCard: aadharCardBuffer,
        electricBill: electricBillBuffer
      };
    } else {
      // Handle JSON upload
      userData = await request.json();
    }

    // Check for existing verified username
    const existingUserVerifiedByUsername = await userModel.findOne({
      username: userData.username,
      isVerified: true
    });

    if (existingUserVerifiedByUsername) {
      return Response.json({
        success: false,
        message: 'Username is already taken'
      }, { status: 400 });
    }

    // Check for existing email
    const existingUserByEmail = await userModel.findOne({ email: userData.email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json({
          success: false,
          message: "User already exists with this email"
        }, { status: 400 });
      } else {
        // Update existing unverified user
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        
        // Update files and other details for owner
        if (userData.role === 'owner') {
          existingUserByEmail.address = userData.address;
          existingUserByEmail.phoneNumber = userData.phoneNumber;
          existingUserByEmail.aadharCard = userData.aadharCard;
          existingUserByEmail.electricBill = userData.electricBill;
        }

        await existingUserByEmail.save();
      }
    } else {
      // Create new user
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new userModel({
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        role: userData.role,
        ...(userData.role === 'owner' ? {
          address: userData.address,
          phoneNumber: userData.phoneNumber,
          aadharCard: userData.aadharCard,
          electricBill: userData.electricBill
        } : {})
      });

      await newUser.save();
    }

    // Send verification email
    const emailResponse = await sendVerificationEmail(
      userData.username,
      userData.email,
      verifyCode
    );

    if (!emailResponse.success) {
      return Response.json({
        success: false,
        message: emailResponse.message
      }, { status: 500 });
    }

    return Response.json({
      success: true,
      message: "User registered successfully. Please verify your email"
    }, { status: 200 });

  } catch (error) {
    console.error('Error registering user', error);
    return Response.json({
      success: false,
      message: "Error registering user. Try again"
    }, { status: 500 });
  }
}
