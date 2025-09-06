// // // // // // // 'use client'

// // // // // // // import { signIn } from './actions';
// // // // // // // import { useActionState } from 'react';

// // // // // // // import { useRouter } from 'next/navigation'; // for client-side redirects
// // // // // // // import { useEffect } from 'react';


// // // // // // // // We'll define our two alert components here for clarity.
// // // // // // // const SuccessAlert = ({ message }) => (
// // // // // // //   <div className="mt-3 flex items-center p-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
// // // // // // //     <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
// // // // // // //       <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 15H9a1 1 0 0 1 0-2h1v-2H9a1 1 0 0 1 0-2h1v-2H9a1 1 0 0 1 0-2h1v-2H9a1 1 0 0 1 0-2h1V5a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2v7a1 1 0 0 1-1 1Zm2-11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 1 0-2h1v-2h-1a1 1 0 0 1 0-2h1v-2h-1a1 1 0 0 1 0-2h1v-2h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 1 1Z"/>
// // // // // // //     </svg>
// // // // // // //     <div>
// // // // // // //       <span className="font-medium">Success!</span> {message}
// // // // // // //     </div>
// // // // // // //   </div>
// // // // // // // );

// // // // // // // const ErrorAlert = ({ message }) => (
// // // // // // //   <div className="mt-3 flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
// // // // // // //     <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
// // // // // // //       <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4H9a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
// // // // // // //     </svg>
// // // // // // //     <div>
// // // // // // //       <span className="font-medium">Error!</span> {message}
// // // // // // //     </div>
// // // // // // //   </div>
// // // // // // // );

// // // // // // // export default function LoginPage() {
// // // // // // //   const [state, formAction] = useActionState(signIn, null);
// // // // // // //   const router = useRouter();

// // // // // // //   useEffect(() => {
// // // // // // //     if (state?.success) {
// // // // // // //       // Delay to show success message before redirect
// // // // // // //       const timeout = setTimeout(() => {
// // // // // // //         router.push('/dashboard'); // ← change to your destination
// // // // // // //       }, 1500);

// // // // // // //       return () => clearTimeout(timeout);
// // // // // // //     }
// // // // // // //   }, [state, router]);

// // // // // // //   return (
// // // // // // //     <form action={formAction} className="max-w-md mx-auto mt-10">
// // // // // // //       <input 
// // // // // // //         type="email" 
// // // // // // //         name="email" 
// // // // // // //         placeholder="Email" 
// // // // // // //         className="w-full p-2 mb-4 border rounded"
// // // // // // //       />
// // // // // // //       <input 
// // // // // // //         type="password" 
// // // // // // //         name="password" 
// // // // // // //         placeholder="Password" 
// // // // // // //         className="w-full p-2 mb-4 border rounded"
// // // // // // //       />
// // // // // // //       <button 
// // // // // // //         type="submit" 
// // // // // // //         className="w-full p-2 bg-blue-600 text-white rounded"
// // // // // // //       >
// // // // // // //         Login
// // // // // // //       </button>

// // // // // // //       {state?.success && <SuccessAlert message={state.success} />}
// // // // // // //       {state?.error && <ErrorAlert message={state.error} />}
// // // // // // //     </form>
// // // // // // //   );
// // // // // // // }





// // // // // // 'use client'

// // // // // // import { signIn } from './actions';
// // // // // // import { useActionState } from 'react';
// // // // // // import { useRouter } from 'next/navigation';
// // // // // // import { useEffect, useState } from 'react';
// // // // // // import { EyeIcon, EyeSlashIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

// // // // // // import { supabase } from '../../../lib/supabase';

// // // // // // const SuccessAlert = ({ message }) => (
// // // // // //   <div className="mt-4 flex items-center p-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
// // // // // //     <div>
// // // // // //       <span className="font-semibold">Success:</span> {message}
// // // // // //     </div>
// // // // // //   </div>
// // // // // // );

// // // // // // const ErrorAlert = ({ message }) => (
// // // // // //   <div className="mt-4 flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
// // // // // //     <div>
// // // // // //       <span className="font-semibold">Error:</span> {message}
// // // // // //     </div>
// // // // // //   </div>
// // // // // // );

// // // // // // export default function LoginPage() {
// // // // // //   const [state, formAction] = useActionState(signIn, null);
// // // // // //   const [showPassword, setShowPassword] = useState(false);
// // // // // //   const router = useRouter();
// // // // // //   const [isLoading, setIsLoading] = useState(true);

// // // // // //   // New useEffect to check for existing session
// // // // // //   useEffect(() => {
// // // // // //     const checkSession = async () => {
// // // // // //       const { data: { session } } = await supabase.auth.getSession();
// // // // // //       if (session) {
// // // // // //         // If a session exists, redirect to the dashboard
// // // // // //         router.push('/dashboard');
// // // // // //       } else {
// // // // // //         setIsLoading(false); // Only stop loading if no session is found
// // // // // //       }
// // // // // //     };
// // // // // //     checkSession();
// // // // // //   }, [router]);

// // // // // //   // Existing useEffect for post-login redirect
// // // // // //   useEffect(() => {
// // // // // //     if (state?.success) {
// // // // // //       const timeout = setTimeout(() => {
// // // // // //         router.push('/dashboard');
// // // // // //       }, 1500);
// // // // // //       return () => clearTimeout(timeout);
// // // // // //     }
// // // // // //   }, [state, router]);

// // // // // //   const handleCreateAccount = () => {
// // // // // //     router.push('/auth/signup');
// // // // // //   };

// // // // // //   // Render a loading state while we check for an existing session
// // // // // //   if (isLoading) {
// // // // // //     return (
// // // // // //       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
// // // // // //         Loading...
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
// // // // // //       <form action={formAction} className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
// // // // // //         <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">Login to Your Account</h2>

// // // // // //         {/* Email Input */}
// // // // // //         <div className="relative mb-5">
// // // // // //           <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
// // // // // //             Email
// // // // // //           </label>
// // // // // //           <div className="relative">
// // // // // //             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
// // // // // //               <EnvelopeIcon className="w-5 h-5" />
// // // // // //             </span>
// // // // // //             <input
// // // // // //               type="email"
// // // // // //               name="email"
// // // // // //               required
// // // // // //               placeholder="you@example.com"
// // // // // //               className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white"
// // // // // //             />
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {/* Password Input */}
// // // // // //         <div className="relative mb-5">
// // // // // //           <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
// // // // // //             Password
// // // // // //           </label>
// // // // // //           <div className="relative">
// // // // // //             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
// // // // // //               <LockClosedIcon className="w-5 h-5" />
// // // // // //             </span>
// // // // // //             <input
// // // // // //               type={showPassword ? 'text' : 'password'}
// // // // // //               name="password"
// // // // // //               required
// // // // // //               placeholder="••••••••"
// // // // // //               className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white"
// // // // // //             />
// // // // // //             <button
// // // // // //               type="button"
// // // // // //               onClick={() => setShowPassword(!showPassword)}
// // // // // //               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
// // // // // //             >
// // // // // //               {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {/* Submit Button */}
// // // // // //         <button
// // // // // //           type="submit"
// // // // // //           className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
// // // // // //         >
// // // // // //           Sign In
// // // // // //         </button>

// // // // // //         {/* Already Has Account */}
// // // // // //         <button
// // // // // //           onClick={handleCreateAccount}
// // // // // //           type="button"
// // // // // //           className="mt-3 w-full py-2 px-4 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-md transition duration-200"
// // // // // //         >
// // // // // //           Create New Account
// // // // // //         </button>

// // // // // //         {/* Alerts */}
// // // // // //         {state?.success && <SuccessAlert message={state.success} />}
// // // // // //         {state?.error && <ErrorAlert message={state.error} />}
// // // // // //       </form>
// // // // // //     </div>
// // // // // //   );
// // // // // // }







// // // // // 'use client';

// // // // // import { signIn } from './actions';
// // // // // import { useActionState } from 'react';
// // // // // import { useRouter } from 'next/navigation';
// // // // // import { useEffect, useState } from 'react';
// // // // // import { EyeIcon, EyeSlashIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
// // // // // import { supabase } from '../../../lib/supabase';

// // // // // const SuccessAlert = ({ message }) => (
// // // // //   <div className="mt-4 p-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400">
// // // // //     <span className="font-semibold">Success:</span> {message}
// // // // //   </div>
// // // // // );

// // // // // const ErrorAlert = ({ message }) => (
// // // // //   <div className="mt-4 p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
// // // // //     <span className="font-semibold">Error:</span> {message}
// // // // //   </div>
// // // // // );

// // // // // export default function LoginPage() {
// // // // //   const [state, formAction] = useActionState(signIn, null);
// // // // //   const [showPassword, setShowPassword] = useState(false);
// // // // //   const router = useRouter();
// // // // //   const [isLoading, setIsLoading] = useState(true);

// // // // //   useEffect(() => {
// // // // //     const checkSession = async () => {
// // // // //       const { data: { session } } = await supabase.auth.getSession();
// // // // //       if (session?.user) {
// // // // //         console.log("Session: ", session);
// // // // //         router.push('/dashboard');
// // // // //       } else {
// // // // //         setIsLoading(false);
// // // // //       }
// // // // //     };

// // // // //     checkSession();
// // // // //   }, [router]);

// // // // //   useEffect(() => {
// // // // //     if (state?.success) {
// // // // //       const timeout = setTimeout(() => {
// // // // //         router.push('/dashboard');
// // // // //       }, 1500);
// // // // //       return () => clearTimeout(timeout);
// // // // //     }
// // // // //   }, [state, router]);

// // // // //   const handleCreateAccount = () => {
// // // // //     router.push('/auth/signup');
// // // // //   };

// // // // //   if (isLoading) {
// // // // //     return (
// // // // //       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
// // // // //         Loading...
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
// // // // //       <form action={formAction} className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
// // // // //         <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">Login to Your Account</h2>

// // // // //         <div className="mb-5">
// // // // //           <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
// // // // //             Email
// // // // //           </label>
// // // // //           <div className="relative">
// // // // //             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
// // // // //               <EnvelopeIcon className="w-5 h-5" />
// // // // //             </span>
// // // // //             <input
// // // // //               type="email"
// // // // //               name="email"
// // // // //               required
// // // // //               placeholder="you@example.com"
// // // // //               className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
// // // // //             />
// // // // //           </div>
// // // // //         </div>

// // // // //         <div className="mb-5">
// // // // //           <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
// // // // //             Password
// // // // //           </label>
// // // // //           <div className="relative">
// // // // //             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
// // // // //               <LockClosedIcon className="w-5 h-5" />
// // // // //             </span>
// // // // //             <input
// // // // //               type={showPassword ? 'text' : 'password'}
// // // // //               name="password"
// // // // //               required
// // // // //               placeholder="••••••••"
// // // // //               className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
// // // // //             />
// // // // //             <button
// // // // //               type="button"
// // // // //               onClick={() => setShowPassword(!showPassword)}
// // // // //               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
// // // // //             >
// // // // //               {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>

// // // // //         <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md">
// // // // //           Sign In
// // // // //         </button>

// // // // //         <button
// // // // //           type="button"
// // // // //           onClick={handleCreateAccount}
// // // // //           className="mt-3 w-full py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-md"
// // // // //         >
// // // // //           Create New Account
// // // // //         </button>

// // // // //         {state?.success && <SuccessAlert message={state.success} />}
// // // // //         {state?.error && <ErrorAlert message={state.error} />}
// // // // //       </form>
// // // // //     </div>
// // // // //   );
// // // // // }









// // // // 'use client';

// // // // import { useState, useEffect } from 'react';
// // // // import { useRouter } from 'next/navigation';
// // // // import { EyeIcon, EyeSlashIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
// // // // import { supabase } from '../../../lib/supabase'; // Make sure this client is browser-side

// // // // const SuccessAlert = ({ message }) => (
// // // //   <div className="mt-4 p-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400">
// // // //     <span className="font-semibold">Success:</span> {message}
// // // //   </div>
// // // // );

// // // // const ErrorAlert = ({ message }) => (
// // // //   <div className="mt-4 p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
// // // //     <span className="font-semibold">Error:</span> {message}
// // // //   </div>
// // // // );

// // // // export default function LoginPage() {
// // // //   const router = useRouter();
// // // //   const [showPassword, setShowPassword] = useState(false);
// // // //   const [isLoading, setIsLoading] = useState(true);

// // // //   const [formState, setFormState] = useState({
// // // //     email: '',
// // // //     password: '',
// // // //   });

// // // //   const [successMessage, setSuccessMessage] = useState('');
// // // //   const [errorMessage, setErrorMessage] = useState('');

// // // //   // Check if user already has a session
// // // //   useEffect(() => {
// // // //     const checkSession = async () => {
// // // //       const { data: { session } } = await supabase.auth.getSession();
// // // //       if (session?.user) {
// // // //         router.push('/dashboard');
// // // //       } else {
// // // //         setIsLoading(false);
// // // //       }
// // // //     };
// // // //     checkSession();
// // // //   }, [router]);

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     setErrorMessage('');
// // // //     setSuccessMessage('');

// // // //     const { email, password } = formState;

// // // //     const { error } = await supabase.auth.signInWithPassword({ email, password });

// // // //     if (error) {
// // // //       setErrorMessage(error.message);
// // // //     } else {
// // // //       setSuccessMessage('Login successful! Redirecting...');
// // // //       setTimeout(() => {
// // // //         router.push('/dashboard');
// // // //       }, 1500);
// // // //     }
// // // //   };

// // // //   const handleChange = (e) => {
// // // //     const { name, value } = e.target;
// // // //     setFormState((prev) => ({ ...prev, [name]: value }));
// // // //   };

// // // //   const handleCreateAccount = () => {
// // // //     router.push('/auth/signup');
// // // //   };

// // // //   if (isLoading) {
// // // //     return (
// // // //       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
// // // //         Loading...
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
// // // //       <form onSubmit={handleSubmit} className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
// // // //         <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">Login to Your Account</h2>

// // // //         <div className="mb-5">
// // // //           <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
// // // //             Email
// // // //           </label>
// // // //           <div className="relative">
// // // //             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
// // // //               <EnvelopeIcon className="w-5 h-5" />
// // // //             </span>
// // // //             <input
// // // //               type="email"
// // // //               name="email"
// // // //               required
// // // //               value={formState.email}
// // // //               onChange={handleChange}
// // // //               placeholder="you@example.com"
// // // //               className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
// // // //             />
// // // //           </div>
// // // //         </div>

// // // //         <div className="mb-5">
// // // //           <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
// // // //             Password
// // // //           </label>
// // // //           <div className="relative">
// // // //             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
// // // //               <LockClosedIcon className="w-5 h-5" />
// // // //             </span>
// // // //             <input
// // // //               type={showPassword ? 'text' : 'password'}
// // // //               name="password"
// // // //               required
// // // //               value={formState.password}
// // // //               onChange={handleChange}
// // // //               placeholder="••••••••"
// // // //               className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
// // // //             />
// // // //             <button
// // // //               type="button"
// // // //               onClick={() => setShowPassword(!showPassword)}
// // // //               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
// // // //             >
// // // //               {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
// // // //             </button>
// // // //           </div>
// // // //         </div>

// // // //         <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md">
// // // //           Sign In
// // // //         </button>

// // // //         <button
// // // //           type="button"
// // // //           onClick={handleCreateAccount}
// // // //           className="mt-3 w-full py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-md"
// // // //         >
// // // //           Create New Account
// // // //         </button>

// // // //         {successMessage && <SuccessAlert message={successMessage} />}
// // // //         {errorMessage && <ErrorAlert message={errorMessage} />}
// // // //       </form>
// // // //     </div>
// // // //   );
// // // // }

















// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import { useRouter } from 'next/navigation';
// // // import { 
// // //   EyeIcon, 
// // //   EyeSlashIcon, 
// // //   EnvelopeIcon, 
// // //   LockClosedIcon,
// // //   ArrowPathIcon,
// // //   XCircleIcon
// // // } from '@heroicons/react/24/outline';
// // // import { supabase } from '../../../lib/supabase';
// // // import { toast } from 'react-hot-toast';

// // // const SuccessAlert = ({ message }) => (
// // //   <div className="mt-4 p-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400">
// // //     <span className="font-semibold">Success:</span> {message}
// // //   </div>
// // // );

// // // const ErrorAlert = ({ message }) => (
// // //   <div className="mt-4 p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
// // //     <span className="font-semibold">Error:</span> {message}
// // //   </div>
// // // );

// // // export default function LoginPage() {
// // //   const router = useRouter();
// // //   const [showPassword, setShowPassword] = useState(false);
// // //   const [isLoading, setIsLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [retryCount, setRetryCount] = useState(0);

// // //   const [formState, setFormState] = useState({
// // //     email: '',
// // //     password: '',
// // //   });

// // //   const [successMessage, setSuccessMessage] = useState('');
// // //   const [errorMessage, setErrorMessage] = useState('');

// // //   // Check if user already has a session
// // //   useEffect(() => {
// // //     const checkSession = async () => {
// // //       try {
// // //         setError(null);
// // //         const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
// // //         if (sessionError) {
// // //           throw sessionError;
// // //         }

// // //         if (session?.user) {
// // //           router.push('/dashboard');
// // //         } else {
// // //           setIsLoading(false);
// // //         }
// // //       } catch (err) {
// // //         console.error('Session check error:', err);
// // //         setError(err.message || 'Failed to check session');
        
// // //         if (retryCount < 2) {
// // //           setTimeout(() => {
// // //             setRetryCount(prev => prev + 1);
// // //           }, 1000 * (retryCount + 1));
// // //         } else {
// // //           setIsLoading(false);
// // //         }
// // //       }
// // //     };

// // //     checkSession();
// // //   }, [router, retryCount]);

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setErrorMessage('');
// // //     setSuccessMessage('');
// // //     setError(null);

// // //     const { email, password } = formState;

// // //     try {
// // //       const { error } = await supabase.auth.signInWithPassword({ 
// // //         email, 
// // //         password 
// // //       });

// // //       if (error) {
// // //         throw error;
// // //       }

// // //       setSuccessMessage('Login successful! Redirecting...');
// // //       toast.success('Login successful');
// // //       setTimeout(() => {
// // //         router.push('/dashboard');
// // //       }, 1500);
// // //     } catch (err) {
// // //       console.error('Login error:', err);
// // //       setErrorMessage(err.message);
// // //       toast.error(err.message || 'Login failed');
// // //     }
// // //   };

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormState((prev) => ({ ...prev, [name]: value }));
// // //   };

// // //   const handleCreateAccount = () => {
// // //     router.push('/auth/signup');
// // //   };

// // //   if (isLoading) {
// // //     return (
// // //       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
// // //         <ArrowPathIcon className="w-8 h-8 animate-spin mb-4" />
// // //         <p>Checking session...</p>
// // //         {retryCount > 0 && (
// // //           <p className="text-sm text-gray-500 mt-2">
// // //             Attempt {retryCount} of 2
// // //           </p>
// // //         )}
// // //       </div>
// // //     );
// // //   }

// // //   if (error && retryCount >= 2) {
// // //     return (
// // //       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
// // //         <XCircleIcon className="w-8 h-8 text-red-500 mb-4" />
// // //         <p className="text-red-500 mb-4">{error}</p>
// // //         <button
// // //           onClick={() => {
// // //             setRetryCount(0);
// // //             setIsLoading(true);
// // //           }}
// // //           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
// // //         >
// // //           Retry
// // //         </button>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
// // //       <form onSubmit={handleSubmit} className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
// // //         <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">Login to Your Account</h2>

// // //         <div className="mb-5">
// // //           <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
// // //             Email
// // //           </label>
// // //           <div className="relative">
// // //             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
// // //               <EnvelopeIcon className="w-5 h-5" />
// // //             </span>
// // //             <input
// // //               type="email"
// // //               name="email"
// // //               required
// // //               value={formState.email}
// // //               onChange={handleChange}
// // //               placeholder="you@example.com"
// // //               className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
// // //             />
// // //           </div>
// // //         </div>

// // //         <div className="mb-5">
// // //           <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
// // //             Password
// // //           </label>
// // //           <div className="relative">
// // //             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
// // //               <LockClosedIcon className="w-5 h-5" />
// // //             </span>
// // //             <input
// // //               type={showPassword ? 'text' : 'password'}
// // //               name="password"
// // //               required
// // //               value={formState.password}
// // //               onChange={handleChange}
// // //               placeholder="••••••••"
// // //               className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
// // //             />
// // //             <button
// // //               type="button"
// // //               onClick={() => setShowPassword(!showPassword)}
// // //               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
// // //             >
// // //               {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
// // //             </button>
// // //           </div>
// // //         </div>

// // //         <button 
// // //           type="submit" 
// // //           className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md flex items-center justify-center"
// // //         >
// // //           {isLoading ? (
// // //             <>
// // //               <ArrowPathIcon className="w-4 h-4 mr-2 animate-spin" />
// // //               Signing In...
// // //             </>
// // //           ) : 'Sign In'}
// // //         </button>

// // //         <button
// // //           type="button"
// // //           onClick={handleCreateAccount}
// // //           className="mt-3 w-full py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-md"
// // //         >
// // //           Create New Account
// // //         </button>

// // //         {successMessage && <SuccessAlert message={successMessage} />}
// // //         {errorMessage && <ErrorAlert message={errorMessage} />}
// // //       </form>
// // //     </div>
// // //   );
// // // }






// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { 
// //   EyeIcon, 
// //   EyeSlashIcon, 
// //   EnvelopeIcon, 
// //   LockClosedIcon,
// //   ArrowPathIcon,
// //   XCircleIcon
// // } from '@heroicons/react/24/outline';
// // import { supabase } from '../../../lib/supabase';
// // import { toast } from 'react-hot-toast';

// // const SuccessAlert = ({ message }) => (
// //   <div className="mt-4 p-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400">
// //     <span className="font-semibold">Success:</span> {message}
// //   </div>
// // );

// // const ErrorAlert = ({ message }) => (
// //   <div className="mt-4 p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
// //     <span className="font-semibold">Error:</span> {message}
// //   </div>
// // );

// // export default function LoginPage() {
// //   const router = useRouter();
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [retryCount, setRetryCount] = useState(0);

// //   const [formState, setFormState] = useState({
// //     email: '',
// //     password: '',
// //   });

// //   const [successMessage, setSuccessMessage] = useState('');
// //   const [errorMessage, setErrorMessage] = useState('');

// //   // Check if user already has a session
// //   useEffect(() => {
// //     const checkSession = async () => {
// //       try {
// //         setError(null);
// //         const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
// //         if (sessionError) {
// //           throw sessionError;
// //         }

// //         if (session?.user) {
// //           router.push('/dashboard');
// //         } else {
// //           setIsLoading(false);
// //         }
// //       } catch (err) {
// //         console.error('Session check error:', err);
// //         setError(err.message || 'Failed to check session');
        
// //         if (retryCount < 2) {
// //           setTimeout(() => {
// //             setRetryCount(prev => prev + 1);
// //           }, 1000 * (retryCount + 1));
// //         } else {
// //           setIsLoading(false);
// //         }
// //       }
// //     };

// //     checkSession();
// //   }, [router, retryCount]);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setErrorMessage('');
// //     setSuccessMessage('');
// //     setError(null);

// //     const { email, password } = formState;

// //     try {
// //       const { error } = await supabase.auth.signInWithPassword({ 
// //         email, 
// //         password 
// //       });

// //       if (error) {
// //         throw error;
// //       }

