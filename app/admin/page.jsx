// 'use client';

// import { useEffect, useState } from 'react';
// import { supabase } from '../../lib/supabase';
// import { useRouter } from 'next/navigation';
// import {
//   HomeIcon,
//   UserGroupIcon,
//   ArrowRightOnRectangleIcon,
//   Bars3Icon,
//   XMarkIcon,
//   CheckCircleIcon,
//   XCircleIcon,
// } from '@heroicons/react/24/outline';

// export default function AdminDashboard() {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userProfile, setUserProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [users, setUsers] = useState([]);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchProfile = async (userId) => {
//       const { data, error } = await supabase
//         .from('profiles')
//         .select('*')
//         .eq('id', userId)
//         .single();

//       if (error || !data?.is_admin) {
//         console.error('Not authorized as admin');
//         await supabase.auth.signOut();
//         router.push('/auth/login');
//       } else {
//         setUserProfile(data);
//       }
//     };

//     const fetchUsers = async () => {
//       const { data, error } = await supabase
//         .from('profiles')
//         .select('id, email, name, created_at, verified')
//         .order('created_at', { ascending: false });

//       if (error) {
//         console.error('Error fetching users:', error);
//       } else {
//         setUsers(data);
//       }
//     };

//     const initAuth = async () => {
//       const { data: { session } } = await supabase.auth.getSession();

//       if (session?.user) {
//         setCurrentUser(session.user);
//         await fetchProfile(session.user.id);
//         await fetchUsers();
//       } else {
//         router.push('/auth/login');
//       }
//       setLoading(false);
//     };

//     initAuth();

//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       async (_, session) => {
//         if (session?.user) {
//           setCurrentUser(session.user);
//           await fetchProfile(session.user.id);
//           await fetchUsers();
//         } else {
//           router.push('/auth/login');
//         }
//       }
//     );

//     return () => {
//       subscription.unsubscribe();
//     };
//   }, [router]);

//   const handleApproveUser = async (userId, approved) => {
//     const { error } = await supabase
//       .from('profiles')
//       .update({ verified: approved })
//       .eq('id', userId);

//     if (error) {
//       console.error('Error updating user:', error);
//     } else {
//       setUsers(users.map(user => 
//         user.id === userId ? { ...user, verified: approved } : user
//       ));
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
//         Loading admin dashboard...
//       </div>
//     );
//   }

//   if (!currentUser || !userProfile?.is_admin) return null;

//   return (
//     <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
//       {/* Mobile menu button */}
//       <button
//         className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
//         onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//       >
//         {mobileMenuOpen ? (
//           <XMarkIcon className="w-6 h-6" />
//         ) : (
//           <Bars3Icon className="w-6 h-6" />
//         )}
//       </button>

//       {/* Sidebar - Mobile */}
//       {mobileMenuOpen && (
//         <div className="md:hidden fixed inset-0 z-40">
//           <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)}></div>
//           <div className="relative z-50 w-64 h-full bg-white dark:bg-gray-800 shadow-lg p-6 flex flex-col">
//             <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-8">Admin Dashboard</h2>
//             <nav className="space-y-4 flex-1">
//               <SidebarLink 
//                 icon={<HomeIcon className="w-5 h-5" />} 
//                 label="Home" 
//                 active={true}
//               />
//               <SidebarLink 
//                 icon={<UserGroupIcon className="w-5 h-5" />} 
//                 label="User Management" 
//                 active={true}
//               />
//             </nav>
//             <button
//               onClick={async () => {
//                 await supabase.auth.signOut();
//                 router.push('/auth/login');
//               }}
//               className="flex items-center gap-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
//             >
//               <ArrowRightOnRectangleIcon className="w-5 h-5" />
//               Sign Out
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Sidebar - Desktop */}
//       <aside className="hidden md:flex w-64 bg-white dark:bg-gray-800 shadow-lg p-6 flex-col justify-between">
//         <div>
//           <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-8">Admin Dashboard</h2>
//           <nav className="space-y-4">
//             <SidebarLink 
//               icon={<HomeIcon className="w-5 h-5" />} 
//               label="Home" 
//               active={true}
//             />
//             <SidebarLink 
//               icon={<UserGroupIcon className="w-5 h-5" />} 
//               label="User Management" 
//               active={true}
//             />
//           </nav>
//         </div>
//         <button
//           onClick={async () => {
//             await supabase.auth.signOut();
//             router.push('/auth/login');
//           }}
//           className="flex items-center gap-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
//         >
//           <ArrowRightOnRectangleIcon className="w-5 h-5" />
//           Sign Out
//         </button>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6 overflow-y-auto">
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
//             User Management
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400 mt-2">
//             Review and approve user accounts
//           </p>
//         </div>

