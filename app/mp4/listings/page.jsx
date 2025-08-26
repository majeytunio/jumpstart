

// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from "../../../lib/supabase";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";

// export default function MP4Downloads() {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [mp4Files, setMp4Files] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch MP4s from table
//   const fetchMP4s = async () => {
//     console.log("🔍 Fetching MP4 files...");
//     const { data, error } = await supabase
//       .from("mp4_files")
//       .select("*")
//       .order("created_at", { ascending: false });

//     if (error) {
//       console.error("❌ Error fetching MP4s:", error);
//     } else {
//       console.log("✅ MP4 files fetched:", data);
//       setMp4Files(data);
//     }
//   };


//   // ✅ Auth + init
//   useEffect(() => {
//     const init = async () => {
//       console.log("🔑 Checking session...");
//       const { data: { session } } = await supabase.auth.getSession();
//       if (session?.user) {
//         console.log("✅ Logged in user:", session.user);
//         setCurrentUser(session.user);
//         fetchMP4s();
//       } else {
//         console.log("⚠️ No user session found");
//       }
//       setLoading(false);
//     };
//     init();

//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       async (_, session) => {
//         if (session?.user) {
//           console.log("🔄 Auth state change → logged in:", session.user);
//           setCurrentUser(session.user);
//           fetchMP4s();
//         } else {
//           console.log("🔄 Auth state change → logged out");
//           setCurrentUser(null);
//           setMp4Files([]);
//         }
//       }
//     );
//     return () => subscription.unsubscribe();
//   }, []);

//   return (
//     <>
//       <Navbar currentUser={currentUser} />
//       <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6">
//         <section className="bg-[var(--gray-dark)] p-5 max-w-6xl mx-auto mt-12 text-center rounded-lg">
//           <h1 className="text-2xl font-bold mb-4">
//             The Architect’s Briefing: The Council of SaaS Wealth Creation
//           </h1>
//           <p className="text-lg mb-6 text-[var(--muted-foreground)]">
//             Step into the private chamber where founder identities are forged, pivotal SaaS journeys are 
// revealed, and expert strategies unlock the proprietary edge to multiply equity with certainty.
//           </p>
//         </section>

//         <section className="max-w-6xl mx-auto py-10">
//           {loading ? (
//             <div className="flex justify-center py-12">
//               <div className="w-8 h-8 border-4 border-[var(--gold)] border-t-transparent rounded-full animate-spin"></div>
//             </div>
//           ) : mp4Files.length === 0 ? (
//             <p className="text-center text-[var(--muted-foreground)] mt-8">
//               No MP4 files uploaded yet.
//             </p>
//           ) : (
//             <div className="grid md:grid-cols-2 gap-6">
//               {mp4Files.map((mp4) => (
//                 <div key={mp4.id} className="bg-[var(--card-bg)] p-6 rounded-xl border">
//                   <h2 className="text-lg font-semibold">{mp4.title}</h2>
//                   <p className="text-sm text-[var(--muted-foreground)]">{mp4.description}</p>
//                   <video controls src={mp4.file_url} className="w-max-100" />

//                   <a
//                     href={mp4.file_url}
//                     download
//                     className="inline-block mt-4 bg-[var(--gold)] px-4 py-2 rounded-md text-black hover:opacity-90"
//                   >
//                     ⬇ Download
//                   </a>
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>
//       </main>
//       <Footer currentUser={currentUser} />
//     </>
//   );
// }





