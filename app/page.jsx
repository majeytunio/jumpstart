// // // 'use client'

// // // import Image from "next/image";
// // // import Dashboard from "./dashboard/page";

// // // import { supabase } from "../lib/supabase";
// // // import { useRouter } from 'next/navigation';

// // // import { useState, useEffect } from "react";

// // // import Navbar from './components/Navbar';


// // // export default function Home() {
  
// // //   const router = useRouter();

// // //   const [currentUser, setCurrentUser] = useState(null);
// // //   const [userProfile, setUserProfile] = useState(null);
// // //   const [isApproved, setApproved] = useState(false);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {

// // //     const fetchProfile = async (userId) => {
// // //       const { data, error } = await supabase
// // //         .from('profiles')
// // //         .select('*')
// // //         .eq('id', userId)
// // //         .single();

// // //       if (error) {
// // //         console.error('Error fetching profile:', error.message);
// // //         await supabase.auth.signOut();
// // //         // router.push('/auth/login');
// // //         setApproved(false);
// // //       } else {
// // //         setUserProfile(data);
// // //         setApproved(Boolean(data?.verified));
// // //       }

// // //       setLoading(false);
// // //     };

// // //     const initAuth = async () => {
// // //       const { data: { session } } = await supabase.auth.getSession();

// // //       if (session?.user) {
// // //         setCurrentUser(session.user);
// // //         await fetchProfile(session.user.id);
// // //       } else {
// // //         // router.push('/auth/login');
// // //       }
// // //     };

// // //     initAuth();

// // //     const { data: { subscription } } = supabase.auth.onAuthStateChange(
// // //       async (_, session) => {
// // //         if (session?.user) {
// // //           setCurrentUser(session.user);
// // //           await fetchProfile(session.user.id);
// // //         } else {
// // //           // router.push('/auth/login');
// // //         }
// // //       }
// // //     );

// // //     return () => {
// // //       subscription.unsubscribe();
// // //     };
// // //   }, [router]);



// // //   return (
// // //     <>
// // //     <Navbar currentUser={currentUser} />
      
// // //     <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white px-6 py-12">
// // //       <section className="max-w-5xl mx-auto text-center">
// // //         {/* <h1 className="text-5xl font-bold mb-6">
// // //           Build SaaS Faster with <span className="text-blue-600">SaaS Jumpstart</span>
// // //         </h1> */}
// // //         <h1 className="text-5xl font-bold mb-6">
// // //           <span className="text-blue-600">SaaS Jumpstart MVP</span> is a private launchpad for identity-driven founders ready to build transformational software and command the world of high-value SaaS with power, precision, and elite support.
// // //         </h1>
// // //         <p className="text-xl mb-10 text-gray-600 dark:text-gray-300">
// // //           Where your MVP becomes the turning point for generational wealth – and the platform for your true authority.
// // //         </p>
// // //         <p className="text-xl mb-10 text-gray-600 dark:text-gray-300">
// // //           SaaS Jumpstart MVP is not a platform—it's a private launch council where identity-driven founders gain direct access to the most trusted, battle-tested SaaS developer teams, with every introduction curated, vetted, and primed for success.
// // //         </p>
// // //         <div className="flex justify-center gap-4">

// // //           {currentUser ? (
// // //             <a
// // //               href="/dashboard"
// // //               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg transition"
// // //             >
// // //               Go to Dashboard
// // //             </a>
// // //           ) : (
// // //             <a
// // //               href="/auth/login"
// // //               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg transition"
// // //             >
// // //               Get Started
// // //             </a>
// // //           )}


// // //           {/* <a
// // //             href="/auth/login"
// // //             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg transition"
// // //           >
// // //             Get Started
// // //           </a> */}
// // //           <a
// // //             href="#features"
// // //             className="border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 px-6 py-3 rounded-md text-lg transition"
// // //           >
// // //             See Features
// // //           </a>
// // //         </div>
// // //       </section>

