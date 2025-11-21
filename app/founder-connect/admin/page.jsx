// 'use client'

// import { useEffect, useState } from 'react';
// import { supabase } from '../../../lib/supabase';
// import {
//   HomeIcon,
//   UserGroupIcon,
//   ArrowRightOnRectangleIcon,
//   Bars3Icon,
//   XMarkIcon,
//   CheckCircleIcon,
//   XCircleIcon,
//   ArrowPathIcon,
//   MicrophoneIcon,
//   VideoCameraIcon,
// } from '@heroicons/react/24/outline';

// // --- Sidebar Link Component ---
// function SidebarLink({ icon, label, active, onClick }) {
//   return (
//     <div
//       onClick={onClick}
//       className={`flex items-center gap-3 cursor-pointer transition ${
//         active
//           ? 'text-[var(--gold)] font-medium'
//           : 'text-[var(--gray)] hover:text-[var(--gold)] dark:text-[var(--gray)] dark:hover:text-[var(--white)]'
//       }`}
//     >
//       {icon}
//       <span>{label}</span>
//     </div>
//   );
// }

// // --- MP3 Manager Component ---
// function MP3Manager({ currentUser }) {
//   const [mp3s, setMp3s] = useState([]);
//   const [file, setFile] = useState(null);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [uploading, setUploading] = useState(false);

//   // MP3 Fetches
//   const fetchMP3s = async () => {
//     const { data, error } = await supabase
//       .from('mp3_files')
//       .select('*')
//       .order('created_at', { ascending: false });
//     if (error) console.error('Fetch MP3s error:', error);
//     else setMp3s(data);
//   };

//   useEffect(() => {
//     fetchMP3s();
//   }, []);

//   // Handle Upload MP3
//   const handleUpload = async () => {
//     if (!file || !title || !description) return alert('All fields required');
//     setUploading(true);
//     const fileName = `${Date.now()}_${file.name}`;

//     try {
//       // Upload file
//       const { error: uploadError } = await supabase
//         .storage
//         .from('mp3_files')
//         .upload(fileName, file);
//       if (uploadError) throw uploadError;

//       // Insert metadata
//       const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/mp3_files/${fileName}`;
//       const { error: dbError } = await supabase
//         .from('mp3_files')
//         .insert({ 
//           title, 
//           description, 
//           user_id: currentUser.id, 
//           file_url: fileUrl 
//         });
//       if (dbError) throw dbError;

//       setTitle('');
//       setDescription('');
//       setFile(null);
//       fetchMP3s();
//     } catch (err) {
//       console.error('Upload error:', err);
//       alert('Upload failed. Check console.');
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">MP3 Management</h1>

//       <div className="mb-4 flex flex-col gap-2 p-8 
//       bg-[var(--card-bg)] rounded-xl shadow-sm border border-[var(--border)]
//       ">
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={e => setTitle(e.target.value)}
//           className="p-2 border rounded"
//         />
//         <input
//           type="text"
//           placeholder="Description"
//           value={description}
//           onChange={e => setDescription(e.target.value)}
//           className="p-2 border rounded mt-3"
//         />
//         <input
//           type="file"
//           accept=".mp3"
//           onChange={e => setFile(e.target.files[0])}
//           className="p-2 border rounded mt-3"
//         />
//         <button
//           onClick={handleUpload}
//           disabled={uploading}
//           className="px-4 py-2 bg-[var(--gold)] rounded text-black mt-4"
//         >
//           {uploading ? 'Uploading...' : 'Upload'}
//         </button>
//       </div>

//       <div className="space-y-2
//       rounded-xl shadow-sm p-8]
//       ">
//         {mp3s.map(mp3 => (
//           <div key={mp3.id} 
          
//           className="
//           p-4 rounded flex flex-col gap-1 bg-[var(--card-bg)]
//           rounded-xl shadow-sm border border-[var(--border)]
//           "
          
//           >
//             <div className="flex justify-between items-center">
//               <span className="font-medium">{mp3.title}</span>
//               <audio controls src={mp3.file_url} className="w-64" />
//             </div>
//             <p className="text-sm text-[var(--gray)]">{mp3.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // --- MP3 Manager Component ---
// function MP4Manager({ currentUser }) {
//   const [mp4s, setMp4s] = useState([]);
//   const [file, setFile] = useState(null);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [uploading, setUploading] = useState(false);

