
// // import { useRouter } from "next/router";

// // export const metadata = {
// //   title: 'Verify Your Email',
// // };

// // const router = useRouter();

// // export default function VerifyPage() {
// //   const handleLogin = () => {
// //         router.push('/auth/login'); // or login page    
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
// //       <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-center">
// //         <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
// //           Verify Your Email
// //         </h2>
// //         <p className="text-gray-600 dark:text-gray-300 mb-4">
// //           We've sent you a verification link. Please check your email inbox (and spam folder).
// //         </p>
// //         <p className="text-sm text-gray-500 dark:text-gray-400">
// //           Once you verify, click on the confirm button below.
// //         </p>

// //         <button
// //           onClick={handleLogin}
// //           type="submit"
// //           className="mt-4 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
// //         >
// //           Confirm
// //         </button>
// //       </div>

// //       {/* Submit */}
// //     </div>
// //   );
// // }




// 'use client';

// import { useRouter } from 'next/navigation';

// export const metadata = {
//   title: 'Verify Your Email',
// };

// export default function VerifyPage() {
//   const router = useRouter();

//   const handleLogin = () => {
//     router.push('/auth/login'); // or your login route
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
//       <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-center">
//         <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
//           Verify Your Email
//         </h2>
//         <p className="text-gray-600 dark:text-gray-300 mb-4">
//           We've sent you a verification link. Please check your email inbox (and spam folder).
//         </p>
//         <p className="text-sm text-gray-500 dark:text-gray-400">
//           Once you verify your email, click the button below to return to login.
//         </p>

//         <button
//           onClick={handleLogin}
//           type="button"
//           className="mt-4 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
//         >
//           Confirm
//         </button>
//       </div>
//     </div>
//   );
// }





'use client';

import { useRouter } from 'next/navigation';

export default function VerifyClient() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Verify Your Email
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          We've sent you a verification link. Please check your email inbox (and spam folder).
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Once you verify your email, click the button below to return to login.
        </p>

        <button
          onClick={handleLogin}
          type="button"
          className="mt-4 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
