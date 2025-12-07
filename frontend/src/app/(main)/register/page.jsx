'use client';
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Github, Chrome } from 'lucide-react'
import { useFormik } from 'formik';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup'; 
import { toast } from 'react-hot-toast';

const registrationSchema = Yup.object().shape({
    name: Yup.string().required('Full Name is required'),
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});


const Register = () => {
    const router = useRouter();

    const registerForm = useFormik({
        initialValues: {
            name: '',
            username: '',
            email: '',
            password: ''
        },
        onSubmit: async (value, { resetForm }) => {
            console.log(value);
            try {
                const result = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, value);
                // console.log(result.data)
                // console.log(result)
                toast.success("Registration successful");
                resetForm();
                router.push('/login');
            } catch (err) {
                // console.log(err);
                toast.error(err.response?.data?.error); // Log the specific error message from the server
            }
        },
        validationSchema: registrationSchema
    })

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md shadow-lg border-border/50">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
                    <CardDescription className="text-center">
                        Enter your details below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid grid-cols-2 gap-6">
                        <Button variant="outline">
                            <Github className="mr-2 h-4 w-4" />
                            Github
                        </Button>
                        <Button variant="outline">
                            <Chrome className="mr-2 h-4 w-4" />
                            Google
                        </Button>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <form action="" className="" onSubmit={registerForm.handleSubmit}>
                        <div className="">
                            <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Full Name</label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Ryan Walker"
                                onChange={registerForm.handleChange}
                                value={registerForm.values.name}
                            />
                            {registerForm.errors.name && registerForm.touched.name && (
                                <p className="text-red-500 text-xs mt-1">{registerForm.errors.name}</p>
                            )}
                        </div>
                        <div className=''>
                            <label htmlFor="username" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Username</label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="ryan5165"
                                onChange={registerForm.handleChange}
                                value={registerForm.values.username}
                            />
                            {registerForm.errors.username && registerForm.touched.username && (
                                <p className="text-red-500 text-xs mt-1">{registerForm.errors.username}</p>
                            )}
                        </div>
                        <div className="">
                            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                            <Input 
                                id="email" 
                                type="email" 
                                placeholder="m@example.com"
                                onChange={registerForm.handleChange}
                                value={registerForm.values.email}
                            />
                            {registerForm.errors.email && registerForm.touched.email && (
                                <p className="text-red-500 text-xs mt-1">{registerForm.errors.email}</p>
                            )}
                        </div>
                        <div className="">
                            <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password</label>
                            <Input 
                                id="password" 
                                type="password" 
                                placeholder="••••••••"
                                onChange={registerForm.handleChange}
                                value={registerForm.values.password}
                            />
                            {registerForm.errors.password && registerForm.touched.password && (
                                <p className="text-red-500 text-xs mt-1">{registerForm.errors.password}</p>
                            )}
                        </div>
                        <Button className="w-full mt-5 bg-primary hover:bg-primary/90">Create account</Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <p className="text-center text-sm text-muted-foreground w-full">
                        Already have an account?{" "}
                        <Link href="/login" className="underline underline-offset-4 hover:text-primary font-medium">
                            Sign in
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Register