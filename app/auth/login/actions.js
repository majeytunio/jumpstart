// // 'use server';
// // import { supabase } from "../../../lib/supabase";
// // import { redirect } from 'next/navigation';


// // export async function signIn(formData) {
// //   const email = formData.get('email');
// //   const password = formData.get('password');

// //   const { error } = await supabase.auth.signInWithPassword({
// //     email,
// //     password,
// //   });

// //   if (error) {
// //     return { error: error.message };
// //   }
// // //   return { success: true };

// //     return { success: "Login successful! Redirecting..." };
// // }




// 'use server';
// import { supabase } from "../../../lib/supabase";

// export async function signIn(prevState, formData) {
//   const email = formData.get('email');
//   const password = formData.get('password');

//   const { error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });

//   if (error) {
//     return { error: error.message };
//   }

//   return { success: "Login successful! Redirecting..." };
// }










'use server';

import { supabase } from "../../../lib/supabase";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function signIn(prevState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: "Login successful! Redirecting..." };
}
