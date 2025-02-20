

'use client'
import { useForm } from "react-hook-form";
import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import * as z from 'zod'
import Link from "next/link";
import {useDebounceCallback} from 'usehooks-ts'
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { OwnerSchema, BaseSignUpSchema, SignUpFormData, SignUpSubmissionData } from "@/Schema/SignUpSchema";
import axios, { AxiosError } from 'axios'
import { ApiResponse } from "../../../types/ApiResponse";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button"
import { Loader2, MapPin, Building } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type UserRole = 'owner' | 'tenant';

const SignUpPage = () => {
  const [aadharPreview, setAadharPreview] = useState<string | null>(null)
  const [electricBillPreview, setElectricBillPreview] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false);
  const [username, setUsername] = useState('')
  const [usernameMessage, setUsernameMessage] = useState('')
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const debouncedUsername = useDebounceCallback(setUsername, 300)
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams();
  const type = searchParams.get('type') as UserRole | null;

  // Dynamic schema selection
  const schema = type === 'owner' ? OwnerSchema : BaseSignUpSchema
 
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      role:type || 'tenant',
      ...(type === 'owner' ? {
        address: '',
        phoneNumber: '',
        aadharCard: undefined,
        electricBill: undefined
      } : {})
    }
  })

  // Username uniqueness check effect
  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true)
        setUsernameMessage('')
        try {
          const response = await axios.get<ApiResponse>(`/api/check-username?username=${username}`)
          setUsernameMessage(response.data.message)
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error checking username"
          )
        } finally {
          setIsCheckingUsername(false)
        }
      }
    }
    checkUsernameUnique()
  }, [username])

  // File handling logic
  const handleFileChange = async (
    e: ChangeEvent<HTMLInputElement>,
    fieldName: 'aadharCard' | 'electricBill'
  ) => {
    if (!e.target.files || e.target.files.length===0) return;
   console.log("The tarrget file is",e.target.files?.[0]);
  //  console.log("The field name is",fieldName,form.getValues(fieldName));
   
   
    const file = e.target.files[0];
    console.log("The selected file is:",file);
    console.log("The fieldname is",fieldName);
    
    
    if (!file) return;

    form.setValue(fieldName as any, file)
    console.log("The value of field name is",form.getValues(fieldName));
    
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          fieldName === 'aadharCard' 
            ? setAadharPreview(reader.result)
            : setElectricBillPreview(reader.result);
        }
      }
      reader.readAsDataURL(file)
    }

    const formData = new FormData();
    formData.append('file', file);

    setIsProcessing(true);

    try {
      const response = await axios.post<ApiResponse>('/api/image-processing', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data.success && response.data.extractedText) {
         form.setValue(fieldName as any, file)
         console.log("After extraction",form.getValues(fieldName));
         
        toast({
          title: 'Success',
          description: response.data.message
        })
      }
    } catch (error) {
      console.error('Error processing files:', error);
      toast({
        title: 'Error',
        description: 'Failed to process document',
        variant: 'destructive'
      })
    } finally {
      setIsProcessing(false);
    }
  }

  // Submission handler
  const onSubmit = async (data: SignUpSubmissionData) => {
    console.log("The fucntion has been called");
    
    console.log("Form data being submitted:", form.getValues());
    console.log("The data that is being sent for submission is",data); // Inspect the form data here
  console.log(data.aadharCard instanceof File); // Check if `aadharCard` is a File object
  console.log(data.electricBill instanceof File);
    setIsSubmitting(true)
    try {
      console.log("Form data being submitted:", form.getValues());
    console.log("The data that is being sent for submission is",data); // Inspect the form data here
  console.log(data.aadharCard instanceof File); // Check if `aadharCard` is a File object
  console.log(data.electricBill instanceof File);
      const formData = new FormData();
      
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (value !== undefined) {
          formData.append(key, String(value))
        }
      });
      formData.append('username',data.username);
      formData.append('email',data.email);
      formData.append('password',data.password);
      formData.append('role',type || '');
        if(type==='owner'){
          if(data.address) formData.append('address',data.address);
          if(data.phoneNumber) formData.append('phoneNumber',data.phoneNumber)

            const aadharCard=form.getValues('aadharCard')
            const electricBill=form.getValues('electricBill')
            if (aadharCard instanceof File) {
              formData.append('aadharCard', aadharCard);
            }
            if (electricBill instanceof File) {
              formData.append('electricBill', electricBill);
            }
        }
      const response = await axios.post<ApiResponse>('api/sign-up', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      //  response = await axios.post<ApiResponse>(`api/sign-up`, {
      //   ...data,
      //   role: type
      // })
      
      toast({
        title: 'Success',
        description: response.data.message
      })
      
      router.replace(`/verify/${username}`)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message
      toast({
        title: "SignUp failed",
        description: errorMessage,
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-gray-100"
     
    >
      <div className="w-full max-w-md p-8 space-y-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-green-950 mb-6">
          Get Started Now
        </h2>
        
        <Form {...form}>
       
        
          <form onSubmit={form.handleSubmit(onSubmit, (errors) => console.error("Validation Errors:", errors))} className="space-y-4">
          
            {/* Base Fields (Always Rendered) */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your username" 
                      {...field} 
                      onChange={(e) => {
                        field.onChange(e)
                        debouncedUsername(e.target.value)
                      }}
                    />
                  </FormControl>
                  {isCheckingUsername && <Loader2 className="animate-spin" />}
                  <p className={`text-sm ${usernameMessage === "Username is unique" ? 'text-green-500' : 'text-red-500'}`}>
                    {usernameMessage}
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Owner-Specific Fields (Conditionally Rendered) */}
            {type === 'owner' && (
              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center space-x-2 text-green-800">
                  <Building className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Property Details</h3>
                </div>
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                          <Input className="pl-9" placeholder="Enter property address" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="aadharCard"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Aadhar Card</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <Input 
                              type="file" 
                              accept="image/*,.pdf"
                              onChange={(e) => handleFileChange(e, 'aadharCard')}
                              className="file:mr-2 file:py-1 file:px-3 file:rounded-full file:text-xs file:bg-violet-50 file:text-violet-700"
                            />
                            {isProcessing && (
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Processing...</span>
                              </div>
                            )}
                            {aadharPreview && (
                              <img 
                                src={aadharPreview} 
                                alt="Aadhar Card Preview" 
                                className="mt-2 max-h-32 rounded-lg object-cover"
                              />
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="electricBill"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Electricity Bill</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <Input 
                              type="file" 
                              accept="image/*,.pdf"
                              onChange={(e) => handleFileChange(e, 'electricBill')}
                              className="file:mr-2 file:py-1 file:px-3 file:rounded-full file:text-xs file:bg-violet-50 file:text-violet-700"
                            />
                            {isProcessing && (
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Processing...</span>
                              </div>
                            )}
                            {electricBillPreview && (
                              <img 
                                src={electricBillPreview} 
                                alt="Electric Bill Preview" 
                                className="mt-2 max-h-32 rounded-lg object-cover"
                              />
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center mt-4">
          <p>
            Already a member?{' '}
            <Link href='/sign-in' className="text-blue-500 hover:text-blue-900">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage