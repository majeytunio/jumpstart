// // // 'use client'

// // // import { signIn } from './actions';
// // // import { useActionState } from 'react';

// // // import { useRouter } from 'next/navigation'; // for client-side redirects
// // // import { useEffect } from 'react';


// // // // We'll define our two alert components here for clarity.
// // // const SuccessAlert = ({ message }) => (
// // //   <div className="mt-3 flex items-center p-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
// // //     <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
// // //       <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 15H9a1 1 0 0 1 0-2h1v-2H9a1 1 0 0 1 0-2h1v-2H9a1 1 0 0 1 0-2h1v-2H9a1 1 0 0 1 0-2h1V5a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2v7a1 1 0 0 1-1 1Zm2-11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 1 0-2h1v-2h-1a1 1 0 0 1 0-2h1v-2h-1a1 1 0 0 1 0-2h1v-2h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 1 1Z"/>
// // //     </svg>
// // //     <div>
// // //       <span className="font-medium">Success!</span> {message}
// // //     </div>
// // //   </div>
// // // );

// // // const ErrorAlert = ({ message }) => (
// // //   <div className="mt-3 flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
// // //     <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
// // //       <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4H9a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
// // //     </svg>
// // //     <div>
// // //       <span className="font-medium">Error!</span> {message}
// // //     </div>
// // //   </div>
// // // );

// // // export default function LoginPage() {
// // //   const [state, formAction] = useActionState(signIn, null);
// // //   const router = useRouter();

// // //   useEffect(() => {
// // //     if (state?.success) {
// // //       // Delay to show success message before redirect
// // //       const timeout = setTimeout(() => {
// // //         router.push('/dashboard'); // ← change to your destination
// // //       }, 1500);

// // //       return () => clearTimeout(timeout);
// // //     }
// // //   }, [state, router]);

// // //   return (
// // //     <form action={formAction} className="max-w-md mx-auto mt-10">
// // //       <input 
// // //         type="email" 
// // //         name="email" 
// // //         placeholder="Email" 
// // //         className="w-full p-2 mb-4 border rounded"
// // //       />
// // //       <input 
// // //         type="password" 
// // //         name="password" 
// // //         placeholder="Password" 
// // //         className="w-full p-2 mb-4 border rounded"
// // //       />
// // //       <button 
// // //         type="submit" 
// // //         className="w-full p-2 bg-blue-600 text-white rounded"
// // //       >
// // //         Login
// // //       </button>

// // //       {state?.success && <SuccessAlert message={state.success} />}
// // //       {state?.error && <ErrorAlert message={state.error} />}
// // //     </form>
// // //   );
// // // }





// // 'use client'

// // import { signIn } from './actions';
// // import { useActionState } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { useEffect, useState } from 'react';
// // import { EyeIcon, EyeSlashIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

// // import { supabase } from '../../../lib/supabase';

// // const SuccessAlert = ({ message }) => (
// //   <div className="mt-4 flex items-center p-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
// //     <div>
// //       <span className="font-semibold">Success:</span> {message}
// //     </div>
// //   </div>
// // );

// // const ErrorAlert = ({ message }) => (
// //   <div className="mt-4 flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
// //     <div>
// //       <span className="font-semibold">Error:</span> {message}
// //     </div>
// //   </div>
// // );

// // export default function LoginPage() {
// //   const [state, formAction] = useActionState(signIn, null);
// //   const [showPassword, setShowPassword] = useState(false);
// //   const router = useRouter();
// //   const [isLoading, setIsLoading] = useState(true);

// //   // New useEffect to check for existing session
// //   useEffect(() => {
// //     const checkSession = async () => {
// //       const { data: { session } } = await supabase.auth.getSession();
// //       if (session) {
// //         // If a session exists, redirect to the dashboard
// //         router.push('/dashboard');
// //       } else {
// //         setIsLoading(false); // Only stop loading if no session is found
// //       }
// //     };
// //     checkSession();
// //   }, [router]);

// //   // Existing useEffect for post-login redirect
// //   useEffect(() => {
// //     if (state?.success) {
// //       const timeout = setTimeout(() => {
// //         router.push('/dashboard');
// //       }, 1500);
// //       return () => clearTimeout(timeout);
// //     }
// //   }, [state, router]);

// //   const handleCreateAccount = () => {
// //     router.push('/auth/signup');
// //   };

// //   // Render a loading state while we check for an existing session
// //   if (isLoading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
// //         Loading...
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
// //       <form action={formAction} className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
// //         <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">Login to Your Account</h2>

// //         {/* Email Input */}
// //         <div className="relative mb-5">
// //           <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
// //             Email
// //           </label>
// //           <div className="relative">
// //             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
// //               <EnvelopeIcon className="w-5 h-5" />
// //             </span>
// //             <input
// //               type="email"
// //               name="email"
// //               required
// //               placeholder="you@example.com"
// //               className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white"
// //             />
// //           </div>
// //         </div>