// // //       <section id="features" className="max-w-6xl mx-auto mt-24 grid md:grid-cols-2 gap-12">
// // //         <Feature
// // //           title="🔐 Ready-to-Go Authentication"
// // //           description="Email/password, magic link, and social login built-in using Supabase."
// // //         />
// // //         <Feature
// // //           title="🧠 AI Tools Included"
// // //           description="Integrated with OpenAI out-of-the-box so you can build smart apps from day one."
// // //         />
// // //         <Feature
// // //           title="🎨 Beautiful Tailwind UI"
// // //           description="Pre-designed components and layouts – dashboard, account settings, admin panel, and more."
// // //         />
// // //         <Feature
// // //           title="🚀 One-click Deployment"
// // //           description="Optimized for Vercel or Netlify – just push to GitHub and deploy."
// // //         />
// // //         <Feature
// // //           title="💳 Stripe Billing Setup"
// // //           description="Plug-and-play pricing pages and subscription logic with Stripe."
// // //         />
// // //         <Feature
// // //           title="📦 Modular Codebase"
// // //           description="Easily extend, remove, or swap features. It's your app, your way."
// // //         />
// // //       </section>

// // //       <section className="max-w-4xl mx-auto mt-24 text-center">
// // //         <h2 className="text-3xl font-semibold mb-6">Built for Founders & Makers</h2>
// // //         <p className="text-gray-600 dark:text-gray-300 text-lg">
// // //           Whether you're validating an idea, building your MVP, or scaling your SaaS, SaaS Jumpstart gives you the foundation to move fast.
// // //         </p>
// // //         <div className="mt-10">
// // //           {currentUser ? (
// // //             <a
// // //               href="/dashboard"
// // //               className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md text-lg"
// // //             >
// // //               Go to Dashboard
// // //             </a>
// // //           ) : (
// // //             <a
// // //             href="/auth/login"
// // //             className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md text-lg"
// // //             >
// // //               Start Building Now
// // //             </a>
// // //           )}
// // //         </div>
// // //       </section>

// // //       <footer className="mt-32 text-center text-gray-400 text-sm">
// // //         © {new Date().getFullYear()} SaaS Jumpstart. All rights reserved.
// // //       </footer>
// // //     </main>
// // //     </>
// // //   );
// // // }

// // // function Feature({ title, description }) {
// // //   return (
// // //     <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm">
// // //       <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{title}</h3>
// // //       <p className="text-gray-600 dark:text-gray-300">{description}</p>
// // //     </div>
// // //   );
// // // }
















// // 'use client'

// // import Image from "next/image";
// // import Dashboard from "./dashboard/page";

// // import { supabase } from "../lib/supabase";
// // import { useRouter } from 'next/navigation';

// // import { useState, useEffect } from "react";

// // import Navbar from './components/Navbar';


// // export default function Home() {
  
// //   const router = useRouter();

// //   const [currentUser, setCurrentUser] = useState(null);
// //   const [userProfile, setUserProfile] = useState(null);
// //   const [isApproved, setApproved] = useState(false);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {

// //     const fetchProfile = async (userId) => {
// //       const { data, error } = await supabase
// //         .from('profiles')
// //         .select('*')
// //         .eq('id', userId)
// //         .single();

// //       if (error) {
// //         console.error('Error fetching profile:', error.message);
// //         await supabase.auth.signOut();
// //         // router.push('/auth/login');
// //         setApproved(false);
// //       } else {
// //         setUserProfile(data);
// //         setApproved(Boolean(data?.verified));
// //       }

// //       setLoading(false);
// //     };

// //     const initAuth = async () => {
// //       const { data: { session } } = await supabase.auth.getSession();

// //       if (session?.user) {
// //         setCurrentUser(session.user);
// //         await fetchProfile(session.user.id);
// //       } else {
// //         // router.push('/auth/login');
// //       }
// //     };

// //     initAuth();

// //     const { data: { subscription } } = supabase.auth.onAuthStateChange(
// //       async (_, session) => {
// //         if (session?.user) {
// //           setCurrentUser(session.user);
// //           await fetchProfile(session.user.id);
// //         } else {
// //           // router.push('/auth/login');
// //         }
// //       }
// //     );

// //     return () => {
// //       subscription.unsubscribe();
// //     };
// //   }, [router]);



// //   return (
// //     <>
// //     <Navbar currentUser={currentUser} />
      
