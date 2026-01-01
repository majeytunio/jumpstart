// // // 'use client';

// // // import { useEffect, useState } from 'react';
// // // import { supabase } from '../../lib/supabase';
// // // import { useRouter } from 'next/navigation';
// // // import {
// // //   HomeIcon,
// // //   UserGroupIcon,
// // //   ArrowRightOnRectangleIcon,
// // //   Bars3Icon,
// // //   XMarkIcon,
// // //   CheckCircleIcon,
// // //   XCircleIcon,
// // // } from '@heroicons/react/24/outline';

// // // export default function AdminDashboard() {
// // //   const [currentUser, setCurrentUser] = useState(null);
// // //   const [userProfile, setUserProfile] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [users, setUsers] = useState([]);
// // //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// // //   const router = useRouter();

// // //   useEffect(() => {
// // //     const fetchProfile = async (userId) => {
// // //       const { data, error } = await supabase
// // //         .from('profiles')
// // //         .select('*')
// // //         .eq('id', userId)
// // //         .single();

// // //       if (error || !data?.is_admin) {
// // //         console.error('Not authorized as admin');
// // //         await supabase.auth.signOut();
// // //         router.push('/auth/login');
// // //       } else {
// // //         setUserProfile(data);
// // //       }
// // //     };

// // //     const fetchUsers = async () => {
// // //       const { data, error } = await supabase
// // //         .from('profiles')
// // //         .select('id, email, name, created_at, verified')
// // //         .order('created_at', { ascending: false });

// // //       if (error) {
// // //         console.error('Error fetching users:', error);
// // //       } else {
// // //         setUsers(data);
// // //       }
// // //     };

// // //     const initAuth = async () => {
// // //       const { data: { session } } = await supabase.auth.getSession();

// // //       if (session?.user) {
// // //         setCurrentUser(session.user);
// // //         await fetchProfile(session.user.id);
// // //         await fetchUsers();
// // //       } else {
// // //         router.push('/auth/login');
// // //       }
// // //       setLoading(false);
// // //     };

// // //     initAuth();

// // //     const { data: { subscription } } = supabase.auth.onAuthStateChange(
// // //       async (_, session) => {
// // //         if (session?.user) {
// // //           setCurrentUser(session.user);
// // //           await fetchProfile(session.user.id);
// // //           await fetchUsers();
// // //         } else {
// // //           router.push('/auth/login');
// // //         }
// // //       }
// // //     );

// // //     return () => {
// // //       subscription.unsubscribe();
// // //     };
// // //   }, [router]);

// // //   const handleApproveUser = async (userId, approved) => {
// // //     const { error } = await supabase
// // //       .from('profiles')
// // //       .update({ verified: approved })
// // //       .eq('id', userId);

// // //     if (error) {
// // //       console.error('Error updating user:', error);
// // //     } else {
// // //       setUsers(users.map(user => 
// // //         user.id === userId ? { ...user, verified: approved } : user
// // //       ));
// // //     }
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
// // //         Loading admin dashboard...
// // //       </div>
// // //     );
// // //   }

// // //   if (!currentUser || !userProfile?.is_admin) return null;

// // //   return (
// // //     <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
// // //       {/* Mobile menu button */}
// // //       <button
// // //         className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
// // //         onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// // //       >
// // //         {mobileMenuOpen ? (
// // //           <XMarkIcon className="w-6 h-6" />
// // //         ) : (
// // //           <Bars3Icon className="w-6 h-6" />
// // //         )}
// // //       </button>

// // //       {/* Sidebar - Mobile */}
// // //       {mobileMenuOpen && (
// // //         <div className="md:hidden fixed inset-0 z-40">
// // //           <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)}></div>
// // //           <div className="relative z-50 w-64 h-full bg-white dark:bg-gray-800 shadow-lg p-6 flex flex-col">
// // //             <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-8">Admin Dashboard</h2>
// // //             <nav className="space-y-4 flex-1">
// // //               <SidebarLink 
// // //                 icon={<HomeIcon className="w-5 h-5" />} 
// // //                 label="Home" 
// // //                 active={true}
// // //               />
// // //               <SidebarLink 
// // //                 icon={<UserGroupIcon className="w-5 h-5" />} 
// // //                 label="User Management" 
// // //                 active={true}
// // //               />
// // //             </nav>
// // //             <button
// // //               onClick={async () => {
// // //                 await supabase.auth.signOut();
// // //                 router.push('/auth/login');
// // //               }}
// // //               className="flex items-center gap-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
// // //             >
// // //               <ArrowRightOnRectangleIcon className="w-5 h-5" />
// // //               Sign Out
// // //             </button>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Sidebar - Desktop */}
// // //       <aside className="hidden md:flex w-64 bg-white dark:bg-gray-800 shadow-lg p-6 flex-col justify-between">
// // //         <div>
// // //           <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-8">Admin Dashboard</h2>
// // //           <nav className="space-y-4">
// // //             <SidebarLink 
// // //               icon={<HomeIcon className="w-5 h-5" />} 
// // //               label="Home" 
// // //               active={true}
// // //             />
// // //             <SidebarLink 
// // //               icon={<UserGroupIcon className="w-5 h-5" />} 
// // //               label="User Management" 
// // //               active={true}
// // //             />
// // //           </nav>
// // //         </div>
// // //         <button
// // //           onClick={async () => {
// // //             await supabase.auth.signOut();
// // //             router.push('/auth/login');
// // //           }}
// // //           className="flex items-center gap-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
// // //         >
// // //           <ArrowRightOnRectangleIcon className="w-5 h-5" />
// // //           Sign Out
// // //         </button>
// // //       </aside>

// // //       {/* Main Content */}
// // //       <main className="flex-1 p-6 overflow-y-auto">
// // //         <div className="mb-6">
// // //           <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
// // //             User Management
// // //           </h1>
// // //           <p className="text-gray-600 dark:text-gray-400 mt-2">
// // //             Review and approve user accounts
// // //           </p>
// // //         </div>

// // //         <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
// // //           <div className="overflow-x-auto">
// // //             <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
// // //               <thead className="bg-gray-50 dark:bg-gray-700">
// // //                 <tr>
// // //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
// // //                     User
// // //                   </th>
// // //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
// // //                     Email
// // //                   </th>
// // //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
// // //                     Joined
// // //                   </th>
// // //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
// // //                     Status
// // //                   </th>
// // //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
// // //                     Actions
// // //                   </th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
// // //                 {users.map((user) => (
// // //                   <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
// // //                     <td className="px-6 py-4 whitespace-nowrap">
// // //                       <div className="flex items-center">
// // //                         <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
// // //                           <span className="text-gray-700 dark:text-gray-200">
// // //                             {user.name?.charAt(0) || user.email?.charAt(0)}
// // //                           </span>
// // //                         </div>
// // //                         <div className="ml-4">
// // //                           <div className="text-sm font-medium text-gray-900 dark:text-white">
// // //                             {user.name || 'No name'}
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                     </td>
// // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
// // //                       {user.email}
// // //                     </td>
// // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
// // //                       {new Date(user.created_at).toLocaleDateString()}
// // //                     </td>
// // //                     <td className="px-6 py-4 whitespace-nowrap">
// // //                       <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
// // //                         user.verified 
// // //                           ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
// // //                           : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
// // //                       }`}>
// // //                         {user.verified ? 'Approved' : 'Pending'}
// // //                       </span>
// // //                     </td>
// // //                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
// // //                       <div className="flex space-x-2">
// // //                         <button
// // //                           onClick={() => handleApproveUser(user.id, true)}
// // //                           disabled={user.verified}
// // //                           className={`p-1 rounded-md ${
// // //                             user.verified 
// // //                               ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
// // //                               : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800'
// // //                           }`}
// // //                           title={user.verified ? 'Already approved' : 'Approve user'}
// // //                         >
// // //                           <CheckCircleIcon className="w-5 h-5" />
// // //                         </button>
// // //                         <button
// // //                           onClick={() => handleApproveUser(user.id, false)}
// // //                           disabled={!user.verified}
// // //                           className={`p-1 rounded-md ${
// // //                             !user.verified 
// // //                               ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
// // //                               : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800'
// // //                           }`}
// // //                           title={!user.verified ? 'Not approved' : 'Reject user'}
// // //                         >
// // //                           <XCircleIcon className="w-5 h-5" />
// // //                         </button>
// // //                       </div>
// // //                     </td>
// // //                   </tr>
// // //                 ))}
// // //               </tbody>
// // //             </table>
// // //           </div>
// // //         </div>

// // //         {/* Mobile-friendly list view */}
// // //         <div className="md:hidden mt-6 space-y-4">
// // //           {users.map((user) => (
// // //             <div key={user.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
// // //               <div className="flex justify-between items-start">
// // //                 <div>
// // //                   <h3 className="font-medium text-gray-900 dark:text-white">
// // //                     {user.name || 'No name'}
// // //                   </h3>
// // //                   <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
// // //                   <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
// // //                     Joined: {new Date(user.created_at).toLocaleDateString()}
// // //                   </p>
// // //                 </div>
// // //                 <span className={`px-2 text-xs leading-5 font-semibold rounded-full ${
// // //                   user.verified 
// // //                     ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
// // //                     : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
// // //                 }`}>
// // //                   {user.verified ? 'Approved' : 'Pending'}
// // //                 </span>
// // //               </div>
// // //               <div className="flex justify-end space-x-2 mt-3">
// // //                 <button
// // //                   onClick={() => handleApproveUser(user.id, true)}
// // //                   disabled={user.verified}
// // //                   className={`p-1 rounded-md ${
// // //                     user.verified 
// // //                       ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
// // //                       : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800'
// // //                   }`}
// // //                   title={user.verified ? 'Already approved' : 'Approve user'}
// // //                 >
// // //                   <CheckCircleIcon className="w-5 h-5" />
// // //                 </button>
// // //                 <button
// // //                   onClick={() => handleApproveUser(user.id, false)}
// // //                   disabled={!user.verified}
// // //                   className={`p-1 rounded-md ${
// // //                     !user.verified 
// // //                       ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
// // //                       : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800'
// // //                   }`}
// // //                   title={!user.verified ? 'Not approved' : 'Reject user'}
// // //                 >
// // //                   <XCircleIcon className="w-5 h-5" />
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </main>
// // //     </div>
// // //   );
// // // }

// // // function SidebarLink({ icon, label, active }) {
// // //   return (
// // //     <div
// // //       className={`flex items-center gap-3 ${
// // //         active 
// // //           ? 'text-blue-600 dark:text-blue-400 font-medium'
// // //           : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white'
// // //       } cursor-pointer transition`}
// // //     >
// // //       {icon}
// // //       <span>{label}</span>
// // //     </div>
// // //   );
// // // }


















// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { supabase } from '../../lib/supabase';
// // import { useRouter } from 'next/navigation';
// // import {
// //   HomeIcon,
// //   UserGroupIcon,
// //   ArrowRightOnRectangleIcon,
// //   Bars3Icon,
// //   XMarkIcon,
// //   CheckCircleIcon,
// //   XCircleIcon,
// //   ArrowPathIcon,
// // } from '@heroicons/react/24/outline';

// // export default function AdminDashboard() {
// //   const [currentUser, setCurrentUser] = useState(null);
// //   const [userProfile, setUserProfile] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [users, setUsers] = useState([]);
// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [retryCount, setRetryCount] = useState(0);
// //   const router = useRouter();

// //   const fetchData = async () => {
// //     try {
// //       setLoading(true);
// //       setError(null);

// //       // 1. Check session
// //       const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
// //       if (sessionError || !session?.user) {
// //         throw sessionError || new Error('No session found');
// //       }

// //       setCurrentUser(session.user);

// //       // 2. Fetch profile
// //       const { data: profileData, error: profileError } = await supabase
// //         .from('profiles')
// //         .select('*')
// //         .eq('id', session.user.id)
// //         .single();

// //       if (profileError || !profileData?.is_admin) {
// //         throw profileError || new Error('Not authorized as admin');
// //       }

// //       setUserProfile(profileData);

// //       // 3. Fetch users
// //       const { data: usersData, error: usersError } = await supabase
// //         .from('profiles')
// //         .select('id, email, name, created_at, verified')
// //         .order('created_at', { ascending: false });

// //       if (usersError) {
// //         throw usersError;
// //       }

