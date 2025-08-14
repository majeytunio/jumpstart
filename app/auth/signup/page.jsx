// // // // import { signUp } from './actions';

// // // // export default function SignUpPage() {
// // // //   return (
// // // //     <form action={signUp} className="max-w-md mx-auto mt-10">
// // // //       <input 
// // // //         type="email" 
// // // //         name="email" 
// // // //         placeholder="Email" 
// // // //         className="w-full p-2 mb-4 border rounded"
// // // //       />
// // // //       <input 
// // // //         type="password" 
// // // //         name="password" 
// // // //         placeholder="Password" 
// // // //         className="w-full p-2 mb-4 border rounded"
// // // //       />
// // // //       <input 
// // // //         type="password" 
// // // //         name="cpassword" 
// // // //         placeholder="Confirm Password" 
// // // //         className="w-full p-2 mb-4 border rounded"
// // // //       />
// // // //       <button 
// // // //         type="submit" 
// // // //         className="w-full p-2 bg-blue-600 text-white rounded"
// // // //       >
// // // //         Login
// // // //       </button>
// // // //     </form>
// // // //   );
// // // // }











// // // 'use client'

// // // import { signUp } from './actions';
// // // import { useActionState } from 'react';
// // // import { useRouter, redirect } from 'next/navigation';
// // // import { useEffect, useState } from 'react';
// // // import { EyeIcon, EyeSlashIcon, EnvelopeIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';

// // // const SuccessAlert = ({ message }) => (
// // //   <div className="mt-4 flex items-center p-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400">
// // //     <span className="font-semibold">Success:</span>&nbsp;{message}
// // //   </div>
// // // );

// // // const ErrorAlert = ({ message }) => (
// // //   <div className="mt-4 flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
// // //     <span className="font-semibold">Error:</span>&nbsp;{message}
// // //   </div>
// // // );

// // // export default function SignupPage() {
// // //   const [state, formAction] = useActionState(signUp, null);
// // //   const router = useRouter();
// // //   const [showPassword, setShowPassword] = useState(false);
// // //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

// // //   const handleAlreadyHaveAccount = () => {
// // //         router.push('/auth/login'); // or login page    
// // //   };

// // //   useEffect(() => {
// // //     if (state?.success) {
// // //       const timeout = setTimeout(() => {
// // //         router.push('/auth/verify'); // or login page
// // //       }, 2500);
// // //       return () => clearTimeout(timeout);
// // //     }
// // //   }, [state, router]);

// // //   return (
// // //     <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
// // //       <form action={formAction} className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
// // //         <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">Create an Account</h2>

// // //         {/* Name */}
// // //         <div className="mb-5">
// // //           <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
// // //           <div className="relative">
// // //             <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
// // //             <input
// // //               name="name"
// // //               type="text"
// // //               required
// // //               placeholder="John Doe"
// // //               className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white focus:outline-none"
// // //             />
// // //           </div>
// // //         </div>

// // //         {/* Email */}
// // //         <div className="mb-5">
// // //           <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
// // //           <div className="relative">
// // //             <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
// // //             <input
// // //               name="email"
// // //               type="email"
// // //               required
// // //               placeholder="you@example.com"
// // //               className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white focus:outline-none"
// // //             />
// // //           </div>
// // //         </div>

// // //         {/* Password */}
// // //         <div className="mb-5">
// // //           <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
// // //           <div className="relative">
// // //             <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
// // //             <input
// // //               name="password"
// // //               type={showPassword ? 'text' : 'password'}
// // //               required
// // //               placeholder="••••••••"
// // //               className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white focus:outline-none"
// // //             />
// // //             <button
// // //               type="button"
// // //               onClick={() => setShowPassword(!showPassword)}
// // //               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
// // //             >
// // //               {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* Confirm Password */}
// // //         <div className="mb-5">
// // //           <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
// // //           <div className="relative">
// // //             <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
// // //             <input
// // //               name="confirmPassword"
// // //               type={showConfirmPassword ? 'text' : 'password'}
// // //               required
// // //               placeholder="••••••••"
// // //               className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white focus:outline-none"
// // //             />
// // //             <button
// // //               type="button"
// // //               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// // //               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
// // //             >
// // //               {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
// // //             </button>
// // //           </div>
// // //         </div>



