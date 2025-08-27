// 'use client'

// import { useEffect, useState } from "react";
// import { supabase } from "../../../lib/supabase";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";

// export default function MP3Downloads() {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [mp3Files, setMp3Files] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [uploading, setUploading] = useState(false);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [file, setFile] = useState(null);

//   // ✅ Fetch MP3 files
//   const fetchMP3s = async () => {
//     const { data, error } = await supabase
//         .from("mp3_files")
//         .select("*")
//         .order("created_at", { ascending: false });

//         if (error) console.error("Error fetching mp3:", error.message);
//         else setMp3Files(data);
//     };

//     // ✅ Upload MP3
//     const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!file || !title) return alert("Please provide title and file.");

//     try {
//         setUploading(true);
//         const fileName = `${Date.now()}_${file.name}`;

//         // Upload file to Supabase storage
//         const { data: storageData, error: uploadError } = await supabase
//         .storage
//         .from("mp3_files")
//         .upload(fileName, file);

//         if (uploadError) throw uploadError;

//         const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/mp3_files/${fileName}`;

//         const { error: dbError } = await supabase
//         .from("mp3_files")
//         .insert([
//             {
//             user_id: currentUser ? currentUser.id : null,
//             title,
//             description,
//             file_url: fileUrl,
//             }
//         ]);

//         if (dbError) {
//         console.error("Insert error:", dbError); // full object, not just .message
//         }

//         setTitle("");
//         setDescription("");
//         setFile(null);
//         fetchMP3s(); // Refresh list
//     } catch (err) {
//         console.error("Upload error:", err.message);
//     } finally {
//         setUploading(false);
//     }
//     };

//   // ✅ Auth init
//   useEffect(() => {
//     const init = async () => {
//       const { data: { session } } = await supabase.auth.getSession();
//       if (session?.user) {
//         setCurrentUser(session.user);
//         fetchMP3s();
//       }
//       setLoading(false);
//     };
//     init();

//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       async (_, session) => {
//         if (session?.user) {
//           setCurrentUser(session.user);
//           fetchMP3s();
//         } else {
//           setCurrentUser(null);
//           setMp3Files([]);
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
//           <h1 className="text-2xl font-bold mb-4">MP3 Downloads</h1>
//           <p className="text-lg mb-6 text-[var(--muted-foreground)]">
//             Upload and download MP3 files with ease.
//           </p>
//         </section>

//         {currentUser && (
//           <section className="max-w-3xl mx-auto py-6">
//             <form onSubmit={handleUpload} className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="w-full p-2 border rounded-md"
//               />
//               <textarea
//                 placeholder="Description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="w-full p-2 border rounded-md"
//               />
//               <input
//                 type="file"
//                 accept="audio/mp3"
//                 onChange={(e) => setFile(e.target.files[0])}
//               />
//               <button
//                 type="submit"
//                 disabled={uploading}
//                 className="bg-[var(--gold)] px-4 py-2 rounded-md text-black hover:opacity-90"
//               >
//                 {uploading ? "Uploading..." : "Upload MP3"}
//               </button>
//             </form>
//           </section>
//         )}

//         <section className="max-w-6xl mx-auto py-10">
//           {loading ? (
//             <div className="flex justify-center py-12">
//               <div className="w-8 h-8 border-4 border-[var(--gold)] border-t-transparent rounded-full animate-spin"></div>
//             </div>
//           ) : mp3Files.length === 0 ? (
//             <p className="text-center text-[var(--muted-foreground)] mt-8">
//               No MP3 files uploaded yet.
//             </p>
//           ) : (
//             <div className="grid md:grid-cols-2 gap-6">
//               {mp3Files.map((mp3) => (
//                 <div key={mp3.id} className="bg-[var(--card-bg)] p-6 rounded-xl border">
//                   <h2 className="text-lg font-semibold">{mp3.title}</h2>
//                   <p className="text-sm text-[var(--muted-foreground)]">{mp3.description}</p>
//                   <audio controls className="w-full mt-3">
//                     <source src={mp3.file_url} type="audio/mp3" />
//                   </audio>
//                   <a
//                     href={mp3.file_url}
//                     download
//                     className="inline-block mt-4 bg-[var(--gold)] px-4 py-2 rounded-md text-black hover:opacity-90"
//                   >
//                     Download
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