"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function MP4Downloads() {
  const [currentUser, setCurrentUser] = useState(null);
  const [mp4Files, setMp4Files] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch MP4s from table
  const fetchMP4s = async () => {
    console.log("🔍 Fetching MP4 files...");
    const { data, error } = await supabase
      .from("mp4_files")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ Error fetching MP4s:", error);
    } else {
      console.log("✅ MP4 files fetched:", data);
      setMp4Files(data);
    }
  };

  // Auth + init
  useEffect(() => {
    const init = async () => {
      console.log("🔑 Checking session...");
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        console.log("✅ Logged in user:", session.user);
        setCurrentUser(session.user);
        fetchMP4s();
      } else {
        console.log("⚠️ No user session found");
      }
      setLoading(false);
    };
    init();

    const { subscription } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        console.log("🔄 Auth state change → logged in:", session.user);
        setCurrentUser(session.user);
        fetchMP4s();
      } else {
        console.log("🔄 Auth state change → logged out");
        setCurrentUser(null);
        setMp4Files([]);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <Navbar currentUser={currentUser} />
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6">

        {/* Hero Section */}
        <section className="bg-[var(--gray-dark)] p-5 max-w-6xl mx-auto mt-12 text-center rounded-lg">
          <h1 className="text-2xl font-bold mb-4">
            The Architect’s Briefing: The Council of SaaS Wealth Creation
          </h1>
          <p className="text-lg mb-6 text-[var(--muted-foreground)]">
            Step into the private chamber where founder identities are forged, pivotal SaaS journeys are 
            revealed, and expert strategies unlock the proprietary edge to multiply equity with certainty.
          </p>
        </section>

        {/* Detailed Content Section */}
        <section className="bg-[var(--gray-dark)] p-5 max-w-6xl mx-auto mt-12 rounded-lg">
          <h2 className="text-xl font-semibold">The Architect’s Briefing</h2>
          <p>
            Welcome to The Architect’s Briefing — the inner chamber of SaaS Jumpstart MVP, where 
            strategies, stories, and uncommon wisdom converge to create SaaS Founders.
          </p>
          <p className="mb-8">
            Each session is more than information — it is identity installation. Inside, you’ll experience:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-8">
            <li>
              <strong>Direct Whiteboard Trainings</strong> — Exclusive briefings from the SaaS Architect himself, 
              revealing the frameworks, playbooks, and arbitrage strategies that transform service 
              businesses, experts, and communities into SaaS wealth engines.
            </li>
            <li>
              <strong>Founder Echelon Conversations</strong> — Interviews with SaaS Jumpstart MVP members, 
              where pivotal founder moments are unpacked — the breakthroughs, belief shifts, and 
              identity pivots that marked their ascent.
            </li>
            <li>
              <strong>Expert Edge Sessions</strong> — High-leverage insights from subject matter experts in SaaS, AI, 
              scaling, finance, and law — each one designed to sharpen your advantage and accelerate execution.
            </li>
            <li>
              <strong>Women in SaaS</strong> — Highlights the voices and journeys of women shaping the future of 
              software, sharing insights, stories, and strategies that inspire the next generation of SaaS leaders.
            </li>
          </ul>
          <p>
            The Architect’s Briefing is not content — it is council. Every video is crafted to install 
            certainty, expand vision, and give you the proprietary edge to multiply equity with speed and precision.
          </p>
        </section>

        {/* MP4 Files Section */}
        <section className="max-w-6xl mx-auto py-10">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-[var(--gold)] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : mp4Files.length === 0 ? (
            <p className="text-center text-[var(--muted-foreground)] mt-8">
              No MP4 files uploaded yet.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {mp4Files.map((mp4) => (
                <div key={mp4.id} className="bg-[var(--card-bg)] p-6 rounded-xl border">
                  <h2 className="text-lg font-semibold">{mp4.title}</h2>
                  <p className="text-sm text-[var(--muted-foreground)]">{mp4.description}</p>
                  <video controls src={mp4.file_url} className="w-full mt-3 rounded" />
                  <a
                    href={mp4.file_url}
                    download
                    className="inline-block mt-4 bg-[var(--gold)] px-4 py-2 rounded-md text-black hover:opacity-90"
                  >
                    ⬇ Download
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>
      <Footer currentUser={currentUser} />
    </>
  );
}
