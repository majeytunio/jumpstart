

'use client'

import { supabase } from "../../lib/supabase";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CalendarDateRangeIcon, EnvelopeIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function FounderConnect() {
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

  // Fetch progresses
  const fetchProgressWin = async (userId) => {
    const { data: progressData, error: progressError } = await supabase
      .from('progresses')
      .select('*')
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
        <section className="max-w-3xl mx-auto mt-12 center-items text-center">
          <h1 className="text-4xl font-bold mb-4 text-[var(--foreground)]">
            {/* Connect with EliteSaaS Founders */}
            See the Deals Before the Market Does.
          </h1>
          <p className="text-lg mb-6 text-[var(--muted-foreground)]">
            {/* Join an exclusive network of vetted SaaS founders. Discover meaningful connections, share insights, and accelerate your entrepreneurial journey through premium peer-to-peer networking. */}
            Lower–mid market deal makers don’t chase auctions—they engineer unfair advantages. The real driver isn’t just closing deals; it’s securing exclusive proprietary deal flow competitors will never touch.
          </p>
          <p className="text-lg mb-6 text-[var(--muted-foreground)]">
            By connecting with EliteSaaS Founders inside SaaS Jumpstart MVP, you unlock off-market SaaS AI opportunities and insights that shift you from competing in crowded auctions… to owning the deal before it ever hits the table.
          </p>
        </section>
        
        <section className="bg-[var(--gray-dark)] p-10 max-w-3xl mx-auto mt-12 center-items text-center rounded-lg">
          <h1 className="text-4xl font-bold mb-4 text-[var(--foreground)]">
            {/* Discover Fellow Founders */}
            Don’t Miss the SaaS Wave — Own It.
          </h1>
          <p className="text-lg mb-6 text-[var(--muted-foreground)]">
            {/* Join an exclusive network of vetted SaaS founders. Discover meaningful connections, share insights, and accelerate your entrepreneurial journey through premium peer-to-peer networking. */}
            The greatest risk isn’t paying too much at auction—it’s missing the SaaS AI wave entirely. By connecting with EliteSaaS Founders, you secure proprietary deal flow that compounds long-term value while others are still chasing bids. SaaS isn’t a passing trend; it’s the infrastructure of the future. The question is whether you’ll own the opportunity—or watch it pass you by.
          </p>

          {!currentUser && (
            <button
              onClick={() => { window.location.href = '/auth/login'; }}
              className="mt-4 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[var(--black)] px-4 py-2 rounded-md transition"
            >
              Browse Fellow Founders
            </button>
          )}
          
          {currentUser && (
            <button
              onClick={() => { window.location.href = '/founder-connect/browse'; }}
              className="mt-4 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[var(--black)] px-4 py-2 rounded-md transition"
            >
              Browse Fellow Founders
            </button>
          )}

        </section>

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

// function Feature({ currentUserId, winUserId, username, email, date, description }) {
//   return (
//     <div className="relative bg-[var(--card-bg)] rounded-xl p-6 shadow-sm border border-[var(--border)] overflow-hidden transition-all duration-300 hover:shadow-lg">
//       {currentUserId === winUserId && (
//         <div className="absolute top-4 right-4 p-2 bg-[var(--danger-color)] text-[var(--white)] rounded-full shadow-md">
//           <TrashIcon className="w-5 h-5" />
//         </div>
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
