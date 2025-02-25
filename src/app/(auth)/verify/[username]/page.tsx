// 'use client'
// import React from "react";
// import { useParams, useRouter } from "next/navigation";
// import { toast, useToast } from "@/hooks/use-toast";
// import { useForm } from "react-hook-form";
// import { verifySchema } from "@/Schema/verifySchema";
// import * as z from 'zod'
// import { zodResolver } from "@hookform/resolvers/zod";
// import axios, { AxiosError } from "axios";
// import { ApiResponse } from "@/types/ApiResponse";
// import { Button } from "@/components/ui/button"
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"

// const VerifyAccount = () => {
//     const router = useRouter();
//     const params = useParams();
//     const { toast } = useToast();

//     const form = useForm<z.infer<typeof verifySchema>>({
//         resolver: zodResolver(verifySchema),
//         defaultValues: {
//             code: "", // Ensuring the input is always controlled from the start
//         },
//     });

//     const onSubmit = async (data: z.infer<typeof verifySchema>) => {
//         try {
//             const response = await axios.post(`/api/verify-code`, {
//                 username: params.username,
//                 code: data.code,
//             });

//             toast({
//                 title: "Success",
//                 description: response.data.message,
//             });

//             router.replace('/sign-in'); // Use absolute path for consistency
//         } catch (error) {
//             console.log("Error in verifying user account");
//             const axiosError = error as AxiosError<ApiResponse>;
//             const errorMessage = axiosError.response?.data.message || "An error occurred";
//             toast({
//                 title: "Verification failed",
//                 description: errorMessage,
//                 variant: "destructive",
//             });
//         }
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gray-500 text-black">
//             <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
//                 <div className="text-center">
//                     <h1 className="text-4xl font-extrabold tracking-tight">Verify your account</h1>
//                     <p className="mb-4">Enter the verification code sent to your email</p>
//                 </div>
//                 <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//                         <FormField
//                             control={form.control}
//                             name="code"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Verification Code</FormLabel>
//                                     <FormControl>
//                                         <Input
//                                             placeholder="Enter code"
//                                             {...field}
//                                             value={field.value || ""} // Ensuring controlled input
//                                         />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <Button type="submit">Submit</Button>
//                     </form>
//                 </Form>
//             </div>
//         </div>
//     );
// };

// export default VerifyAccount;
'use client'
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { verifySchema } from "@/Schema/verifySchema";
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle, Mail } from "lucide-react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const VerifyAccount = () => {
    const router = useRouter();
    const params = useParams();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
        defaultValues: {
            code: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post(`/api/verify-code`, {
                username: params.username,
                code: data.code,
            });

            toast({
                title: "Success",
                description: response.data.message,
            });

            router.replace('/sign-in');
        } catch (error) {
            console.log("Error in verifying user account");
            const axiosError = error as AxiosError<ApiResponse>;
            const errorMessage = axiosError.response?.data.message || "An error occurred";
            toast({
                title: "Verification failed",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="text-center space-y-2">
                    <div className="flex justify-center">
                        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <Mail className="h-8 w-8 text-green-600" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Verify Your Account</h1>
                    <p className="text-gray-500">We've sent a verification code to your email address. Please enter it below.</p>
                </div>
                
                <div className="mt-8 space-y-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 font-medium">Verification Code</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your 6-digit code"
                                                {...field}
                                                value={field.value || ""}
                                                className="h-12 text-lg text-center tracking-widest font-mono placeholder:text-gray-300 placeholder:text-sm placeholder:tracking-normal focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                            <Button 
                                type="submit" 
                                className="w-full h-12 mt-6 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-medium rounded-lg transition-all duration-200"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                        Verifying...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center">
                                        <CheckCircle className="h-5 w-5 mr-2" />
                                        Verify Account
                                    </span>
                                )}
                            </Button>
                        </form>
                    </Form>
                    
                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-500">
                            Didn't receive a code?{" "}
                            <button className="text-blue-600 hover:text-blue-800 font-medium">
                                Resend Code
                            </button>
                        </p>
                    </div>
                </div>
                
                <div className="mt-6 text-center">
                    <button 
                        onClick={() => router.push('/sign-in')} 
                        className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        Back to Sign In
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerifyAccount;