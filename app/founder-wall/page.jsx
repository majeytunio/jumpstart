
// // 'use client'

// // import Image from "next/image";
// // import Dashboard from "../dashboard/page";
// // import { supabase } from "../../lib/supabase";
// // import { useRouter } from 'next/navigation';
// // import { useState, useEffect } from "react";
// // import Navbar from './components/Navbar';
// // import { CalendarDateRangeIcon, EnvelopeIcon, LockClosedIcon, PaperAirplaneIcon, SparklesIcon, TrashIcon } from "@heroicons/react/24/outline";

// // export default function FounderWall() {
// //   const router = useRouter();

// //   const [currentUser, setCurrentUser] = useState(null);
// //   const [userProfile, setUserProfile] = useState(null);
// //   const [userProgressWin, setUserProgressWin] = useState(null);
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
// //         setApproved(false);
// //       } else {
// //         setUserProfile(data);
// //         setApproved(Boolean(data?.verified));
// //       }

// //       setLoading(false);
// //     };
    
    
// //     const fetchProgressWin = async (userId) => {
// //       // 4. Fetch ideas
// //       const { data: progressData, error: progressError } = await supabase
// //         .from('progresses')
// //         .select('*')
// //         .eq('user_id', userId)
// //         .order('created_at', { ascending: false });

// //         console.log("Progress Data: ", progressData);

// //       if (progressError) {
// //         console.error('Error fetching profile:', error.message);
// //         await supabase.auth.signOut();
// //       } else {
// //         setUserProgressWin(progressData);
// //       }

// //       setLoading(false);
// //     };


// //     const initAuth = async () => {
// //       const { data: { session } } = await supabase.auth.getSession();

// //       if (session?.user) {
// //         setCurrentUser(session.user);
// //         await fetchProfile(session.user.id);
// //       }
// //     };

// //     initAuth();

// //     const { data: { subscription } } = supabase.auth.onAuthStateChange(
// //       async (_, session) => {
// //         if (session?.user) {
// //           setCurrentUser(session.user);
// //           await fetchProfile(session.user.id);
// //           await fetchProgressWin(session.user.id);
// //         }
// //       }
// //     );

// //     return () => {
// //       subscription.unsubscribe();
// //     };
// //   }, [router]);

// //   return (
// //     <>
// //       <Navbar currentUser={currentUser} />

// //       <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 py-12">
// //         <section className="max-w-6xl mx-auto mt-12 center-items text-center">
// //             <h1 className="text-4xl font-bold mb-4 text-[var(--foreground)]">
// //                 Share Your SaaS Journey
// //             </h1>
// //             <p className="text-lg mb-6 text-[var(--muted-foreground)]">
// //                 Connect with fellow entrepreneurs, celebrate wins, and track your progress as you build your MVP.
// //             </p>

// //             {!currentUser && (
// //                 <button
// //                     onClick={() => { window.location.href = '/auth/login'; }}
// //                     className="mt-4 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[var(--black)] px-4 py-2 rounded-md disabled:opacity-50 transition"
// //                     >
// //                     Login to Share Update
// //                 </button>

// //             )}

// //         </section>

// //         {currentUser && (
// //             <section className="max-w-6xl mx-auto mt-12 grid md:grid-cols-3 gap-12">
// //                 {/* Form column - 33% width */}
// //                 <div className="col-span-1">

// //                     <div className="bg-[var(--card-bg)] p-6 rounded-xl shadow border border-[var(--border)]">
// //                     <label className="block text-[var(--foreground)] mb-2 font-medium">
// //                         Share an Update
// //                     </label>
// //                     <textarea
// //                         className="w-full h-32 p-3 border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
// //                         placeholder="What progress have you made? Share your wins, challenges, or milestones..."
// //                     />
// //                     <button
// //                         className="w-full mt-4 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[var(--black)] px-4 py-2 rounded-md disabled:opacity-50 transition"
// //                     >
// //                         Share Update
// //                     </button>
// //                     </div>
// //                 </div>