// //       setUsers(usersData);
// //       setLoading(false);
// //     } catch (err) {
// //       console.error('Error in fetchData:', err);
// //       setError(err.message || 'Failed to load data');
      
// //       if (retryCount < 3) {
// //         setTimeout(() => {
// //           setRetryCount(prev => prev + 1);
// //           fetchData();
// //         }, 1000 * (retryCount + 1));
// //       } else {
// //         setLoading(false);
// //         await supabase.auth.signOut();
// //         router.push('/auth/login');
// //       }
// //     }
// //   };

// //   useEffect(() => {
// //     fetchData();

// //     const { data: { subscription } } = supabase.auth.onAuthStateChange(
// //       async (event, session) => {
// //         if (event === 'SIGNED_OUT') {
// //           router.push('/auth/login');
// //         } else if (session?.user) {
// //           fetchData();
// //         }
// //       }
// //     );

// //     return () => {
// //       subscription?.unsubscribe();
// //     };
// //   }, [retryCount]);

// //   const handleApproveUser = async (userId, approved) => {
// //     try {
// //       const { error } = await supabase
// //         .from('profiles')
// //         .update({ verified: approved })
// //         .eq('id', userId);

// //       if (error) throw error;

// //       setUsers(users.map(user => 
// //         user.id === userId ? { ...user, verified: approved } : user
// //       ));
// //     } catch (err) {
// //       console.error('Error updating user:', err);
// //       setError('Failed to update user status');
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
// //         <ArrowPathIcon className="w-8 h-8 animate-spin mb-4" />
// //         <p>Loading admin dashboard...</p>
// //         {retryCount > 0 && (
// //           <p className="text-sm text-gray-500 mt-2">
// //             Attempt {retryCount} of 3
// //           </p>
// //         )}
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
// //         <XCircleIcon className="w-8 h-8 text-red-500 mb-4" />
// //         <p className="text-red-500 mb-4">{error}</p>
// //         <button
// //           onClick={() => {
// //             setRetryCount(0);
// //             fetchData();
// //           }}
// //           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
// //         >
// //           Retry
// //         </button>
// //       </div>
// //     );
// //   }

// //   if (!currentUser || !userProfile?.is_admin) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
// //         Redirecting to login...
// //       </div>
// //     );
// //   }

  
// //   return (
// //     <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
// //       {/* Mobile menu button */}
// //       <button
// //         className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
// //         onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// //       >
// //         {mobileMenuOpen ? (
// //           <XMarkIcon className="w-6 h-6" />
// //         ) : (
// //           <Bars3Icon className="w-6 h-6" />
// //         )}
// //       </button>

// //       {/* Sidebar - Mobile */}
// //       {mobileMenuOpen && (
// //         <div className="md:hidden fixed inset-0 z-40">
// //           <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)}></div>
// //           <div className="relative z-50 w-64 h-full bg-white dark:bg-gray-800 shadow-lg p-6 flex flex-col">
// //             <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-8">Admin Dashboard</h2>
// //             <nav className="space-y-4 flex-1">
// //               <SidebarLink 
// //                 icon={<HomeIcon className="w-5 h-5" />} 
// //                 label="Home" 
// //                 active={true}
// //               />
// //               <SidebarLink 
// //                 icon={<UserGroupIcon className="w-5 h-5" />} 
// //                 label="User Management" 
// //                 active={true}
// //               />
// //             </nav>
// //             <button
// //               onClick={async () => {
// //                 await supabase.auth.signOut();
// //                 router.push('/auth/login');
// //               }}
// //               className="flex items-center gap-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
// //             >
// //               <ArrowRightOnRectangleIcon className="w-5 h-5" />
// //               Sign Out
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       {/* Sidebar - Desktop */}
// //       <aside className="hidden md:flex w-64 bg-white dark:bg-gray-800 shadow-lg p-6 flex-col justify-between">
// //         <div>
// //           <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-8">Admin Dashboard</h2>
// //           <nav className="space-y-4">
// //             <SidebarLink 
// //               icon={<HomeIcon className="w-5 h-5" />} 
// //               label="Home" 
// //               active={true}
// //             />
// //             <SidebarLink 
// //               icon={<UserGroupIcon className="w-5 h-5" />} 
// //               label="User Management" 
// //               active={true}
// //             />
// //           </nav>
// //         </div>
// //         <button
// //           onClick={async () => {
// //             await supabase.auth.signOut();
// //             router.push('/auth/login');
// //           }}
// //           className="flex items-center gap-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
// //         >
// //           <ArrowRightOnRectangleIcon className="w-5 h-5" />
// //           Sign Out
// //         </button>
// //       </aside>

// //       {/* Main Content */}
// //       <main className="flex-1 p-6 overflow-y-auto">
// //         <div className="mb-6">
// //           <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
// //             User Management
// //           </h1>
// //           <p className="text-gray-600 dark:text-gray-400 mt-2">
// //             Review and approve user accounts
// //           </p>
// //         </div>

// //         <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
// //           <div className="overflow-x-auto">
// //             <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
// //               <thead className="bg-gray-50 dark:bg-gray-700">
// //                 <tr>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
// //                     User
// //                   </th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
// //                     Email
// //                   </th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
// //                     Joined
// //                   </th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
// //                     Status
// //                   </th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
// //                     Actions
// //                   </th>
// //                 </tr>
// //               </thead>
// //               <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
// //                 {users.map((user) => (
// //                   <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
// //                     <td className="px-6 py-4 whitespace-nowrap">
// //                       <div className="flex items-center">
// //                         <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
// //                           <span className="text-gray-700 dark:text-gray-200">
// //                             {user.name?.charAt(0) || user.email?.charAt(0)}
// //                           </span>
// //                         </div>
// //                         <div className="ml-4">
// //                           <div className="text-sm font-medium text-gray-900 dark:text-white">
// //                             {user.name || 'No name'}
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </td>
// //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
// //                       {user.email}
// //                     </td>
// //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
// //                       {new Date(user.created_at).toLocaleDateString()}
// //                     </td>
// //                     <td className="px-6 py-4 whitespace-nowrap">
// //                       <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
// //                         user.verified 
// //                           ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
// //                           : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
// //                       }`}>
// //                         {user.verified ? 'Approved' : 'Pending'}
// //                       </span>
// //                     </td>
// //                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
// //                       <div className="flex space-x-2">
// //                         <button
// //                           onClick={() => handleApproveUser(user.id, true)}
// //                           disabled={user.verified}
// //                           className={`p-1 rounded-md ${
// //                             user.verified 
// //                               ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
// //                               : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800'
// //                           }`}
// //                           title={user.verified ? 'Already approved' : 'Approve user'}
// //                         >
// //                           <CheckCircleIcon className="w-5 h-5" />
// //                         </button>
// //                         <button
// //                           onClick={() => handleApproveUser(user.id, false)}
// //                           disabled={!user.verified}
// //                           className={`p-1 rounded-md ${
// //                             !user.verified 
// //                               ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
// //                               : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800'
// //                           }`}
// //                           title={!user.verified ? 'Not approved' : 'Reject user'}
// //                         >
// //                           <XCircleIcon className="w-5 h-5" />
// //                         </button>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>