// // //         {/* Business Name */}
// // //         <div className="mb-5">
// // //           <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Business Name</label>
// // //           <input
// // //             name="business_name"
// // //             type="text"
// // //             required
// // //             placeholder="Acme Inc."
// // //             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white focus:outline-none"
// // //           />
// // //         </div>

// // //         {/* Business Idea */}
// // //         <div className="mb-5">
// // //           <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Business Idea</label>
// // //           <textarea
// // //             name="business_idea"
// // //             required
// // //             rows="3"
// // //             placeholder="Describe your business idea..."
// // //             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white focus:outline-none"
// // //           ></textarea>
// // //         </div>

// // //         {/* Business Type */}
// // //         <div className="mb-5">
// // //           <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Business Type</label>
// // //           <input
// // //             name="business_type"
// // //             type="text"
// // //             required
// // //             placeholder="e.g. SaaS, Marketplace, E-commerce"
// // //             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white focus:outline-none"
// // //           />
// // //         </div>

// // //         {/* Application Type */}
// // //         <div className="mb-5">
// // //           <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Application Type</label>
// // //           <select
// // //             name="application_type"
// // //             required
// // //             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
// // //           >
// // //             <option value="">Select</option>
// // //             <option value="Web">Web</option>
// // //             <option value="Mobile">Mobile</option>
// // //           </select>
// // //         </div>



// // //         {/* Submit */}
// // //         <button
// // //           type="submit"
// // //           className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
// // //         >
// // //           Sign Up
// // //         </button>

// // //         {/* Already Has Account */}
// // //         <button
// // //           onClick={handleAlreadyHaveAccount}
// // //           type="button"
// // //           className="mt-3 w-full py-2 px-4 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-md transition duration-200"
// // //         >
// // //           Already Have Account
// // //         </button>

// // //         {/* Alerts */}
// // //         {state?.success && <SuccessAlert message={state.success} />}
// // //         {state?.error && <ErrorAlert message={state.error} />}
// // //       </form>
// // //     </div>
// // //   );
// // // }


















// // 'use client'

// // import { signUp } from './actions';
// // import { useActionState } from 'react';
// // import { useRouter, redirect } from 'next/navigation';
// // import { useEffect, useState } from 'react';
// // import { EyeIcon, EyeSlashIcon, EnvelopeIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';

// // const SuccessAlert = ({ message }) => (
// //   <div className="mt-4 flex items-center p-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400">
// //     <span className="font-semibold">Success:</span>&nbsp;{message}
// //   </div>
// // );

// // const ErrorAlert = ({ message }) => (
// //   <div className="mt-4 flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
// //     <span className="font-semibold">Error:</span>&nbsp;{message}
// //   </div>
// // );

// // export default function SignupPage() {
// //   const [state, formAction] = useActionState(signUp, null);
// //   const router = useRouter();
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

// //   const handleAlreadyHaveAccount = () => {
// //         router.push('/auth/login'); // or login page    
// //   };

// //   useEffect(() => {
// //     if (state?.success) {
// //       const timeout = setTimeout(() => {
// //         router.push('/auth/verify'); // or login page
// //       }, 2500);
// //       return () => clearTimeout(timeout);
// //     }
// //   }, [state, router]);

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">

// //       <form action={formAction} className="w-full max-w-4xl bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
// //         <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">Create an Account</h2>

// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// //           {/* LEFT COLUMN — Account Info */}
// //           <div>
// //             <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Basic Account</h3>

// //             {/* Name */}
// //             <div className="mb-5">
// //               <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
// //               <div className="relative">
// //                 <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
// //                 <input
// //                   name="name"
// //                   type="text"
// //                   required
// //                   placeholder="John Doe"
// //                   className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white focus:outline-none"
// //                 />
// //               </div>
// //             </div>

// //             {/* Email */}
// //             <div className="mb-5">
// //               <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
// //               <div className="relative">
// //                 <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
// //                 <input
// //                   name="email"
// //                   type="email"
// //                   required
// //                   placeholder="you@example.com"
// //                   className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white focus:outline-none"
// //                 />
// //               </div>
// //             </div>