// //                 {/* Features column - 66% width */}
// //                 <div className="col-span-2">
// //                     {(!userProgressWin || userProgressWin.length === 0) && (
// //                     <p className="text-center text-[var(--muted-foreground)] mt-8">
// //                         No ideas found.
// //                     </p>
// //                     )}

// //                     <div className="grid gap-8">
// //                     {userProgressWin?.map((item) => (
// //                         <Feature
// //                         key={item.id}
// //                         currentUserId={currentUser?.id}
// //                         winUserId={item.user_id}
// //                         username={item.username}
// //                         email={item.email}
// //                         date={new Date(item.created_at).toLocaleDateString("en-US", {
// //                             year: "numeric",
// //                             month: "long",
// //                             day: "numeric",
// //                         })}
// //                         description={item.description}
// //                         />
// //                     ))}
// //                     </div>
// //                 </div>
// //             </section>
// //         )}


// //         <footer className="mt-32 text-center text-[var(--gray)] text-sm">
// //           © {new Date().getFullYear()} SaaS Jumpstart. All rights reserved.
// //         </footer>
// //       </main>
// //     </>
// //   );
// // }

// // function Feature({ currentUserId, winUserId, username, email, date, description }) {
// // //   return (
// // //     <div className="bg-[var(--card-bg)] rounded-xl p-6 shadow-sm border border-[var(--border)]">
// // //       <h3 className="text-xl font-semibold mb-2 text-[var(--gold)]">{title}</h3>
// // //       <p className="text-[var(--gray)]">{description}</p>
// // //     </div>
// // //   );

// //     return (
// //     <div className="relative bg-[var(--card-bg)] rounded-xl p-6 shadow-sm border border-[var(--border)] overflow-hidden transition-all duration-300 hover:shadow-lg">
        
// //         {/* Decorative postcard 'stamp' */}

// //         {currentUserId === winUserId && (
// //             <div className="absolute top-4 right-4 p-2 bg-[var(--danger-color)] text-[var(--white)] rounded-full shadow-md">
// //             <TrashIcon className="w-5 h-5" />
// //             </div>
// //         )}

// //         <div className="flex flex-col h-full justify-between">
// //         {/* Postcard header with user info */}
// //         <div className="mb-4">
// //             <p className="text-xl font-semibold text-[var(--foreground)]" style={{marginBottom: "12px"}}>
// //             <span className="text-[var(--gold)]">{username}</span>
// //             </p>
// //             <p className="text-xs text-[var(--gray)] flex items-center">
// //             <EnvelopeIcon className="w-4 h-4 mr-1" />
// //             {email}
// //             </p>
// //             <p className="text-xs text-[var(--gray)] flex items-center">
// //             <CalendarDateRangeIcon className="w-4 h-4 mr-1" />
// //             {date}
// //             </p>
// //         </div>

// //         {/* Postcard body */}
// //         <div className="flex-grow">
// //             {/* <h3 className="text-xl font-semibold mb-2 text-[var(--gold)]">{date}</h3> */}
// //             <p className="text-[var(--gray)]">{description}</p>
// //         </div>
// //         </div>
// //     </div>
// //     );

// // }






// 'use client'

// import { supabase } from "../../lib/supabase";
// import { useRouter } from 'next/navigation';
// import { useState, useEffect } from "react";
// import Navbar from '../components/Navbar';
// import { CalendarDateRangeIcon, EnvelopeIcon, TrashIcon } from "@heroicons/react/24/outline";

// export default function FounderWall() {
//   const router = useRouter();

//   const [currentUser, setCurrentUser] = useState(null);
//   const [userProfile, setUserProfile] = useState(null);
//   const [userProgressWin, setUserProgressWin] = useState([]);
//   const [isApproved, setApproved] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [updateText, setUpdateText] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   // Fetch profile
//   const fetchProfile = async (userId) => {
//     const { data, error } = await supabase
//       .from('profiles')
//       .select('*')
//       .eq('id', userId)
//       .single();

//     if (error) {
//       console.error('Error fetching profile:', error.message);
//       await supabase.auth.signOut();
//       setApproved(false);
//     } else {
//       setUserProfile(data);
//       setApproved(Boolean(data?.verified));
//     }
//   };