export default function MP3Downloads() {
  const [currentUser, setCurrentUser] = useState(null);
  const [mp3Files, setMp3Files] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  // ✅ Fetch MP3s from table
  const fetchMP3s = async () => {
    console.log("🔍 Fetching MP3 files...");
    const { data, error } = await supabase
      .from("mp3_files")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ Error fetching MP3s:", error);
    } else {
      console.log("✅ MP3 files fetched:", data);
      setMp3Files(data);
    }
  };

  // ✅ Upload new MP3
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title) {
      alert("Please provide title and file.");
      return;
    }

    try {
      setUploading(true);
      console.log("📤 Upload starting...");

      const fileName = `${Date.now()}_${file.name}`;
      console.log("📄 File name will be:", fileName);

      // 1️⃣ Upload file to Supabase Storage
      const { data: storageData, error: uploadError } = await supabase
        .storage
        .from("mp3_files")
        .upload(fileName, file);

      if (uploadError) {
        console.error("❌ Storage upload error:", uploadError);
        throw uploadError;
      }
      console.log("✅ Storage upload success:", storageData);

      // Public URL for playback & download
      const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lcuovwsehoafnfbfjglb.supabase.co'}/storage/v1/object/public/mp3_files/${fileName}`;
      console.log("🌍 File URL:", fileUrl);

      // 2️⃣ Insert metadata into mp3_files table
      console.log("📝 Inserting metadata into mp3_files...");
      const { data: insertData, error: dbError } = await supabase
        .from("mp3_files")
        .insert([
          {
            user_id: currentUser ? currentUser.id : null, // optional tracking
            title,
            description,
            file_url: fileUrl,
          }
        ])
        .select();

      if (dbError) {
        console.error("❌ Database insert error:", dbError);
        throw dbError;
      }
      console.log("✅ Insert success:", insertData);

      // reset form
      setTitle("");
      setDescription("");
      setFile(null);

      // refresh list
      fetchMP3s();
    } catch (err) {
      console.error("🔥 Upload failed with error object:", err);
    } finally {
      setUploading(false);
    }
  };

  // ✅ Auth + init
  useEffect(() => {
    const init = async () => {
      console.log("🔑 Checking session...");
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        console.log("✅ Logged in user:", session.user);
        setCurrentUser(session.user);
        fetchMP3s();
      } else {
        console.log("⚠️ No user session found");
      }
      setLoading(false);
    };
    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        if (session?.user) {
          console.log("🔄 Auth state change → logged in:", session.user);
          setCurrentUser(session.user);
          fetchMP3s();
        } else {
          console.log("🔄 Auth state change → logged out");
          setCurrentUser(null);
          setMp3Files([]);
        }
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <Navbar currentUser={currentUser} />
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6">

        {/* Hero Section */}
        <section className="bg-[var(--gray-dark)] p-5 max-w-6xl mx-auto mt-12 text-center rounded-lg">
          <h1 className="text-2xl font-bold mb-4">🎵 SaaS Founder Installation</h1>
          <p className="text-lg mb-6 text-[var(--muted-foreground)]">
            "Your Reality Reflects Your Identity — Upgrade It."
          </p>
        </section>

        {/* Detailed Content Section */}
        <section className="bg-[var(--gray-dark)] p-5 max-w-6xl mx-auto mt-12 rounded-lg text-left">
          <h2 className="text-xl font-semibold mb-4">MP3 Identity Shift Series</h2>
          <p className="mb-4">
            Collapse uncertainty into certainty with subconscious installation audios that
            align your self-image, regulate your nervous system, and command your Mirror Reality
            to reflect you as a successful SaaS Founder.
          </p>
          <p className="mb-8">
            The greatest SaaS breakthroughs do not begin with code — they begin with identity.
            This section contains your SaaS Founder Installation MP3s — subconscious
            reprogramming audios designed to align your self-image with the future identity of
            a successful SaaS Founder.
          </p>

          <h3 className="text-lg font-semibold mb-3">Why Identity Shift Matters</h3>
          <ul className="list-disc list-inside space-y-2 mb-8">
            <li>
              <strong>Psycho-Cybernetics</strong> — Your mind is a goal-seeking mechanism. Once
              calibrated, every thought and action auto-corrects toward your identity.
            </li>
            <li>
              <strong>The Mirror Principle</strong> — Reality reflects what you believe yourself
              to be. Change the self-image, and the external world reorganizes to match.
            </li>
            <li>
              <strong>Future Self Psychology</strong> — Transformation happens when you live
              from who you are becoming, not who you’ve been.
            </li>
            <li>
              <strong>The Double Slit Experiment</strong> — The Observer Effect collapses infinite
              probabilities into one outcome. Observe yourself as a SaaS Founder, collapse
              uncertainty into certainty.
            </li>
          </ul>

          <h3 className="text-lg font-semibold mb-3">The Nervous System Factor</h3>
          <p className="mb-8">
            Identity isn’t just mental — it’s physiological. Your nervous system must learn to
            feel safe and stable in the new identity. Otherwise, success can trigger resistance,
            burnout, or sabotage.
          </p>
          <p className="mb-8">
            These audios use rhythm, repetition, and subconscious imagery to calm the body,
            regulate the nervous system, and allow you to stabilize at the frequency of your
            Future Self. When the nervous system feels safe, growth stops feeling like a threat
            — and becomes your baseline.
          </p>

          <h3 className="text-lg font-semibold mb-3">What These MP3s Do</h3>
          <ul className="list-disc list-inside space-y-2 mb-8">
            <li>Install the subconscious code: “I am a SaaS Founder.”</li>
            <li>Condition your mind to auto-correct like a cybernetic system.</li>
            <li>Align your Mirror Reality so opportunities reflect your self-image.</li>
            <li>Train your awareness (Observer Effect) to collapse potential into your chosen SaaS reality.</li>
            <li>Anchor your nervous system to stability, making expansion sustainable.</li>
            <li>Allow your Future Self to pull you forward until results become inevitable.</li>
          </ul>

          <p className="mt-6">
            This is not motivational hype. It is identity engineering at the subconscious and
            physiological level.
          </p>
          <p className="mt-2">
            <strong>Listen daily. Install the identity. Collapse the wave. Stabilize the nervous system. Watch reality adjust.</strong>
          </p>
        </section>







        {currentUser ? (
          <section className="max-w-6xl mx-auto py-10">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="w-8 h-8 border-4 border-[var(--gold)] border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : mp3Files.length === 0 ? (
              <p className="text-center text-[var(--muted-foreground)] mt-8">
                No MP3 files uploaded yet.
              </p>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {mp3Files.map((mp3) => (
                  <div key={mp3.id} className="bg-[var(--card-bg)] p-6 rounded-xl border">
                    <h2 className="text-lg font-semibold">{mp3.title}</h2>
                    <p className="text-sm text-[var(--muted-foreground)]">{mp3.description}</p>
                    <audio controls className="w-full mt-3">
                      <source src={mp3.file_url} type="audio/mp3" />
                    </audio>
                    <a
                      href={mp3.file_url}
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
        ) : (
          <section className="max-w-6xl mx-auto py-10 flex flex-col items-center">
            <p className="text-center text-[var(--muted-foreground)] mb-6">
              Please login to get list of MP3 files.
            </p>
            <button
              className="bg-[var(--gold)] px-6 py-3 rounded-md text-black font-semibold hover:opacity-90"
              onClick={() => supabase.auth.signInWithOAuth({ provider: "google" })}
            >
              Login for MP3 List
            </button>
          </section>
        )}
      </main>
      <Footer currentUser={currentUser} />
    </>
  );
}