// //         {/* Mobile-friendly list view */}
// //         <div className="md:hidden mt-6 space-y-4">
// //           {users.map((user) => (
// //             <div key={user.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
// //               <div className="flex justify-between items-start">
// //                 <div>
// //                   <h3 className="font-medium text-gray-900 dark:text-white">
// //                     {user.name || 'No name'}
// //                   </h3>
// //                   <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
// //                   <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
// //                     Joined: {new Date(user.created_at).toLocaleDateString()}
// //                   </p>
// //                 </div>
// //                 <span className={`px-2 text-xs leading-5 font-semibold rounded-full ${
// //                   user.verified 
// //                     ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
// //                     : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
// //                 }`}>
// //                   {user.verified ? 'Approved' : 'Pending'}
// //                 </span>
// //               </div>
// //               <div className="flex justify-end space-x-2 mt-3">
// //                 <button
// //                   onClick={() => handleApproveUser(user.id, true)}
// //                   disabled={user.verified}
// //                   className={`p-1 rounded-md ${
// //                     user.verified 
// //                       ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
// //                       : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800'
// //                   }`}
// //                   title={user.verified ? 'Already approved' : 'Approve user'}
// //                 >
// //                   <CheckCircleIcon className="w-5 h-5" />
// //                 </button>
// //                 <button
// //                   onClick={() => handleApproveUser(user.id, false)}
// //                   disabled={!user.verified}
// //                   className={`p-1 rounded-md ${
// //                     !user.verified 
// //                       ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
// //                       : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800'
// //                   }`}
// //                   title={!user.verified ? 'Not approved' : 'Reject user'}
// //                 >
// //                   <XCircleIcon className="w-5 h-5" />
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }

// // function SidebarLink({ icon, label, active }) {
// //   return (
// //     <div
// //       className={`flex items-center gap-3 ${
// //         active 
// //           ? 'text-blue-600 dark:text-blue-400 font-medium'
// //           : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white'
// //       } cursor-pointer transition`}
// //     >
// //       {icon}
// //       <span>{label}</span>
// //     </div>
// //   );
// // }















// 'use client'


// import { supabase } from '../../lib/supabase';

// import { useEffect, useState } from 'react';
// import {
//   HomeIcon,
//   UserGroupIcon,
//   ArrowRightOnRectangleIcon,
//   Bars3Icon,
//   XMarkIcon,
//   CheckCircleIcon,
//   XCircleIcon,
//   ArrowPathIcon,
// } from '@heroicons/react/24/outline';

// // Initialize Supabase client
// // Note: This relies on a global Supabase client provided by the environment.
// // const supabase = typeof window !== 'undefined' ? window.__supabase_client : null;
// const auth = supabase?.auth;

// // Helper component for the sidebar links
// function SidebarLink({ icon, label, active }) {
//   return (
//     <div
//       className={`flex items-center gap-3 ${
//         active 
//           ? 'text-[var(--gold)] font-medium'
//           : 'text-[var(--gray)] hover:text-[var(--gold)] dark:text-[var(--gray)] dark:hover:text-[var(--white)]'
//       } cursor-pointer transition`}
//     >
//       {icon}
//       <span>{label}</span>
//     </div>
//   );
// }

// export default function AdminDashboard() {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userProfile, setUserProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [users, setUsers] = useState([]);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [error, setError] = useState(null);
//   const [retryCount, setRetryCount] = useState(0);

//   // The main function to fetch all necessary data
//   const fetchData = async () => {
//     if (!supabase) {
//       setError('Supabase client is not available.');
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);

//       // 1. Check for an active session
//       const { data: { session }, error: sessionError } = await auth.getSession();
      
//       if (sessionError || !session?.user) {
//         throw sessionError || new Error('No session found');
//       }

//       setCurrentUser(session.user);

//       // 2. Fetch the user's profile and check for admin status
//       const { data: profileData, error: profileError } = await supabase
//         .from('profiles')
//         .select('*')
//         .eq('id', session.user.id)
//         .single();

//       if (profileError || !profileData?.is_admin) {
//         throw profileError || new Error('Not authorized as admin');
//       }

//       setUserProfile(profileData);

//       // 3. Fetch all user profiles for the management table
//       const { data: usersData, error: usersError } = await supabase
//         .from('profiles')
//         .select('id, email, name, created_at, verified')
//         .order('created_at', { ascending: false });

//       if (usersError) {
//         throw usersError;
//       }

//       setUsers(usersData);
//       setLoading(false);
//     } catch (err) {
//       console.error('Error in fetchData:', err);
//       const errorMessage = err.message || 'Failed to load data.';
//       setError(errorMessage);
      
//       // Implement exponential backoff for retries
//       if (retryCount < 3) {
//         setTimeout(() => {
//           setRetryCount(prev => prev + 1);
//         }, 1000 * (retryCount + 1));
//       } else {
//         // After 3 retries, give up and display a message
//         setLoading(false);
//         await auth.signOut();
//         setCurrentUser(null);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchData();

//     // Set up a listener for auth state changes
//     const { data: { subscription } } = auth.onAuthStateChange(
//       async (event, session) => {
//         if (event === 'SIGNED_OUT') {
//           setCurrentUser(null);
//         } else if (session?.user) {
//           fetchData();
//         }
//       }
//     );

//     // Clean up the subscription on component unmount
//     return () => {
//       subscription?.unsubscribe();
//     };
//   }, [retryCount]);