// //         {/* Password Input */}
// //         <div className="relative mb-5">
// //           <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
// //             Password
// //           </label>
// //           <div className="relative">
// //             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
// //               <LockClosedIcon className="w-5 h-5" />
// //             </span>
// //             <input
// //               type={showPassword ? 'text' : 'password'}
// //               name="password"
// //               required
// //               placeholder="••••••••"
// //               className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white"
// //             />
// //             <button
// //               type="button"
// //               onClick={() => setShowPassword(!showPassword)}
// //               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
// //             >
// //               {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
// //             </button>
// //           </div>
// //         </div>

// //         {/* Submit Button */}
// //         <button
// //           type="submit"
// //           className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
// //         >
// //           Sign In
// //         </button>

// //         {/* Already Has Account */}
// //         <button
// //           onClick={handleCreateAccount}
// //           type="button"
// //           className="mt-3 w-full py-2 px-4 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-md transition duration-200"
// //         >
// //           Create New Account
// //         </button>

// //         {/* Alerts */}
// //         {state?.success && <SuccessAlert message={state.success} />}
// //         {state?.error && <ErrorAlert message={state.error} />}
// //       </form>
// //     </div>
// //   );
// // }







// 'use client';

// import { signIn } from './actions';
// import { useActionState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { EyeIcon, EyeSlashIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
// import { supabase } from '../../../lib/supabase';

// const SuccessAlert = ({ message }) => (
//   <div className="mt-4 p-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400">
//     <span className="font-semibold">Success:</span> {message}
//   </div>
// );

// const ErrorAlert = ({ message }) => (
//   <div className="mt-4 p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
//     <span className="font-semibold">Error:</span> {message}
//   </div>
// );

// export default function LoginPage() {
//   const [state, formAction] = useActionState(signIn, null);
//   const [showPassword, setShowPassword] = useState(false);
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const checkSession = async () => {
//       const { data: { session } } = await supabase.auth.getSession();
//       if (session?.user) {
//         console.log("Session: ", session);
//         router.push('/dashboard');
//       } else {
//         setIsLoading(false);
//       }
//     };

//     checkSession();
//   }, [router]);

//   useEffect(() => {
//     if (state?.success) {
//       const timeout = setTimeout(() => {
//         router.push('/dashboard');
//       }, 1500);
//       return () => clearTimeout(timeout);
//     }
//   }, [state, router]);

//   const handleCreateAccount = () => {
//     router.push('/auth/signup');
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
//       <form action={formAction} className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
//         <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">Login to Your Account</h2>

//         <div className="mb-5">
//           <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
//             Email
//           </label>
//           <div className="relative">
//             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//               <EnvelopeIcon className="w-5 h-5" />
//             </span>
//             <input
//               type="email"
//               name="email"
//               required
//               placeholder="you@example.com"
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
//             />
//           </div>
//         </div>

//         <div className="mb-5">
//           <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
//             Password
//           </label>
//           <div className="relative">
//             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//               <LockClosedIcon className="w-5 h-5" />
//             </span>
//             <input
//               type={showPassword ? 'text' : 'password'}
//               name="password"
//               required
//               placeholder="••••••••"
//               className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
//             >
//               {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
//             </button>
//           </div>
//         </div>

//         <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md">
//           Sign In
//         </button>

//         <button
//           type="button"
//           onClick={handleCreateAccount}
//           className="mt-3 w-full py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-md"
//         >
//           Create New Account
//         </button>

//         {state?.success && <SuccessAlert message={state.success} />}
//         {state?.error && <ErrorAlert message={state.error} />}
//       </form>
//     </div>
//   );
// }









'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeSlashIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { supabase } from '../../../lib/supabase'; // Make sure this client is browser-side

const SuccessAlert = ({ message }) => (
  <div className="mt-4 p-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400">
    <span className="font-semibold">Success:</span> {message}
  </div>
);

const ErrorAlert = ({ message }) => (
  <div className="mt-4 p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
    <span className="font-semibold">Error:</span> {message}
  </div>
);

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Check if user already has a session
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        router.push('/dashboard');
      } else {
        setIsLoading(false);
      }
    };
    checkSession();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const { email, password } = formState;

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMessage(error.message);
    } else {
      setSuccessMessage('Login successful! Redirecting...');
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateAccount = () => {
    router.push('/auth/signup');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">Login to Your Account</h2>

        <div className="mb-5">
          <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <EnvelopeIcon className="w-5 h-5" />
            </span>
            <input
              type="email"
              name="email"
              required
              value={formState.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <LockClosedIcon className="w-5 h-5" />
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              required
              value={formState.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md">
          Sign In
        </button>

        <button
          type="button"
          onClick={handleCreateAccount}
          className="mt-3 w-full py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-md"
        >
          Create New Account
        </button>

        {successMessage && <SuccessAlert message={successMessage} />}
        {errorMessage && <ErrorAlert message={errorMessage} />}
      </form>
    </div>
  );
}