//   // MP4 Fetches
//   const fetchMP4s = async () => {
//     const { data, error } = await supabase
//       .from('mp4_files')
//       .select('*')
//       .order('created_at', { ascending: false });
//     if (error) console.error('Fetch MP4s error:', error);
//     else setMp4s(data);
//   };

//   useEffect(() => {
//     fetchMP4s();
//   }, []);

//   // Handle Upload MP4
//   const handleUpload = async () => {
//     if (!file || !title || !description) return alert('All fields required');
//     setUploading(true);
//     const fileName = `${Date.now()}_${file.name}`;

//     try {
//       // Upload file
//       const { error: uploadError } = await supabase
//         .storage
//         .from('mp4_files')
//         .upload(fileName, file);
//       if (uploadError) throw uploadError;

//       // Insert metadata
//       const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/mp4_files/${fileName}`;
//       const { error: dbError } = await supabase
//         .from('mp4_files')
//         .insert({ 
//           title, 
//           description, 
//           user_id: currentUser.id, 
//           file_url: fileUrl 
//         });
//       if (dbError) throw dbError;

//       setTitle('');
//       setDescription('');
//       setFile(null);
//       fetchMP4s();
//     } catch (err) {
//       console.error('Upload error:', err);
//       alert('Upload failed. Check console.');
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">MP4 Management</h1>

//       <div className="mb-4 flex flex-col gap-2 p-8 
//       bg-[var(--card-bg)] rounded-xl shadow-sm border border-[var(--border)]
//       ">
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={e => setTitle(e.target.value)}
//           className="p-2 border rounded"
//         />
//         <input
//           type="text"
//           placeholder="Description"
//           value={description}
//           onChange={e => setDescription(e.target.value)}
//           className="p-2 border rounded mt-3"
//         />
//         <input
//           type="file"
//           accept=".mp4"
//           onChange={e => setFile(e.target.files[0])}
//           className="p-2 border rounded mt-3"
//         />
//         <button
//           onClick={handleUpload}
//           disabled={uploading}
//           className="px-4 py-2 bg-[var(--gold)] rounded text-black mt-4"
//         >
//           {uploading ? 'Uploading...' : 'Upload'}
//         </button>
//       </div>

//       <div className="space-y-2 rounded-xl shadow-sm p-8">
//         {mp4s.map(mp4 => (
//           <div key={mp4.id}
//             className="
//             p-4 rounded flex flex-col gap-1 bg-[var(--card-bg)]
//             rounded-xl shadow-sm border border-[var(--border)]
//             "
//           >
//             <div className="flex justify-between items-center">
//               <span className="font-medium">{mp4.title}</span>
//               <video controls src={mp4.file_url} className="w-64" />
//             </div>
//             <p className="text-sm text-[var(--gray)]">{mp4.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // --- Admin Dashboard Main Component ---
// export default function AdminDashboard() {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userProfile, setUserProfile] = useState(null);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeSection, setActiveSection] = useState('Home');
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [error, setError] = useState(null);
//   const [retryCount, setRetryCount] = useState(0);

//   // --- Fetch initial data ---
//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const { data: { session }, error: sessionError } = await supabase.auth.getSession();
//       if (sessionError || !session?.user) throw sessionError || new Error('No session');

//       setCurrentUser(session.user);

//       const { data: profileData, error: profileError } = await supabase
//         .from('profiles')
//         .select('*')
//         .eq('id', session.user.id)
//         .single();
//     //   if (profileError || !profileData?.is_admin) throw profileError || new Error('Not authorized');
//       if (profileError) throw profileError || new Error('Not authorized');

//       setUserProfile(profileData);

//       const { data: usersData, error: usersError } = await supabase
//         .from('profiles')
//         .select('id, email, name, created_at, verified')
//         .order('created_at', { ascending: false });
//       if (usersError) throw usersError;

//       setUsers(usersData);
//       setLoading(false);
//     } catch (err) {
//       console.error('Fetch error:', err);
//       setError(err.message || 'Failed to load');
//       if (retryCount < 3) setRetryCount(prev => prev + 1);
//       else setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();