// //     <main className="min-h-screen bg-black text-white px-6 py-12">
// //       <section className="max-w-5xl mx-auto text-center">
// //         <h1 className="text-5xl font-bold mb-6">
// //           <span className="text-gold">SaaS Jumpstart MVP</span> is a private launchpad for identity-driven founders ready to build transformational software and command the world of high-value SaaS with power, precision, and elite support.
// //         </h1>
// //         <p className="text-xl mb-10 text-gray-400">
// //           Where your MVP becomes the turning point for generational wealth – and the platform for your true authority.
// //         </p>
// //         <p className="text-xl mb-10 text-gray-400">
// //           SaaS Jumpstart MVP is not a platform—it's a private launch council where identity-driven founders gain direct access to the most trusted, battle-tested SaaS developer teams, with every introduction curated, vetted, and primed for success.
// //         </p>
// //         <div className="flex justify-center gap-4">

// //           {currentUser ? (
// //             <a
// //               href="/dashboard"
// //               className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-md text-lg transition"
// //             >
// //               Go to Dashboard
// //             </a>
// //           ) : (
// //             <a
// //               href="/auth/login"
// //               className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-md text-lg transition"
// //             >
// //               Get Started
// //             </a>
// //           )}


// //           <a
// //             href="#features"
// //             className="border border-yellow-500 text-gold hover:bg-gray-800 px-6 py-3 rounded-md text-lg transition"
// //           >
// //             See Features
// //           </a>
// //         </div>
// //       </section>

// //       <section id="features" className="max-w-6xl mx-auto mt-24 grid md:grid-cols-2 gap-12">
// //         <Feature
// //           title="🔐 Ready-to-Go Authentication"
// //           description="Email/password, magic link, and social login built-in using Supabase."
// //         />
// //         <Feature
// //           title="🧠 AI Tools Included"
// //           description="Integrated with OpenAI out-of-the-box so you can build smart apps from day one."
// //         />
// //         <Feature
// //           title="🎨 Beautiful Tailwind UI"
// //           description="Pre-designed components and layouts – dashboard, account settings, admin panel, and more."
// //         />
// //         <Feature
// //           title="🚀 One-click Deployment"
// //           description="Optimized for Vercel or Netlify – just push to GitHub and deploy."
// //         />
// //         <Feature
// //           title="💳 Stripe Billing Setup"
// //           description="Plug-and-play pricing pages and subscription logic with Stripe."
// //         />
// //         <Feature
// //           title="📦 Modular Codebase"
// //           description="Easily extend, remove, or swap features. It's your app, your way."
// //         />
// //       </section>

// //       <section className="max-w-4xl mx-auto mt-24 text-center">
// //         <h2 className="text-3xl font-semibold mb-6">Built for Founders & Makers</h2>
// //         <p className="text-gray-400 text-lg">
// //           Whether you're validating an idea, building your MVP, or scaling your SaaS, SaaS Jumpstart gives you the foundation to move fast.
// //         </p>
// //         <div className="mt-10">
// //           {currentUser ? (
// //             <a
// //               href="/dashboard"
// //               className="bg-gold hover:bg-yellow-600 text-black px-6 py-3 rounded-md text-lg"
// //             >
// //               Go to Dashboard
// //             </a>
// //           ) : (
// //             <a
// //             href="/auth/login"
// //             className="bg-gold hover:bg-yellow-600 text-black px-6 py-3 rounded-md text-lg"
// //             >
// //               Start Building Now
// //             </a>
// //           )}
// //         </div>
// //       </section>

// //       <footer className="mt-32 text-center text-gray-600 text-sm">
// //         © {new Date().getFullYear()} SaaS Jumpstart. All rights reserved.
// //       </footer>
// //     </main>
// //     </>
// //   );
// // }

// // function Feature({ title, description }) {
// //   return (
// //     <div className="bg-gray-900 rounded-xl p-6 shadow-sm">
// //       <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
// //       <p className="text-gray-400">{description}</p>
// //     </div>
// //   );
// // }
















// 'use client'

// import Image from "next/image";
// import Dashboard from "./dashboard/page";
// import { supabase } from "../lib/supabase";
// import { useRouter } from 'next/navigation';
// import { useState, useEffect } from "react";
// import Navbar from './components/Navbar';

// export default function Home() {
//   const router = useRouter();

//   const [currentUser, setCurrentUser] = useState(null);
//   const [userProfile, setUserProfile] = useState(null);
//   const [isApproved, setApproved] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async (userId) => {
//       const { data, error } = await supabase
//         .from('profiles')
//         .select('*')
//         .eq('id', userId)
//         .single();

//       if (error) {
//         console.error('Error fetching profile:', error.message);
//         await supabase.auth.signOut();
//         setApproved(false);
//       } else {
//         setUserProfile(data);
//         setApproved(Boolean(data?.verified));
//       }