//   // Handler to approve or reject a user
//   const handleApproveUser = async (userId, approved) => {
//     try {
//       const { error } = await supabase
//         .from('profiles')
//         .update({ verified: approved })
//         .eq('id', userId);

//       if (error) throw error;

//       // Optimistically update the local state
//       setUsers(users.map(user => 
//         user.id === userId ? { ...user, verified: approved } : user
//       ));
//     } catch (err) {
//       console.error('Error updating user:', err);
//       setError('Failed to update user status.');
//     }
//   };

//   // Conditional render for the loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] dark:bg-[var(--gray-dark)] text-[var(--gold)] dark:text-[var(--gold)]">
//         <ArrowPathIcon className="w-8 h-8 animate-spin mb-4" />
//         <p>Loading admin dashboard...</p>
//         {retryCount > 0 && (
//           <p className="text-sm text-[var(--gray)] mt-2">
//             Attempt {retryCount} of 3
//           </p>
//         )}
//       </div>
//     );
//   }

//   // Conditional render for the error state
//   if (error) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] dark:bg-[var(--gray-dark)] text-[var(--foreground)] dark:text-[var(--white)]">
//         <XCircleIcon className="w-8 h-8 text-red-500 mb-4" />
//         <p className="text-red-500 mb-4">{error}</p>
//         <button
//           onClick={() => {
//             setRetryCount(0);
//             fetchData();
//           }}
//           className="px-4 py-2 bg-[var(--gold)] text-[var(--white)] rounded-md hover:bg-[var(--gold-light)]"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   // Conditional render for unauthorized users
//   if (!currentUser || !userProfile?.is_admin) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] dark:bg-[var(--gray-dark)] text-[var(--foreground)] dark:text-[var(--white)] text-center">
//         <p className="text-xl font-semibold mb-4">You are not authorized to view this page.</p>
//         <button
//           onClick={async () => {
//             await auth.signOut();
//             window.location.reload();
//           }}
//           className="px-4 py-2 bg-[var(--gold)] text-[var(--white)] rounded-md hover:bg-[var(--gold-light)]"
//         >
//           Sign In
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen bg-[var(--background)] dark:bg-[var(--gray-dark)] text-[var(--foreground)] dark:text-[var(--white)] font-sans">
//       {/* Mobile menu button */}
//       <button
//         className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-md bg-[var(--card-bg)] dark:bg-[var(--gray-dark)] text-[var(--foreground)] dark:text-[var(--white)] transition-colors duration-200"
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
//           <div className="relative z-50 w-64 h-full bg-[var(--card-bg)] dark:bg-[var(--gray-dark)] shadow-lg p-6 flex flex-col transform transition-transform duration-300 ease-in-out">
//             <h2 className="text-xl font-bold text-[var(--foreground)] dark:text-[var(--white)] mb-8">Admin Dashboard</h2>
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
//                 await auth.signOut();
//                 setCurrentUser(null);
//               }}
//               className="flex items-center gap-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 transition-colors duration-200"
//             >
//               <ArrowRightOnRectangleIcon className="w-5 h-5" />
//               Sign Out
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Sidebar - Desktop */}
//       <aside className="hidden md:flex w-64 bg-[var(--card-bg)] dark:bg-[var(--gray-dark)] shadow-lg p-6 flex-col justify-between transition-transform duration-300 ease-in-out">
//         <div>
//           <h2 className="text-xl font-bold text-[var(--foreground)] dark:text-[var(--white)] mb-8">Admin Dashboard</h2>
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
//             await auth.signOut();
//             setCurrentUser(null);
//           }}
//           className="flex items-center gap-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 transition-colors duration-200"
//         >
//           <ArrowRightOnRectangleIcon className="w-5 h-5" />
//           Sign Out
//         </button>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6 overflow-y-auto">
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold text-[var(--foreground)] dark:text-[var(--white)]">
//             User Management
//           </h1>
//           <p className="text-[var(--gray)] mt-2">
//             Review and approve user accounts
//           </p>
//         </div>

//         {/* Desktop Table View */}
//         <div className="bg-[var(--card-bg)] dark:bg-[var(--gray-dark)] rounded-xl shadow-sm border border-[var(--border)] overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-[var(--border)]">
//               <thead className="bg-[var(--card-bg)] dark:bg-[var(--gray-dark)]">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-[var(--gray)] uppercase tracking-wider">
//                     User
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-[var(--gray)] uppercase tracking-wider">
//                     Email
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-[var(--gray)] uppercase tracking-wider">
//                     Joined
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-[var(--gray)] uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-[var(--gray)] uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-[var(--card-bg)] dark:bg-[var(--gray-dark)] divide-y divide-[var(--border)]">
//                 {users.map((user) => (
//                   <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
//                           <span className="text-gray-700 dark:text-gray-200 font-semibold">
//                             {user.name?.charAt(0) || user.email?.charAt(0)}
//                           </span>
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-[var(--foreground)] dark:text-[var(--white)]">
//                             {user.name || 'No name'}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--gray)]">
//                       {user.email}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--gray)]">
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
//                           className={`p-2 rounded-md transition-colors duration-150 ${
//                             user.verified 
//                               ? 'bg-gray-100 dark:bg-gray-700 text-[var(--gray)] cursor-not-allowed'
//                               : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800'
//                           }`}
//                           title={user.verified ? 'Already approved' : 'Approve user'}
//                         >
//                           <CheckCircleIcon className="w-5 h-5" />
//                         </button>
//                         <button
//                           onClick={() => handleApproveUser(user.id, false)}
//                           disabled={!user.verified}
//                           className={`p-2 rounded-md transition-colors duration-150 ${
//                             !user.verified 
//                               ? 'bg-gray-100 dark:bg-gray-700 text-[var(--gray)] cursor-not-allowed'
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
//             <div key={user.id} className="bg-[var(--card-bg)] dark:bg-[var(--gray-dark)] p-4 rounded-lg shadow transition-shadow duration-150 border border-[var(--border)]">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="font-medium text-[var(--foreground)] dark:text-[var(--white)]">
//                     {user.name || 'No name'}
//                   </h3>
//                   <p className="text-sm text-[var(--gray)]">{user.email}</p>
//                   <p className="text-xs text-[var(--gray)] mt-1">
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
//                   className={`p-2 rounded-md transition-colors duration-150 ${
//                     user.verified 
//                       ? 'bg-gray-100 dark:bg-gray-700 text-[var(--gray)] cursor-not-allowed'
//                       : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800'
//                   }`}
//                   title={user.verified ? 'Already approved' : 'Approve user'}
//                 >
//                   <CheckCircleIcon className="w-5 h-5" />
//                 </button>
//                 <button
//                   onClick={() => handleApproveUser(user.id, false)}
//                   disabled={!user.verified}
//                   className={`p-2 rounded-md transition-colors duration-150 ${
//                     !user.verified 
//                       ? 'bg-gray-100 dark:bg-gray-700 text-[var(--gray)] cursor-not-allowed'
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





















