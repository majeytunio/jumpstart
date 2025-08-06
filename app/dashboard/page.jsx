// 'use client';

// import { useEffect, useState } from 'react';
// import { supabase } from '../../lib/supabase';
// import { useRouter } from 'next/navigation';
// import {
//   HomeIcon,
//   UserCircleIcon,
//   BuildingOffice2Icon,
//   ArrowRightOnRectangleIcon,
//   SparklesIcon,
// } from '@heroicons/react/24/outline';

// export default function Dashboard() {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userProfile, setUserProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [view, setView] = useState('home');
//   const [isApproved, setApproved] = useState(false);
//   const router = useRouter();

//   const [accountForm, setAccountForm] = useState({ name: '', password: '' });
//   const [businessForm, setBusinessForm] = useState({
//     business_name: '',
//     business_idea: '',
//     business_type: '',
//     application_type: '',
//   });

//   const [saving, setSaving] = useState(false);
//   const [message, setMessage] = useState('');

//   const [ideaText, setIdeaText] = useState('');
//   const [generating, setGenerating] = useState(false);


//   const handleGenerateIdea = async () => {
//     setGenerating(true);

//     try {
//       const res = await fetch('/api/generate', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ prompt: ideaText }),
//       });

//       const data = await res.json();

//       if (data.result) {
//         // Navigate to results page with result as query param OR save to state

//         console.log('Result: ', data.result);

//         // router.push(`/dashboard/ai-result?result=${encodeURIComponent(data.result)}`);
//       } else {
//         alert('Failed to generate idea');
//       }
//     } catch (error) {
//       console.error('Error generating idea:', error);
//     } finally {
//       setGenerating(false);
//     }
//   };

//   useEffect(() => {
//     const fetchProfile = async (userId) => {
//       const { data, error } = await supabase
//         .from('profiles')
//         .select('*')
//         .eq('id', userId)
//         .single();

//       if (error) {
//         console.error('Error fetching profile:', error.message);
//         await supabase.auth.signOut();
//         router.push('/auth/login');
//         setApproved(false);
//       } else {
//         setUserProfile(data);
//         setApproved(Boolean(data?.verified));
//         setAccountForm({ name: data.name || '', password: '' });
//         setBusinessForm({
//           business_name: data.business_name || '',
//           business_idea: data.business_idea || '',
//           business_type: data.business_type || '',
//           application_type: data.application_type || '',
//         });
//       }

//       setLoading(false);
//     };

//     const initAuth = async () => {
//       const { data: { session } } = await supabase.auth.getSession();

//       if (session?.user) {
//         setCurrentUser(session.user);
//         await fetchProfile(session.user.id);
//       } else {
//         router.push('/auth/login');
//       }
//     };

//     initAuth();

//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       async (_, session) => {
//         if (session?.user) {
//           setCurrentUser(session.user);
//           await fetchProfile(session.user.id);
//         } else {
//           router.push('/auth/login');
//         }
//       }
//     );

//     return () => {
//       subscription.unsubscribe();
//     };
//   }, [router]);

//   const handleAccountUpdate = async () => {
//     setSaving(true);
//     setMessage('');
//     const updates = { name: accountForm.name };

//     const { error } = await supabase
//       .from('profiles')
//       .update(updates)
//       .eq('id', currentUser.id);

//     if (accountForm.password) {
//       const { error: passError } = await supabase.auth.updateUser({
//         password: accountForm.password,
//       });
//       if (passError) return setMessage('Password update failed');
//     }

//     if (error) {
//       setMessage('Failed to update account.');
//     } else {
//       setMessage('Account updated successfully.');
//     }
//     setSaving(false);
//   };

//   const handleBusinessUpdate = async () => {
//     setSaving(true);
//     setMessage('');

//     const { error } = await supabase
//       .from('profiles')
//       .update(businessForm)
//       .eq('id', currentUser.id);

