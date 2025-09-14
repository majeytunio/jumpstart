

// // 'use client'

// // import { supabase } from "../../../lib/supabase";
// // import { useRouter } from 'next/navigation';
// // import { useState, useEffect } from "react";
// // import Navbar from '../../components/Navbar';
// // import { CalendarDateRangeIcon, EnvelopeIcon, TrashIcon } from "@heroicons/react/24/outline";

// // export default function FounderConnect() {
// //   const router = useRouter();

// //   const [currentUser, setCurrentUser] = useState(null);
// //   const [userProfile, setUserProfile] = useState(null);
// //   const [userProgressWin, setUserProgressWin] = useState([]);
  
// //   const [founderList, setFoundersList] = useState([]);

// //   const [isApproved, setApproved] = useState(false);
// //   const [loading, setLoading] = useState(true);
// //   const [updateText, setUpdateText] = useState("");
// //   const [submitting, setSubmitting] = useState(false);

// //   // Fetch profile
// //   const fetchProfile = async (userId) => {
// //     const { data, error } = await supabase
// //       .from('profiles')
// //       .select('*')
// //       .eq('id', userId)
// //       .single();

// //     if (error) {
// //       console.error('Error fetching profile:', error.message);
// //       await supabase.auth.signOut();
// //       setApproved(false);
// //     } else {
// //       setUserProfile(data);
// //       setApproved(Boolean(data?.verified));
// //     }
// //   };

// //   // Fetch progresses
// //   const fetchProgressWin = async (userId) => {
// //     const { data: progressData, error: progressError } = await supabase
// //       .from('progresses')
// //       .select('*')
// //       .order('created_at', { ascending: false });

// //     if (progressError) {
// //       console.error('Error fetching progresses:', progressError.message);
// //     } else {
// //       setUserProgressWin(progressData);
// //     }
// //   };

// //   // Fetch progresses
// //   const fetchfoundersList = async (userId) => {
// //     const { data: foundersData, error: progressError } = await supabase
// //       .from('profiles')
// //       .select('*')
// //       .order('created_at', { ascending: false });

// //     if (progressError) {
// //       console.error('Error fetching progresses:', progressError.message);
// //     } else {
// //       setFoundersList(foundersData);
// //     }
// //   };

// //   // Insert update into progresses
// //   const handleShareUpdate = async () => {
// //     if (!updateText.trim()) return;
// //     setSubmitting(true);

// //     const { error } = await supabase
// //       .from('progresses')
// //       .insert([
// //         {
// //           user_id: currentUser.id,
// //           username: userProfile?.name,
// //           email: currentUser.email,
// //           description: updateText.trim()
// //         }
// //       ]);

// //     if (error) {
// //       console.error("Error sharing update:", error.message);
// //     } else {
// //       setUpdateText("");
// //       await fetchProgressWin(currentUser.id);
// //     }
// //     setSubmitting(false);
// //   };

// //     const [showDeleteModal, setShowDeleteModal] = useState(false);
// //     const [progressToDelete, setProgressToDelete] = useState(null);

// //     const confirmDeleteProgress = (id) => {
// //     setProgressToDelete(id);
// //     setShowDeleteModal(true);
// //     };

// //     const handleDeleteProgress = async () => {
// //     if (!progressToDelete) return;

// //     const { error } = await supabase
// //         .from("progresses")
// //         .delete()
// //         .eq("id", progressToDelete);

// //     if (error) {
// //         console.error("Error deleting progress:", error.message);
// //     } else {
// //         setUserProgressWin((prev) => prev.filter((p) => p.id !== progressToDelete));
// //     }

// //     setShowDeleteModal(false);
// //     setProgressToDelete(null);
// //     };




// //   // Auth init
// //   useEffect(() => {
// //     const initAuth = async () => {
// //       const { data: { session } } = await supabase.auth.getSession();

// //       if (session?.user) {
// //         setCurrentUser(session.user);
// //         await fetchProfile(session.user.id);
// //         await fetchProgressWin(session.user.id);
// //         await fetchfoundersList(session.user.id);
// //       }
// //       setLoading(false);
// //     };