'use client'

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
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
  DocumentTextIcon,
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


// // --- Document Manager Component ---
// function DocManagement({ currentUser }) {
//   const [docs, setDocs] = useState([]);
//   const [file, setFile] = useState(null);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [uploading, setUploading] = useState(false);

//   // Fetch Documents from the 'doc_files' table
//   const fetchDocs = async () => {
//     const { data, error } = await supabase
//       .from('doc_files')
//       .select('*')
//       .order('created_at', { ascending: false });
    
//     if (error) console.error('Fetch Docs error:', error);
//     else setDocs(data);
//   };

//   useEffect(() => {
//     if (currentUser) {
//       fetchDocs();
//     }
//   }, [currentUser]);

//   // Handle Upload for PDF, Word, and PowerPoint
//   const handleUpload = async () => {
//     if (!file || !title || !description) return alert('All fields required');
//     setUploading(true);
    
//     // Generate a unique filename to prevent overwrites
//     const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;

//     try {
//       // 1. Upload file to 'doc_files' storage bucket
//       const { error: uploadError } = await supabase
//         .storage
//         .from('doc_files') // Points to your storage bucket
//         .upload(fileName, file);
      
//       if (uploadError) throw uploadError;

//       // 2. Construct the public URL
//       const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/doc_files/${fileName}`;

//       // 3. Insert metadata into 'doc_files' database table
//       const { error: dbError } = await supabase
//         .from('doc_files')
//         .insert({ 
//           title, 
//           description, 
//           user_id: currentUser.id, 
//           file_url: fileUrl 
//         });
        
//       if (dbError) throw dbError;

//       // Success: Reset form and refresh list
//       setTitle('');
//       setDescription('');
//       setFile(null);
//       fetchDocs();
//       alert('Document uploaded successfully!');
//     } catch (err) {
//       console.error('Upload error:', err);
//       alert(`Upload failed: ${err.message}`);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4 text-white">Document Management</h1>

//       <div className="mb-4 flex flex-col gap-2 p-8 
//       bg-[var(--card-bg)] rounded-xl shadow-sm border border-[var(--border)]
//       ">
//         <input
//           type="text"
//           placeholder="Document Title"
//           value={title}
//           onChange={e => setTitle(e.target.value)}
//           className="p-2 border rounded bg-transparent text-white"
//         />
//         <input
//           type="text"
//           placeholder="Description (e.g. Q4 Strategy)"
//           value={description}
//           onChange={e => setDescription(e.target.value)}
//           className="p-2 border rounded mt-3 bg-transparent text-white"
//         />
//         <input
//           type="file"
//           // Restricted to PDF and common Office docs
//           accept=".pdf,.doc,.docx,.ppt,.pptx"
//           onChange={e => setFile(e.target.files[0])}
//           className="p-2 border rounded mt-3 text-gray-400"
//         />
//         <button
//           onClick={handleUpload}
//           disabled={uploading}
//           className="px-4 py-2 bg-[var(--gold)] rounded text-black mt-4 font-bold disabled:opacity-50"
//         >
//           {uploading ? 'Uploading...' : 'Upload Document'}
//         </button>
//       </div>