//     if (error) {
//       setMessage('Failed to update business info.');
//     } else {
//       setMessage('Business info updated.');
//     }

//     setSaving(false);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
//         Loading dashboard...
//       </div>
//     );
//   }

//   if (!currentUser) return null;

//   return (
//     <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg p-6 hidden md:flex flex-col justify-between">
//         <div>
//           <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-8">My Dashboard</h2>
//           <nav className="space-y-4">
//             <SidebarLink icon={<HomeIcon className="w-5 h-5" />} label="Home" onClick={() => setView('home')} />
//             <SidebarLink icon={<UserCircleIcon className="w-5 h-5" />} label="Account" onClick={() => setView('account')} />
//             <SidebarLink icon={<BuildingOffice2Icon className="w-5 h-5" />} label="Business Info" onClick={() => setView('business')} />
//             <SidebarLink icon={<SparklesIcon className="w-5 h-5" />} label="AI Idea" onClick={() => setView('generate')} />
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
//             Welcome, {userProfile?.name || currentUser.email}
//           </h1>
//         </div>

//         {!isApproved ? (
//           <div className="bg-yellow-100 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100 p-6 rounded-lg shadow-md max-w-xl mx-auto mt-10">
//             <h2 className="text-xl font-bold mb-2">Account Pending Approval</h2>
//             <p>Your account has not yet been approved. Please contact an administrator.</p>
//           </div>
//         ) : (
//           <>
//             {view === 'home' && (
//               <div className="text-gray-700 dark:text-gray-300">
//                 <p className="text-lg">Select a section from the sidebar to begin editing your information.</p>
//               </div>
//             )}

//             {view === 'account' && (
//               <div className="max-w-xl bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
//                 <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Edit Account</h2>
//                 <div className="space-y-4">
//                   <Input label="Name" value={accountForm.name} onChange={(e) => setAccountForm({ ...accountForm, name: e.target.value })} />
//                   <Input label="New Password" type="password" value={accountForm.password} onChange={(e) => setAccountForm({ ...accountForm, password: e.target.value })} />
//                   <button
//                     onClick={handleAccountUpdate}
//                     disabled={saving}
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
//                   >
//                     {saving ? 'Saving...' : 'Update Account'}
//                   </button>
//                 </div>
//                 {message && <p className="mt-4 text-green-600">{message}</p>}
//               </div>
//             )}

//             {view === 'business' && (
//               <div className="max-w-xl bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
//                 <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Edit Business Info</h2>
//                 <div className="space-y-4">
//                   <Input label="Business Name" value={businessForm.business_name} onChange={(e) => setBusinessForm({ ...businessForm, business_name: e.target.value })} />
//                   <Input label="Business Idea" value={businessForm.business_idea} onChange={(e) => setBusinessForm({ ...businessForm, business_idea: e.target.value })} />
//                   <Input label="Business Type" value={businessForm.business_type} onChange={(e) => setBusinessForm({ ...businessForm, business_type: e.target.value })} />
//                   <Input label="Application Type" value={businessForm.application_type} onChange={(e) => setBusinessForm({ ...businessForm, application_type: e.target.value })} />
//                   <button
//                     onClick={handleBusinessUpdate}
//                     disabled={saving}
//                     className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
//                   >
//                     {saving ? 'Saving...' : 'Update Business Info'}
//                   </button>
//                 </div>
//                 {message && <p className="mt-4 text-green-600">{message}</p>}
//               </div>
//             )}
            
//             {view === 'generate' && (
//               <div className="max-w-xxl bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
//                 <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
//                   <SparklesIcon className="w-6 h-6 mr-2" />
//                   Your Idea with Our Magic
//                 </h2>

//                 <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Describe Your Idea</label>
//                 <textarea
//                   className="w-full h-40 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={ideaText}
//                   onChange={(e) => setIdeaText(e.target.value)}
//                   placeholder="Type your startup or project idea here..."
//                 />

//                 <button
//                   onClick={handleGenerateIdea}
//                   disabled={generating || !ideaText.trim()}
//                   className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
//                 >
//                   {generating ? 'Generating...' : 'Generate with AI'}
//                 </button>
//               </div>
//             )}

//           </>
//         )}
//       </main>
//     </div>
//   );
// }

// function SidebarLink({ icon, label, onClick }) {
//   return (
//     <div
//       className="flex items-center gap-3 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white cursor-pointer transition"
//       onClick={onClick}
//     >
//       {icon}
//       <span>{label}</span>
//     </div>
//   );
// }

// function Input({ label, value, onChange, type = 'text' }) {
//   return (
//     <div>
//       <label className="block mb-1 text-gray-700 dark:text-gray-300">{label}</label>
//       <input
//         type={type}
//         value={value}
//         onChange={onChange}
//         className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//       />
//     </div>
//   );
// }















'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';
import {
  HomeIcon,
  UserCircleIcon,
  BuildingOffice2Icon,
  ArrowRightOnRectangleIcon,
  SparklesIcon,
  ClipboardDocumentIcon,
  UserGroupIcon,
  CodeBracketIcon,
  ExclamationTriangleIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

import { toast } from 'react-hot-toast';

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('home');
  const [isApproved, setApproved] = useState(false);
  const router = useRouter();

  const [accountForm, setAccountForm] = useState({ name: '', password: '' });
  const [businessForm, setBusinessForm] = useState({
    business_name: '',
    business_idea: '',
    business_type: '',
    application_type: '',
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const [ideaText, setIdeaText] = useState('');
  const [generating, setGenerating] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [showForm, setShowForm] = useState(true);

  const handleGenerateIdea = async () => {
    setGenerating(true);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: ideaText }),
      });

      const data = await res.json();

      if (data.result) {
        try {
          const parsedResult = JSON.parse(data.result);
          setAiResult(parsedResult);
          setShowForm(false);
        } catch (e) {
          console.error('Error parsing AI result:', e);
          setAiResult({ summary: data.result });
          setShowForm(false);
        }
      } else {
        alert('Failed to generate idea');
      }
    } catch (error) {
      console.error('Error generating idea:', error);
    } finally {
      setGenerating(false);
    }
  };

  const resetForm = () => {
    setShowForm(true);
    setIdeaText('');
    setAiResult(null);
  };

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
        router.push('/auth/login');
        setApproved(false);
      } else {
        setUserProfile(data);
        setApproved(Boolean(data?.verified));
        setAccountForm({ name: data.name || '', password: '' });
        setBusinessForm({
          business_name: data.business_name || '',
          business_idea: data.business_idea || '',
          business_type: data.business_type || '',
          application_type: data.application_type || '',
        });
      }

      setLoading(false);
    };

    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        setCurrentUser(session.user);
        await fetchProfile(session.user.id);
      } else {
        router.push('/auth/login');
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        if (session?.user) {
          setCurrentUser(session.user);
          await fetchProfile(session.user.id);
        } else {
          router.push('/auth/login');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const handleAccountUpdate = async () => {
    setSaving(true);
    setMessage('');
    const updates = { name: accountForm.name };

    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', currentUser.id);

    if (accountForm.password) {
      const { error: passError } = await supabase.auth.updateUser({
        password: accountForm.password,
      });
      if (passError) return setMessage('Password update failed');
    }

    if (error) {
      setMessage('Failed to update account.');
    } else {
      setMessage('Account updated successfully.');
    }
    setSaving(false);
  };

  const handleBusinessUpdate = async () => {
    setSaving(true);
    setMessage('');

    const { error } = await supabase
      .from('profiles')
      .update(businessForm)
      .eq('id', currentUser.id);

    if (error) {
      setMessage('Failed to update business info.');
    } else {
      setMessage('Business info updated.');
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
        Loading dashboard...
      </div>
    );
  }

  if (!currentUser) return null;

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg p-6 hidden md:flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-8">My Dashboard</h2>
          <nav className="space-y-4">
            <SidebarLink icon={<HomeIcon className="w-5 h-5" />} label="Home" onClick={() => setView('home')} isApproved={isApproved} />
            <SidebarLink icon={<UserCircleIcon className="w-5 h-5" />} label="Account" onClick={() => setView('account')} isApproved={isApproved}  />
            <SidebarLink icon={<BuildingOffice2Icon className="w-5 h-5" />} label="Business Info" onClick={() => setView('business')} isApproved={isApproved}  />
            <SidebarLink icon={<SparklesIcon className="w-5 h-5" />} label="AI Idea" onClick={() => {
              setView('generate');
              resetForm();
            }} isApproved={isApproved}  />
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
            Welcome, {userProfile?.name || currentUser.email}
          </h1>
        </div>

        {!isApproved ? (
          <div className="bg-yellow-100 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100 p-6 rounded-lg shadow-md max-w-xl mx-auto mt-10">
            <h2 className="text-xl font-bold mb-2">Account Pending Approval</h2>
            <p>Your account has not yet been approved. Please contact an administrator.</p>
          </div>
        ) : (
          <>
            {view === 'home' && (
              <div className="text-gray-700 dark:text-gray-300">
                <p className="text-lg">Select a section from the sidebar to begin editing your information.</p>
              </div>
            )}

            {view === 'account' && (
              <div className="max-w-xl bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Edit Account</h2>
                <div className="space-y-4">
                  <Input label="Name" value={accountForm.name} onChange={(e) => setAccountForm({ ...accountForm, name: e.target.value })} />
                  <Input label="New Password" type="password" value={accountForm.password} onChange={(e) => setAccountForm({ ...accountForm, password: e.target.value })} />
                  <button
                    onClick={handleAccountUpdate}
                    disabled={saving}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                  >
                    {saving ? 'Saving...' : 'Update Account'}
                  </button>
                </div>
                {message && <p className="mt-4 text-green-600">{message}</p>}
              </div>
            )}

            {view === 'business' && (
              <div className="max-w-xl bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Edit Business Info</h2>
                <div className="space-y-4">
                  <Input label="Business Name" value={businessForm.business_name} onChange={(e) => setBusinessForm({ ...businessForm, business_name: e.target.value })} />
                  <Input label="Business Idea" value={businessForm.business_idea} onChange={(e) => setBusinessForm({ ...businessForm, business_idea: e.target.value })} />
                  <Input label="Business Type" value={businessForm.business_type} onChange={(e) => setBusinessForm({ ...businessForm, business_type: e.target.value })} />
                  <Input label="Application Type" value={businessForm.application_type} onChange={(e) => setBusinessForm({ ...businessForm, application_type: e.target.value })} />
                  <button
                    onClick={handleBusinessUpdate}
                    disabled={saving}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                  >
                    {saving ? 'Saving...' : 'Update Business Info'}
                  </button>
                </div>
                {message && <p className="mt-4 text-green-600">{message}</p>}
              </div>
            )}
            
            {view === 'generate' && (
              <div className="max-w-xxl mx-auto">
                {showForm ? (
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
                      <SparklesIcon className="w-6 h-6 mr-2" />
                      Your Idea with Our Magic
                    </h2>

                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Describe Your Idea</label>
                    <textarea
                      className="w-full h-40 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={ideaText}
                      onChange={(e) => setIdeaText(e.target.value)}
                      placeholder="Type your startup or project idea here..."
                    />

                    <button
                      onClick={handleGenerateIdea}
                      disabled={generating || !ideaText.trim()}
                      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
                    >
                      {generating ? 'Generating...' : 'Generate with AI'}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                        <SparklesIcon className="w-6 h-6 mr-2" />
                        AI-Powered Business Plan
                      </h2>
                      <button
                        onClick={resetForm}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center"
                      >
                        <span>Start New Idea</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Summary Card */}
                      <InfoCard
                        icon={<ClipboardDocumentIcon className="w-5 h-5" />}
                        title="Summary"
                        content={aiResult?.summary || "No summary available"}
                      />

                      {/* Target Audience Card */}
                      <InfoCard
                        icon={<UserGroupIcon className="w-5 h-5" />}
                        title="Target Audience"
                        content={aiResult?.target_audience || "No target audience specified"}
                      />

                      {/* Core Features Card */}
                      <InfoCard
                        icon={<SparklesIcon className="w-5 h-5" />}
                        title="Core Features"
                        content={
                          Array.isArray(aiResult?.core_features) 
                            ? aiResult.core_features.map((feature, index) => (
                                <div key={index} className="flex items-start mb-2">
                                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                                  <span>{feature}</span>
                                </div>
                              ))
                            : "No features specified"
                        }
                      />

                      {/* Technical Stack Card */}
                      <InfoCard
                        icon={<CodeBracketIcon className="w-5 h-5" />}
                        title="Technical Stack"
                        content={
                          aiResult?.technical_stack ? (
                            <div className="space-y-2">
                              {Object.entries(aiResult.technical_stack).map(([key, value]) => (
                                <div key={key} className="flex">
                                  <span className="font-medium text-gray-700 dark:text-gray-300 w-24">{key}:</span>
                                  <span className="text-gray-600 dark:text-gray-400 flex-1">{value}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            "No technical stack specified"
                          )
                        }
                      />

                      {/* Potential Challenges Card */}
                      <InfoCard
                        icon={<ExclamationTriangleIcon className="w-5 h-5" />}
                        title="Potential Challenges"
                        content={
                          Array.isArray(aiResult?.potential_challenges) 
                            ? aiResult.potential_challenges.map((challenge, index) => (
                                <div key={index} className="flex items-start mb-2">
                                  <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-2"></span>
                                  <span>{challenge}</span>
                                </div>
                              ))
                            : "No challenges identified"
                        }
                      />

                      {/* Monetization Card */}
                      <InfoCard
                        icon={<CurrencyDollarIcon className="w-5 h-5" />}
                        title="Monetization Strategy"
                        content={aiResult?.monetization || "No monetization strategy specified"}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

function SidebarLink({ icon, label, onClick, isApproved }) {
  // return (
  //   <div
  //     className="flex items-center gap-3 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white cursor-pointer transition"
  //     onClick={onClick}
  //   >
  //     {icon}
  //     <span>{label}</span>
  //   </div>
  // );

  // if (!isApproved) {
  //   return (
  //     <div
  //       className="flex items-center gap-3 text-gray-400 cursor-not-allowed opacity-60 transition"
  //       title="Requires approval"
  //     >
  //       {icon}
  //       <span>{label} (Restricted)</span>
  //     </div>
  //   );
  // }

  // return (
  //   <div
  //     className="flex items-center gap-3 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white cursor-pointer transition"
  //     onClick={onClick}
  //   >
  //     {icon}
  //     <span>{label}</span>
  //   </div>
  // );




  const handleClick = () => {
    if (!isApproved) {
      toast.error("Access restricted. Your account is pending approval.");
      return;
    }
    onClick?.();
  };

  return (
    <div
      className={`flex items-center gap-3 transition ${
        isApproved
          ? 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white cursor-pointer'
          : 'text-gray-400 cursor-not-allowed opacity-60'
      }`}
      onClick={handleClick}
    >
      {icon}
      <span>{label}</span>
    </div>
  );

}

function Input({ label, value, onChange, type = 'text' }) {
  return (
    <div>
      <label className="block mb-1 text-gray-700 dark:text-gray-300">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      />
    </div>
  );
}

function InfoCard({ icon, title, content }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 mr-3">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
      </div>
      <div className="text-gray-600 dark:text-gray-300">
        {content}
      </div>
    </div>
  );
}