// //     initAuth();

// //     const { data: { subscription } } = supabase.auth.onAuthStateChange(
// //       async (_, session) => {
// //         if (session?.user) {
// //           setCurrentUser(session.user);
// //           await fetchProfile(session.user.id);
// //           await fetchProgressWin(session.user.id);
// //         } else {
// //           setCurrentUser(null);
// //           setUserProgressWin([]);
// //         }
// //       }
// //     );

// //     return () => {
// //       subscription.unsubscribe();
// //     };
// //   }, []);

// //   return (
// //     <>
// //       <Navbar currentUser={currentUser} />

// //       <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 py-12">
        
// //         <section className="bg-[var(--gray-dark)] p-10 max-w-6xl mx-auto mt-12 center-items text-center rounded-lg">
// //           <h1 className="text-4xl font-bold mb-4 text-[var(--foreground)]">
// //             Discover Fellow Founders
// //           </h1>
          
// //           <p className="text-lg mb-6 text-[var(--muted-foreground)]">
// //             Join an exclusive network of vetted SaaS founders. Discover meaningful connections, share insights, and accelerate your entrepreneurial journey through premium peer-to-peer networking.
// //           </p>

// //         </section>


// //         {/* REQUEST CARD */}
// //         {currentUser && (
// //           <section className="max-w-6xl mx-auto mt-12 center-items grid md:grid-cols-4 gap-12">

// //             {/* Features - 66% */}
            

// //             {/* Features - 66% */}
// //             <div className="col-span-2">
// //             {loading ? (
// //                 <div className="flex justify-center items-center py-12">
// //                 <div className="w-8 h-8 border-4 border-[var(--gold)] border-t-transparent rounded-full animate-spin"></div>
// //                 </div>
// //             ) : !userProgressWin || userProgressWin.length === 0 ? (
// //                 <p className="text-center text-[var(--muted-foreground)] mt-8">
// //                 No records found.
// //                 </p>
// //             ) : (
// //                 <div className="grid gap-8">
// //                 {/* {userProgressWin.map((item) => ( */}
// //                 {founderList.map((item) => (
// //                     <FounderRequestCard
// //                     key={item.id}
// //                     id={item.id}
// //                     currentUserId={currentUser?.id}
// //                     requestUserId={item.id}
// //                     username={item.username}
// //                     email={item.email}
// //                     date={new Date(item.created_at).toLocaleDateString("en-US", {
// //                         year: "numeric",
// //                         month: "long",
// //                         day: "numeric",
// //                     })}
// //                     />
// //                 ))}
// //                 </div>
// //             )}
// //             </div>



// //           </section>
// //         )}

// //         <footer className="mt-32 text-center text-[var(--gray)] text-sm">
// //           © {new Date().getFullYear()} SaaS Jumpstart. All rights reserved.
// //         </footer>


// //         {showDeleteModal && (
// //             <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
// //                 <div className="bg-[var(--card-bg)] p-6 rounded-xl shadow-lg border border-[var(--border)] max-w-sm w-full text-center">
// //                 <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
// //                     Delete Progress
// //                 </h2>
// //                 <p className="text-[var(--muted-foreground)] mb-6">
// //                     Are you sure you want to delete this progress update? This action cannot be undone.
// //                 </p>
// //                 <div className="flex justify-center gap-4">
// //                     <button
// //                     onClick={handleDeleteProgress}
// //                     className="bg-[var(--danger-color)] hover:opacity-90 text-white px-4 py-2 rounded-md transition"
// //                     >
// //                     Yes, Delete
// //                     </button>
// //                     <button
// //                     onClick={() => setShowDeleteModal(false)}
// //                     className="bg-[var(--border)] hover:bg-[var(--muted-foreground)] text-[var(--foreground)] px-4 py-2 rounded-md transition"
// //                     >
// //                     Cancel
// //                     </button>
// //                 </div>
// //                 </div>
// //             </div>
// //         )}


// //       </main>
// //     </>
// //   );
// // }


// // function FounderRequestCard({ id, currentUserId, requestUserId, username, email, date }) {
// //   return (
// //     <div className="relative bg-[var(--card-bg)] rounded-xl p-6 shadow-sm border border-[var(--border)] overflow-hidden transition-all duration-300 hover:shadow-lg">
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

// //         <div className="relative mt-5 bg-[var(--card-bg)] rounded-xl p-6 shadow-sm border border-[var(--border)] overflow-hidden transition-all duration-300 hover:shadow-lg">
// //           <div className="mb-4">
// //             <p className="text-xs text-[var(--gray)] flex items-center">
// //               Recent Founder Win
// //             </p>
// //             <p className="text-lg font-semibold text-[var(--foreground)] mb-3">
// //               Hello this is my new win. Wanna connect with me? Hit on the Connect button.
// //             </p>
// //           </div>
// //         </div>

// //         <button
// //           className="w-full bg-[var(--gold)] hover:opacity-90 text-black px-4 py-2 rounded-md transition float-right mt-5"
// //         >
// //           Connect
// //         </button>

// //       </div>
// //     </div>
// //   );
// // }














// 'use client'

// import { supabase } from "../../../lib/supabase";
// import { useRouter } from 'next/navigation';
// import { useState, useEffect } from "react";
// import Navbar from '../../components/Navbar';
// import Footer from '../../components/Footer';
// import { CalendarDateRangeIcon, EnvelopeIcon, TrashIcon } from "@heroicons/react/24/outline";

// export default function FounderRequests() {
//   const router = useRouter();

//   const [currentUser, setCurrentUser] = useState(null);
//   const [userProfile, setUserProfile] = useState(null);
//   const [userProgressWin, setUserProgressWin] = useState([]);
//   const [founderList, setFoundersList] = useState([]);
//   const [founderProgresses, setFounderProgresses] = useState({});
//   const [isApproved, setApproved] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [updateText, setUpdateText] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   // Fetch profile
//   const fetchProfile = async (userId) => {
//     const { data, error } = await supabase
//       .from('profiles')
//       .select('*')
//       .eq('id', userId)
//       .single();

//     if (error) {
//       console.error('Error fetching profile:', error.message);
//       await supabase.auth.signOut();
//       setApproved(false);
//     } else {
//       setUserProfile(data);
//       setApproved(Boolean(data?.verified));
//     }
//   };

//   // Fetch the most recent progress win for a single user
//   const fetchRecentProgressWin = async (userId) => {
//     const { data, error } = await supabase
//       .from('progresses')
//       .select('*')
//       .eq('user_id', userId)
//       .order('created_at', { ascending: false })
//       .limit(1)
//       .single();
//     return { data, error };
//   };

//   // Fetch list of founders and their recent wins
//   const fetchFoundersList = async () => {
//     const { data: foundersData, error: foundersError } = await supabase
//       .from('profiles')
//       .select('*')
//       .order('created_at', { ascending: false });

//     if (foundersError) {
//       console.error('Error fetching founders:', foundersError.message);
//     } else {
//       setFoundersList(foundersData);

//       // Fetch recent win for each founder concurrently
//       const progressPromises = foundersData.map(founder => fetchRecentProgressWin(founder.id));
//       const progressResults = await Promise.all(progressPromises);

//       const progressesMap = {};
//       progressResults.forEach((result, index) => {
//         const founderId = foundersData[index].id;
//         progressesMap[founderId] = result.data || null;
//       });
//       setFounderProgresses(progressesMap);
//     }
//   };

//   // Insert update into progresses
//   const handleShareUpdate = async () => {
//     if (!updateText.trim()) return;
//     setSubmitting(true);

//     const { error } = await supabase
//       .from('progresses')
//       .insert([
//         {
//           user_id: currentUser.id,
//           username: userProfile?.name,
//           email: currentUser.email,
//           description: updateText.trim()
//         }
//       ]);

//     if (error) {
//       console.error("Error sharing update:", error.message);
//     } else {
//       setUpdateText("");
//       await fetchProgressWin(currentUser.id);
//     }
//     setSubmitting(false);
//   };

//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [progressToDelete, setProgressToDelete] = useState(null);

//   const confirmDeleteProgress = (id) => {
//     setProgressToDelete(id);
//     setShowDeleteModal(true);
//   };

//   const handleDeleteProgress = async () => {
//     if (!progressToDelete) return;

//     const { error } = await supabase
//       .from("progresses")
//       .delete()
//       .eq("id", progressToDelete);

//     if (error) {
//       console.error("Error deleting progress:", error.message);
//     } else {
//       setUserProgressWin((prev) => prev.filter((p) => p.id !== progressToDelete));
//     }

//     setShowDeleteModal(false);
//     setProgressToDelete(null);
//   };

//   // Auth init
//   useEffect(() => {
//     const initAuth = async () => {
//       const { data: { session } } = await supabase.auth.getSession();

//       if (session?.user) {
//         setCurrentUser(session.user);
//         await fetchProfile(session.user.id);
//         await fetchFoundersList();
//       }
//       setLoading(false);
//     };

//     initAuth();

//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       async (_, session) => {
//         if (session?.user) {
//           setCurrentUser(session.user);
//           await fetchProfile(session.user.id);
//           await fetchFoundersList();
//         } else {
//           setCurrentUser(null);
//           setFoundersList([]);
//           setFounderProgresses({});
//         }
//       }
//     );

//     return () => {
//       subscription.unsubscribe();
//     };
//   }, []);

//   return (
//       <>
//       <Navbar currentUser={currentUser} />
//       <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6">
//         <section className="bg-[var(--gray-dark)] p-5 max-w-6xl mx-auto mt-12 center-items text-center rounded-lg">
//           <h1 className="text-2xl font-bold mb-4 text-[var(--foreground)]">Discover Fellow Founders</h1>
//           <p className="text-lg mb-6 text-[var(--muted-foreground)]">Join an exclusive network of vetted SaaS founders. Discover meaningful connections, share insights, and accelerate your entrepreneurial journey through premium peer-to-peer networking.</p>
//         </section>
        
//         {currentUser && (
//           <section className="max-w-6xl mx-auto center-items py-10">
//             {/* Corrected grid classes for a responsive 3-column layout */}
//             <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
//               {loading ? (
//                 <div className="flex justify-center items-center py-12 col-span-full">
//                   <div className="w-8 h-8 border-4 border-[var(--gold)] border-t-transparent rounded-full animate-spin"></div>
//                 </div>
//               ) : founderList.length === 0 ? (
//                 <p className="text-center text-[var(--muted-foreground)] mt-8 col-span-full">
//                   No founders found.
//                 </p>
//               ) : (
//                 founderList.map((item) => (
//                   <FounderRequestCard
//                     key={item.id}
//                     id={item.id}
//                     currentUserId={currentUser?.id}
//                     requestUserId={item.id}
//                     username={item.name}
//                     email={item.email}
//                     date={new Date(item.created_at).toLocaleDateString("en-US", {
//                       year: "numeric",
//                       month: "long",
//                       day: "numeric",
//                     })}
//                     recentWin={founderProgresses[item.id]}
//                   />
//                 ))
//               )}
//             </div>
//           </section>
//         )}

// {/*         <footer className="mt-32 text-center text-[var(--gray)] text-sm">
//           © {new Date().getFullYear()} SaaS Jumpstart. All rights reserved.
//         </footer> */}

//         <Footer currentUser={currentUser} isApproved={isApproved} />


//         {showDeleteModal && (
//             <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//                 <div className="bg-[var(--card-bg)] p-6 rounded-xl shadow-lg border border-[var(--border)] max-w-sm w-full text-center">
//                 <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
//                     Delete Progress
//                 </h2>
//                 <p className="text-[var(--muted-foreground)] mb-6">
//                     Are you sure you want to delete this progress update? This action cannot be undone.
//                 </p>
//                 <div className="flex justify-center gap-4">
//                     <button
//                     onClick={handleDeleteProgress}
//                     className="bg-[var(--danger-color)] hover:opacity-90 text-white px-4 py-2 rounded-md transition"
//                     >
//                     Yes, Delete
//                     </button>
//                     <button
//                     onClick={() => setShowDeleteModal(false)}
//                     className="bg-[var(--border)] hover:bg-[var(--muted-foreground)] text-[var(--foreground)] px-4 py-2 rounded-md transition"
//                     >
//                     Cancel
//                     </button>
//                 </div>
//                 </div>
//             </div>
//         )}
//       </main>
//     </>
//   );
// }


// function FounderRequestCard({ id, currentUserId, requestUserId, username, email, date, recentWin }) {
//   return (
//     <div className="relative bg-[var(--card-bg)] rounded-xl p-6 shadow-sm border border-[var(--border)] overflow-hidden transition-all duration-300 hover:shadow-lg">
//       <div className="mb-4">
//         <p className="text-xl font-semibold text-[var(--foreground)] mb-3">
//           <span className="text-[var(--gold)]">{username}</span>
//         </p>
//         <div className="space-y-2 mb-4">
//           {/* <p className="text-xs text-[var(--gray)] flex items-center">
//             <EnvelopeIcon className="w-4 h-4 mr-1" />
//             {email}
//           </p> */}
//           <p className="text-xs text-[var(--gray)] flex items-center">
//             <CalendarDateRangeIcon className="w-4 h-4 mr-1" />
//             {date}
//           </p>
//         </div>

//         {/* <select className="w-full border border-[var(--gold)] hover:opacity-90 text-[var(--gold)] px-4 py-2 rounded-md transition mt-6">
//           <option className="bg-[var(--background)]">- Choose Action -</option>
//           <option className="bg-[var(--background)]">Approve</option>
//           <option className="bg-[var(--background)]">Reject</option>
//         </select> */}

//         <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-1">
//           <button
//             className="w-full bg-[var(--gold)] hover:opacity-90 text-black px-4 py-2 rounded-md transition mt-6"
//           >
//             Accept
//           </button>
//           <button
//             className="w-full bg-[var(--danger-color)] hover:opacity-90 text-white px-4 py-2 rounded-md transition mt-6"
//           >
//             Reject
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }













'use client'

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { BeakerIcon, CalendarDateRangeIcon, ChatBubbleLeftRightIcon, LightBulbIcon, PhoneIcon, QuestionMarkCircleIcon, UserGroupIcon, VideoCameraIcon, HandRaisedIcon } from "@heroicons/react/24/outline";

export default function FounderRequests() {
  const [currentUser, setCurrentUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch connection requests sent TO current user
  const fetchRequests = async (userId) => {
    const { data, error } = await supabase
      .from("connection_requests")
      .select("*")
      .eq("recipient_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching requests:", error.message);
      return;
    }

    // Now fetch sender profiles
    const senderIds = data.map((r) => r.sender_id);
    if (senderIds.length === 0) {
      setRequests([]);
      return;
    }

    const { data: profiles, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      // .select("id, name, email, message, created_at")
      .in("id", senderIds);

    if (profileError) {
      console.error("Error fetching profiles:", profileError.message);
      return;
    }

    // Merge requests with sender profiles
    const merged = data.map((req) => ({
      ...req,
      sender: profiles.find((p) => p.id === req.sender_id) || null,
    }));

    setRequests(merged);
  };

  // ✅ Accept request
  const handleAccept = async (requestId) => {
    const { error } = await supabase
      .from("connection_requests")
      .update({ status: "accepted" })
      .eq("id", requestId);

    if (error) {
      console.error("Error accepting request:", error.message);
    } else {
      setRequests((prev) =>
        prev.map((r) =>
          r.id === requestId ? { ...r, status: "accepted" } : r
        )
      );
    }
  };

  // ✅ Reject request
  const handleReject = async (requestId) => {
    const { error } = await supabase
      .from("connection_requests")
      .update({ status: "rejected" })
      .eq("id", requestId);

    if (error) {
      console.error("Error rejecting request:", error.message);
    } else {
      setRequests((prev) =>
        prev.map((r) =>
          r.id === requestId ? { ...r, status: "rejected" } : r
        )
      );
    }
  };

  // ✅ Auth init
  const [isApproved, setApproved] = useState(false);

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
        setApproved(Boolean(data?.verified));
      }

      setLoading(false);
    };

    
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setCurrentUser(session.user);
        await fetchRequests(session.user.id);
      }
      setLoading(false);
    };

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        if (session?.user) {
          setCurrentUser(session.user);
          await fetchRequests(session.user.id);
          await fetchProfile(session.user.id);
        } else {
          setCurrentUser(null);
          setRequests([]);
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

      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6">
        <section className="bg-[var(--gray-dark)] p-5 max-w-6xl mx-auto mt-12 text-center rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Connection Requests</h1>
          <p className="text-lg mb-6 text-[var(--muted-foreground)]">
            See who wants to connect with you and accept or reject their requests.
          </p>
        </section>

        <section className="max-w-6xl mx-auto py-10">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="w-8 h-8 border-4 border-[var(--gold)] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : requests.length === 0 ? (
            <p className="text-center text-[var(--muted-foreground)] mt-8">
              No connection requests yet.
            </p>
          ) : (
            <div className="space-y-6">
              {requests.map((req) => (
                <RequestCard
                  key={req.id}
                  request={req}
                  onAccept={handleAccept}
                  onReject={handleReject}
                />
              ))}
            </div>
          )}
        </section>

        <Footer currentUser={currentUser} isApproved={isApproved} />
      </main>
    </>
  );
}

// ✅ Individual Request Card
function RequestCard({ request, onAccept, onReject }) {
  const sender = request.sender;

  // Purpose → Icon mapper
  const purposeIcons = {
    Feedback: ChatBubbleLeftRightIcon,
    Brainstorm: LightBulbIcon,
    "Beta Test": BeakerIcon,
    Partnership: HandRaisedIcon,
    "Just Connect": UserGroupIcon,
  };

  return (
    <div className="bg-[var(--card-bg)] rounded-xl p-6 shadow-sm border border-[var(--border)] hover:shadow-lg transition-all">
      {sender ? (
        <>
          <p className="text-xl font-semibold mb-2">
            <span className="text-[var(--gold)]">{sender.name}</span> wants to connect
          </p>
          <p className="text-xs text-[var(--gray)] flex items-center mb-4">
            <CalendarDateRangeIcon className="w-4 h-4 mr-1" />
            {new Date(request.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          
          <p className="text-xs text-[var(--gray)] flex items-center mb-4">
            {request.meeting_type === "Phone" ? (
              <PhoneIcon className="w-4 h-4 mr-1" />
            ) : request.meeting_type === "Zoom" ? (
              <VideoCameraIcon className="w-4 h-4 mr-1" />
            ) : (
              <QuestionMarkCircleIcon className="w-4 h-4 mr-1" />
            )}
            {request.meeting_type}
          </p>

          <p className="text-xs text-[var(--gray)] flex items-center mb-4">
            {(() => {
              const Icon = purposeIcons[request.purpose] || QuestionMarkCircleIcon;
              return <Icon className="w-4 h-4 mr-1" />;
            })()}
            {request.purpose}
          </p>

          <p
            className="text-[var(--white)]"
          >
            {request.message}
          </p>

          {request.status === "pending" ? (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onAccept(request.id)}
                className="bg-[var(--gold)] text-black px-4 py-2 rounded-md hover:opacity-90 transition"
              >
                Accept
              </button>
              <button
                onClick={() => onReject(request.id)}
                className="bg-[var(--danger-color)] text-white px-4 py-2 rounded-md hover:opacity-90 transition"
              >
                Reject
              </button>
            </div>
          ) : (
            <p
              className={`mt-4 text-sm font-semibold ${
                request.status === "accepted"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {request.status === "accepted"
                ? "Accepted"
                : "Rejected"}
            </p>
          )}
        </>
      ) : (
        <p className="text-sm text-[var(--muted-foreground)]">
          User no longer exists.
        </p>
      )}
    </div>
  );
}