//       <div className="space-y-4">
//         {docs.length === 0 && <p className="text-gray-500">No documents found.</p>}
//         {docs.map(doc => (
//           <div key={doc.id}
//             className="
//             p-4 flex flex-col gap-1 bg-[var(--card-bg)]
//             rounded-xl shadow-sm border border-[var(--border)]
//             "
//           >
//             <div className="flex justify-between items-center">
//               <div>
//                 <span className="font-medium text-white block">{doc.title}</span>
//                 <p className="text-sm text-[var(--gray)]">{doc.description}</p>
//               </div>
//               <a 
//                 href={doc.file_url} 
//                 target="_blank" 
//                 rel="noreferrer"
//                 className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-500 transition"
//               >
//                 View Document
//               </a>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// --- Document Manager Component ---
function DocManagement({ currentUser }) {
  const [docs, setDocs] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  // Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState({ id: '', title: '', description: '' });

  const fetchDocs = async () => {
    const { data, error } = await supabase
      .from('doc_files')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) console.error('Fetch Docs error:', error);
    else setDocs(data);
  };

  useEffect(() => {
    if (currentUser) fetchDocs();
  }, [currentUser]);

  const handleUpload = async () => {
    if (!file || !title || !description) return alert('All fields required');
    setUploading(true);
    const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('doc_files')
        .upload(fileName, file);
      if (uploadError) throw uploadError;

      const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/doc_files/${fileName}`;

      const { error: dbError } = await supabase
        .from('doc_files')
        .insert({ title, description, user_id: currentUser.id, file_url: fileUrl });
      if (dbError) throw dbError;

      setTitle(''); setDescription(''); setFile(null);
      fetchDocs();
    } catch (err) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (doc) => {
    if (!confirm('Are you sure you want to delete this document?')) return;
    try {
      const path = doc.file_url.split('/public/doc_files/')[1];
      await supabase.storage.from('doc_files').remove([path]);
      const { error } = await supabase.from('doc_files').delete().eq('id', doc.id);
      if (error) throw error;
      fetchDocs();
    } catch (err) {
      alert('Delete failed');
    }
  };

  // Open Modal and populate data
  const openEditModal = (doc) => {
    setEditingDoc({ id: doc.id, title: doc.title, description: doc.description });
    setIsEditModalOpen(true);
  };

  // Save changes from Modal
  const handleUpdate = async () => {
    const { error } = await supabase
      .from('doc_files')
      .update({ title: editingDoc.title, description: editingDoc.description })
      .eq('id', editingDoc.id);

    if (error) {
      alert('Update failed');
    } else {
      setIsEditModalOpen(false);
      fetchDocs();
    }
  };

  return (
    <div className="relative">
      <h1 className="text-2xl font-bold mb-4 text-white">Document Management</h1>

      {/* Upload Form */}
      <div className="mb-4 flex flex-col gap-2 p-8 bg-[var(--card-bg)] rounded-xl border border-[var(--border)]">
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="p-2 border rounded bg-transparent text-white border-[var(--border)]" />
        <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="p-2 border rounded mt-3 bg-transparent text-white border-[var(--border)]" />
        <input type="file" accept=".pdf,.doc,.docx,.ppt,.pptx" onChange={e => setFile(e.target.files[0])} className="p-2 border rounded mt-3 text-gray-400" />
        <button onClick={handleUpload} disabled={uploading} className="px-4 py-2 bg-[var(--gold)] rounded text-black mt-4 font-bold">
          {uploading ? 'Uploading...' : 'Upload Document'}
        </button>
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        {docs.map(doc => (
          <div key={doc.id} className="p-6 bg-[var(--card-bg)] rounded-xl border border-[var(--border)] flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <span className="font-bold text-white text-lg block">{doc.title}</span>
                <p className="text-sm text-[var(--gray)] mt-1">{doc.description}</p>
              </div>
              <div className="flex gap-2">
                <a href={doc.file_url} target="_blank" rel="noreferrer" className="px-4 py-2 bg-[var(--gold)] rounded text-black text-sm font-bold">View</a>
                <button onClick={() => openEditModal(doc)} className="px-4 py-2 border border-[var(--gold)] text-[var(--gold)] rounded text-sm">Edit</button>
                <button onClick={() => handleDelete(doc)} className="px-4 py-2 bg-red-600 text-white rounded text-sm">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- Edit Dialog Box Modal --- */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[var(--card-bg)] border border-[var(--border)] p-8 rounded-2xl w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-6">Edit Document Details</h2>
            
            <label className="text-xs text-[var(--gray)] uppercase font-bold">Title</label>
            <input 
              type="text" 
              value={editingDoc.title} 
              onChange={e => setEditingDoc({...editingDoc, title: e.target.value})}
              className="w-full p-2 mt-1 mb-4 border rounded bg-transparent text-white border-[var(--border)]"
            />

            <label className="text-xs text-[var(--gray)] uppercase font-bold">Description</label>
            <textarea 
              rows="3"
              value={editingDoc.description} 
              onChange={e => setEditingDoc({...editingDoc, description: e.target.value})}
              className="w-full p-2 mt-1 mb-6 border rounded bg-transparent text-white border-[var(--border)]"
            />

            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-white hover:underline"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdate}
                className="px-6 py-2 bg-[var(--gold)] text-black rounded-lg font-bold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// --- Admin Dashboard Main Component ---
export default function AdminDashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('User Management');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);


  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editCredits, setEditCredits] = useState(0);
  const [editUserType, setEditUserType] = useState("user");


  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const openDetailsModal = (user) => {
    setSelectedUser(user);
    setDetailsModalOpen(true);
  };


  const openEditModal = (user) => {
    setEditingUser(user);
    setEditCredits(user.credits || 0);
    setEditUserType(user.user_type || "user");
    setEditModalOpen(true);
  };

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
      if (profileError || !profileData?.is_admin) throw profileError || new Error('Not authorized');

      setUserProfile(profileData);

      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        // .select('id, email, name, created_at, verified')
        .select('*')
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




  
  const handleApproveUser = async (userId, approved) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ verified: approved })
        .eq('id', userId);
      if (error) throw error;
      setUsers(users.map(u => u.id === userId ? { ...u, verified: approved } : u));
    } catch (err) {
      console.error('Update error:', err);
      setError('Failed to update user.');
    }
  };

  // const handleApproveUser = async (userId, approved) => {
  //   try {
  //     const updates = approved
  //       ? {
  //           verified: true,
  //           subscription_start: new Date().toISOString(),
  //           subscription_end: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 6).toISOString(), 
  //           membership_status: 'active',
  //         }
  //       : {
  //           verified: false,
  //           membership_status: 'expired'
  //         };

  //     const { data, error } = await supabase
  //       .from('profiles')
  //       .update(updates)
  //       .eq('id', userId)
  //       .select()
  //       .single();

        
  //       if (error) throw error;
        
  //     return data;

  //   } catch (err) {
  //     console.error("Error approving user:", err);
  //     return null;
  //   }
  // };


  const handleRenewSubscription = async (userId) => {
    try {
      const sixMonthsLater = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 6);

      const { data, error } = await supabase
        .from("profiles")
        .update({
          subscription_start: new Date().toISOString(),
          subscription_end: sixMonthsLater.toISOString(),
          membership_status: "active",
          verified: true
        })
        .eq("id", userId)
        .select()
        .single();

      if (error) throw error;

      alert("Subscription renewed for 6 months!");
      setUsers(users.map(u => u.id === userId ? data : u));

    } catch (err) {
      console.error("Renew error:", err);
      alert("Failed to renew subscription.");
    }
  };


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

  if (!currentUser || !userProfile?.is_admin) return (
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
          <h2 className="text-xl font-bold mb-8">Admin Dashboard</h2>
          <nav className="space-y-4">
            <SidebarLink icon={<HomeIcon className="w-5 h-5" />} label="Home" active={activeSection==='Home'} onClick={() => setActiveSection('Home')} />
            <SidebarLink icon={<UserGroupIcon className="w-5 h-5" />} label="User Management" active={activeSection==='User Management'} onClick={() => setActiveSection('User Management')} />
            <SidebarLink icon={<MicrophoneIcon className="w-5 h-5" />} label="MP3 Management" active={activeSection==='MP3'} onClick={() => setActiveSection('MP3')} />
            <SidebarLink icon={<VideoCameraIcon className="w-5 h-5" />} label="MP4 Management" active={activeSection==='MP4'} onClick={() => setActiveSection('MP4')} />
            <SidebarLink icon={<DocumentTextIcon className="w-5 h-5" />} label="Document Management" active={activeSection==='DOCS'} onClick={() => setActiveSection('DOCS')} />
          </nav>
        </div>
        <button onClick={async()=>{await supabase.auth.signOut(); setCurrentUser(null);}} className="flex items-center gap-2 text-red-600">
          <ArrowRightOnRectangleIcon className="w-5 h-5"/> Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {activeSection === 'User Management' && (
          // <UserManagement users={users} handleApproveUser={handleApproveUser} openEditModal={openEditModal} />
          <UserManagement 
            users={users} 
            handleApproveUser={handleApproveUser} 
            openEditModal={openEditModal}
            openDetailsModal={openDetailsModal}
          />
        )}
        {activeSection === 'MP3' && (
          <MP3Manager currentUser={currentUser} />
        )}
        {activeSection === 'MP4' && (
          <MP4Manager currentUser={currentUser} />
        )}
        {activeSection === 'DOCS' && (
          <DocManagement currentUser={currentUser} />
        )}
        {activeSection === 'Home' && (
          <div>
            <h1 className="text-3xl font-bold">Welcome, Admin</h1>
          </div>
        )}
      </main>


      {detailsModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50" style={{'background': '#121a21b6'}}>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-[500px] shadow-xl">

            <h2 className="text-xl font-bold mb-4">User Details</h2>

            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Business Name:</strong> {selectedUser.business_name || '—'}</p>
              <p><strong>Business Type:</strong> {selectedUser.business_type || '—'}</p>
              <p><strong>Business Idea:</strong> {selectedUser.business_idea || '—'}</p>
              <p><strong>Application Type:</strong> {selectedUser.application_type || '—'}</p>
              <p><strong>User Type:</strong> {selectedUser.user_type}</p>
              <p><strong>Credits:</strong> {selectedUser.credits}</p>
              <p><strong>Status:</strong> {selectedUser.verified ? 'Approved' : 'Pending'}</p>
              <p><strong>Subscription Start:</strong> {new Date(selectedUser.subscription_start).toLocaleDateString()}</p>
              <p><strong>Subscription End:</strong> {new Date(selectedUser.subscription_end).toLocaleDateString()}</p>
              <p><strong>Membership:</strong> {selectedUser.membership_status}</p>
            </div>

            <div className="flex justify-end mt-6">
              <button 
                onClick={() => setDetailsModalOpen(false)} 
                className="px-4 py-2 bg-gray-400 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}


      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-96 shadow-xl">

            <h2 className="text-xl font-bold mb-4">Edit User</h2>

            <p className="text-sm mb-3 text-gray-500">Name: {editingUser.name}</p>
            <p className="text-sm mb-4 text-gray-500">Email: {editingUser.email}</p>

            {/* Credits input */}
            <label className="block text-sm mb-1">Credits</label>
            <input
              type="number"
              value={editCredits}
              onChange={(e) => setEditCredits(Number(e.target.value))}
              className="w-full p-2 rounded border mb-4"
            />

            {/* User Type Select */}
            <label className="block text-sm mb-1">User Type</label>
            <select
              value={editUserType}
              onChange={(e) => setEditUserType(e.target.value)}
              className="w-full p-2 rounded border mb-5 dark:bg-gray-700 dark:text-white"
            >
              <option value="user">User</option>
              <option value="student">Student</option>
              <option value="founder">Founder</option>
            </select>

            {/* Renew Subscription */}
            <button
              onClick={() => handleRenewSubscription(editingUser.id)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg mb-4 hover:bg-blue-700"
            >
              Renew Subscription (+6 months)
            </button>

            <div className="flex justify-between mt-4">
              {/* Save */}
              <button
                onClick={async () => {
                  const { error } = await supabase
                    .from("profiles")
                    .update({
                      credits: editCredits,
                      user_type: editUserType
                    })
                    .eq("id", editingUser.id);

                  if (error) alert("Failed to update user");
                  else alert("User updated!");

                  setEditModalOpen(false);
                  fetchData(); // reload table
                }}
                className="w-50 me-1 px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Save
              </button>

              {/* Close */}
              <button
                onClick={() => setEditModalOpen(false)}
                className="w-50 ms-1 px-4 py-2 bg-gray-400 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// --- User Management Component ---
function UserManagement({ users, handleApproveUser, openEditModal, openDetailsModal }) {

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 ">User Management</h1>
      <div className="bg-[var(--card-bg)] rounded-xl shadow-sm border border-[var(--border)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[var(--border)]">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--gray)] uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--gray)] uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--gray)] uppercase">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--gray)] uppercase">Subscription Start - End</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--gray)] uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--gray)] uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-[var(--card-bg)] divide-y divide-[var(--border)]">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                  {/* <td className="px-6 py-4">{user.name || 'No name'}</td> */}
                  <td 
                    className="px-6 py-4 text-[var(--gold)] cursor-pointer fw-bold hover:underline"
                    onClick={() => openDetailsModal(user)}
                  >
                    {user.name || 'No name'}
                  </td>

                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{new Date(user.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span style={{'color': '#10ff70'}}>{new Date(user.subscription_start).toLocaleDateString()}</span> - <span style={{'color': '#ff1070'}}>{new Date(user.subscription_end).toLocaleDateString()}</span>
                  </td>
                  <td className="px-6 py-4">{user.verified ? 'Approved' : 'Pending'}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => openEditModal(user)}
                      className="p-2 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800"
                    >
                      ✏️ Edit
                    </button>
                    {/* <button
                      onClick={() => handleRenewSubscription(user.id)}
                      className="p-2 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800"
                      title="Renew 6 months"
                    >
                      🔄 Renew
                    </button> */}
                    
                    <button onClick={()=>handleApproveUser(user.id,true)} disabled={user.verified} 
                    className={`p-2 rounded-md transition-colors duration-150 ${
                            user.verified 
                              ? 'bg-gray-100 dark:bg-gray-700 text-[var(--gray)] cursor-not-allowed'
                              : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800'
                          }`}
                          title={user.verified ? 'Already approved' : 'Approve user'}
                          >
                      ✔
                    </button>


                    <button onClick={()=>handleApproveUser(user.id,false)} disabled={!user.verified} 
                    
                    className={`p-2 rounded-md transition-colors duration-150 ${
                    !user.verified 
                        ? 'bg-gray-100 dark:bg-gray-700 text-[var(--gray)] cursor-not-allowed'
                        : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800'
                    }`}
                    >✖</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