//   // Fetch progresses
//   const fetchProgressWin = async (userId) => {
//     const { data: progressData, error: progressError } = await supabase
//       .from('progresses')
//       .select('*')
//       .order('created_at', { ascending: false });

//     if (progressError) {
//       console.error('Error fetching progresses:', progressError.message);
//     } else {
//       setUserProgressWin(progressData);
//     }
//   };

//   // Insert update into progresses
//   const handleShareUpdate = async () => {
//     if (!updateText.trim()) return;
//     setSubmitting(true);

//     const { error } = await supabase
//       .from('progresses')
//       .insert([
//         {
//           user_id: currentUser.id,
//           username: userProfile?.name,
//           email: currentUser.email,
//           description: updateText.trim()
//         }
//       ]);

//     if (error) {
//       console.error("Error sharing update:", error.message);
//     } else {
//       setUpdateText("");
//       await fetchProgressWin(currentUser.id);
//     }
//     setSubmitting(false);
//   };

//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const [progressToDelete, setProgressToDelete] = useState(null);

//     const confirmDeleteProgress = (id) => {
//     setProgressToDelete(id);
//     setShowDeleteModal(true);
//     };

//     const handleDeleteProgress = async () => {
//     if (!progressToDelete) return;

//     const { error } = await supabase
//         .from("progresses")
//         .delete()
//         .eq("id", progressToDelete);

//     if (error) {
//         console.error("Error deleting progress:", error.message);
//     } else {
//         setUserProgressWin((prev) => prev.filter((p) => p.id !== progressToDelete));
//     }

//     setShowDeleteModal(false);
//     setProgressToDelete(null);
//     };




//   // Auth init
//   useEffect(() => {
//     const initAuth = async () => {
//       const { data: { session } } = await supabase.auth.getSession();

//       if (session?.user) {
//         setCurrentUser(session.user);
//         await fetchProfile(session.user.id);
//         await fetchProgressWin(session.user.id);
//       }
//       setLoading(false);
//     };

//     initAuth();

//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       async (_, session) => {
//         if (session?.user) {
//           setCurrentUser(session.user);
//           await fetchProfile(session.user.id);
//           await fetchProgressWin(session.user.id);
//         } else {
//           setCurrentUser(null);
//           setUserProgressWin([]);
//         }
//       }
//     );

//     return () => {
//       subscription.unsubscribe();
//     };
//   }, []);

//   return (
//     <>
//       <Navbar currentUser={currentUser} />

//       <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 py-12">
//         <section className="max-w-6xl mx-auto mt-12 center-items text-center">
//           <h1 className="text-4xl font-bold mb-4 text-[var(--foreground)]">
//             Share Your SaaS Journey
//           </h1>
//           <p className="text-lg mb-6 text-[var(--muted-foreground)]">
//             Connect with fellow entrepreneurs, celebrate wins, and track your progress as you build your MVP.
//           </p>

//           {!currentUser && (
//             <button
//               onClick={() => { window.location.href = '/auth/login'; }}
//               className="mt-4 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[var(--black)] px-4 py-2 rounded-md transition"
//             >
//               Login to Share Update
//             </button>
//           )}
//         </section>

//         {currentUser && (
//           <section className="max-w-6xl mx-auto mt-12 grid md:grid-cols-3 gap-12">
//             {/* Form - 33% */}
//             <div className="col-span-1">
//               <div className="bg-[var(--card-bg)] p-6 rounded-xl shadow border border-[var(--border)]">
//                 <label className="block text-[var(--foreground)] mb-2 font-medium">
//                   Share an Update
//                 </label>
//                 <textarea
//                   className="w-full h-32 p-3 border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
//                   placeholder="What progress have you made? Share your wins, challenges, or milestones..."
//                   value={updateText}
//                   onChange={(e) => setUpdateText(e.target.value)}
//                 />
//                 <button
//                   onClick={handleShareUpdate}
//                   disabled={submitting || !updateText.trim()}
//                   className="w-full mt-4 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[var(--black)] px-4 py-2 rounded-md disabled:opacity-50 transition"
//                 >
//                   {submitting ? "Sharing..." : "Share Update"}
//                 </button>
//               </div>
//             </div>

