import { z } from 'zod'

// Username validation with special character requirement
export const usernameValidation = z
  .string()
  .min(2, "Username must be atleast of 2 characters")
  .max(10, "Username must be of max 10 characters")
  .regex(/^[a-zA-Z0-9]*[!@#$%^&*_-][a-zA-Z0-9]*$/, "Username must contain a special character")

// File validation schema
export const fileSchema = z
  .instanceof(File,{message:'Input must be a file'})
  .refine((file) => {
    console.log('File type:', file);
    console.log('File instance check:', file instanceof File);
    return file.size > 0, { 

    message: 'File cannot be empty' 
  }})
  .refine(
    (file) => ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type), 
    { message: 'Invalid file type. Only JPEG, PNG, and PDF are allowed.' }
  )

// Base signup schema
export const BaseSignUpSchema = z.object({
  username: usernameValidation,
  email: z
    .string()
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password should be of minimum 6 characters" }),
  role: z.enum(['owner', 'tenant'])
})

// export const signUpSchema = z.object({
//   username: usernameValidation,
//   email: z
//     .string()
//     .email({ message: "Invalid email address" }),
//   password: z
//     .string()
//     .min(6, { message: "Password should be of minimum 6 characters" })
// })

// Extended owner schema with additional fields
export const OwnerExtraFieldsSchema = z.object({
  address:z
  .string()
  .min(1,"Resedential location is required"),
  phoneNumber:z
  .string()
  .length(10,{message:"Invalid phone number"}),
  aadharCard:fileSchema,
  electricBill:fileSchema
})

export const OwnerSchema=BaseSignUpSchema.merge(OwnerExtraFieldsSchema)

// Export types for form data
export type BaseSignUpFormData=z.infer<typeof BaseSignUpSchema>
export type OwnerFormData = z.infer<typeof OwnerSchema>
export type SignUpFormData=BaseSignUpFormData & Partial<{
  address:string;
  phoneNumber:string;
  aadharCard:File;
  electricBill:File;
}>

export type SignUpSubmissionData=z.infer<typeof BaseSignUpSchema> & Partial<z.infer<typeof OwnerExtraFieldsSchema>>