'use client'

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
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
function MP3Manager({ currentUser }) {
  const [mp3s, setMp3s] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

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
    if (!file || !title || !description) return alert('All fields required');
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
      const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/mp3_files/${fileName}`;
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
    } catch (err) {
      console.error('Upload error:', err);
      alert('Upload failed. Check console.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">MP3 Management</h1>

      <div className="mb-4 flex flex-col gap-2 p-8 
      bg-[var(--card-bg)] rounded-xl shadow-sm border border-[var(--border)]
      ">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="p-2 border rounded mt-3"
        />
        <input
          type="file"
          accept=".mp3"
          onChange={e => setFile(e.target.files[0])}
          className="p-2 border rounded mt-3"
        />
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="px-4 py-2 bg-[var(--gold)] rounded text-black mt-4"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      <div className="space-y-2
      rounded-xl shadow-sm p-8]
      ">
        {mp3s.map(mp3 => (
          <div key={mp3.id} 
          
          className="
          p-4 rounded flex flex-col gap-1 bg-[var(--card-bg)]
          rounded-xl shadow-sm border border-[var(--border)]
          "
          
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{mp3.title}</span>
              <audio controls src={mp3.file_url} className="w-64" />
            </div>
            <p className="text-sm text-[var(--gray)]">{mp3.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- MP3 Manager Component ---
function MP4Manager({ currentUser }) {
  const [mp4s, setMp4s] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

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
    if (!file || !title || !description) return alert('All fields required');
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
      const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/mp4_files/${fileName}`;
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
    } catch (err) {
      console.error('Upload error:', err);
      alert('Upload failed. Check console.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">MP4 Management</h1>

      <div className="mb-4 flex flex-col gap-2 p-8 
      bg-[var(--card-bg)] rounded-xl shadow-sm border border-[var(--border)]
      ">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="p-2 border rounded mt-3"
        />
        <input
          type="file"
          accept=".mp4"
          onChange={e => setFile(e.target.files[0])}
          className="p-2 border rounded mt-3"
        />
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="px-4 py-2 bg-[var(--gold)] rounded text-black mt-4"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      <div className="space-y-2 rounded-xl shadow-sm p-8">
        {mp4s.map(mp4 => (
          <div key={mp4.id}
            className="
            p-4 rounded flex flex-col gap-1 bg-[var(--card-bg)]
            rounded-xl shadow-sm border border-[var(--border)]
            "
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{mp4.title}</span>
              <video controls src={mp4.file_url} className="w-64" />
            </div>
            <p className="text-sm text-[var(--gray)]">{mp4.description}</p>
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
    //   if (profileError || !profileData?.is_admin) throw profileError || new Error('Not authorized');
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
          <MP3Manager currentUser={currentUser} />
        )}
        {activeSection === 'MP4' && (
          <MP4Manager currentUser={currentUser} />
        )}
        {activeSection === 'Home' && (
          <div>
            <h1 className="text-3xl font-bold">Welcome, {userProfile?.business_name}</h1>
          </div>
        )}
      </main>
    </div>
  );
}