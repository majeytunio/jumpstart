// // // // // // 'use server';
// // // // // // import { supabase } from "../../../lib/supabase";

// // // // // // export async function signIn(formData) {
// // // // // //   const email = formData.get('email');
// // // // // //   const password = formData.get('password');
// // // // // //   const cpassword = formData.get('cpassword');

// // // // // //   console.log("Email: ", email);
// // // // // //   console.log("Password: ", password);
// // // // // //   console.log("Confirm Password: ", cpassword);

// // // // // //   const { error } = await supabase.auth.({
// // // // // //     email,
// // // // // //     password,
// // // // // //   });

// // // // // //   if (error) {
// // // // // //     return { error: error.message };
// // // // // //   }
// // // // // //   return { success: true };
// // // // // // }



// // // // // // export async function signUp(formData) {
// // // // // //   const email = formData.get('email');
// // // // // //   const password = formData.get('password');

// // // // // //   console.log("Email: ", email);
// // // // // //   console.log("Password: ", password);

// // // // // //   const { error } = await supabase.auth.signInWithPassword({
// // // // // //     email,
// // // // // //     password
// // // // // //   });

// // // // // //   if (error) {
// // // // // //     return { error: error.message };
// // // // // //   }
// // // // // //   return { success: true };
// // // // // // }











// // // // // 'use server';

// // // // // // Import the Supabase client and Next.js redirect function
// // // // // import { supabase } from '../../../lib/supabase';
// // // // // import { redirect } from 'next/navigation';

// // // // // export async function signUp(formData) {

// // // // //   // 1. Extract and sanitize form data
// // // // //   const email = formData.get('email');
// // // // //   const password = formData.get('password');
// // // // //   const cpassword = formData.get('cpassword');

// // // // //   // 2. Add basic validation
// // // // //   if (password !== cpassword) {
// // // // //     // You could handle this more gracefully on the client-side
// // // // //     // but this is a good server-side check.
// // // // //     return { error: "Passwords do not match." };
// // // // //   }

// // // // //   // 3. Call the Supabase sign-up method
// // // // //   const { error } = await supabase.auth.signUp({
// // // // //     email,
// // // // //     password,
// // // // //     // You can also add a `data` object here to store additional
// // // // //     // user metadata like name, etc.
// // // // //     // options: {
// // // // //     //   data: {
// // // // //     //     full_name: 'John Doe',
// // // // //     //   },
// // // // //     // },
// // // // //   });

// // // // //   // 4. Handle the result from Supabase
// // // // //   if (error) {
// // // // //     // If Supabase returns an error (e.g., user already exists, invalid password)
// // // // //     console.error("Supabase sign-up error:", error.message);
// // // // //     // You might want to return this error to your client-side form
// // // // //     // for a better user experience.
// // // // //     return { error: error.message };
// // // // //   }

// // // // //   // 5. On successful sign-up, redirect the user
// // // // //   // This redirect is a Next.js Server Action feature and is very efficient.
// // // // //   redirect('/profile');
// // // // // }








// // // // 'use server';

// // // // import { supabase } from "../../../lib/supabase";

// // // // export async function signUp(prevState: any, formData: FormData) {
// // // //   const name = formData.get('name') as string;
// // // //   const email = formData.get('email') as string;
// // // //   const password = formData.get('password') as string;
// // // //   const confirmPassword = formData.get('confirmPassword') as string;

// // // //   // Basic validation
// // // //   if (!email || !password || !confirmPassword || !name) {
// // // //     return { error: 'All fields are required.' };
// // // //   }

// // // //   if (password !== confirmPassword) {
// // // //     return { error: 'Passwords do not match.' };
// // // //   }

// // // //   const { data, error } = await supabase.auth.signUp({
// // // //     email,
// // // //     password,
// // // //     options: {
// // // //       data: {
// // // //         full_name: name,
// // // //       },
// // // //     },
// // // //   });

// // // //   if (error) {
// // // //     return { error: error.message };
// // // //   }

// // // //   return { success: 'Signup successful! Please visit your email and verify the account...' };
// // // // }






// // // 'use server';

// // // import { supabase } from '../../../lib/supabase';

// // // export async function signUp(formData) {
// // //   const email = formData.get('email');
// // //   const password = formData.get('password');
// // //   const confirmPassword = formData.get('confirmPassword');
  
// // //   if (password !== confirmPassword) {
// // //     return { error: 'Passwords do not match' };
// // //   }

// // //   // Sign up the user
// // //   const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
// // //     email,
// // //     password,
// // //   });

// // //   if (signUpError) {
// // //     return { error: signUpError.message };
// // //   }

// // //   const user = signUpData.user;

