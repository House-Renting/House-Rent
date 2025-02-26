'use client'
import { useForm } from "react-hook-form";
import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import * as z from 'zod'
import Link from "next/link";
import { useDebounceCallback } from 'usehooks-ts'
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { OwnerSchema, BaseSignUpSchema, SignUpFormData, SignUpSubmissionData } from "@/Schema/SignUpSchema";
import axios, { AxiosError } from 'axios'
import { ApiResponse } from "../../../types/ApiResponse";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button"
import { Loader2, MapPin, Building, User, Mail, Lock, Phone, FileText, CheckCircle2, XCircle } from "lucide-react";

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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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
      role: type || 'tenant',
      ...(type === 'owner' ? {
        address: '',
        phoneNumber: '',
        aadharCard: undefined,
        electricBill: undefined
      } : {})
    }
  });

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
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    if (!file) return;

    form.setValue(fieldName as any, file);
    
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
         form.setValue(fieldName as any, file);
        toast({
          title: 'Document Processed',
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

  // File upload component
  const FileUploadField = ({ 
    fieldName, 
    label, 
    preview, 
    onClear 
  }: { 
    fieldName: 'aadharCard' | 'electricBill', 
    label: string,
    preview: string | null,
    onClear: () => void
  }) => (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className="col-span-1">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="space-y-2">
              {!preview ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors relative">
                  <Input 
                    type="file" 
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange(e, fieldName)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center space-y-2 text-center">
                    <FileText className="h-6 w-6 text-gray-400" />
                    <div className="text-sm text-gray-500">
                      <span className="font-medium text-blue-600">Upload {label}</span>
                    </div>
                    <p className="text-xs text-gray-400">PNG, JPG, PDF up to 10MB</p>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <img 
                    src={preview} 
                    alt={`${label} Preview`} 
                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6 rounded-full"
                    onClick={onClear}
                  >
                    <XCircle className="h-4 w-4" />
                  </Button>
                  <div className="mt-1 text-xs text-green-600 flex items-center">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Document uploaded successfully
                  </div>
                </div>
              )}
              {isProcessing && (
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Processing document...</span>
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  // Submission handler
  const onSubmit = async (data: SignUpSubmissionData) => {
    setIsSubmitting(true)
    try {
      const formData = new FormData();
      
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (value !== undefined) {
          formData.append(key, String(value))
        }
      });
      
      formData.append('username', data.username);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('role', type || 'tenant');
      
      if (type === 'owner') {
        if (data.address) formData.append('address', data.address);
        if (data.phoneNumber) formData.append('phoneNumber', data.phoneNumber);

        const aadharCard = form.getValues('aadharCard');
        const electricBill = form.getValues('electricBill');
        
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
      
      toast({
        title: 'Account Created',
        description: response.data.message
      });
      
      router.replace(`/verify/${data.username}`);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        title: "SignUp failed",
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-4">
      <Card className="w-full max-w-4xl shadow-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b py-6">
          <CardTitle className="text-3xl font-bold text-center text-green-800">
            {type === 'owner' ? 'Owner Registration' : 'Create Your Account'}
          </CardTitle>
          <CardDescription className="text-center text-green-700 text-lg mt-2">
            {type === 'owner' 
              ? 'Register to list and manage your properties' 
              : 'Sign up to find your perfect rental property'}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-8 px-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, (errors) => console.error("Validation Errors:", errors))} className="space-y-6">
              {type === 'owner' ? (
                // Owner layout - Side by side sections
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Base Fields Column */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 text-blue-800 mb-4">
                      <User className="h-5 w-5" />
                      <h3 className="text-xl font-semibold">Account Information</h3>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 text-sm">Username</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                              <Input 
                                placeholder="Choose a username" 
                                {...field} 
                                className="pl-9 bg-white border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 transition-all"
                                onChange={(e) => {
                                  field.onChange(e)
                                  debouncedUsername(e.target.value)
                                }}
                              />
                            </div>
                          </FormControl>
                          {isCheckingUsername ? 
                            <div className="flex items-center text-gray-500 text-xs mt-1">
                              <Loader2 className="h-3 w-3 animate-spin mr-1" /> Checking availability...
                            </div> :
                            usernameMessage && (
                              <div className={`flex items-center text-xs mt-1 ${usernameMessage === "Username is unique" ? 'text-green-600' : 'text-red-500'}`}>
                                {usernameMessage === "Username is unique" ? 
                                  <><CheckCircle2 className="h-3 w-3 mr-1" /> Available</> : 
                                  <><XCircle className="h-3 w-3 mr-1" /> {usernameMessage}</>
                                }
                              </div>
                            )
                          }
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 text-sm">Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                              <Input 
                                placeholder="your.email@example.com" 
                                {...field} 
                                className="pl-9 bg-white border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 transition-all" 
                              />
                            </div>
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
                          <FormLabel className="text-gray-700 text-sm">Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                              <Input 
                                type="password" 
                                placeholder="Create a secure password" 
                                {...field} 
                                className="pl-9 bg-white border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 transition-all" 
                              />
                            </div>
                          </FormControl>
                          <FormDescription className="text-xs text-gray-500">
                            Use at least 8 characters with a mix of letters, numbers & symbols
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Owner-Specific Fields Column */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 text-green-800 mb-4">
                      <Building className="h-5 w-5" />
                      <h3 className="text-xl font-semibold">Property Details</h3>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 text-sm">Property Address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                              <Input 
                                className="pl-9 bg-white border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 transition-all" 
                                placeholder="Enter full property address" 
                                {...field} 
                              />
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
                          <FormLabel className="text-gray-700 text-sm">Phone Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                              <Input 
                                placeholder="+91 98765 43210" 
                                {...field} 
                                className="pl-9 bg-white border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 transition-all" 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                        <FileText className="h-4 w-4 mr-1" /> Verification Documents
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <FileUploadField 
                          fieldName="aadharCard" 
                          label="Aadhar Card" 
                          preview={aadharPreview} 
                          onClear={() => {
                            setAadharPreview(null);
                            form.setValue('aadharCard', undefined);
                          }}
                        />
                        
                        <FileUploadField 
                          fieldName="electricBill" 
                          label="Electricity Bill" 
                          preview={electricBillPreview} 
                          onClear={() => {
                            setElectricBillPreview(null);
                            form.setValue('electricBill', undefined);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Tenant layout - Single column, centered fields
                <div className="max-w-xl mx-auto space-y-6">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Username</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                            <Input 
                              placeholder="Choose a username" 
                              {...field} 
                              className="pl-9 bg-white border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 transition-all"
                              onChange={(e) => {
                                field.onChange(e)
                                debouncedUsername(e.target.value)
                              }}
                            />
                          </div>
                        </FormControl>
                        {isCheckingUsername ? 
                          <div className="flex items-center text-gray-500 text-xs mt-1">
                            <Loader2 className="h-3 w-3 animate-spin mr-1" /> Checking availability...
                          </div> :
                          usernameMessage && (
                            <div className={`flex items-center text-xs mt-1 ${usernameMessage === "Username is unique" ? 'text-green-600' : 'text-red-500'}`}>
                              {usernameMessage === "Username is unique" ? 
                                <><CheckCircle2 className="h-3 w-3 mr-1" /> Available</> : 
                                <><XCircle className="h-3 w-3 mr-1" /> {usernameMessage}</>
                              }
                            </div>
                          )
                        }
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                            <Input 
                              placeholder="your.email@example.com" 
                              {...field} 
                              className="pl-9 bg-white border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 transition-all" 
                            />
                          </div>
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
                        <FormLabel className="text-gray-700">Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                            <Input 
                              type="password" 
                              placeholder="Create a secure password" 
                              {...field} 
                              className="pl-9 bg-white border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 transition-all" 
                            />
                          </div>
                        </FormControl>
                        <FormDescription className="text-xs text-gray-500">
                          Use at least 8 characters with a mix of letters, numbers & symbols
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full mt-8 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-5"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </div>
                ) : (
                  `Sign Up${type === 'owner' ? ' as Owner' : ''}`
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        
        <CardFooter className="flex justify-center border-t py-4 bg-gray-50">
          <p className="text-sm text-gray-600">
            Already a member?{' '}
            <Link href='/sign-in' className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignUpPage