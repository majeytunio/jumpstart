
// 'use client'

// import { supabase } from "../../lib/supabase";
// import { useRouter } from 'next/navigation';
// import { useState, useEffect } from "react";
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import { CalendarDateRangeIcon, EnvelopeIcon, TrashIcon } from "@heroicons/react/24/outline";

// export default function PaymentAndSeatConfirmation() {
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
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

//         <Footer currentUser={currentUser} />


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


// // function FounderRequestCard({ id, currentUserId, requestUserId, username, email, date, recentWin }) {
// //   return (
// //     <div className="relative bg-[var(--card-bg)] rounded-xl p-6 shadow-sm border border-[var(--border)] overflow-hidden transition-all duration-300 hover:shadow-lg">
// //       <div className="mb-4">
// //         <p className="text-xl font-semibold text-[var(--foreground)] mb-3">
// //           <span className="text-[var(--gold)]">{username}</span>
// //         </p>
// //         <div className="space-y-2 mb-4">
// //           {/* <p className="text-xs text-[var(--gray)] flex items-center">
// //             <EnvelopeIcon className="w-4 h-4 mr-1" />
// //             {email}
// //           </p> */}
// //           <p className="text-xs text-[var(--gray)] flex items-center">
// //             <CalendarDateRangeIcon className="w-4 h-4 mr-1" />
// //             {date}
// //           </p>
// //         </div>

// //         <div className="mt-6 p-4 bg-[var(--card-secondary-bg)] rounded-lg border border-[var(--border)]">
// //           <p className="text-xs text-[var(--gray)] mb-1">
// //             Recent Founder Win
// //           </p>
// //           <p className="text-lg font-semibold text-[var(--foreground)]">
// //             {recentWin ? recentWin.description : 'No recent wins yet.'}
// //           </p>
// //         </div>

// //         <button
// //           className="w-full bg-[var(--gold)] hover:opacity-90 text-black px-4 py-2 rounded-md transition mt-6"
// //         >
// //           Connect
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }




// function FounderRequestCard({ id, currentUserId, username, date, recentWin }) {
//   const [showDialog, setShowDialog] = useState(false);
//   const [connectionPurpose, setConnectionPurpose] = useState("");
//   const [meetingType, setMeetingType] = useState("");
//   const [message, setMessage] = useState("");
//   const [requestExists, setRequestExists] = useState(false);

//   // Check if a request already exists
//   const checkRequest = async () => {
//     if (!currentUserId) return;
//     const { data, error } = await supabase
//       .from("connection_requests")
//       .select("id")
//       .eq("sender_id", currentUserId)
//       .eq("recipient_id", id)
//       .maybeSingle();

//     if (error) {
//       console.error("Error checking request:", error.message);
//       setRequestExists(false);
//     } else {
//       setRequestExists(!!data);
//     }
//   };

//   useEffect(() => {
//     checkRequest();
//   }, [currentUserId, id]);

//   // Send request
//   const handleSendRequest = async () => {
//     console.log("Function is working.");
//     if (!connectionPurpose || !meetingType || !message.trim()) return;
//     console.log("Passed all validation.");
    
//     const { error } = await supabase.from("connection_requests").insert([
//       {
//         sender_id: currentUserId,
//         recipient_id: id,
//         purpose: connectionPurpose,
//         meeting_type: meetingType,
//         message: message.trim(),
//       },
//     ]);
    
//     console.log("Ran query.");
    
    
//     if (!error) {
//       console.log("Went into an error: ", error);
//       setShowDialog(false);
//       await checkRequest(); // refresh state
//     }
//   };

//   // Cancel request
//   const handleCancelRequest = async () => {
//     const { error } = await supabase
//       .from("connection_requests")
//       .delete()
//       .eq("sender_id", currentUserId)
//       .eq("recipient_id", id);

//     if (!error) {
//       await checkRequest(); // refresh state
//     }
//   };

//   return (
//     <div className="relative bg-[var(--card-bg)] rounded-xl p-6 shadow-sm border border-[var(--border)] overflow-hidden transition-all duration-300 hover:shadow-lg">
//       <div className="mb-4">
//         <p className="text-xl font-semibold text-[var(--foreground)] mb-3">
//           <span className="text-[var(--gold)]">{username}</span>
//         </p>
//         <p className="text-xs text-[var(--gray)] flex items-center">
//           <CalendarDateRangeIcon className="w-4 h-4 mr-1" />
//           {date}
//         </p>

//         <div className="mt-6 p-4 bg-[var(--card-secondary-bg)] rounded-lg border border-[var(--border)]">
//           <p className="text-xs text-[var(--gray)] mb-1">Recent Founder Win</p>
//           <p className="text-lg font-semibold text-[var(--foreground)]">
//             {recentWin ? recentWin.description : "No recent wins yet."}
//           </p>
//         </div>

//         {requestExists ? (
//           <button
//             onClick={handleCancelRequest}
//             className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition mt-6"
//           >
//             Cancel Request
//           </button>
//         ) : (
//           <button
//             onClick={() => setShowDialog(true)}
//             className="w-full bg-[var(--gold)] hover:opacity-90 text-black px-4 py-2 rounded-md transition mt-6"
//           >
//             Connect
//           </button>
//         )}
//       </div>

//       {/* Dialog */}
//       {showDialog && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-[var(--card-bg)] p-6 rounded-xl max-w-lg w-full shadow-lg">
//             <h2 className="text-xl font-bold mb-4">Send Connection Request</h2>
//             <p className="mb-4">To: <span className="font-semibold">{username}</span></p>

//             <label className="block text-sm font-medium mb-1 mt-6">Connection Purpose</label>
//             <select
//               className="w-full border border-[var(--gold)] hover:opacity-90 px-4 py-2 rounded-md transition" 
//               // className="w-full mb-3 p-2 border rounded-md"
//               value={connectionPurpose}
//               onChange={(e) => setConnectionPurpose(e.target.value)}
//             >
//               <option 
//               className="bg-[var(--background)]"
//               value="">Select connection purpose</option>
              
//               <option 
//               className="bg-[var(--background)]"
//               value="Feedback">Feedback</option>
              
//               <option 
//               className="bg-[var(--background)]"
//               value="Brainstorm">Brainstorm</option>
              
//               <option 
//               className="bg-[var(--background)]"
//               value="Beta Test">Beta Test</option>
              
//               <option 
//               className="bg-[var(--background)]"
//               value="Partnership">Partnership</option>
              
//               <option 
//               className="bg-[var(--background)]"
//               value="Just Connect">Just Connect</option>
//             </select>

//             <label className="block text-sm font-medium mb-1 mt-6">Preferred Meeting Type</label>
//             <select
//               className="w-full border border-[var(--gold)] hover:opacity-90 px-4 py-2 rounded-md transition" 
//               // className="w-full mb-3 p-2 border rounded-md"
//               value={meetingType}
//               onChange={(e) => setMeetingType(e.target.value)}
//             >
//               <option
//               className="bg-[var(--background)]"
//               value="">Select meeting type</option>
              
//               <option 
//               className="bg-[var(--background)]"
//               value="Zoom">Zoom</option>
              
//               <option 
//               className="bg-[var(--background)]"
//               value="Phone">Phone</option>
//             </select>

//             <label className="block text-sm font-medium mb-1 mt-6">Your Message</label>
//             <textarea
//               className="w-full mb-4 p-2 border border-[var(--gold)] rounded-md"
//               rows={3}
//               placeholder="Share why you'd like to connect and what you hope to discuss..."
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             ></textarea>

//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setShowDialog(false)}
//                 className="px-4 py-2 rounded-md text-[var(--black)] bg-[var(--gold)] hover:bg-[var(--gold-light)] transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSendRequest}
//                 className="px-4 py-2 rounded-md bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black transition"
//               >
//                 Send Request
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }











'use client'

import { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from "../../lib/supabase";

export default function PaymentAndSeatConfirmation() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedTier, setSelectedTier] = useState(null);
  
  // ✅ Auth init
  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setCurrentUser(session.user);
      }
      setLoading(false);
    };

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        if (session?.user) {
          setCurrentUser(session.user);
        } else {
          setCurrentUser(null);
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
        
        {/* Header */}
        <section className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Founder Seat Confirmation</h1>
          <p className="text-lg text-[var(--muted-foreground)]">
            Congratulations — Your application has been approved. 
            Your seat is reserved for <span className="font-semibold">5 business days</span>.
          </p>
        </section>

        {/* Credibility Block */}
        <section className="max-w-5xl mx-auto bg-[var(--card-bg)] p-6 rounded-xl border border-[var(--border)] shadow-sm mb-12">
          <h2 className="text-xl font-semibold mb-3">About Your Founder Council Host</h2>
          <p className="text-[var(--muted-foreground)] leading-relaxed">
            Led by <span className="font-semibold">Ronnell Crittenden</span>, CEO of CodeAlchemy LLC and 
            Alumni of Oxford University’s Private Equity Program, the SaaS Jumpstart Founder Council blends 
            high-performance founder identity work with elite SaaS developer matches — designed to build 
            transformational software and lasting business assets.
          </p>
        </section>

        {currentUser && (
          <>
            {/* Tier Selection */}
            <section className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
              
              {/* Tier 1 */}
              <div className="bg-[var(--card-bg)] p-6 rounded-xl border border-[var(--border)] shadow hover:shadow-lg transition">
                <h3 className="text-xl font-bold mb-2">Tier 1 — SaaS Founder Council</h3>
                <p className="text-[var(--muted-foreground)] mb-4">Entry Investment: $20,000</p>
                <ul className="list-disc pl-5 text-sm text-[var(--muted-foreground)] mb-6 space-y-1">
                  <li>8-Week SaaS Founder Identity Installation MP3s</li>
                  <li>Matched with Gold Standard SaaS Developer or Team</li>
                  <li>Private Founder-to-Founder Connection Request feature</li>
                  <li>SaaS Founder Deal Spotlight</li>
                  <li>Access to curated network of vetted SaaS founders and developers</li>
                  <li>Renewal: $10,000 for 12 months continued council membership</li>
                </ul>
                <button 
                  onClick={() => setSelectedTier("20K")} 
                  className="w-full bg-[var(--gold)] text-black py-2 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Select This Tier
                </button>
              </div>

              {/* Tier 2 */}
              <div className="bg-[var(--card-bg)] p-6 rounded-xl border border-[var(--border)] shadow hover:shadow-lg transition">
                <h3 className="text-xl font-bold mb-2">Tier 2 — PE SaaS Founder Council</h3>
                <p className="text-[var(--muted-foreground)] mb-4">Entry Investment: $50,000</p>
                <ul className="list-disc pl-5 text-sm text-[var(--muted-foreground)] mb-6 space-y-1">
                  <li>Everything in SaaS Founder Council</li>
                  <li>SaaS Founder Deal Spotlight</li>
                  <li>Matched with Gold Standard SaaS Developer Team</li>
                  <li>Priority Founder-to-Founder introductions with capital partners</li>
                  <li>Renewal: $10,000 for 12 months continued council membership</li>
                </ul>
                <button 
                  onClick={() => setSelectedTier("50K")} 
                  className="w-full bg-[var(--gold)] text-black py-2 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Select This Tier
                </button>
              </div>
            </section>
          </>
        )}
        { !currentUser && (
          <section className="max-w-5xl mx-auto bg-[var(--card-secondary-bg)] p-6 rounded-xl border border-[var(--border)] shadow">
            <button
                onClick={() => window.location.href = '/auth/login'}
                className="w-full bg-[var(--gold)] text-black py-2 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Login to Select Tier
              </button>
          </section>
        )}

        {/* Payment Instructions */}
        {selectedTier && (
          <section className="max-w-5xl mx-auto bg-[var(--card-secondary-bg)] p-6 rounded-xl border border-[var(--border)] shadow">
            <h2 className="text-xl font-semibold mb-4">Priority Wire Transfer (Only Method)</h2>
            <p className="text-[var(--muted-foreground)] mb-4">Please complete your payment within 5 business days:</p>
            
            <div className="space-y-2 text-sm">
              <p><strong>Bank Name:</strong> MIDFLORIDA Credit Union</p>
              <p><strong>Account Name:</strong> CodeAlchemy LLC</p>
              <p><strong>Routing Number:</strong> 263179804</p>
              <p><strong>Account Number:</strong> 147187242</p>
              <p><strong>Reference:</strong> Your Full Name – {selectedTier === "20K" ? "SaaS Founder Council ($20K)" : "PE SaaS Founder Council ($50K)"}</p>
            </div>

            <p className="mt-6 text-[var(--muted-foreground)]">
              Once payment clears: You’ll receive a personal welcome call, portal access will be activated, 
              and we’ll schedule your Founder Onboarding Session.
            </p>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