//       setLoading(false);
//     };

//     const initAuth = async () => {
//       const { data: { session } } = await supabase.auth.getSession();

//       if (session?.user) {
//         setCurrentUser(session.user);
//         await fetchProfile(session.user.id);
//       }
//     };

//     initAuth();

//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       async (_, session) => {
//         if (session?.user) {
//           setCurrentUser(session.user);
//           await fetchProfile(session.user.id);
//         }
//       }
//     );

//     return () => {
//       subscription.unsubscribe();
//     };
//   }, [router]);

//   return (
//     <>
//       <Navbar currentUser={currentUser} />

//       <main className="min-h-screen bg-black text-white px-6 py-12">
//         <section className="max-w-5xl mx-auto text-center">
//           <h1 className="text-5xl font-bold mb-6">
//             <span className="text-yellow-500">SaaS Jumpstart MVP</span> is a private launchpad for identity-driven founders ready to build transformational software and command the world of high-value SaaS with power, precision, and elite support.
//           </h1>
//           <p className="text-xl mb-10 text-gray-300">
//             Where your MVP becomes the turning point for generational wealth – and the platform for your true authority.
//           </p>
//           <p className="text-xl mb-10 text-gray-300">
//             SaaS Jumpstart MVP is not a platform—it's a private launch council where identity-driven founders gain direct access to the most trusted, battle-tested SaaS developer teams, with every introduction curated, vetted, and primed for success.
//           </p>
//           <div className="flex justify-center gap-4">
//             {currentUser ? (
//               <a
//                 href="/dashboard"
//                 className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-md text-lg font-semibold transition"
//               >
//                 Go to Dashboard
//               </a>
//             ) : (
//               <a
//                 href="/auth/login"
//                 className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-md text-lg font-semibold transition"
//               >
//                 Get Started
//               </a>
//             )}

//             <a
//               href="#features"
//               className="border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-6 py-3 rounded-md text-lg font-semibold transition"
//             >
//               See Features
//             </a>
//           </div>
//         </section>

//         <section id="features" className="max-w-6xl mx-auto mt-24 grid md:grid-cols-2 gap-12">
//           <Feature
//             title="🔐 Ready-to-Go Authentication"
//             description="Email/password, magic link, and social login built-in using Supabase."
//           />
//           <Feature
//             title="🧠 AI Tools Included"
//             description="Integrated with OpenAI out-of-the-box so you can build smart apps from day one."
//           />
//           <Feature
//             title="🎨 Beautiful Tailwind UI"
//             description="Pre-designed components and layouts – dashboard, account settings, admin panel, and more."
//           />
//           <Feature
//             title="🚀 One-click Deployment"
//             description="Optimized for Vercel or Netlify – just push to GitHub and deploy."
//           />
//           <Feature
//             title="💳 Stripe Billing Setup"
//             description="Plug-and-play pricing pages and subscription logic with Stripe."
//           />
//           <Feature
//             title="📦 Modular Codebase"
//             description="Easily extend, remove, or swap features. It's your app, your way."
//           />
//         </section>

//         <section className="max-w-4xl mx-auto mt-24 text-center">
//           <h2 className="text-3xl font-semibold mb-6 text-yellow-500">Built for Founders & Makers</h2>
//           <p className="text-gray-300 text-lg">
//             Whether you're validating an idea, building your MVP, or scaling your SaaS, SaaS Jumpstart gives you the foundation to move fast.
//           </p>
//           <div className="mt-10">
//             {currentUser ? (
//               <a
//                 href="/dashboard"
//                 className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-md text-lg font-semibold"
//               >
//                 Go to Dashboard
//               </a>
//             ) : (
//               <a
//                 href="/auth/login"
//                 className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-md text-lg font-semibold"
//               >
//                 Start Building Now
//               </a>
//             )}
//           </div>
//         </section>

//         <footer className="mt-32 text-center text-gray-500 text-sm">
//           © {new Date().getFullYear()} SaaS Jumpstart. All rights reserved.
//         </footer>
//       </main>
//     </>
//   );
// }

// function Feature({ title, description }) {
//   return (
//     <div className="bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-800">
//       <h3 className="text-xl font-semibold mb-2 text-yellow-500">{title}</h3>
//       <p className="text-gray-300">{description}</p>
//     </div>
//   );
// }