// // //   // Immediately create the profile row
// // //   const { error: profileError } = await supabase.from('profiles').insert({
// // //     id: user.id,
// // //     email: user.email,
// // //     business_name: '',
// // //     business_idea: '',
// // //     business_type: '',
// // //     application_type: '',
// // //   });

// // //   if (profileError) {
// // //     return { error: 'Signup succeeded, but failed to create profile.' };
// // //   }

// // //   return {
// // //     success: 'Signup successful! Please check your email to verify your account.',
// // //   };
// // // }




















// // 'use server';

// // import { supabase } from '../../../lib/supabase';

// // export async function signUp(formData) {
// //   const email = formData.get('email');
// //   const password = formData.get('password');
// //   const confirmPassword = formData.get('confirmPassword');
// //   const name = formData.get('name');
// //   const business_name = formData.get('business_name');
// //   const business_idea = formData.get('business_idea');
// //   const business_type = formData.get('business_type');
// //   const application_type = formData.get('application_type');

// //   if (password !== confirmPassword) {
// //     return { error: 'Passwords do not match' };
// //   }

// //   // Sign up the user
// //   const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
// //     email,
// //     password,
// //   });

// //   if (signUpError) {
// //     return { error: signUpError.message };
// //   }

// //   const user = signUpData.user;

// //   if (!user) {
// //     return { error: 'User creation failed. Please try again.' };
// //   }

// //   // Insert profile data
// //   const { error: profileError } = await supabase.from('profiles').insert({
// //     id: user.id,
// //     email,
// //     name,
// //     business_name,
// //     business_idea,
// //     business_type,
// //     application_type,
// //   });

// //   if (profileError) {
// //     return { error: 'Signup succeeded, but failed to save profile information.' };
// //   }

// //   return {
// //     success: 'Signup successful! Please check your email to verify your account.',
// //   };
// // }









// 'use server';

// import { supabase } from '../../../lib/supabase';

// export async function signUp(formData: FormData) {
//   const email = formData.get('email') as string;
//   const password = formData.get('password') as string;
//   const confirmPassword = formData.get('confirmPassword') as string;
//   const name = formData.get('name') as string;
//   const business_name = formData.get('business_name') as string;
//   const business_idea = formData.get('business_idea') as string;
//   const business_type = formData.get('business_type') as string;
//   const application_type = formData.get('application_type') as string;

//   if (password !== confirmPassword) {
//     return { error: 'Passwords do not match' };
//   }

//   const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
//     email,
//     password,
//   });

//   if (signUpError) {
//     return { error: signUpError.message };
//   }

//   const user = signUpData.user;

//   if (!user) {
//     return { error: 'User creation failed. Please try again.' };
//   }

//   const { error: profileError } = await supabase.from('profiles').insert({
//     id: user.id,
//     email,
//     name,
//     business_name,
//     business_idea,
//     business_type,
//     application_type,
//   });

//   if (profileError) {
//     return { error: 'Signup succeeded, but failed to save profile information.' };
//   }

//   return {
//     success: 'Signup successful! Please check your email to verify your account.',
//   };
// }












'use server';

import { supabase } from '../../../lib/supabase';

export async function signUp(previousState, formData) {
  // Add a check to ensure formData exists
  if (!formData) {
    return { error: 'Form data is missing.' };
  }

  // Use Object.fromEntries to get a clean object from formData
  const data = Object.fromEntries(formData.entries());

  // Destructure the data for easier access
  const {
    email,
    password,
    confirmPassword,
    name,
    business_name,
    business_idea,
    business_type,
    application_type,
  } = data;

  // Now, you can use a more robust validation approach.
  // Although you specified you want to stay in JSX,
  // the server action itself is a backend file,
  // so you can use modern JavaScript/TypeScript features without impacting your UI.
  // You can still use JSDoc for type hints if you prefer not to use a separate .ts file.

  // Basic validation checks
  if (password !== confirmPassword) {
    return { error: 'Passwords do not match' };
  }

  if (!email || !password || !name || !business_name || !business_idea || !business_type || !application_type) {
    return { error: 'All fields are required.' };
  }

  // Supabase logic remains the same
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    return { error: signUpError.message };
  }

  const user = signUpData.user;

  if (!user) {
    return { error: 'User creation failed. Please try again.' };
  }

  const { error: profileError } = await supabase.from('profiles').insert({
    id: user.id,
    email,
    name,
    business_name,
    business_idea,
    business_type,
    application_type,
  });

  if (profileError) {
    return { error: 'Signup succeeded, but failed to save profile information.' };
  }

  return {
    success: 'Signup successful! Please check your email to verify your account.',
  };
}