// //       setSuccessMessage('Login successful! Redirecting...');
// //       toast.success('Login successful');
// //       setTimeout(() => {
// //         router.push('/dashboard');
// //       }, 1500);
// //     } catch (err) {
// //       console.error('Login error:', err);
// //       setErrorMessage(err.message);
// //       toast.error(err.message || 'Login failed');
// //     }
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormState((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleCreateAccount = () => {
// //     router.push('/auth/signup');
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="min-h-screen flex flex-col items-center justify-center bg-black text-yellow-500">
// //         <ArrowPathIcon className="w-8 h-8 animate-spin mb-4" />
// //         <p>Checking session...</p>
// //         {retryCount > 0 && (
// //           <p className="text-sm text-yellow-400 mt-2">
// //             Attempt {retryCount} of 2
// //           </p>
// //         )}
// //       </div>
// //     );
// //   }

// //   if (error && retryCount >= 2) {
// //     return (
// //       <div className="min-h-screen flex flex-col items-center justify-center bg-black text-yellow-500">
// //         <XCircleIcon className="w-8 h-8 text-red-500 mb-4" />
// //         <p className="text-red-500 mb-4">{error}</p>
// //         <button
// //           onClick={() => {
// //             setRetryCount(0);
// //             setIsLoading(true);
// //           }}
// //           className="px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 font-semibold"
// //         >
// //           Retry
// //         </button>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-black px-4">
// //       <form 
// //         onSubmit={handleSubmit} 
// //         className="w-full max-w-md bg-gray-900 p-8 rounded-xl shadow-md border border-yellow-500"
// //       >
// //         <h2 className="text-2xl font-bold mb-6 text-yellow-500 text-center">Login to Your Account</h2>

// //         <div className="mb-5">
// //           <label htmlFor="email" className="block mb-1 text-sm font-medium text-yellow-500">
// //             Email
// //           </label>
// //           <div className="relative">
// //             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500">
// //               <EnvelopeIcon className="w-5 h-5" />
// //             </span>
// //             <input
// //               type="email"
// //               name="email"
// //               required
// //               value={formState.email}
// //               onChange={handleChange}
// //               placeholder="you@example.com"
// //               className="w-full pl-10 pr-4 py-2 border border-yellow-500 rounded-md focus:ring-2 focus:ring-yellow-500 bg-black text-yellow-500 placeholder-yellow-700"
// //             />
// //           </div>
// //         </div>

// //         <div className="mb-5">
// //           <label htmlFor="password" className="block mb-1 text-sm font-medium text-yellow-500">
// //             Password
// //           </label>
// //           <div className="relative">
// //             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500">
// //               <LockClosedIcon className="w-5 h-5" />
// //             </span>
// //             <input
// //               type={showPassword ? 'text' : 'password'}
// //               name="password"
// //               required
// //               value={formState.password}
// //               onChange={handleChange}
// //               placeholder="••••••••"
// //               className="w-full pl-10 pr-10 py-2 border border-yellow-500 rounded-md focus:ring-2 focus:ring-yellow-500 bg-black text-yellow-500 placeholder-yellow-700"
// //             />
// //             <button
// //               type="button"
// //               onClick={() => setShowPassword(!showPassword)}
// //               className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-500"
// //             >
// //               {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
// //             </button>
// //           </div>
// //         </div>

// //         <button 
// //           type="submit" 
// //           className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-md flex items-center justify-center"
// //         >
// //           {isLoading ? (
// //             <>
// //               <ArrowPathIcon className="w-4 h-4 mr-2 animate-spin" />
// //               Signing In...
// //             </>
// //           ) : 'Sign In'}
// //         </button>

// //         <button
// //           type="button"
// //           onClick={handleCreateAccount}
// //           className="mt-3 w-full py-2 border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-semibold rounded-md"
// //         >
// //           Create New Account
// //         </button>

// //         {successMessage && <SuccessAlert message={successMessage} />}
// //         {errorMessage && <ErrorAlert message={errorMessage} />}
// //       </form>
// //     </div>
// //   );
// // }







// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { 
//   EyeIcon, 
//   EyeSlashIcon, 
//   EnvelopeIcon, 
//   LockClosedIcon,
//   ArrowPathIcon,
//   XCircleIcon
// } from '@heroicons/react/24/outline';
// import { supabase } from '../../../lib/supabase';
// import { Toaster, toast } from 'react-hot-toast';

// // A more robust loading spinner component for a cleaner UI
// const LoadingSpinner = () => (
//   <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--black)] text-[var(--gold)]">
//     <ArrowPathIcon className="w-8 h-8 animate-spin mb-4" />
//     <p>Checking session...</p>
//   </div>
// );

// // A simple retry-on-error component
// const RetryComponent = ({ error, onRetry }) => (
//   <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--black)] text-[var(--gold)]">
//     <XCircleIcon className="w-8 h-8 text-[var(--red-500)] mb-4" />
//     <p className="text-[var(--red-500)] mb-4 text-center">{error}</p>
//     <button
//       onClick={onRetry}
//       className="px-4 py-2 bg-[var(--gold)] text-[var(--black)] rounded-md hover:bg-[var(--gold-light)] font-semibold"
//     >
//       Retry
//     </button>
//   </div>
// );

// export default function LoginPage() {
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [sessionError, setSessionError] = useState(null);
//   const [formState, setFormState] = useState({
//     email: '',
//     password: '',
//   });

//   // Effect to check for an existing user session on component mount
//   useEffect(() => {
//     const checkSession = async () => {
//       try {
//         const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
//         if (sessionError) {
//           throw sessionError;
//         }

//         if (session?.user) {
//           router.push('/');
//         } else {
//           setIsLoading(false);
//         }
//       } catch (err) {
//         // If there's a session check error, we'll display a retry button
//         setSessionError(err.message || 'Failed to connect to the authentication service.');
//         setIsLoading(false);
//       }
//     };

//     checkSession();
//   }, [router]);

//   // Function to handle the login form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const { email, password } = formState;

//     // Use toast.promise for a better UX with async operations
//     await toast.promise(
//       supabase.auth.signInWithPassword({ email, password }),
//       {
//         loading: 'Signing in...',
//         success: (res) => {
//           if (res.error) throw res.error;
//           // After successful login, redirect to the dashboard
//           setTimeout(() => {
//             router.push('/');
//           }, 1000);
//           return 'Login successful! Redirecting...';
//         },
//         error: (err) => {
//           // If login fails, display the error message
//           return err.message || 'Login failed.';
//         },
//       }
//     );
    
//     setIsSubmitting(false);
//   };

//   // Handler for form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormState((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handler for navigating to the signup page
//   const handleCreateAccount = () => {
//     router.push('/auth/signup');
//   };

//   if (isLoading) {
//     return <LoadingSpinner />;
//   }

//   if (sessionError) {
//     return <RetryComponent error={sessionError} onRetry={() => {
//       setIsLoading(true);
//       setSessionError(null);
//     }} />;
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[var(--black)] px-4">
//       <Toaster position="top-right" />
//       <form 
//         onSubmit={handleSubmit} 
//         className="w-full max-w-md bg-[var(--gray-dark)] p-8 rounded-xl shadow-md border border-[var(--gold)]"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-[var(--gold)] text-center">Login to Your Account</h2>

//         {/* Email Input Field */}
//         <div className="mb-5">
//           <label htmlFor="email" className="block mb-1 text-sm font-medium text-[var(--gold)]">
//             Email
//           </label>
//           <div className="relative">
//             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gold)]">
//               <EnvelopeIcon className="w-5 h-5" />
//             </span>
//             <input
//               type="email"
//               name="email"
//               required
//               value={formState.email}
//               onChange={handleChange}
//               placeholder="you@example.com"
//               className="w-full pl-10 pr-4 py-2 border border-[var(--gold)] rounded-md focus:ring-2 focus:ring-[var(--gold)] bg-[var(--black)] text-[var(--gold)] placeholder-[var(--gold-light)]"
//             />
//           </div>
//         </div>

//         {/* Password Input Field */}
//         <div className="mb-5">
//           <label htmlFor="password" className="block mb-1 text-sm font-medium text-[var(--gold)]">
//             Password
//           </label>
//           <div className="relative">
//             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gold)]">
//               <LockClosedIcon className="w-5 h-5" />
//             </span>
//             <input
//               type={showPassword ? 'text' : 'password'}
//               name="password"
//               required
//               value={formState.password}
//               onChange={handleChange}
//               placeholder="••••••••"
//               className="w-full pl-10 pr-10 py-2 border border-[var(--gold)] rounded-md focus:ring-2 focus:ring-[var(--gold)] bg-[var(--black)] text-[var(--gold)] placeholder-[var(--gold-light)]"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--gold)]"
//             >
//               {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
//             </button>
//           </div>
//         </div>

//         {/* Login Button */}
//         <button 
//           type="submit" 
//           disabled={isSubmitting} // Disable the button while submitting
//           className="w-full py-2 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[var(--black)] font-semibold rounded-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isSubmitting ? (
//             <>
//               <ArrowPathIcon className="w-4 h-4 mr-2 animate-spin" />
//               Signing In...
//             </>
//           ) : 'Sign In'}
//         </button>

//         {/* Create Account Button */}
//         <button
//           type="button"
//           onClick={handleCreateAccount}
//           className="mt-3 w-full py-2 border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--black)] font-semibold rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
//           disabled={isSubmitting}
//         >
//           Create New Account
//         </button>
//       </form>
//     </div>
//   );
// }













'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  EyeIcon, 
  EyeSlashIcon, 
  EnvelopeIcon, 
  LockClosedIcon,
  ArrowPathIcon,
  XCircleIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { supabase } from '../../../lib/supabase';
import { Toaster, toast } from 'react-hot-toast';

// A more robust loading spinner component for a cleaner UI
const LoadingSpinner = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--black)] text-[var(--gold)]">
    <ArrowPathIcon className="w-8 h-8 animate-spin mb-4" />
    <p>Checking session...</p>
  </div>
);