//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//               <thead className="bg-gray-50 dark:bg-gray-700">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                     User
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                     Email
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                     Joined
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//                 {users.map((user) => (
//                   <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
//                           <span className="text-gray-700 dark:text-gray-200">
//                             {user.name?.charAt(0) || user.email?.charAt(0)}
//                           </span>
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-gray-900 dark:text-white">
//                             {user.name || 'No name'}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
//                       {user.email}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
//                       {new Date(user.created_at).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                         user.verified 
//                           ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
//                           : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
//                       }`}>
//                         {user.verified ? 'Approved' : 'Pending'}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <div className="flex space-x-2">
//                         <button
//                           onClick={() => handleApproveUser(user.id, true)}
//                           disabled={user.verified}
//                           className={`p-1 rounded-md ${
//                             user.verified 
//                               ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
//                               : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800'
//                           }`}
//                           title={user.verified ? 'Already approved' : 'Approve user'}
//                         >
//                           <CheckCircleIcon className="w-5 h-5" />
//                         </button>
//                         <button
//                           onClick={() => handleApproveUser(user.id, false)}
//                           disabled={!user.verified}
//                           className={`p-1 rounded-md ${
//                             !user.verified 
//                               ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
//                               : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800'
//                           }`}
//                           title={!user.verified ? 'Not approved' : 'Reject user'}
//                         >
//                           <XCircleIcon className="w-5 h-5" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Mobile-friendly list view */}
//         <div className="md:hidden mt-6 space-y-4">
//           {users.map((user) => (
//             <div key={user.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="font-medium text-gray-900 dark:text-white">
//                     {user.name || 'No name'}
//                   </h3>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
//                   <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
//                     Joined: {new Date(user.created_at).toLocaleDateString()}
//                   </p>
//                 </div>
//                 <span className={`px-2 text-xs leading-5 font-semibold rounded-full ${
//                   user.verified 
//                     ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
//                     : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
//                 }`}>
//                   {user.verified ? 'Approved' : 'Pending'}
//                 </span>
//               </div>
//               <div className="flex justify-end space-x-2 mt-3">
//                 <button
//                   onClick={() => handleApproveUser(user.id, true)}
//                   disabled={user.verified}
//                   className={`p-1 rounded-md ${
//                     user.verified 
//                       ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
//                       : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800'
//                   }`}
//                   title={user.verified ? 'Already approved' : 'Approve user'}
//                 >
//                   <CheckCircleIcon className="w-5 h-5" />
//                 </button>
//                 <button
//                   onClick={() => handleApproveUser(user.id, false)}
//                   disabled={!user.verified}
//                   className={`p-1 rounded-md ${
//                     !user.verified 
//                       ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
//                       : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800'
//                   }`}
//                   title={!user.verified ? 'Not approved' : 'Reject user'}
//                 >
//                   <XCircleIcon className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// }

// function SidebarLink({ icon, label, active }) {
//   return (
//     <div
//       className={`flex items-center gap-3 ${
//         active 
//           ? 'text-blue-600 dark:text-blue-400 font-medium'
//           : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white'
//       } cursor-pointer transition`}
//     >
//       {icon}
//       <span>{label}</span>
//     </div>
//   );
// }


