//             {/* Features - 66% */}
            

//             {/* Features - 66% */}
//             <div className="col-span-2">
//             {loading ? (
//                 <div className="flex justify-center items-center py-12">
//                 <div className="w-8 h-8 border-4 border-[var(--gold)] border-t-transparent rounded-full animate-spin"></div>
//                 </div>
//             ) : !userProgressWin || userProgressWin.length === 0 ? (
//                 <p className="text-center text-[var(--muted-foreground)] mt-8">
//                 No records found.
//                 </p>
//             ) : (
//                 <div className="grid gap-8">
//                 {userProgressWin.map((item) => (
//                     <Feature
//                     key={item.id}
//                     id={item.id}
//                     currentUserId={currentUser?.id}
//                     winUserId={item.user_id}
//                     username={item.username}
//                     email={item.email}
//                     date={new Date(item.created_at).toLocaleDateString("en-US", {
//                         year: "numeric",
//                         month: "long",
//                         day: "numeric",
//                     })}
//                     description={item.description}
//                     onDelete={confirmDeleteProgress}
//                     />
//                 ))}
//                 </div>
//             )}
//             </div>



//           </section>
//         )}

//         <footer className="mt-32 text-center text-[var(--gray)] text-sm">
//           © {new Date().getFullYear()} SaaS Jumpstart. All rights reserved.
//         </footer>


//         {showDeleteModal && (
//             <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//                 <div className="bg-[var(--card-bg)] p-6 rounded-xl shadow-lg border border-[var(--border)] max-w-sm w-full text-center">
//                 <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
//                     Delete Progress
//                 </h2>
//                 <p className="text-[var(--muted-foreground)] mb-6">
//                     Are you sure you want to delete this progress update? This action cannot be undone.
//                 </p>
//                 <div className="flex justify-center gap-4">
//                     <button
//                     onClick={handleDeleteProgress}
//                     className="bg-[var(--danger-color)] hover:opacity-90 text-white px-4 py-2 rounded-md transition"
//                     >
//                     Yes, Delete
//                     </button>
//                     <button
//                     onClick={() => setShowDeleteModal(false)}
//                     className="bg-[var(--border)] hover:bg-[var(--muted-foreground)] text-[var(--foreground)] px-4 py-2 rounded-md transition"
//                     >
//                     Cancel
//                     </button>
//                 </div>
//                 </div>
//             </div>
//         )}


//       </main>
//     </>
//   );
// }

// // function Feature({ currentUserId, winUserId, username, email, date, description }) {
// //   return (
// //     <div className="relative bg-[var(--card-bg)] rounded-xl p-6 shadow-sm border border-[var(--border)] overflow-hidden transition-all duration-300 hover:shadow-lg">
// //       {currentUserId === winUserId && (
// //         <div className="absolute top-4 right-4 p-2 bg-[var(--danger-color)] text-[var(--white)] rounded-full shadow-md">
// //           <TrashIcon className="w-5 h-5" />
// //         </div>
// //       )}
// //       <div className="mb-4">
// //         <p className="text-xl font-semibold text-[var(--foreground)] mb-3">
// //           <span className="text-[var(--gold)]">{username}</span>
// //         </p>
// //         <p className="text-xs text-[var(--gray)] flex items-center">
// //           <EnvelopeIcon className="w-4 h-4 mr-1" />
// //           {email}
// //         </p>
// //         <p className="text-xs text-[var(--gray)] flex items-center">
// //           <CalendarDateRangeIcon className="w-4 h-4 mr-1" />
// //           {date}
// //         </p>
// //       </div>
// //       <p className="text-[var(--gray)]">{description}</p>
// //     </div>
// //   );
// // }


// function Feature({ id, currentUserId, winUserId, username, email, date, description, onDelete }) {
//   return (
//     <div className="relative bg-[var(--card-bg)] rounded-xl p-6 shadow-sm border border-[var(--border)] overflow-hidden transition-all duration-300 hover:shadow-lg">
//       {currentUserId === winUserId && (
//         <button
//           onClick={() => onDelete(id)}
//           className="absolute top-4 right-4 p-2 bg-[var(--danger-color)] text-[var(--white)] rounded-full shadow-md hover:opacity-80 transition"
//         >
//           <TrashIcon className="w-5 h-5" />
//         </button>
//       )}
//       <div className="mb-4">
//         <p className="text-xl font-semibold text-[var(--foreground)] mb-3">
//           <span className="text-[var(--gold)]">{username}</span>
//         </p>
//         <p className="text-xs text-[var(--gray)] flex items-center">
//           <EnvelopeIcon className="w-4 h-4 mr-1" />
//           {email}
//         </p>
//         <p className="text-xs text-[var(--gray)] flex items-center">
//           <CalendarDateRangeIcon className="w-4 h-4 mr-1" />
//           {date}
//         </p>
//       </div>
//       <p className="text-[var(--gray)]">{description}</p>
//     </div>
//   );
// }














'use client'

import { supabase } from "../../lib/supabase";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CalendarDateRangeIcon, EnvelopeIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function FounderWall() {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userProgressWin, setUserProgressWin] = useState([]);
  const [isApproved, setApproved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updateText, setUpdateText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch profile
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
  };

  // Fetch progresses (filter by userId)
  const fetchProgressWin = async (userId) => {
    const { data: progressData, error: progressError } = await supabase
      .from('progresses')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (progressError) {
      console.error('Error fetching progresses:', progressError.message);
    } else {
      setUserProgressWin(progressData);
    }
  };

  // Insert update into progresses
  const handleShareUpdate = async () => {
    if (!updateText.trim()) return;
    setSubmitting(true);

    const { error } = await supabase
      .from('progresses')
      .insert([
        {
          user_id: currentUser.id,
          username: userProfile?.name,
          email: currentUser.email,
          description: updateText.trim()
        }
      ]);

    if (error) {
      console.error("Error sharing update:", error.message);
    } else {
      setUpdateText("");
      await fetchProgressWin(currentUser.id);
    }
    setSubmitting(false);
  };

  // Delete progress modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [progressToDelete, setProgressToDelete] = useState(null);

  const confirmDeleteProgress = (id) => {
    setProgressToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDeleteProgress = async () => {
    if (!progressToDelete) return;

    const { error } = await supabase
      .from("progresses")
      .delete()
      .eq("id", progressToDelete);

    if (error) {
      console.error("Error deleting progress:", error.message);
    } else {
      setUserProgressWin((prev) => prev.filter((p) => p.id !== progressToDelete));
    }

    setShowDeleteModal(false);
    setProgressToDelete(null);
  };

  // Auth init
  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        setCurrentUser(session.user);
        await fetchProfile(session.user.id);
        await fetchProgressWin(session.user.id);
      }
      setLoading(false);
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        if (session?.user) {
          setCurrentUser(session.user);
          await fetchProfile(session.user.id);
          await fetchProgressWin(session.user.id);
        } else {
          setCurrentUser(null);
          setUserProgressWin([]);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <Navbar currentUser={currentUser} />

      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 py-12">
        <section className="max-w-6xl mx-auto mt-12 center-items text-center">
          <h1 className="text-4xl font-bold mb-4 text-[var(--foreground)]">
            {/* Share Your SaaS Journey */}
            Where SaaS Founders Build Legacy Together
          </h1>
          <p className="text-lg mb-6 text-[var(--muted-foreground)]">
            {/* Connect with fellow entrepreneurs, celebrate wins, and track your progress as you build your MVP. */}
            Post your wins, share your challenges, and connect with vetted founders turning ideas into SaaS empires.
          </p>
          <p className="text-lg mb-6 text-[var(--muted-foreground)]">
            {/* Connect with fellow entrepreneurs, celebrate wins, and track your progress as you build your MVP. */}
            Join an exclusive network of vetted SaaS founders. Every member is a proven builder, ensuring you connect with peers who speak your language. Share insights, post wins, and get real-time feedback on your challenges. Collaborate, cross-pollinate ideas, and accelerate your entrepreneurial journey through premium peer-to-peer networking. This isn’t just a wall—it’s where SaaS Founders build legacy together.
          </p>

          {!currentUser && (
            <button
              onClick={() => router.push("/auth/login")}
              className="mt-4 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[var(--black)] px-4 py-2 rounded-md transition"
            >
              Login to Share Update
            </button>
          )}
        </section>

        
        {currentUser && (
          <section className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Form - 33% on desktop, full width on mobile */}
            <div className="col-span-1 md:col-span-1 col-span-full">
              <div className="bg-[var(--card-bg)] p-6 rounded-xl shadow border border-[var(--border)]">
                <label className="block text-[var(--foreground)] mb-2 font-medium">
                  Share an Update
                </label>
                <textarea
                  className="w-full h-32 p-3 border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                  placeholder="What progress have you made? Share your wins, challenges, or milestones..."
                  value={updateText}
                  onChange={(e) => setUpdateText(e.target.value)}
                />
                <button
                  onClick={handleShareUpdate}
                  disabled={submitting || !updateText.trim()}
                  className="w-full mt-4 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[var(--black)] px-4 py-2 rounded-md disabled:opacity-50 transition"
                >
                  {submitting ? "Sharing..." : "Share Update"}
                </button>
              </div>
            </div>

            {/* Progress feed - 66% on desktop, full width on mobile */}
            <div className="col-span-full md:col-span-2">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="w-8 h-8 border-4 border-[var(--gold)] border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : !userProgressWin || userProgressWin.length === 0 ? (
                <p className="text-center text-[var(--muted-foreground)] mt-8">
                  No records found.
                </p>
              ) : (
                <div className="grid gap-8">
                  {userProgressWin.map((item) => (
                    <Feature
                      key={item.id}
                      id={item.id}
                      currentUserId={currentUser?.id}
                      winUserId={item.user_id}
                      username={item.username}
                      email={item.email}
                      date={new Date(item.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                      description={item.description}
                      onDelete={confirmDeleteProgress}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}



        {/* <footer className="mt-32 text-center text-[var(--gray)] text-sm">
          © {new Date().getFullYear()} SaaS Jumpstart. All rights reserved.
        </footer> */}

        <Footer currentUser={currentUser} isApproved={isApproved} />

        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-[var(--card-bg)] p-6 rounded-xl shadow-lg border border-[var(--border)] max-w-sm w-full text-center">
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
                Delete Progress
              </h2>
              <p className="text-[var(--muted-foreground)] mb-6">
                Are you sure you want to delete this progress update? This action cannot be undone.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDeleteProgress}
                  className="bg-[var(--danger-color)] hover:opacity-90 text-white px-4 py-2 rounded-md transition"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="bg-[var(--border)] hover:bg-[var(--muted-foreground)] text-[var(--foreground)] px-4 py-2 rounded-md transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

function Feature({ id, currentUserId, winUserId, username, email, date, description, onDelete }) {
  return (
    <div className="relative bg-[var(--card-bg)] rounded-xl p-6 shadow-sm border border-[var(--border)] overflow-hidden transition-all duration-300 hover:shadow-lg">
      {currentUserId === winUserId && (
        <button
          onClick={() => onDelete(id)}
          className="absolute top-4 right-4 p-2 bg-[var(--danger-color)] text-[var(--white)] rounded-full shadow-md hover:opacity-80 transition"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      )}
      <div className="mb-4">
        <p className="text-xl font-semibold text-[var(--foreground)] mb-3">
          <span className="text-[var(--gold)]">{username}</span>
        </p>
        <p className="text-xs text-[var(--gray)] flex items-center">
          <EnvelopeIcon className="w-4 h-4 mr-1" />
          {email}
        </p>
        <p className="text-xs text-[var(--gray)] flex items-center">
          <CalendarDateRangeIcon className="w-4 h-4 mr-1" />
          {date}
        </p>
      </div>
      <p className="text-[var(--gray)]">{description}</p>
    </div>
  );
}