//     const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
//       if (!session?.user) setCurrentUser(null);
//       else fetchData();
//     });

//     return () => subscription?.unsubscribe();
//   }, [retryCount]);

//   if (loading) return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] text-[var(--gold)]">
//       <ArrowPathIcon className="w-8 h-8 animate-spin mb-4" />
//       <p>Loading admin dashboard...</p>
//       {retryCount > 0 && <p className="text-sm mt-2">Attempt {retryCount} of 3</p>}
//     </div>
//   );

//   if (error) return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] text-red-500">
//       <XCircleIcon className="w-8 h-8 mb-4" />
//       <p>{error}</p>
//       <button onClick={() => setRetryCount(0)} className="mt-4 px-4 py-2 bg-[var(--gold)] rounded text-black">
//         Retry
//       </button>
//     </div>
//   );

//   if (!currentUser || !userProfile?.verified) return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)] text-center">
//       <p className="text-xl font-semibold mb-4">Not authorized</p>
//       <button
//         onClick={async () => { await supabase.auth.signOut(); window.location.reload(); }}
//         className="px-4 py-2 bg-[var(--gold)] rounded text-black"
//       >
//         Sign In
//       </button>
//     </div>
//   );

//   return (
//     <div className="flex h-screen bg-[var(--background)] text-[var(--foreground)]">
//       {/* Sidebar */}
//       <aside className="hidden md:flex w-64 bg-[var(--card-bg)] dark:bg-[var(--gray-dark)] shadow-lg p-6 flex-col justify-between">
//         <div>
//           <h2 className="text-xl font-bold mb-8">Founder Admin</h2>
//           <nav className="space-y-4">
//             <SidebarLink icon={<HomeIcon className="w-5 h-5" />} label="Home" active={activeSection==='Home'} onClick={() => setActiveSection('Home')} />
//             <SidebarLink icon={<MicrophoneIcon className="w-5 h-5" />} label="MP3 Management" active={activeSection==='MP3'} onClick={() => setActiveSection('MP3')} />
//             <SidebarLink icon={<VideoCameraIcon className="w-5 h-5" />} label="MP4 Management" active={activeSection==='MP4'} onClick={() => setActiveSection('MP4')} />
//           </nav>
//         </div>
//         <button onClick={async()=>{await supabase.auth.signOut(); setCurrentUser(null);}} className="flex items-center gap-2 text-red-600">
//           <ArrowRightOnRectangleIcon className="w-5 h-5"/> Sign Out
//         </button>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6 overflow-y-auto">
//         {activeSection === 'MP3' && (
//           <MP3Manager currentUser={currentUser} />
//         )}
//         {activeSection === 'MP4' && (
//           <MP4Manager currentUser={currentUser} />
//         )}
//         {activeSection === 'Home' && (
//           <div>
//             <h1 className="text-3xl font-bold">Welcome, {userProfile?.business_name}</h1>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

























'use client'

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  HomeIcon,
  UserGroupIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  MicrophoneIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';

// --- Supabase Client Initialization (Fixed Import Issue) ---
// Note: In a real Next.js app, using an external lib file is preferred, 
// but for a single-file environment, we initialize it here.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if environment variables are available before creating the client
let supabase = null;
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.error("Supabase environment variables not configured. File management will fail.");
}

// Utility to safely extract the storage path from the Supabase public URL
const getStoragePath = (fileUrl, bucketName) => {
    // Expected pattern: .../public/{bucketName}/{path}
    const pathSegment = `/public/${bucketName}/`;
    const startIndex = fileUrl.indexOf(pathSegment);
    return startIndex !== -1 ? fileUrl.substring(startIndex + pathSegment.length) : null;
};