// A simple retry-on-error component
const RetryComponent = ({ error, onRetry }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--black)] text-[var(--gold)]">
    <XCircleIcon className="w-8 h-8 text-[var(--red-500)] mb-4" />
    <p className="text-[var(--red-500)] mb-4 text-center">{error}</p>
    <button
      onClick={onRetry}
      className="px-4 py-2 bg-[var(--gold)] text-[var(--black)] rounded-md hover:bg-[var(--gold-light)] font-semibold"
    >
      Retry
    </button>
  </div>
);

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sessionError, setSessionError] = useState(null);
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [isSendingReset, setIsSendingReset] = useState(false);
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  // Effect to check for an existing user session on component mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }

        if (session?.user) {
          router.push('/');
        } else {
          setIsLoading(false);
        }
      } catch (err) {
        // If there's a session check error, we'll display a retry button
        setSessionError(err.message || 'Failed to connect to the authentication service.');
        setIsLoading(false);
      }
    };

    checkSession();
  }, [router]);

  // Function to handle the login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { email, password } = formState;

    // Use toast.promise for a better UX with async operations
    await toast.promise(
      supabase.auth.signInWithPassword({ email, password }),
      {
        loading: 'Signing in...',
        success: (res) => {
          if (res.error) throw res.error;
          // After successful login, redirect to the dashboard
          setTimeout(() => {
            router.push('/');
          }, 1000);
          return 'Login successful! Redirecting...';
        },
        error: (err) => {
          // If login fails, display the error message
          return err.message || 'Login failed.';
        },
      }
    );
    
    setIsSubmitting(false);
  };

  // Function to handle password reset
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setIsSendingReset(true);

    if (!resetEmail) {
      toast.error('Please enter your email address');
      setIsSendingReset(false);
      return;
    }

    await toast.promise(
      supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      }),
      {
        loading: 'Sending reset link...',
        success: () => {
          setIsResetMode(false);
          setResetEmail('');
          return 'Password reset link sent! Check your email.';
        },
        error: (err) => {
          return err.message || 'Failed to send reset link.';
        },
      }
    );

    setIsSendingReset(false);
  };

  // Handler for form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for navigating to the signup page
  const handleCreateAccount = () => {
    router.push('/auth/signup');
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (sessionError) {
    return <RetryComponent error={sessionError} onRetry={() => {
      setIsLoading(true);
      setSessionError(null);
    }} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--black)] px-4">
      <Toaster position="top-right" />
      
      {isResetMode ? (
        // Password Reset Form
        <form 
          onSubmit={handlePasswordReset} 
          className="w-full max-w-md bg-[var(--gray-dark)] p-8 rounded-xl shadow-md border border-[var(--gold)]"
        >
          <button
            type="button"
            onClick={() => setIsResetMode(false)}
            className="flex items-center text-[var(--gold)] hover:text-[var(--gold-light)] mb-4"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Back to Login
          </button>

          <h2 className="text-2xl font-bold mb-6 text-[var(--gold)] text-center">Reset Password</h2>

          <p className="text-[var(--gold-light)] text-sm mb-6 text-center">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          {/* Email Input for Reset */}
          <div className="mb-5">
            <label htmlFor="reset-email" className="block mb-1 text-sm font-medium text-[var(--gold)]">
              Email
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gold)]">
                <EnvelopeIcon className="w-5 h-5" />
              </span>
              <input
                type="email"
                id="reset-email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2 border border-[var(--gold)] rounded-md focus:ring-2 focus:ring-[var(--gold)] bg-[var(--black)] text-[var(--gold)] placeholder-[var(--gold-light)]"
                required
              />
            </div>
          </div>

          {/* Send Reset Link Button */}
          <button 
            type="submit" 
            disabled={isSendingReset}
            className="w-full py-2 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[var(--black)] font-semibold rounded-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSendingReset ? (
              <>
                <ArrowPathIcon className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : 'Send Reset Link'}
          </button>
        </form>
      ) : (
        // Login Form
        <form 
          onSubmit={handleSubmit} 
          className="w-full max-w-md bg-[var(--gray-dark)] p-8 rounded-xl shadow-md border border-[var(--gold)]"
        >
          <h2 className="text-2xl font-bold mb-6 text-[var(--gold)] text-center">Login to Your Account</h2>

          {/* Email Input Field */}
          <div className="mb-5">
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-[var(--gold)]">
              Email
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gold)]">
                <EnvelopeIcon className="w-5 h-5" />
              </span>
              <input
                type="email"
                name="email"
                required
                value={formState.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2 border border-[var(--gold)] rounded-md focus:ring-2 focus:ring-[var(--gold)] bg-[var(--black)] text-[var(--gold)] placeholder-[var(--gold-light)]"
              />
            </div>
          </div>

          {/* Password Input Field */}
          <div className="mb-5">
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-[var(--gold)]">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gold)]">
                <LockClosedIcon className="w-5 h-5" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={formState.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2 border border-[var(--gold)] rounded-md focus:ring-2 focus:ring-[var(--gold)] bg-[var(--black)] text-[var(--gold)] placeholder-[var(--gold-light)]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--gold)]"
              >
                {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="mb-5 text-right">
            <button
              type="button"
              onClick={() => setIsResetMode(true)}
              className="text-[var(--gold)] hover:text-[var(--gold-light)] text-sm"
            >
              Forgot your password?
            </button>
          </div>

          {/* Login Button */}
          <button 
            type="submit" 
            disabled={isSubmitting} // Disable the button while submitting
            className="w-full py-2 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[var(--black)] font-semibold rounded-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <ArrowPathIcon className="w-4 h-4 mr-2 animate-spin" />
                Signing In...
              </>
            ) : 'Sign In'}
          </button>

          {/* Create Account Button */}
          <button
            type="button"
            onClick={handleCreateAccount}
            className="mt-3 w-full py-2 border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--black)] font-semibold rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            Create New Account
          </button>
        </form>
      )}
    </div>
  );
}