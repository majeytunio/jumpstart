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
        <section className="bg-[var(--gray-dark)] p-5 max-w-6xl mx-auto mt-12 text-center rounded-lg">
          <h1 className="text-2xl font-bold mb-4">🎵 MP3 Downloads</h1>
          <p className="text-lg mb-6 text-[var(--muted-foreground)]">
            Upload and download MP3 files with ease.
          </p>
        </section>

        {currentUser && (
          <section className="max-w-3xl mx-auto py-6">
            <form onSubmit={handleUpload} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
              <input
                type="file"
                accept="audio/mp3"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button
                type="submit"
                disabled={uploading}
                className="bg-[var(--gold)] px-4 py-2 rounded-md text-black hover:opacity-90"
              >
                {uploading ? "Uploading..." : "Upload MP3"}
              </button>
            </form>
          </section>
        )}

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
      </main>
      <Footer currentUser={currentUser} />
    </>
  );
}
