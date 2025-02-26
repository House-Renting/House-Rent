'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { signInSchema } from '@/Schema/signInSchema';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function SignInForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const handleGoogleSignin = () => {
    signIn('google', {
      callbackUrl: '/dashboard'
    });
  };

  const { toast } = useToast();
  
  const onSubmit = async (data :z.infer<typeof signInSchema>) => {
    console.log("Form Data", data);
    
    const result = await signIn('credentials', {
      identifier: data.identifier,
      password: data.password,
      redirect: false,
    });
    
    console.log(result);
    
    if (result?.error) {
      if (result.error === 'CredentialsSignin') {
        toast({
          title: 'Login Failed',
          description: 'Incorrect username or password',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error has been found',
          description: result.error,
          variant: 'destructive',
        });
      }
    }
    
    if (result?.url) {
      router.replace('/dashboard');
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 items-center justify-center">
        <div className="max-w-md text-white p-12">
          <h1 className="text-4xl font-bold mb-6">Sign In</h1>
          <p className="text-xl mb-8">Where honest conversations lead to meaningful connections.</p>
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <p className="italic text-white/90 mb-4">"One last Step "</p>
            <p className="font-semibold">—Connect with us </p>
          </div>
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Sign in to continue your secret conversations</p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">Email/Username</FormLabel>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input 
                        {...field} 
                        placeholder="Enter your email or username" 
                        className="pl-10 py-3 border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400 rounded-lg"
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between">
                      <FormLabel className="text-gray-700 dark:text-gray-300">Password</FormLabel>
                      <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input 
                        {...field} 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Enter your password" 
                        className="pl-10 py-3 border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400 rounded-lg"
                      />
                      <button 
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? 
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" /> : 
                          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
                        }
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Sign In
              </Button>
            </form>
          </Form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
              </div>
            </div>
            
            <div className="mt-6">
              <Button 
                type="button" 
                onClick={handleGoogleSignin}
                className="w-full py-3 px-4 border flex justify-center items-center bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign In with Google
              </Button>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600 dark:text-gray-400">
              Not a member yet?{' '}
              <Link href="/signup" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}