// //             {/* Password */}
// //             <div className="mb-5">
// //               <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
// //               <div className="relative">
// //                 <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
// //                 <input
// //                   name="password"
// //                   type={showPassword ? 'text' : 'password'}
// //                   required
// //                   placeholder="••••••••"
// //                   className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white focus:outline-none"
// //                 />
// //                 <button
// //                   type="button"
// //                   onClick={() => setShowPassword(!showPassword)}
// //                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
// //                 >
// //                   {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Confirm Password */}
// //             <div className="mb-5">
// //               <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
// //               <div className="relative">
// //                 <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
// //                 <input
// //                   name="confirmPassword"
// //                   type={showConfirmPassword ? 'text' : 'password'}
// //                   required
// //                   placeholder="••••••••"
// //                   className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white focus:outline-none"
// //                 />
// //                 <button
// //                   type="button"
// //                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// //                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
// //                 >
// //                   {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
// //                 </button>
// //               </div>
// //             </div>
// //           </div>

// //           {/* RIGHT COLUMN — Business Info */}
// //           <div>
// //             <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Business Information</h3>

// //             {/* Business Name */}
// //             <div className="mb-5">
// //               <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Business Name</label>
// //               <input
// //                 name="business_name"
// //                 type="text"
// //                 required
// //                 placeholder="Acme Inc."
// //                 className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white focus:outline-none"
// //               />
// //             </div>

// //             {/* Business Idea */}
// //             <div className="mb-5">
// //               <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Business Idea</label>
// //               <textarea
// //                 name="business_idea"
// //                 required
// //                 rows="3"
// //                 placeholder="Describe your business idea..."
// //                 className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white focus:outline-none"
// //               ></textarea>
// //             </div>

// //             {/* Business Type */}
// //             <div className="mb-5">
// //               <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Business Type</label>
// //               <input
// //                 name="business_type"
// //                 type="text"
// //                 required
// //                 placeholder="e.g. SaaS, Marketplace, E-commerce"
// //                 className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white focus:outline-none"
// //               />
// //             </div>

// //             {/* Application Type */}
// //             <div className="mb-5">
// //               <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Application Type</label>
// //               <select
// //                 name="application_type"
// //                 required
// //                 className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
// //               >
// //                 <option value="">Select</option>
// //                 <option value="Web">Web</option>
// //                 <option value="Mobile">Mobile</option>
// //               </select>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Submit Buttons */}
// //         <div className="mt-6">
// //           <button
// //             type="submit"
// //             className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
// //           >
// //             Sign Up
// //           </button>

// //           <button
// //             onClick={handleAlreadyHaveAccount}
// //             type="button"
// //             className="mt-3 w-full py-2 px-4 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-md transition duration-200"
// //           >
// //             Already Have Account
// //           </button>

// //           {/* Alerts */}
// //           {state?.success && <SuccessAlert message={state.success} />}
// //           {state?.error && <ErrorAlert message={state.error} />}
// //         </div>
// //       </form>


// //     </div>
// //   );
// // }












// 'use client'

// import { signUp } from './actions';
// import { useActionState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { EyeIcon, EyeSlashIcon, EnvelopeIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';

// const SuccessAlert = ({ message }) => (
//   <div className="mt-4 flex items-center p-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400">
//     <span className="font-semibold">Success:</span>&nbsp;{message}
//   </div>
// );

// const ErrorAlert = ({ message }) => (
//   <div className="mt-4 flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
//     <span className="font-semibold">Error:</span>&nbsp;{message}
//   </div>
// );