'use client'

import Image from "next/image";
import Dashboard from "./dashboard/page";
import { supabase } from "../lib/supabase";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function Home() {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isApproved, setApproved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async (userId) => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error.message);
        await supabase.auth.signOut();
        setApproved(false);
      } else {
        setUserProfile(data);
        setApproved(Boolean(data?.verified));
      }

      setLoading(false);
    };

    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        setCurrentUser(session.user);
        await fetchProfile(session.user.id);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        if (session?.user) {
          setCurrentUser(session.user);
          await fetchProfile(session.user.id);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  return (
    <>
      <Navbar currentUser={currentUser} />

      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 py-12">
        <section className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-6">
            <span className="text-[var(--gold)]">SaaS Jumpstart MVP</span> is a private launchpad for identity-driven founders ready to build transformational software and command the world of high-value SaaS with power, precision, and elite support.
          </h1>
          <p className="text-xl mb-10 text-[var(--gray)]">
            Where your MVP becomes the turning point for generational wealth – and the platform for your true authority.
          </p>
          <p className="text-xl mb-10 text-[var(--gray)]">
            SaaS Jumpstart MVP is not a platform—it's a private launch council where identity-driven founders gain direct access to the most trusted, battle-tested SaaS developer teams, with every introduction curated, vetted, and primed for success.
          </p>
          <div className="flex justify-center gap-4">
            {currentUser ? (
              <a
                href="/dashboard"
                className="bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[var(--black)] px-6 py-3 rounded-md text-lg font-semibold transition"
              >
                Go to Dashboard
              </a>
            ) : (
              <a
                href="/auth/login"
                className="bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[var(--black)] px-6 py-3 rounded-md text-lg font-semibold transition"
              >
                Get Started
              </a>
            )}

            <a
              href="#features"
              className="border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--black)] px-6 py-3 rounded-md text-lg font-semibold transition"
            >
              See Features
            </a>
          </div>
        </section>

        <section id="features" className="max-w-6xl mx-auto mt-24 grid md:grid-cols-2 gap-12">
          <Feature
            title="🔐 Ready-to-Go Authentication"
            description="Email/password, magic link, and social login built-in using Supabase."
          />
          <Feature
            title="🧠 AI Tools Included"
            description="Integrated with OpenAI out-of-the-box so you can build smart apps from day one."
          />
          <Feature
            title="🎨 Beautiful Tailwind UI"
            description="Pre-designed components and layouts – dashboard, account settings, admin panel, and more."
          />
          <Feature
            title="🚀 One-click Deployment"
            description="Optimized for Vercel or Netlify – just push to GitHub and deploy."
          />
          <Feature
            title="💳 Stripe Billing Setup"
            description="Plug-and-play pricing pages and subscription logic with Stripe."
          />
          <Feature
            title="📦 Modular Codebase"
            description="Easily extend, remove, or swap features. It's your app, your way."
          />
        </section>

        <section className="max-w-4xl mx-auto mt-24 text-center">
          <h2 className="text-3xl font-semibold mb-6 text-[var(--gold)]">Built for Founders & Makers</h2>
          <p className="text-[var(--gray)] text-lg">
            Whether you're validating an idea, building your MVP, or scaling your SaaS, SaaS Jumpstart gives you the foundation to move fast.
          </p>
          <div className="mt-10">
            {currentUser ? (
              <a
                href="/dashboard"
                className="bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[var(--black)] px-6 py-3 rounded-md text-lg font-semibold"
              >
                Go to Dashboard
              </a>
            ) : (
              <a
                href="/auth/login"
                className="bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[var(--black)] px-6 py-3 rounded-md text-lg font-semibold"
              >
                Start Building Now
              </a>
            )}
          </div>
        </section>

        {/* <footer className="mt-32 text-center text-[var(--gray)] text-sm">
          © {new Date().getFullYear()} SaaS Jumpstart. All rights reserved.
        </footer> */}

        <Footer currentUser={currentUser} />
      </main>
    </>
  );
}

function Feature({ title, description }) {
  return (
    <div className="bg-[var(--card-bg)] rounded-xl p-6 shadow-sm border border-[var(--border)]">
      <h3 className="text-xl font-semibold mb-2 text-[var(--gold)]">{title}</h3>
      <p className="text-[var(--gray)]">{description}</p>
    </div>
  );
}