// --- Sidebar Link Component ---
function SidebarLink({ icon, label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 cursor-pointer transition ${
        active
          ? 'text-[var(--gold)] font-medium'
          : 'text-[var(--gray)] hover:text-[var(--gold)] dark:text-[var(--gray)] dark:hover:text-[var(--white)]'
      }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}

// --- MP3 Manager Component ---
function MP3Manager({ currentUser, userProfile }) {
  const [mp3s, setMp3s] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null); // State for custom messages

  const isFounder = userProfile?.user_type === 'founder';
  const isStudent = userProfile?.user_type === 'student';

  if (!supabase) return <p className="text-red-500">Supabase connection failed. Check configuration.</p>;

  // MP3 Fetches
  const fetchMP3s = async () => {
    const { data, error } = await supabase
      .from('mp3_files')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) console.error('Fetch MP3s error:', error);
    else setMp3s(data);
  };

  useEffect(() => {
    fetchMP3s();
  }, []);

  // Handle Upload MP3
  const handleUpload = async () => {
    setMessage(null);
    if (!file || !title || !description) {
        setMessage({ type: 'error', text: 'All fields are required.' });
        return;
    }
    setUploading(true);
    const fileName = `${Date.now()}_${file.name}`;

    try {
      // Upload file
      const { error: uploadError } = await supabase
        .storage
        .from('mp3_files')
        .upload(fileName, file);
      if (uploadError) throw uploadError;

      // Insert metadata
      const fileUrl = `${supabaseUrl}/storage/v1/object/public/mp3_files/${fileName}`;
      const { error: dbError } = await supabase
        .from('mp3_files')
        .insert({ 
          title, 
          description, 
          user_id: currentUser.id, 
          file_url: fileUrl 
        });
      if (dbError) throw dbError;

      setTitle('');
      setDescription('');
      setFile(null);
      fetchMP3s();
      setMessage({ type: 'success', text: 'MP3 uploaded successfully!' });
    } catch (err) {
      console.error('Upload error:', err);
      setMessage({ type: 'error', text: 'Upload failed: ' + (err.message || 'Unknown error') });
    } finally {
      setUploading(false);
    }
  };

  // --- Handle Delete MP3 ---
  const handleDeleteMP3 = async (id, fileUrl) => {
    // IMPORTANT: Replacing alert() with window.confirm() for now, 
    // but this should be a custom modal in a finished app.
    if (!window.confirm('Are you absolutely sure you want to delete this MP3 file? This action is permanent.')) return;

    setMessage(null);
    try {
      const storagePath = getStoragePath(fileUrl, 'mp3_files');
      
      if (storagePath) {
        // 1. Delete file from storage
        const { error: storageError } = await supabase.storage.from('mp3_files').remove([storagePath]);
        if (storageError) {
          // Log storage error but proceed to delete DB entry for cleanup
          console.warn('Supabase Storage deletion failed, proceeding to delete database record:', storageError);
        }
      } else {
          console.error('Could not determine storage path for deletion. Deleting database record only.');
      }

      // 2. Delete record from database
      const { error: dbError } = await supabase.from('mp3_files').delete().eq('id', id);
      if (dbError) throw dbError;

      // 3. Refresh list and show success
      fetchMP3s();
      setMessage({ type: 'success', text: 'MP3 deleted successfully!' });

    } catch (err) {
      console.error('Deletion error:', err);
      setMessage({ type: 'error', text: 'Deletion failed. Check console for details.' });
    }
  };


  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">MP3 Management</h1>
        
      {message && (
        <div className={`p-3 mb-4 rounded-lg flex items-center gap-2 ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.type === 'success' ? <CheckCircleIcon className="w-5 h-5" /> : <XCircleIcon className="w-5 h-5" />}
          {message.text}
        </div>
      )}

      {/* <div className="mb-8 flex flex-col gap-2 p-8 
      bg-[var(--card-bg)] rounded-xl shadow-sm border border-[var(--border)]
      ">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="p-3 border rounded-lg bg-[var(--input-bg)] text-[var(--foreground)] border-[var(--border)] focus:ring-[var(--gold)] focus:border-[var(--gold)] transition"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="p-3 border rounded-lg mt-3 bg-[var(--input-bg)] text-[var(--foreground)] border-[var(--border)] focus:ring-[var(--gold)] focus:border-[var(--gold)] transition"
        />
        <input
          type="file"
          accept=".mp3"
          onChange={e => setFile(e.target.files[0])}
          className="p-2 border rounded-lg mt-3 bg-[var(--input-bg)] text-[var(--foreground)] border-[var(--border)] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--gold)] file:text-black hover:file:bg-amber-400 transition"
        />
        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`px-4 py-2 rounded-lg text-black mt-4 font-semibold transition ${uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[var(--gold)] hover:bg-amber-400'}`}
        >
          {uploading ? 'Uploading...' : 'Upload MP3'}
        </button>
      </div> */}

      {isFounder ? (
        <div className="mb-8 flex flex-col gap-2 p-8 
        bg-[var(--card-bg)] rounded-xl shadow-sm border border-[var(--border)]
        ">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="p-3 border rounded-lg bg-[var(--input-bg)] text-[var(--foreground)] border-[var(--border)] focus:ring-[var(--gold)] focus:border-[var(--gold)] transition"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="p-3 border rounded-lg mt-3 bg-[var(--input-bg)] text-[var(--foreground)] border-[var(--border)] focus:ring-[var(--gold)] focus:border-[var(--gold)] transition"
          />
          <input
            type="file"
            accept=".mp3"
            onChange={e => setFile(e.target.files[0])}
            className="p-2 border rounded-lg mt-3 bg-[var(--input-bg)] text-[var(--foreground)] border-[var(--border)] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--gold)] file:text-black hover:file:bg-amber-400 transition"
          />
          <button
            onClick={handleUpload}
            disabled={uploading}
            className={`px-4 py-2 rounded-lg text-black mt-4 font-semibold transition ${uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[var(--gold)] hover:bg-amber-400'}`}
          >
            {uploading ? 'Uploading...' : 'Upload MP3'}
          </button>
        </div>
      ) : (
        <div className="p-4 mb-6 bg-yellow-100 text-yellow-800 rounded-lg border border-yellow-300">
          {isStudent
            ? "Please contact the admin to unlock this feature and upgrade your account."
            : "You currently do not have permission to upload MP3 files."}
        </div>
      )}


      <div className="space-y-4">
        {mp3s.map(mp3 => (
          <div key={mp3.id} 
          className="
          p-4 rounded-xl flex flex-col gap-3 bg-[var(--card-bg)]
          shadow-sm border border-[var(--border)]
          "
          >
            <div className="flex justify-between items-start w-full">
              <div className="flex flex-col flex-1 min-w-0 pr-4">
                  <span className="font-semibold text-lg truncate">{mp3.title}</span>
                  <p className="text-sm text-[var(--gray)]">{mp3.description}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                  <audio controls src={mp3.file_url} className="w-48 sm:w-64 h-10" /> 
                  {isFounder ? (
                  <button
                      onClick={() => handleDeleteMP3(mp3.id, mp3.file_url)}
                      className="p-2 text-white bg-red-600 hover:bg-red-700 rounded-full transition duration-150 shadow-md"
                      aria-label="Delete MP3"
                  >
                      <XMarkIcon className="w-5 h-5" />
                  </button>
                  ) : (
                    <button
                        className="p-2 text-white bg-red-600 hover:bg-red-700 rounded-full transition duration-150 shadow-md opacity-20 cursor-not-allowed"
                        aria-label="Delete MP3"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- MP4 Manager Component ---
function MP4Manager({ currentUser, userProfile }) {
  const [mp4s, setMp4s] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null); // State for custom messages

  const isFounder = userProfile?.user_type === 'founder';
  const isStudent = userProfile?.user_type === 'student';
  
  if (!supabase) return <p className="text-red-500">Supabase connection failed. Check configuration.</p>;


  // MP4 Fetches
  const fetchMP4s = async () => {
    const { data, error } = await supabase
      .from('mp4_files')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) console.error('Fetch MP4s error:', error);
    else setMp4s(data);
  };

  useEffect(() => {
    fetchMP4s();
  }, []);

  // Handle Upload MP4
  const handleUpload = async () => {
    setMessage(null);
    if (!file || !title || !description) {
        setMessage({ type: 'error', text: 'All fields are required.' });
        return;
    }
    setUploading(true);
    const fileName = `${Date.now()}_${file.name}`;

    try {
      // Upload file
      const { error: uploadError } = await supabase
        .storage
        .from('mp4_files')
        .upload(fileName, file);
      if (uploadError) throw uploadError;

      // Insert metadata
      const fileUrl = `${supabaseUrl}/storage/v1/object/public/mp4_files/${fileName}`;
      const { error: dbError } = await supabase
        .from('mp4_files')
        .insert({ 
          title, 
          description, 
          user_id: currentUser.id, 
          file_url: fileUrl 
        });
      if (dbError) throw dbError;

      setTitle('');
      setDescription('');
      setFile(null);
      fetchMP4s();
      setMessage({ type: 'success', text: 'MP4 uploaded successfully!' });
    } catch (err) {
      console.error('Upload error:', err);
      setMessage({ type: 'error', text: 'Upload failed: ' + (err.message || 'Unknown error') });
    } finally {
      setUploading(false);
    }
  };

  // --- Handle Delete MP4 ---
  const handleDeleteMP4 = async (id, fileUrl) => {
    // IMPORTANT: Replacing alert() with window.confirm() for now, 
    // but this should be a custom modal in a finished app.
    if (!window.confirm('Are you absolutely sure you want to delete this MP4 file? This action is permanent.')) return;

    setMessage(null);
    try {
      const storagePath = getStoragePath(fileUrl, 'mp4_files');
      
      if (storagePath) {
        // 1. Delete file from storage
        const { error: storageError } = await supabase.storage.from('mp4_files').remove([storagePath]);
        if (storageError) {
          // Log storage error but proceed to delete DB entry for cleanup
          console.warn('Supabase Storage deletion failed, proceeding to delete database record:', storageError);
        }
      } else {
          console.error('Could not determine storage path for deletion. Deleting database record only.');
      }

      // 2. Delete record from database
      const { error: dbError } = await supabase.from('mp4_files').delete().eq('id', id);
      if (dbError) throw dbError;

      // 3. Refresh list and show success
      fetchMP4s();
      setMessage({ type: 'success', text: 'MP4 deleted successfully!' });

    } catch (err) {
      console.error('Deletion error:', err);
      setMessage({ type: 'error', text: 'Deletion failed. Check console for details.' });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">MP4 Management</h1>

      {message && (
        <div className={`p-3 mb-4 rounded-lg flex items-center gap-2 ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.type === 'success' ? <CheckCircleIcon className="w-5 h-5" /> : <XCircleIcon className="w-5 h-5" />}
          {message.text}
        </div>
      )}

      {isFounder ? (
        <div className="mb-8 flex flex-col gap-2 p-8 
        bg-[var(--card-bg)] rounded-xl shadow-sm border border-[var(--border)]
        ">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="p-3 border rounded-lg bg-[var(--input-bg)] text-[var(--foreground)] border-[var(--border)] focus:ring-[var(--gold)] focus:border-[var(--gold)] transition"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="p-3 border rounded-lg mt-3 bg-[var(--input-bg)] text-[var(--foreground)] border-[var(--border)] focus:ring-[var(--gold)] focus:border-[var(--gold)] transition"
          />
          <input
            type="file"
            accept=".mp4"
            onChange={e => setFile(e.target.files[0])}
            className="p-2 border rounded-lg mt-3 bg-[var(--input-bg)] text-[var(--foreground)] border-[var(--border)] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--gold)] file:text-black hover:file:bg-amber-400 transition"
          />
          <button
            onClick={handleUpload}
            disabled={uploading}
            className={`px-4 py-2 rounded-lg text-black mt-4 font-semibold transition ${uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[var(--gold)] hover:bg-amber-400'}`}
          >
            {uploading ? 'Uploading...' : 'Upload MP4'}
          </button>
        </div>
      ) : (
        <div className="p-4 mb-6 bg-yellow-100 text-yellow-800 rounded-lg border border-yellow-300">
          {isStudent
            ? "Please contact the admin to unlock this feature and upgrade your account."
            : "You currently do not have permission to upload MP4 files."}
        </div>
      )} 

      <div className="space-y-4">
        {mp4s.map(mp4 => (
          <div key={mp4.id}
            className="
            p-4 rounded-xl flex flex-col gap-3 bg-[var(--card-bg)]
            shadow-sm border border-[var(--border)]
            "
          >
            <div className="flex justify-between items-start w-full">
              <div className="flex flex-col flex-1 min-w-0 pr-4">
                  <span className="font-semibold text-lg truncate">{mp4.title}</span>
                  <p className="text-sm text-[var(--gray)]">{mp4.description}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                  <video controls src={mp4.file_url} className="w-48 sm:w-64 h-32 rounded-lg object-cover" />
                  
                  {isFounder ? (
                    <button
                        onClick={() => handleDeleteMP4(mp4.id, mp4.file_url)}
                        className="p-2 text-white bg-red-600 hover:bg-red-700 rounded-full transition duration-150 shadow-md"
                        aria-label="Delete MP4"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                    ) : (
                    <button
                        className="p-2 text-white bg-red-600 hover:bg-red-700 rounded-full transition duration-150 shadow-md opacity-20 cursor-not-allowed"
                        aria-label="Delete MP3"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Admin Dashboard Main Component ---
export default function AdminDashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  
  if (!supabase) return <p className="min-h-screen flex items-center justify-center text-red-500 bg-[var(--background)]">Supabase client is not initialized.</p>;


  // --- Fetch initial data ---
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session?.user) throw sessionError || new Error('No session');

      setCurrentUser(session.user);

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      if (profileError) throw profileError || new Error('Not authorized');

      setUserProfile(profileData);

      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select('id, email, name, created_at, verified')
        .order('created_at', { ascending: false });
      if (usersError) throw usersError;

      setUsers(usersData);
      setLoading(false);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Failed to load');
      if (retryCount < 3) setRetryCount(prev => prev + 1);
      else setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session?.user) setCurrentUser(null);
      else fetchData();
    });

    return () => subscription?.unsubscribe();
  }, [retryCount]);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] text-[var(--gold)]">
      <ArrowPathIcon className="w-8 h-8 animate-spin mb-4" />
      <p>Loading admin dashboard...</p>
      {retryCount > 0 && <p className="text-sm mt-2">Attempt {retryCount} of 3</p>}
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] text-red-500">
      <XCircleIcon className="w-8 h-8 mb-4" />
      <p>{error}</p>
      <button onClick={() => setRetryCount(0)} className="mt-4 px-4 py-2 bg-[var(--gold)] rounded text-black">
        Retry
      </button>
    </div>
  );

  if (!currentUser || !userProfile?.verified) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)] text-center">
      <p className="text-xl font-semibold mb-4">Not authorized</p>
      <button
        onClick={async () => { await supabase.auth.signOut(); window.location.reload(); }}
        className="px-4 py-2 bg-[var(--gold)] rounded text-black"
      >
        Sign In
      </button>
    </div>
  );

  return (
    <div className="flex h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 bg-[var(--card-bg)] dark:bg-[var(--gray-dark)] shadow-lg p-6 flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-8">Founder Admin</h2>
          <nav className="space-y-4">
            <SidebarLink icon={<HomeIcon className="w-5 h-5" />} label="Home" active={activeSection==='Home'} onClick={() => setActiveSection('Home')} />
            <SidebarLink icon={<MicrophoneIcon className="w-5 h-5" />} label="MP3 Management" active={activeSection==='MP3'} onClick={() => setActiveSection('MP3')} />
            <SidebarLink icon={<VideoCameraIcon className="w-5 h-5" />} label="MP4 Management" active={activeSection==='MP4'} onClick={() => setActiveSection('MP4')} />
          </nav>
        </div>
        <button onClick={async()=>{await supabase.auth.signOut(); setCurrentUser(null);}} className="flex items-center gap-2 text-red-600">
          <ArrowRightOnRectangleIcon className="w-5 h-5"/> Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {activeSection === 'MP3' && (
          <MP3Manager currentUser={currentUser} userProfile={userProfile} />
        )}
        {activeSection === 'MP4' && (
          <MP4Manager currentUser={currentUser} userProfile={userProfile} />
        )}
        {activeSection === 'Home' && (
          <div>
            <h1 className="text-3xl font-bold">Welcome, {userProfile?.business_name}</h1>
            <p className="mt-4 text-[var(--gray)]">Use the sidebar to manage your MP3 and MP4 assets.</p>
          </div>
        )}
      </main>
    </div>
  );
}