// export default function SignupPage() {
//   const [state, formAction] = useActionState(signUp, null);
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleAlreadyHaveAccount = () => {
//     router.push('/auth/login');
//   };

//   useEffect(() => {
//     if (state?.success) {
//       const timeout = setTimeout(() => {
//         router.push('/auth/verify');
//       }, 2500);
//       return () => clearTimeout(timeout);
//     }
//   }, [state, router]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
//       <form action={formAction} className="w-full max-w-4xl bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
//         <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">Create an Account</h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* LEFT COLUMN — Account Info */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Basic Account</h3>

//             {/* Name */}
//             <div className="mb-5">
//               <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
//               <div className="relative">
//                 <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   name="name"
//                   type="text"
//                   required
//                   placeholder="John Doe"
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white focus:outline-none"
//                 />
//               </div>
//             </div>

//             {/* Email */}
//             <div className="mb-5">
//               <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
//               <div className="relative">
//                 <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   name="email"
//                   type="email"
//                   required
//                   placeholder="you@example.com"
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white focus:outline-none"
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div className="mb-5">
//               <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
//               <div className="relative">
//                 <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   name="password"
//                   type={showPassword ? 'text' : 'password'}
//                   required
//                   placeholder="••••••••"
//                   className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white focus:outline-none"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
//                 >
//                   {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
//                 </button>
//               </div>
//             </div>

//             {/* Confirm Password */}
//             <div className="mb-5">
//               <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
//               <div className="relative">
//                 <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   name="confirmPassword"
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   required
//                   placeholder="••••••••"
//                   className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white focus:outline-none"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
//                 >
//                   {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT COLUMN — Business Info */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Business Information</h3>

//             {/* Business Name */}
//             <div className="mb-5">
//               <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Business Name</label>
//               <input
//                 name="business_name"
//                 type="text"
//                 required
//                 placeholder="Acme Inc."
//                 className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white focus:outline-none"
//               />
//             </div>

//             {/* Business Idea */}
//             <div className="mb-5">
//               <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Business Idea</label>
//               <textarea
//                 name="business_idea"
//                 required
//                 rows="3"
//                 placeholder="Describe your business idea..."
//                 className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white focus:outline-none"
//               ></textarea>
//             </div>

//             {/* Business Type */}
//             <div className="mb-5">
//               <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Business Type</label>
//               <input
//                 name="business_type"
//                 type="text"
//                 required
//                 placeholder="e.g. SaaS, Marketplace, E-commerce"
//                 className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white focus:outline-none"
//               />
//             </div>

//             {/* Application Type */}
//             <div className="mb-5">
//               <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Application Type</label>
//               <select
//                 name="application_type"
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               >
//                 <option value="">Select</option>
//                 <option value="Web">Web</option>
//                 <option value="Mobile">Mobile</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Submit Buttons */}
//         <div className="mt-6">
//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
//           >
//             Sign Up
//           </button>

//           <button
//             onClick={handleAlreadyHaveAccount}
//             type="button"
//             className="mt-3 w-full py-2 px-4 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-md transition duration-200"
//           >
//             Already Have Account
//           </button>

//           {/* Alerts */}
//           {state?.success && <SuccessAlert message={state.success} />}
//           {state?.error && <ErrorAlert message={state.error} />}
//         </div>
//       </form>
//     </div>
//   );
// }












'use client'

import { signUp } from './actions';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { EyeIcon, EyeSlashIcon, EnvelopeIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';

const SuccessAlert = ({ message }) => (
  <div className="mt-4 flex items-center p-4 text-sm text-green-800 rounded-lg bg-[var(--card-bg)] border border-[var(--border)]">
    <span className="font-semibold text-green-500">Success:</span>&nbsp;{message}
  </div>
);

const ErrorAlert = ({ message }) => (
  <div className="mt-4 flex items-center p-4 text-sm text-red-800 rounded-lg bg-[var(--card-bg)] border border-[var(--border)]">
    <span className="font-semibold text-red-500">Error:</span>&nbsp;{message}
  </div>
);

export default function SignupPage() {
  const [state, formAction] = useActionState(signUp, null);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleAlreadyHaveAccount = () => {
    router.push('/auth/login');
  };

  useEffect(() => {
    if (state?.success) {
      const timeout = setTimeout(() => {
        router.push('/auth/verify');
      }, 2500);
      return () => clearTimeout(timeout);
    }
  }, [state, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--black)] px-4">
      <form action={formAction} className="w-full max-w-4xl bg-[var(--gray-dark)] p-8 rounded-xl shadow-md border border-[var(--gold)]">
        <h2 className="text-2xl font-bold mb-6 text-[var(--gold)] text-center">Create an Account</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT COLUMN — Account Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[var(--gold)]">Basic Account</h3>

            {/* Name */}
            <div className="mb-5">
              <label className="block mb-1 text-sm font-medium text-[var(--gold)]">Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gold)]" />
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-2 border border-[var(--gold)] rounded-md focus:ring-2 focus:ring-[var(--gold-light)] bg-[var(--black)] text-[var(--gold)] placeholder-[var(--gold-light)] focus:outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-5">
              <label className="block mb-1 text-sm font-medium text-[var(--gold)]">Email</label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gold)]" />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2 border border-[var(--gold)] rounded-md focus:ring-2 focus:ring-[var(--gold-light)] bg-[var(--black)] text-[var(--gold)] placeholder-[var(--gold-light)] focus:outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="block mb-1 text-sm font-medium text-[var(--gold)]">Password</label>
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gold)]" />
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2 border border-[var(--gold)] rounded-md focus:ring-2 focus:ring-[var(--gold-light)] bg-[var(--black)] text-[var(--gold)] placeholder-[var(--gold-light)] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--gold)] hover:text-[var(--gold-light)]"
                >
                  {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-5">
              <label className="block mb-1 text-sm font-medium text-[var(--gold)]">Confirm Password</label>
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gold)]" />
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2 border border-[var(--gold)] rounded-md focus:ring-2 focus:ring-[var(--gold-light)] bg-[var(--black)] text-[var(--gold)] placeholder-[var(--gold-light)] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--gold)] hover:text-[var(--gold-light)]"
                >
                  {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Business Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[var(--gold)]">Business Information</h3>

            {/* Business Name */}
            <div className="mb-5">
              <label className="block mb-1 text-sm font-medium text-[var(--gold)]">Business Name</label>
              <input
                name="business_name"
                type="text"
                required
                placeholder="Acme Inc."
                className="w-full px-4 py-2 border border-[var(--gold)] rounded-md focus:ring-2 focus:ring-[var(--gold-light)] bg-[var(--black)] text-[var(--gold)] placeholder-[var(--gold-light)] focus:outline-none"
              />
            </div>

            {/* Business Idea */}
            <div className="mb-5">
              <label className="block mb-1 text-sm font-medium text-[var(--gold)]">Business Idea</label>
              <textarea
                name="business_idea"
                required
                rows="3"
                placeholder="Describe your business idea..."
                className="w-full px-4 py-2 border border-[var(--gold)] rounded-md focus:ring-2 focus:ring-[var(--gold-light)] bg-[var(--black)] text-[var(--gold)] placeholder-[var(--gold-light)] focus:outline-none"
              ></textarea>
            </div>

            {/* Business Type */}
            <div className="mb-5">
              <label className="block mb-1 text-sm font-medium text-[var(--gold)]">Business Type</label>
              <input
                name="business_type"
                type="text"
                required
                placeholder="e.g. SaaS, Marketplace, E-commerce"
                className="w-full px-4 py-2 border border-[var(--gold)] rounded-md focus:ring-2 focus:ring-[var(--gold-light)] bg-[var(--black)] text-[var(--gold)] placeholder-[var(--gold-light)] focus:outline-none"
              />
            </div>

            {/* Application Type */}
            <div className="mb-5">
              <label className="block mb-1 text-sm font-medium text-[var(--gold)]">Application Type</label>
              <select
                name="application_type"
                required
                className="w-full px-4 py-2 border border-[var(--gold)] rounded-md bg-[var(--black)] text-[var(--gold)] focus:ring-2 focus:ring-[var(--gold-light)] focus:outline-none"
              >
                <option value="">Select</option>
                <option value="Web">Web</option>
                <option value="Mobile">Mobile</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[var(--black)] font-semibold rounded-md transition duration-200"
          >
            Sign Up
          </button>

          <button
            onClick={handleAlreadyHaveAccount}
            type="button"
            className="mt-3 w-full py-2 px-4 border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--black)] font-semibold rounded-md transition duration-200"
          >
            Already Have Account
          </button>

          {/* Alerts */}
          {state?.success && <SuccessAlert message={state.success} />}
          {state?.error && <ErrorAlert message={state.error} />}
        </div>
      </form>
    </div>
  );
}