'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';
import {
  HomeIcon,
  UserGroupIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

export default function AdminDashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const router = useRouter();

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Check session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session?.user) {
        throw sessionError || new Error('No session found');
      }

      setCurrentUser(session.user);

      // 2. Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (profileError || !profileData?.is_admin) {
        throw profileError || new Error('Not authorized as admin');
      }

      setUserProfile(profileData);

      // 3. Fetch users
      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select('id, email, name, created_at, verified')
        .order('created_at', { ascending: false });

      if (usersError) {
        throw usersError;
      }

      setUsers(usersData);
      setLoading(false);
    } catch (err) {
      console.error('Error in fetchData:', err);
      setError(err.message || 'Failed to load data');
      
      if (retryCount < 3) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          fetchData();
        }, 1000 * (retryCount + 1));
      } else {
        setLoading(false);
        await supabase.auth.signOut();
        router.push('/auth/login');
      }
    }
  };

  useEffect(() => {
    fetchData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT') {
          router.push('/auth/login');
        } else if (session?.user) {
          fetchData();
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, [retryCount]);

  const handleApproveUser = async (userId, approved) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ verified: approved })
        .eq('id', userId);

      if (error) throw error;

      setUsers(users.map(user => 
        user.id === userId ? { ...user, verified: approved } : user
      ));
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Failed to update user status');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
        <ArrowPathIcon className="w-8 h-8 animate-spin mb-4" />
        <p>Loading admin dashboard...</p>
        {retryCount > 0 && (
          <p className="text-sm text-gray-500 mt-2">
            Attempt {retryCount} of 3
          </p>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
        <XCircleIcon className="w-8 h-8 text-red-500 mb-4" />
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => {
            setRetryCount(0);
            fetchData();
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!currentUser || !userProfile?.is_admin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
        Redirecting to login...
      </div>
    );
  }

  
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <Bars3Icon className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar - Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="relative z-50 w-64 h-full bg-white dark:bg-gray-800 shadow-lg p-6 flex flex-col">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-8">Admin Dashboard</h2>
            <nav className="space-y-4 flex-1">
              <SidebarLink 
                icon={<HomeIcon className="w-5 h-5" />} 
                label="Home" 
                active={true}
              />
              <SidebarLink 
                icon={<UserGroupIcon className="w-5 h-5" />} 
                label="User Management" 
                active={true}
              />
            </nav>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                router.push('/auth/login');
              }}
              className="flex items-center gap-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 bg-white dark:bg-gray-800 shadow-lg p-6 flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-8">Admin Dashboard</h2>
          <nav className="space-y-4">
            <SidebarLink 
              icon={<HomeIcon className="w-5 h-5" />} 
              label="Home" 
              active={true}
            />
            <SidebarLink 
              icon={<UserGroupIcon className="w-5 h-5" />} 
              label="User Management" 
              active={true}
            />
          </nav>
        </div>
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.push('/auth/login');
          }}
          className="flex items-center gap-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            User Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Review and approve user accounts
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                          <span className="text-gray-700 dark:text-gray-200">
                            {user.name?.charAt(0) || user.email?.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.name || 'No name'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.verified 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {user.verified ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApproveUser(user.id, true)}
                          disabled={user.verified}
                          className={`p-1 rounded-md ${
                            user.verified 
                              ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                              : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800'
                          }`}
                          title={user.verified ? 'Already approved' : 'Approve user'}
                        >
                          <CheckCircleIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleApproveUser(user.id, false)}
                          disabled={!user.verified}
                          className={`p-1 rounded-md ${
                            !user.verified 
                              ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                              : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800'
                          }`}
                          title={!user.verified ? 'Not approved' : 'Reject user'}
                        >
                          <XCircleIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile-friendly list view */}
        <div className="md:hidden mt-6 space-y-4">
          {users.map((user) => (
            <div key={user.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {user.name || 'No name'}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    Joined: {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-2 text-xs leading-5 font-semibold rounded-full ${
                  user.verified 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}>
                  {user.verified ? 'Approved' : 'Pending'}
                </span>
              </div>
              <div className="flex justify-end space-x-2 mt-3">
                <button
                  onClick={() => handleApproveUser(user.id, true)}
                  disabled={user.verified}
                  className={`p-1 rounded-md ${
                    user.verified 
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800'
                  }`}
                  title={user.verified ? 'Already approved' : 'Approve user'}
                >
                  <CheckCircleIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleApproveUser(user.id, false)}
                  disabled={!user.verified}
                  className={`p-1 rounded-md ${
                    !user.verified 
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800'
                  }`}
                  title={!user.verified ? 'Not approved' : 'Reject user'}
                >
                  <XCircleIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function SidebarLink({ icon, label, active }) {
  return (
    <div
      className={`flex items-center gap-3 ${
        active 
          ? 'text-blue-600 dark:text-blue-400 font-medium'
          : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white'
      } cursor-pointer transition`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}


















