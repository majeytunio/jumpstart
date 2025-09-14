// // // // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // // // import { supabase } from '../../../lib/supabase';
// // // // // // // import ReactMarkdown from 'react-markdown';
// // // // // // // import { v4 as uuidv4 } from 'uuid';
// // // // // // // import { FiSend } from "react-icons/fi";

// // // // // // // const ChatWindow = ({ onClose }) => {
// // // // // // //   const [messages, setMessages] = useState([
// // // // // // //     {
// // // // // // //       id: 'welcome-msg',
// // // // // // //       text: "Hello! I'm your AI assistant. How can I help improve your website today?",
// // // // // // //       sender: 'bot',
// // // // // // //       isBot: true,
// // // // // // //       timestamp: new Date().toISOString(),
// // // // // // //     }
// // // // // // //   ]);

// // // // // // //   const [input, setInput] = useState('');
// // // // // // //   const [loading, setLoading] = useState(false);
// // // // // // //   const [userId, setUserId] = useState(null);
// // // // // // //   const [userPlan, setUserPlan] = useState(null);
// // // // // // //   const [userCompany, setUserCompany] = useState(null);
// // // // // // //   const [userWebsite, setUserWebsite] = useState(null);
// // // // // // //   const messagesEndRef = useRef(null);



// // // // // // //   useEffect(() => {
// // // // // // //     const setupUser = () => {
// // // // // // //       let currentUserId = localStorage.getItem('chat_user_id');
// // // // // // //       if (!currentUserId) {
// // // // // // //         // currentUserId = crypto.randomUUID();
// // // // // // //         currentUserId = uuidv4();

// // // // // // //         localStorage.setItem('chat_user_id', currentUserId);
// // // // // // //       }
// // // // // // //       setUserId(currentUserId);
// // // // // // //     };
// // // // // // //     setupUser();
// // // // // // //   }, []);



// // // // // // //   useEffect(() => {
// // // // // // //     if (!userId) return;

// // // // // // //     const channel = supabase.channel('messages-realtime')
// // // // // // //       .on(
// // // // // // //         'postgres_changes',
// // // // // // //         { event: '*', schema: 'public', table: 'messages' },
// // // // // // //         payload => {
// // // // // // //           if (payload.eventType === 'INSERT') {
// // // // // // //             setMessages(prev => [...prev, payload.new]);
// // // // // // //           } else if (payload.eventType === 'UPDATE') {
// // // // // // //             setMessages(prev => prev.map(m => (m.id === payload.old.id ? payload.new : m)));
// // // // // // //           } else if (payload.eventType === 'DELETE') {
// // // // // // //             setMessages(prev => prev.filter(m => m.id !== payload.old.id));
// // // // // // //           }
// // // // // // //         }
// // // // // // //       )
// // // // // // //       .subscribe();

// // // // // // //     return () => {
// // // // // // //       supabase.removeChannel(channel);
// // // // // // //     };
// // // // // // //   }, [userId]);

// // // // // // //   useEffect(() => {
// // // // // // //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // // // // // //   }, [messages]);

// // // // // // //   const sendMessage = async (e) => {
// // // // // // //     e.preventDefault();
// // // // // // //     if (!input.trim() || !userId || loading) return; // Add loading check

// // // // // // //     const userMessage = {
// // // // // // //       text: input,
// // // // // // //       sender: userId,
// // // // // // //       isBot: false,
// // // // // // //       timestamp: new Date().toISOString(),
// // // // // // //     };

// // // // // // //     setLoading(true);
// // // // // // //     setInput('');

// // // // // // //     try {
// // // // // // //       const { error: userError } = await supabase.from('messages').insert([userMessage]);
// // // // // // //       if (userError) throw userError;

// // // // // // //       const chatHistory = messages
// // // // // // //         .filter(m => m.text)
// // // // // // //         .map(m => ({
// // // // // // //           role: m.isBot ? 'assistant' : 'user',
// // // // // // //           content: m.text,
// // // // // // //         }));

// // // // // // //       chatHistory.push({ role: 'user', content: userMessage.text });

// // // // // // //       const systemPrompt = `
// // // // // // //         You are an AI assistant specialized in providing expert suggestions, fixes, and recommendations for improving a company's online presence.
// // // // // // //         Focus areas: website structure, UX/UI, SEO, content quality, and branding.
// // // // // // //         Company Name: ${userCompany || 'Unknown'}
// // // // // // //         Website: ${userWebsite || 'Unknown'}

// // // // // // //         Rules:
// // // // // // //         - Provide actionable fixes and recommendations based on best practices (assume the user will provide details or describe the site).
// // // // // // //         - If the user asks questions unrelated to online presence or website improvements, politely refuse and redirect them to website-related topics.
// // // // // // //         - Use concise bullet points and practical advice.
// // // // // // //         - Include a "Quick Fix Score" (0–100) that reflects how polished the website/brand is, based on the information provided.
// // // // // // //       `;

// // // // // // //       // Call our API route instead of directly calling OpenAI
// // // // // // //       const response = await fetch('/api/chat', {
// // // // // // //         method: 'POST',
// // // // // // //         headers: {
// // // // // // //           'Content-Type': 'application/json',
// // // // // // //         },
// // // // // // //         body: JSON.stringify({
// // // // // // //           messages: chatHistory,
// // // // // // //           systemPrompt: systemPrompt,
// // // // // // //           userCompany: userCompany,
// // // // // // //           userWebsite: userWebsite
// // // // // // //         })
// // // // // // //       });

// // // // // // //       const result = await response.json();

// // // // // // //       if (!response.ok) {
// // // // // // //         throw new Error(result.error || 'Failed to get response from API');
// // // // // // //       }

// // // // // // //       const botReply = result.message;

// // // // // // //       const botMessage = {
// // // // // // //         text: botReply,
// // // // // // //         sender: 'bot',
// // // // // // //         isBot: true,
// // // // // // //         timestamp: new Date().toISOString(),
// // // // // // //       };

// // // // // // //       const { error: botError } = await supabase.from('messages').insert([botMessage]);
// // // // // // //       if (botError) throw botError;

// // // // // // //     } catch (err) {
// // // // // // //       console.error('Chat error:', err);
// // // // // // //       const fallbackMessage = {
// // // // // // //         text: "Oops! Something went wrong. Please try again later.",
// // // // // // //         sender: 'bot',
// // // // // // //         isBot: true,
// // // // // // //         timestamp: new Date().toISOString(),
// // // // // // //       };
// // // // // // //       await supabase.from('messages').insert([fallbackMessage]);
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="ai-bg card shadow-lg position-fixed bottom-0 end-0 m-4" style={{ width: '350px', height: '500px', zIndex: 100, display: 'flex', flexDirection: 'column', borderRadius: '15px' }}>
// // // // // // //       <div className="ai-bg card-header text-white d-flex justify-content-between align-items-center" style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
// // // // // // //         <h5 className="mb-0">AI Assitant</h5>
// // // // // // //         <button onClick={onClose} className="btn-close btn-close-white" aria-label="Close"></button>
// // // // // // //       </div>

// // // // // // //       <div className="card-body overflow-auto" style={{ flexGrow: 1, backgroundColor: '#f8f9fa', padding: '15px' }}>
// // // // // // //         {messages.map(msg => (
// // // // // // //           <div key={msg.id || Math.random()} className={`d-flex mb-3 ${msg.isBot ? 'justify-content-start' : 'justify-content-end'}`}>
// // // // // // //             <div className={`p-3 rounded-lg shadow-sm ${msg.isBot ? 'bg-light text-dark' : 'text-white'}`} style={{ background: '#666', maxWidth: '80%', borderRadius: '10px' }}>
// // // // // // //               <ReactMarkdown>
// // // // // // //                 {msg.text}
// // // // // // //               </ReactMarkdown>
// // // // // // //               {/* {msg.text} */}
// // // // // // //               <small className="d-block mt-1" style={{ fontSize: '0.75em', opacity: 0.7 }}>
// // // // // // //                 {msg.isBot ? 'Agent' : `You`}
// // // // // // //                 {/* {msg.isBot ? 'Bot' : `You (${msg.sender.substring(0, 8)}...)`} */}
// // // // // // //               </small>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         ))}

// // // // // // //         {loading && (
// // // // // // //           <div className="d-flex justify-content-start mb-3">
// // // // // // //             <div className="p-3 rounded-lg bg-light text-dark shadow-sm" style={{ maxWidth: '80%', borderRadius: '10px' }}>
// // // // // // //               <div className="spinner-border spinner-border-sm" role="status">
// // // // // // //                 <span className="visually-hidden">Loading...</span>
// // // // // // //               </div>
// // // // // // //               <span className="ms-2">Typing...</span>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         )}

// // // // // // //         <div ref={messagesEndRef} />
// // // // // // //       </div>

// // // // // // //       <div className="card-footer bg-light" style={{ borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px' }}>
// // // // // // //         <form onSubmit={sendMessage} className="d-flex align-items-end">
// // // // // // //           <textarea
// // // // // // //             className="form-control me-2 rounded-lg"
// // // // // // //             placeholder="Type your message..."
// // // // // // //             value={input}
// // // // // // //             onChange={(e) => setInput(e.target.value)}
// // // // // // //             onKeyDown={(e) => {
// // // // // // //               if (e.key === "Enter" && !e.shiftKey) {
// // // // // // //                 e.preventDefault();
// // // // // // //                 sendMessage(e);
// // // // // // //               }
// // // // // // //             }}
// // // // // // //             onInput={(e) => {
// // // // // // //               e.target.style.height = "auto";
// // // // // // //               e.target.style.height = `${e.target.scrollHeight}px`;
// // // // // // //             }}
// // // // // // //             rows={1}
// // // // // // //             style={{ resize: "none", overflow: "hidden" }}
// // // // // // //             disabled={loading}
// // // // // // //           />
// // // // // // //           <button
// // // // // // //             type="submit"
// // // // // // //             className="btn btn-secondary rounded-circle d-flex align-items-center justify-content-center send-message"
// // // // // // //             style={{ width: "40px", height: "40px" }}
// // // // // // //             disabled={loading || !input.trim()}
// // // // // // //           >
// // // // // // //             <FiSend size={18} />
// // // // // // //           </button>
// // // // // // //         </form>
// // // // // // //       </div>

// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default ChatWindow;








// // // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // // import { supabase } from '../../../lib/supabase';
// // // // // // import ReactMarkdown from 'react-markdown';
// // // // // // import { v4 as uuidv4 } from 'uuid';
// // // // // // import { FiSend } from "react-icons/fi";

// // // // // // const ChatWindow = ({ onClose }) => {
// // // // // //   const [messages, setMessages] = useState([
// // // // // //     {
// // // // // //       id: 'welcome-msg',
// // // // // //       text: "Hello! I'm your AI assistant. How can I help improve your website today?",
// // // // // //       sender: 'bot',
// // // // // //       isBot: true,
// // // // // //       timestamp: new Date().toISOString(),
// // // // // //     }
// // // // // //   ]);

// // // // // //   const [input, setInput] = useState('');
// // // // // //   const [loading, setLoading] = useState(false);
// // // // // //   const [userId, setUserId] = useState(null);
// // // // // //   const [userPlan, setUserPlan] = useState(null);
// // // // // //   const [userCompany, setUserCompany] = useState(null);
// // // // // //   const [userWebsite, setUserWebsite] = useState(null);
// // // // // //   const messagesEndRef = useRef(null);

// // // // // //   useEffect(() => {
// // // // // //     const setupUser = () => {
// // // // // //       let currentUserId = localStorage.getItem('chat_user_id');
// // // // // //       if (!currentUserId) {
// // // // // //         currentUserId = uuidv4();
// // // // // //         localStorage.setItem('chat_user_id', currentUserId);
// // // // // //       }
// // // // // //       setUserId(currentUserId);
// // // // // //     };
// // // // // //     setupUser();
// // // // // //   }, []);

// // // // // //   useEffect(() => {
// // // // // //     const checkUserPlan = async () => {
// // // // // //       try {
// // // // // //         const { data: { user } } = await supabase.auth.getUser();
        
// // // // // //         if (user) {
// // // // // //           const { data: profile, error } = await supabase
// // // // // //             .from('profiles')
// // // // // //             .select('plan, company_name, company_website')
// // // // // //             .eq('id', user.id)
// // // // // //             .single();
            
// // // // // //           if (error) throw error;
// // // // // //           setUserPlan(profile?.plan || null);
// // // // // //           setUserCompany(profile?.company_name || null);
// // // // // //           setUserWebsite(profile?.company_website || null);
// // // // // //         }
// // // // // //       } catch (error) {
// // // // // //         console.error('Error checking user plan:', error);
// // // // // //       }
// // // // // //     };

// // // // // //     checkUserPlan();
// // // // // //   }, []);

// // // // // //   // ADD THIS: Fetch existing messages from database
// // // // // //   useEffect(() => {
// // // // // //     if (!userId) return;

// // // // // //     const fetchMessages = async () => {
// // // // // //       try {
// // // // // //         const { data, error } = await supabase
// // // // // //           .from('messages')
// // // // // //           .select('*')
// // // // // //           .order('timestamp', { ascending: true });

// // // // // //         if (error) {
// // // // // //           console.error('Error fetching messages:', error);
// // // // // //         } else if (data && data.length > 0) {
// // // // // //           // Filter out the welcome message if we have real messages
// // // // // //           const realMessages = data.filter(msg => msg.id !== 'welcome-msg');
// // // // // //           if (realMessages.length > 0) {
// // // // // //             setMessages(realMessages);
// // // // // //           }
// // // // // //         }
// // // // // //       } catch (error) {
// // // // // //         console.error('Error in fetchMessages:', error);
// // // // // //       }
// // // // // //     };

// // // // // //     fetchMessages();

// // // // // //     const channel = supabase.channel('messages-realtime')
// // // // // //       .on(
// // // // // //         'postgres_changes',
// // // // // //         { 
// // // // // //           event: '*', 
// // // // // //           schema: 'public', 
// // // // // //           table: 'messages',
// // // // // //           filter: `sender=eq.${userId}` // ADD THIS: Only listen to messages from this user
// // // // // //         },
// // // // // //         payload => {
// // // // // //           console.log('Realtime update:', payload);
// // // // // //           if (payload.eventType === 'INSERT') {
// // // // // //             setMessages(prev => [...prev, payload.new]);
// // // // // //           } else if (payload.eventType === 'UPDATE') {
// // // // // //             setMessages(prev => prev.map(m => (m.id === payload.old.id ? payload.new : m)));
// // // // // //           } else if (payload.eventType === 'DELETE') {
// // // // // //             setMessages(prev => prev.filter(m => m.id !== payload.old.id));
// // // // // //           }
// // // // // //         }
// // // // // //       )
// // // // // //       .subscribe();

// // // // // //     return () => {
// // // // // //       supabase.removeChannel(channel);
// // // // // //     };
// // // // // //   }, [userId]);

// // // // // //   useEffect(() => {
// // // // // //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // // // // //   }, [messages]);

// // // // // //   const handleKeyDown = (e) => {
// // // // // //     if (e.key === "Enter" && !e.shiftKey) {
// // // // // //       e.preventDefault();
// // // // // //       if (!loading && input.trim()) {
// // // // // //         sendMessage(e);
// // // // // //       }
// // // // // //     }
// // // // // //   };

// // // // // //   const sendMessage = async (e) => {
// // // // // //     e.preventDefault();
// // // // // //     if (!input.trim() || !userId || loading) return;

// // // // // //     const userMessage = {
// // // // // //       text: input,
// // // // // //       sender: userId,
// // // // // //       isBot: false,
// // // // // //       timestamp: new Date().toISOString(),
// // // // // //     };

// // // // // //     setLoading(true);
// // // // // //     setInput('');

// // // // // //     try {
// // // // // //       // Insert user message
// // // // // //       const { error: userError } = await supabase.from('messages').insert([userMessage]);
// // // // // //       if (userError) throw userError;

// // // // // //       // Prepare chat history for OpenAI
// // // // // //       const chatHistory = messages
// // // // // //         .filter(m => m.text && m.id !== 'welcome-msg') // Exclude welcome message
// // // // // //         .map(m => ({
// // // // // //           role: m.isBot ? 'assistant' : 'user',
// // // // // //           content: m.text,
// // // // // //         }));

// // // // // //       chatHistory.push({ role: 'user', content: userMessage.text });

// // // // // //       const systemPrompt = `
// // // // // //         You are an AI assistant specialized in providing expert suggestions, fixes, and recommendations for improving a company's online presence.
// // // // // //         Focus areas: website structure, UX/UI, SEO, content quality, and branding.
// // // // // //         Company Name: ${userCompany || 'Unknown'}
// // // // // //         Website: ${userWebsite || 'Unknown'}

// // // // // //         Rules:
// // // // // //         - Provide actionable fixes and recommendations based on best practices (assume the user will provide details or describe the site).
// // // // // //         - If the user asks questions unrelated to online presence or website improvements, politely refuse and redirect them to website-related topics.
// // // // // //         - Use concise bullet points and practical advice.
// // // // // //         - Include a "Quick Fix Score" (0–100) that reflects how polished the website/brand is, based on the information provided.
// // // // // //       `;

// // // // // //       // Call our API route
// // // // // //       const response = await fetch('/api/chat', {
// // // // // //         method: 'POST',
// // // // // //         headers: {
// // // // // //           'Content-Type': 'application/json',
// // // // // //         },
// // // // // //         body: JSON.stringify({
// // // // // //           messages: chatHistory,
// // // // // //           systemPrompt: systemPrompt,
// // // // // //           userCompany: userCompany,
// // // // // //           userWebsite: userWebsite
// // // // // //         })
// // // // // //       });

// // // // // //       if (!response.ok) {
// // // // // //         const errorResult = await response.json();
// // // // // //         throw new Error(errorResult.error || 'Failed to get response from API');
// // // // // //       }

// // // // // //       const result = await response.json();
// // // // // //       const botReply = result.message;

// // // // // //       // Insert bot response
// // // // // //       const botMessage = {
// // // // // //         text: botReply,
// // // // // //         sender: 'bot',
// // // // // //         isBot: true,
// // // // // //         timestamp: new Date().toISOString(),
// // // // // //       };

// // // // // //       const { error: botError } = await supabase.from('messages').insert([botMessage]);
// // // // // //       if (botError) throw botError;

// // // // // //     } catch (err) {
// // // // // //       console.error('Chat error:', err);
// // // // // //       const fallbackMessage = {
// // // // // //         text: "Oops! Something went wrong. Please try again later.",
// // // // // //         sender: 'bot',
// // // // // //         isBot: true,
// // // // // //         timestamp: new Date().toISOString(),
// // // // // //       };
// // // // // //       await supabase.from('messages').insert([fallbackMessage]);
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="ai-bg card shadow-lg position-fixed bottom-0 end-0 m-4" style={{ width: '350px', height: '500px', zIndex: 100, display: 'flex', flexDirection: 'column', borderRadius: '15px' }}>
// // // // // //       <div className="ai-bg card-header text-white d-flex justify-content-between align-items-center" style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
// // // // // //         <h5 className="mb-0">AI Assistant</h5>
// // // // // //         <button onClick={onClose} className="btn-close btn-close-white" aria-label="Close"></button>
// // // // // //       </div>

// // // // // //       <div className="card-body overflow-auto" style={{ flexGrow: 1, backgroundColor: '#f8f9fa', padding: '15px' }}>
// // // // // //         {messages.map(msg => (
// // // // // //           <div key={msg.id || Math.random()} className={`d-flex mb-3 ${msg.isBot ? 'justify-content-start' : 'justify-content-end'}`}>
// // // // // //             <div className={`p-3 rounded-lg shadow-sm ${msg.isBot ? 'bg-light text-dark' : 'text-white'}`} style={{ background: msg.isBot ? '#f8f9fa' : '#666', maxWidth: '80%', borderRadius: '10px' }}>
// // // // // //               <ReactMarkdown>
// // // // // //                 {msg.text}
// // // // // //               </ReactMarkdown>
// // // // // //               <small className="d-block mt-1" style={{ fontSize: '0.75em', opacity: 0.7 }}>
// // // // // //                 {msg.isBot ? 'Agent' : `You`}
// // // // // //               </small>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         ))}

// // // // // //         {loading && (
// // // // // //           <div className="d-flex justify-content-start mb-3">
// // // // // //             <div className="p-3 rounded-lg bg-light text-dark shadow-sm" style={{ maxWidth: '80%', borderRadius: '10px' }}>
// // // // // //               <div className="spinner-border spinner-border-sm" role="status">
// // // // // //                 <span className="visually-hidden">Loading...</span>
// // // // // //               </div>
// // // // // //               <span className="ms-2">Typing...</span>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         )}

// // // // // //         <div ref={messagesEndRef} />
// // // // // //       </div>

// // // // // //       <div className="card-footer bg-light" style={{ borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px' }}>
// // // // // //         <form onSubmit={sendMessage} className="d-flex align-items-end">
// // // // // //           <textarea
// // // // // //             className="form-control me-2 rounded-lg"
// // // // // //             placeholder="Type your message..."
// // // // // //             value={input}
// // // // // //             onChange={(e) => setInput(e.target.value)}
// // // // // //             onKeyDown={handleKeyDown}
// // // // // //             onInput={(e) => {
// // // // // //               e.target.style.height = "auto";
// // // // // //               e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
// // // // // //             }}
// // // // // //             rows={1}
// // // // // //             style={{ resize: "none", overflow: "hidden", maxHeight: "120px" }}
// // // // // //             disabled={loading}
// // // // // //           />
// // // // // //           <button
// // // // // //             type="submit"
// // // // // //             className="btn btn-secondary rounded-circle d-flex align-items-center justify-content-center send-message"
// // // // // //             style={{ width: "40px", height: "40px" }}
// // // // // //             disabled={loading || !input.trim()}
// // // // // //           >
// // // // // //             <FiSend size={18} />
// // // // // //           </button>
// // // // // //         </form>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default ChatWindow;
















// // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // import { supabase } from '../../../lib/supabase';
// // // // // import ReactMarkdown from 'react-markdown';
// // // // // import { v4 as uuidv4 } from 'uuid';
// // // // // import { FiSend, FiX } from "react-icons/fi";

// // // // // const ChatWindow = ({ onClose }) => {
// // // // //   const [messages, setMessages] = useState([
// // // // //     {
// // // // //       id: 'welcome-msg',
// // // // //       text: "Hello! I'm your AI assistant. How can I help improve your website today?",
// // // // //       sender: 'bot',
// // // // //       isBot: true,
// // // // //       timestamp: new Date().toISOString(),
// // // // //     }
// // // // //   ]);

// // // // //   const [input, setInput] = useState('');
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [userId, setUserId] = useState(null);
// // // // //   const [userPlan, setUserPlan] = useState(null);
// // // // //   const [userCompany, setUserCompany] = useState(null);
// // // // //   const [userWebsite, setUserWebsite] = useState(null);
// // // // //   const messagesEndRef = useRef(null);

// // // // //   useEffect(() => {
// // // // //     const setupUser = () => {
// // // // //       let currentUserId = localStorage.getItem('chat_user_id');
// // // // //       if (!currentUserId) {
// // // // //         currentUserId = uuidv4();
// // // // //         localStorage.setItem('chat_user_id', currentUserId);
// // // // //       }
// // // // //       setUserId(currentUserId);
// // // // //     };
// // // // //     setupUser();
// // // // //   }, []);

// // // // //   useEffect(() => {
// // // // //     const checkUserPlan = async () => {
// // // // //       try {
// // // // //         const { data: { user } } = await supabase.auth.getUser();
        
// // // // //         if (user) {
// // // // //           const { data: profile, error } = await supabase
// // // // //             .from('profiles')
// // // // //             .select('plan, company_name, company_website')
// // // // //             .eq('id', user.id)
// // // // //             .single();
            
// // // // //           if (error) throw error;
// // // // //           setUserPlan(profile?.plan || null);
// // // // //           setUserCompany(profile?.company_name || null);
// // // // //           setUserWebsite(profile?.company_website || null);
// // // // //         }
// // // // //       } catch (error) {
// // // // //         console.error('Error checking user plan:', error);
// // // // //       }
// // // // //     };

// // // // //     checkUserPlan();
// // // // //   }, []);

// // // // //   useEffect(() => {
// // // // //     if (!userId) return;

// // // // //     const fetchMessages = async () => {
// // // // //       try {
// // // // //         const { data, error } = await supabase
// // // // //           .from('messages')
// // // // //           .select('*')
// // // // //           .order('timestamp', { ascending: true });

// // // // //         if (error) {
// // // // //           console.error('Error fetching messages:', error);
// // // // //         } else if (data && data.length > 0) {
// // // // //           const realMessages = data.filter(msg => msg.id !== 'welcome-msg');
// // // // //           if (realMessages.length > 0) {
// // // // //             setMessages(realMessages);
// // // // //           }
// // // // //         }
// // // // //       } catch (error) {
// // // // //         console.error('Error in fetchMessages:', error);
// // // // //       }
// // // // //     };

// // // // //     fetchMessages();

// // // // //     const channel = supabase.channel('messages-realtime')
// // // // //       .on(
// // // // //         'postgres_changes',
// // // // //         { 
// // // // //           event: '*', 
// // // // //           schema: 'public', 
// // // // //           table: 'messages',
// // // // //           filter: `sender=eq.${userId}`
// // // // //         },
// // // // //         payload => {
// // // // //           if (payload.eventType === 'INSERT') {
// // // // //             setMessages(prev => [...prev, payload.new]);
// // // // //           }
// // // // //         }
// // // // //       )
// // // // //       .subscribe();

// // // // //     return () => {
// // // // //       supabase.removeChannel(channel);
// // // // //     };
// // // // //   }, [userId]);

// // // // //   useEffect(() => {
// // // // //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // // // //   }, [messages]);

// // // // //   const handleKeyDown = (e) => {
// // // // //     if (e.key === "Enter" && !e.shiftKey) {
// // // // //       e.preventDefault();
// // // // //       if (!loading && input.trim()) {
// // // // //         sendMessage(e);
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   const sendMessage = async (e) => {
// // // // //     e.preventDefault();
// // // // //     if (!input.trim() || !userId || loading) return;

// // // // //     const userMessage = {
// // // // //       text: input,
// // // // //       sender: userId,
// // // // //       isBot: false,
// // // // //       timestamp: new Date().toISOString(),
// // // // //     };

// // // // //     setLoading(true);
// // // // //     setInput('');

// // // // //     try {
// // // // //       const { error: userError } = await supabase.from('messages').insert([userMessage]);
// // // // //       if (userError) throw userError;

// // // // //       const chatHistory = messages
// // // // //         .filter(m => m.text && m.id !== 'welcome-msg')
// // // // //         .map(m => ({
// // // // //           role: m.isBot ? 'assistant' : 'user',
// // // // //           content: m.text,
// // // // //         }));

// // // // //       chatHistory.push({ role: 'user', content: userMessage.text });

// // // // //       const systemPrompt = `
// // // // //         You are an AI assistant specialized in providing expert suggestions, fixes, and recommendations for improving a company's online presence.
// // // // //         Focus areas: website structure, UX/UI, SEO, content quality, and branding.
// // // // //         Company Name: ${userCompany || 'Unknown'}
// // // // //         Website: ${userWebsite || 'Unknown'}

// // // // //         Rules:
// // // // //         - Provide actionable fixes and recommendations based on best practices.
// // // // //         - If the user asks questions unrelated to online presence, politely redirect them to website-related topics.
// // // // //         - Use concise bullet points and practical advice.
// // // // //         - Include a "Quick Fix Score" (0-100) based on the information provided.
// // // // //       `;

// // // // //       const response = await fetch('/api/chat', {
// // // // //         method: 'POST',
// // // // //         headers: {
// // // // //           'Content-Type': 'application/json',
// // // // //         },
// // // // //         body: JSON.stringify({
// // // // //           messages: chatHistory,
// // // // //           systemPrompt: systemPrompt,
// // // // //           userCompany: userCompany,
// // // // //           userWebsite: userWebsite
// // // // //         })
// // // // //       });

// // // // //       if (!response.ok) {
// // // // //         const errorResult = await response.json();
// // // // //         throw new Error(errorResult.error || 'Failed to get response from API');
// // // // //       }

// // // // //       const result = await response.json();
// // // // //       const botReply = result.message;

// // // // //       const botMessage = {
// // // // //         text: botReply,
// // // // //         sender: 'bot',
// // // // //         isBot: true,
// // // // //         timestamp: new Date().toISOString(),
// // // // //       };

// // // // //       const { error: botError } = await supabase.from('messages').insert([botMessage]);
// // // // //       if (botError) throw botError;

// // // // //     } catch (err) {
// // // // //       console.error('Chat error:', err);
// // // // //       const fallbackMessage = {
// // // // //         text: "Oops! Something went wrong. Please try again later.",
// // // // //         sender: 'bot',
// // // // //         isBot: true,
// // // // //         timestamp: new Date().toISOString(),
// // // // //       };
// // // // //       await supabase.from('messages').insert([fallbackMessage]);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div style={{
// // // // //       width: '350px',
// // // // //       height: '500px',
// // // // //       background: 'white',
// // // // //       borderRadius: '12px',
// // // // //       boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
// // // // //       display: 'flex',
// // // // //       flexDirection: 'column',
// // // // //       overflow: 'hidden',
// // // // //       border: '1px solid #ddd'
// // // // //     }}>
// // // // //       {/* Header */}
// // // // //       <div style={{
// // // // //         background: 'linear-gradient(135deg, #007bff, #0056b3)',
// // // // //         color: 'white',
// // // // //         padding: '15px',
// // // // //         display: 'flex',
// // // // //         justifyContent: 'space-between',
// // // // //         alignItems: 'center',
// // // // //         borderTopLeftRadius: '12px',
// // // // //         borderTopRightRadius: '12px'
// // // // //       }}>
// // // // //         <div>
// // // // //           <strong>AI Assistant</strong>
// // // // //           <div style={{ fontSize: '12px', opacity: 0.9 }}>Ready to help you</div>
// // // // //         </div>
// // // // //         <button
// // // // //           onClick={onClose}
// // // // //           style={{
// // // // //             background: 'none',
// // // // //             border: 'none',
// // // // //             color: 'white',
// // // // //             cursor: 'pointer',
// // // // //             fontSize: '18px',
// // // // //             padding: '5px'
// // // // //           }}
// // // // //         >
// // // // //           <FiX />
// // // // //         </button>
// // // // //       </div>

// // // // //       {/* Messages */}
// // // // //       <div style={{
// // // // //         flex: 1,
// // // // //         padding: '15px',
// // // // //         overflowY: 'auto',
// // // // //         background: '#f8f9fa'
// // // // //       }}>
// // // // //         {messages.map(msg => (
// // // // //           <div key={msg.id || Math.random()} style={{
// // // // //             marginBottom: '15px',
// // // // //             display: 'flex',
// // // // //             justifyContent: msg.isBot ? 'flex-start' : 'flex-end'
// // // // //           }}>
// // // // //             <div style={{
// // // // //               background: msg.isBot ? 'white' : '#007bff',
// // // // //               color: msg.isBot ? '#333' : 'white',
// // // // //               padding: '10px 15px',
// // // // //               borderRadius: '18px',
// // // // //               maxWidth: '80%',
// // // // //               boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
// // // // //               border: msg.isBot ? '1px solid #e9ecef' : 'none'
// // // // //             }}>
// // // // //               <ReactMarkdown>
// // // // //                 {msg.text}
// // // // //               </ReactMarkdown>
// // // // //               <div style={{
// // // // //                 fontSize: '11px',
// // // // //                 opacity: 0.7,
// // // // //                 marginTop: '5px',
// // // // //                 textAlign: msg.isBot ? 'left' : 'right'
// // // // //               }}>
// // // // //                 {msg.isBot ? 'Agent' : 'You'}
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         ))}

// // // // //         {loading && (
// // // // //           <div style={{
// // // // //             display: 'flex',
// // // // //             justifyContent: 'flex-start',
// // // // //             marginBottom: '15px'
// // // // //           }}>
// // // // //             <div style={{
// // // // //               background: 'white',
// // // // //               padding: '10px 15px',
// // // // //               borderRadius: '18px',
// // // // //               boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
// // // // //               display: 'flex',
// // // // //               alignItems: 'center'
// // // // //             }}>
// // // // //               <div style={{
// // // // //                 width: '12px',
// // // // //                 height: '12px',
// // // // //                 borderRadius: '50%',
// // // // //                 background: '#007bff',
// // // // //                 marginRight: '10px',
// // // // //                 animation: 'pulse 1.5s infinite'
// // // // //               }}></div>
// // // // //               <span>Typing...</span>
// // // // //             </div>
// // // // //           </div>
// // // // //         )}

// // // // //         <div ref={messagesEndRef} />
// // // // //       </div>

// // // // //       {/* Input */}
// // // // //       <div style={{
// // // // //         padding: '15px',
// // // // //         background: 'white',
// // // // //         borderTop: '1px solid #e9ecef'
// // // // //       }}>
// // // // //         <form onSubmit={sendMessage} style={{ display: 'flex', gap: '10px' }}>
// // // // //           <textarea
// // // // //             value={input}
// // // // //             onChange={(e) => setInput(e.target.value)}
// // // // //             onKeyDown={handleKeyDown}
// // // // //             placeholder="Type your message..."
// // // // //             disabled={loading}
// // // // //             style={{
// // // // //               flex: 1,
// // // // //               padding: '10px',
// // // // //               border: '1px solid #ddd',
// // // // //               borderRadius: '20px',
// // // // //               resize: 'none',
// // // // //               minHeight: '40px',
// // // // //               maxHeight: '100px',
// // // // //               fontFamily: 'inherit'
// // // // //             }}
// // // // //           />
// // // // //           <button
// // // // //             type="submit"
// // // // //             disabled={loading || !input.trim()}
// // // // //             style={{
// // // // //               width: '40px',
// // // // //               height: '40px',
// // // // //               borderRadius: '50%',
// // // // //               background: '#007bff',
// // // // //               color: 'white',
// // // // //               border: 'none',
// // // // //               cursor: 'pointer',
// // // // //               display: 'flex',
// // // // //               alignItems: 'center',
// // // // //               justifyContent: 'center',
// // // // //               opacity: (loading || !input.trim()) ? 0.5 : 1
// // // // //             }}
// // // // //           >
// // // // //             <FiSend size={16} />
// // // // //           </button>
// // // // //         </form>
// // // // //       </div>

// // // // //       <style>
// // // // //         {`
// // // // //           @keyframes pulse {
// // // // //             0% { opacity: 1; }
// // // // //             50% { opacity: 0.5; }
// // // // //             100% { opacity: 1; }
// // // // //           }
// // // // //         `}
// // // // //       </style>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default ChatWindow;



























// // // // import React, { useState, useEffect, useRef } from 'react';
// // // // import { supabase } from '../../../lib/supabase';
// // // // import ReactMarkdown from 'react-markdown';
// // // // import { v4 as uuidv4 } from 'uuid';
// // // // import { FiSend, FiX } from "react-icons/fi";

// // // // const ChatWindow = ({ onClose }) => {
// // // //   const [messages, setMessages] = useState([
// // // //     {
// // // //       id: 'welcome-msg',
// // // //       text: "Hello! I'm your AI assistant. How can I help improve your website today?",
// // // //       sender: 'bot',
// // // //       isBot: true,
// // // //       timestamp: new Date().toISOString(),
// // // //     }
// // // //   ]);

// // // //   const [input, setInput] = useState('');
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [userId, setUserId] = useState(null);
// // // //   const [userPlan, setUserPlan] = useState(null);
// // // //   const [userCompany, setUserCompany] = useState(null);
// // // //   const [userWebsite, setUserWebsite] = useState(null);
// // // //   const messagesEndRef = useRef(null);

// // // //   useEffect(() => {
// // // //     const setupUser = () => {
// // // //       let currentUserId = localStorage.getItem('chat_user_id');
// // // //       if (!currentUserId) {
// // // //         currentUserId = uuidv4();
// // // //         localStorage.setItem('chat_user_id', currentUserId);
// // // //       }
// // // //       setUserId(currentUserId);
// // // //     };
// // // //     setupUser();
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     const checkUserPlan = async () => {
// // // //       try {
// // // //         const { data: { user } } = await supabase.auth.getUser();
        
// // // //         if (user) {
// // // //           const { data: profile, error } = await supabase
// // // //             .from('profiles')
// // // //             .select('plan, company_name, company_website')
// // // //             .eq('id', user.id)
// // // //             .single();
            
// // // //           if (error) throw error;
// // // //           setUserPlan(profile?.plan || null);
// // // //           setUserCompany(profile?.company_name || null);
// // // //           setUserWebsite(profile?.company_website || null);
// // // //         }
// // // //       } catch (error) {
// // // //         console.error('Error checking user plan:', error);
// // // //       }
// // // //     };

// // // //     checkUserPlan();
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     if (!userId) return;

// // // //     const fetchMessages = async () => {
// // // //       try {
// // // //         const { data, error } = await supabase
// // // //           .from('messages')
// // // //           .select('*')
// // // //           .order('timestamp', { ascending: true });

// // // //         if (error) {
// // // //           console.error('Error fetching messages:', error);
// // // //         } else if (data && data.length > 0) {
// // // //           const realMessages = data.filter(msg => msg.id !== 'welcome-msg');
// // // //           if (realMessages.length > 0) {
// // // //             setMessages(realMessages);
// // // //           }
// // // //         }
// // // //       } catch (error) {
// // // //         console.error('Error in fetchMessages:', error);
// // // //       }
// // // //     };

// // // //     fetchMessages();

// // // //     const channel = supabase.channel('messages-realtime')
// // // //       .on(
// // // //         'postgres_changes',
// // // //         { 
// // // //           event: '*', 
// // // //           schema: 'public', 
// // // //           table: 'messages',
// // // //           filter: `sender=eq.${userId}`
// // // //         },
// // // //         payload => {
// // // //           if (payload.eventType === 'INSERT') {
// // // //             setMessages(prev => [...prev, payload.new]);
// // // //           }
// // // //         }
// // // //       )
// // // //       .subscribe();

// // // //     return () => {
// // // //       supabase.removeChannel(channel);
// // // //     };
// // // //   }, [userId]);

// // // //   useEffect(() => {
// // // //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // // //   }, [messages]);

// // // //   const handleKeyDown = (e) => {
// // // //     if (e.key === "Enter" && !e.shiftKey) {
// // // //       e.preventDefault();
// // // //       if (!loading && input.trim()) {
// // // //         sendMessage(e);
// // // //       }
// // // //     }
// // // //   };

// // // //   const sendMessage = async (e) => {
// // // //     e.preventDefault();
// // // //     if (!input.trim() || !userId || loading) return;

// // // //     const userMessage = {
// // // //       text: input,
// // // //       sender: userId,
// // // //       isBot: false,
// // // //       timestamp: new Date().toISOString(),
// // // //     };

// // // //     setLoading(true);
// // // //     setInput('');

// // // //     try {
// // // //       const { error: userError } = await supabase.from('messages').insert([userMessage]);
// // // //       if (userError) throw userError;

// // // //       const chatHistory = messages
// // // //         .filter(m => m.text && m.id !== 'welcome-msg')
// // // //         .map(m => ({
// // // //           role: m.isBot ? 'assistant' : 'user',
// // // //           content: m.text,
// // // //         }));

// // // //       chatHistory.push({ role: 'user', content: userMessage.text });

// // // //       const systemPrompt = `
// // // //         You are an AI assistant specialized in providing expert suggestions, fixes, and recommendations for improving a company's online presence.
// // // //         Focus areas: website structure, UX/UI, SEO, content quality, and branding.
// // // //         Company Name: ${userCompany || 'Unknown'}
// // // //         Website: ${userWebsite || 'Unknown'}

// // // //         Rules:
// // // //         - Provide actionable fixes and recommendations based on best practices.
// // // //         - If the user asks questions unrelated to online presence, politely redirect them to website-related topics.
// // // //         - Use concise bullet points and practical advice.
// // // //         - Include a "Quick Fix Score" (0-100) based on the information provided.
// // // //       `;

// // // //       const response = await fetch('/api/chat', {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //         },
// // // //         body: JSON.stringify({
// // // //           messages: chatHistory,
// // // //           systemPrompt: systemPrompt,
// // // //           userCompany: userCompany,
// // // //           userWebsite: userWebsite
// // // //         })
// // // //       });

// // // //       if (!response.ok) {
// // // //         const errorResult = await response.json();
// // // //         throw new Error(errorResult.error || 'Failed to get response from API');
// // // //       }

// // // //       const result = await response.json();
// // // //       const botReply = result.message;

// // // //       const botMessage = {
// // // //         text: botReply,
// // // //         sender: 'bot',
// // // //         isBot: true,
// // // //         timestamp: new Date().toISOString(),
// // // //       };

// // // //       const { error: botError } = await supabase.from('messages').insert([botMessage]);
// // // //       if (botError) throw botError;

// // // //     } catch (err) {
// // // //       console.error('Chat error:', err);
// // // //       const fallbackMessage = {
// // // //         text: "Oops! Something went wrong. Please try again later.",
// // // //         sender: 'bot',
// // // //         isBot: true,
// // // //         timestamp: new Date().toISOString(),
// // // //       };
// // // //       await supabase.from('messages').insert([fallbackMessage]);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div style={{
// // // //       width: '350px',
// // // //       height: '500px',
// // // //       background: 'var(--card-bg)',
// // // //       borderRadius: '12px',
// // // //       boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
// // // //       display: 'flex',
// // // //       flexDirection: 'column',
// // // //       overflow: 'hidden',
// // // //       border: '1px solid var(--border)'
// // // //     }}>
// // // //       {/* Header */}
// // // //       <div style={{
// // // //         background: 'var(--gold)',
// // // //         color: 'var(--black)',
// // // //         padding: '15px',
// // // //         display: 'flex',
// // // //         justifyContent: 'space-between',
// // // //         alignItems: 'center',
// // // //         borderTopLeftRadius: '12px',
// // // //         borderTopRightRadius: '12px'
// // // //       }}>
// // // //         <div>
// // // //           <strong style={{ fontWeight: '600' }}>AI Assistant</strong>
// // // //           <div style={{ fontSize: '12px', opacity: 0.8 }}>Ready to help you</div>
// // // //         </div>
// // // //         <button
// // // //           onClick={onClose}
// // // //           style={{
// // // //             background: 'rgba(0,0,0,0.1)',
// // // //             border: 'none',
// // // //             color: 'var(--black)',
// // // //             cursor: 'pointer',
// // // //             fontSize: '18px',
// // // //             padding: '6px',
// // // //             borderRadius: '50%',
// // // //             width: '32px',
// // // //             height: '32px',
// // // //             display: 'flex',
// // // //             alignItems: 'center',
// // // //             justifyContent: 'center',
// // // //             transition: 'all 0.2s ease'
// // // //           }}
// // // //           onMouseEnter={e => {
// // // //             e.currentTarget.style.background = 'rgba(0,0,0,0.2)';
// // // //           }}
// // // //           onMouseLeave={e => {
// // // //             e.currentTarget.style.background = 'rgba(0,0,0,0.1)';
// // // //           }}
// // // //         >
// // // //           <FiX />
// // // //         </button>
// // // //       </div>

// // // //       {/* Messages */}
// // // //       <div style={{
// // // //         flex: 1,
// // // //         padding: '15px',
// // // //         overflowY: 'auto',
// // // //         background: 'var(--background)'
// // // //       }}>
// // // //         {messages.map(msg => (
// // // //           <div key={msg.id || Math.random()} style={{
// // // //             marginBottom: '15px',
// // // //             display: 'flex',
// // // //             justifyContent: msg.isBot ? 'flex-start' : 'flex-end'
// // // //           }}>
// // // //             <div style={{
// // // //               background: msg.isBot ? 'var(--card-bg)' : 'var(--gold)',
// // // //               color: msg.isBot ? 'var(--foreground)' : 'var(--black)',
// // // //               padding: '12px 16px',
// // // //               borderRadius: '18px',
// // // //               maxWidth: '80%',
// // // //               boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
// // // //               border: msg.isBot ? '1px solid var(--border)' : 'none'
// // // //             }}>
// // // //               <ReactMarkdown>
// // // //                 {msg.text}
// // // //               </ReactMarkdown>
// // // //               <div style={{
// // // //                 fontSize: '11px',
// // // //                 opacity: 0.7,
// // // //                 marginTop: '5px',
// // // //                 textAlign: msg.isBot ? 'left' : 'right'
// // // //               }}>
// // // //                 {msg.isBot ? 'Agent' : 'You'}
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         ))}

// // // //         {loading && (
// // // //           <div style={{
// // // //             display: 'flex',
// // // //             justifyContent: 'flex-start',
// // // //             marginBottom: '15px'
// // // //           }}>
// // // //             <div style={{
// // // //               background: 'var(--card-bg)',
// // // //               padding: '12px 16px',
// // // //               borderRadius: '18px',
// // // //               boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
// // // //               display: 'flex',
// // // //               alignItems: 'center',
// // // //               gap: '10px'
// // // //             }}>
// // // //               <div style={{
// // // //                 width: '12px',
// // // //                 height: '12px',
// // // //                 borderRadius: '50%',
// // // //                 background: 'var(--gold)',
// // // //                 animation: 'pulse 1.5s infinite'
// // // //               }}></div>
// // // //               <span style={{ fontSize: '14px', color: 'var(--foreground)' }}>Typing...</span>
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         <div ref={messagesEndRef} />
// // // //       </div>

// // // //       {/* Input */}
// // // //       <div style={{
// // // //         padding: '15px',
// // // //         background: 'var(--card-bg)',
// // // //         borderTop: '1px solid var(--border)'
// // // //       }}>
// // // //         <form onSubmit={sendMessage} style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
// // // //           <textarea
// // // //             value={input}
// // // //             onChange={(e) => setInput(e.target.value)}
// // // //             onKeyDown={handleKeyDown}
// // // //             placeholder="Type your message..."
// // // //             disabled={loading}
// // // //             style={{
// // // //               flex: 1,
// // // //               padding: '12px 16px',
// // // //               border: '1px solid var(--border)',
// // // //               borderRadius: '20px',
// // // //               resize: 'none',
// // // //               minHeight: '44px',
// // // //               maxHeight: '100px',
// // // //               fontFamily: 'inherit',
// // // //               fontSize: '14px',
// // // //               outline: 'none',
// // // //               transition: 'border-color 0.2s ease',
// // // //               background: 'var(--background)',
// // // //               color: 'var(--foreground)'
// // // //             }}
// // // //             onFocus={e => {
// // // //               e.target.style.borderColor = 'var(--gold)';
// // // //             }}
// // // //             onBlur={e => {
// // // //               e.target.style.borderColor = 'var(--border)';
// // // //             }}
// // // //           />
// // // //           <button
// // // //             type="submit"
// // // //             disabled={loading || !input.trim()}
// // // //             style={{
// // // //               width: '44px',
// // // //               height: '44px',
// // // //               borderRadius: '50%',
// // // //               background: 'var(--gold)',
// // // //               color: 'var(--black)',
// // // //               border: 'none',
// // // //               cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
// // // //               display: 'flex',
// // // //               alignItems: 'center',
// // // //               justifyContent: 'center',
// // // //               opacity: (loading || !input.trim()) ? 0.6 : 1,
// // // //               transition: 'all 0.2s ease',
// // // //               flexShrink: 0
// // // //             }}
// // // //             onMouseEnter={e => {
// // // //               if (!loading && input.trim()) {
// // // //                 e.target.style.background = 'var(--gold-light)';
// // // //                 e.target.style.transform = 'scale(1.05)';
// // // //               }
// // // //             }}
// // // //             onMouseLeave={e => {
// // // //               if (!loading && input.trim()) {
// // // //                 e.target.style.background = 'var(--gold)';
// // // //                 e.target.style.transform = 'scale(1)';
// // // //               }
// // // //             }}
// // // //           >
// // // //             <FiSend size={16} />
// // // //           </button>
// // // //         </form>
// // // //       </div>

// // // //       <style>
// // // //         {`
// // // //           @keyframes pulse {
// // // //             0% { opacity: 1; }
// // // //             50% { opacity: 0.5; }
// // // //             100% { opacity: 1; }
// // // //           }
// // // //         `}
// // // //       </style>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ChatWindow;







































// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { supabase } from '../../../lib/supabase';
// // // import ReactMarkdown from 'react-markdown';
// // // import { v4 as uuidv4 } from 'uuid';
// // // import { FiSend, FiX } from "react-icons/fi";

// // // const ChatWindow = ({ onClose }) => {
// // //   const [messages, setMessages] = useState([
// // //     {
// // //       id: 'welcome-msg',
// // //       text: "Hello! I'm your AI assistant. How can I help improve your website today?",
// // //       sender: 'bot',
// // //       isBot: true,
// // //       timestamp: new Date().toISOString(),
// // //     }
// // //   ]);

// // //   const [input, setInput] = useState('');
// // //   const [loading, setLoading] = useState(false);
// // //   const [userId, setUserId] = useState(null);
// // //   const [userPlan, setUserPlan] = useState(null);
// // //   const [userCompany, setUserCompany] = useState(null);
// // //   const [userWebsite, setUserWebsite] = useState(null);
// // //   const messagesEndRef = useRef(null);

// // //   useEffect(() => {
// // //     const setupUser = () => {
// // //       let currentUserId = localStorage.getItem('chat_user_id');
// // //       if (!currentUserId) {
// // //         currentUserId = uuidv4();
// // //         localStorage.setItem('chat_user_id', currentUserId);
// // //       }
// // //       setUserId(currentUserId);
// // //     };
// // //     setupUser();
// // //   }, []);

// // //   useEffect(() => {
// // //     const checkUserPlan = async () => {
// // //       try {
// // //         const { data: { user } } = await supabase.auth.getUser();
        
// // //         if (user) {
// // //           const { data: profile, error } = await supabase
// // //             .from('profiles')
// // //             .select('plan, company_name, company_website')
// // //             .eq('id', user.id)
// // //             .single();
            
// // //           if (error) throw error;
// // //           setUserPlan(profile?.plan || null);
// // //           setUserCompany(profile?.company_name || null);
// // //           setUserWebsite(profile?.company_website || null);
// // //         }
// // //       } catch (error) {
// // //         console.error('Error checking user plan:', error);
// // //       }
// // //     };

// // //     checkUserPlan();
// // //   }, []);

// // //   // Fetch initial messages
// // //   useEffect(() => {
// // //     if (!userId) return;

// // //     const fetchMessages = async () => {
// // //       try {
// // //         const { data, error } = await supabase
// // //           .from('messages')
// // //           .select('*')
// // //           .order('timestamp', { ascending: true });

// // //         if (error) {
// // //           console.error('Error fetching messages:', error);
// // //         } else if (data && data.length > 0) {
// // //           // Check if we have any real messages (not just welcome)
// // //           const hasRealMessages = data.some(msg => msg.id !== 'welcome-msg');
// // //           if (hasRealMessages) {
// // //             setMessages(data);
// // //           }
// // //         }
// // //       } catch (error) {
// // //         console.error('Error in fetchMessages:', error);
// // //       }
// // //     };

// // //     fetchMessages();
// // //   }, [userId]);

// // //   // Real-time subscription - FIXED
// // //   useEffect(() => {
// // //     if (!userId) return;

// // //     console.log('Setting up real-time subscription for user:', userId);

// // //     const channel = supabase
// // //       .channel('messages-realtime')
// // //       .on(
// // //         'postgres_changes',
// // //         {
// // //           event: 'INSERT',
// // //           schema: 'public',
// // //           table: 'messages',
// // //         },
// // //         (payload) => {
// // //           console.log('Real-time INSERT received:', payload);
// // //           // Check if this message belongs to current user or is from bot
// // //           if (payload.new.sender === userId || payload.new.sender === 'bot') {
// // //             console.log('Adding new message to state:', payload.new);
// // //             setMessages(prev => {
// // //               // Check if message already exists to avoid duplicates
// // //               const exists = prev.some(msg => msg.id === payload.new.id);
// // //               if (!exists) {
// // //                 return [...prev, payload.new];
// // //               }
// // //               return prev;
// // //             });
// // //           }
// // //         }
// // //       )
// // //       .on(
// // //         'postgres_changes',
// // //         {
// // //           event: 'DELETE',
// // //           schema: 'public',
// // //           table: 'messages',
// // //         },
// // //         (payload) => {
// // //           console.log('Real-time DELETE received:', payload);
// // //           setMessages(prev => prev.filter(msg => msg.id !== payload.old.id));
// // //         }
// // //       )
// // //       .subscribe((status) => {
// // //         console.log('Real-time subscription status:', status);
// // //       });

// // //     return () => {
// // //       console.log('Cleaning up real-time subscription');
// // //       supabase.removeChannel(channel);
// // //     };
// // //   }, [userId]);

// // //   // Auto-scroll to bottom
// // //   useEffect(() => {
// // //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // //   }, [messages]);

// // //   const handleKeyDown = (e) => {
// // //     if (e.key === "Enter" && !e.shiftKey) {
// // //       e.preventDefault();
// // //       if (!loading && input.trim()) {
// // //         sendMessage(e);
// // //       }
// // //     }
// // //   };

// // //   const sendMessage = async (e) => {
// // //     e.preventDefault();
// // //     if (!input.trim() || !userId || loading) return;

// // //     const userMessage = {
// // //       text: input,
// // //       sender: userId,
// // //       isBot: false,
// // //       timestamp: new Date().toISOString(),
// // //     };

// // //     setLoading(true);
// // //     setInput('');

// // //     try {
// // //       console.log('Inserting user message:', userMessage);
// // //       const { data, error: userError } = await supabase
// // //         .from('messages')
// // //         .insert([userMessage])
// // //         .select(); // Add .select() to get the inserted data

// // //       if (userError) {
// // //         console.error('Error inserting user message:', userError);
// // //         throw userError;
// // //       }

// // //       console.log('User message inserted successfully:', data);

// // //       // Prepare chat history for OpenAI
// // //       const chatHistory = messages
// // //         .filter(m => m.text && m.id !== 'welcome-msg')
// // //         .map(m => ({
// // //           role: m.isBot ? 'assistant' : 'user',
// // //           content: m.text,
// // //         }));

// // //       chatHistory.push({ role: 'user', content: userMessage.text });

// // //       const systemPrompt = `
// // //         You are an AI assistant specialized in providing expert suggestions, fixes, and recommendations for improving a company's online presence.
// // //         Focus areas: website structure, UX/UI, SEO, content quality, and branding.
// // //         Company Name: ${userCompany || 'Unknown'}
// // //         Website: ${userWebsite || 'Unknown'}

// // //         Rules:
// // //         - Provide actionable fixes and recommendations based on best practices.
// // //         - If the user asks questions unrelated to online presence, politely redirect them to website-related topics.
// // //         - Use concise bullet points and practical advice.
// // //         - Include a "Quick Fix Score" (0-100) based on the information provided.
// // //       `;

// // //       console.log('Calling OpenAI API with chat history:', chatHistory.length, 'messages');

// // //       const response = await fetch('/api/chat', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify({
// // //           messages: chatHistory,
// // //           systemPrompt: systemPrompt,
// // //           userCompany: userCompany,
// // //           userWebsite: userWebsite
// // //         })
// // //       });

// // //       if (!response.ok) {
// // //         const errorResult = await response.json();
// // //         console.error('API error:', errorResult);
// // //         throw new Error(errorResult.error || 'Failed to get response from API');
// // //       }

// // //       const result = await response.json();
// // //       const botReply = result.message;

// // //       console.log('OpenAI response received:', botReply);

// // //       const botMessage = {
// // //         text: botReply,
// // //         sender: 'bot',
// // //         isBot: true,
// // //         timestamp: new Date().toISOString(),
// // //       };

// // //       console.log('Inserting bot message:', botMessage);
// // //       const { error: botError } = await supabase.from('messages').insert([botMessage]);
// // //       if (botError) {
// // //         console.error('Error inserting bot message:', botError);
// // //         throw botError;
// // //       }

// // //       console.log('Bot message inserted successfully');

// // //     } catch (err) {
// // //       console.error('Chat error:', err);
// // //       const fallbackMessage = {
// // //         text: "Oops! Something went wrong. Please try again later.",
// // //         sender: 'bot',
// // //         isBot: true,
// // //         timestamp: new Date().toISOString(),
// // //       };
// // //       // Add fallback message directly to state since real-time might not catch it
// // //       setMessages(prev => [...prev, fallbackMessage]);
// // //       await supabase.from('messages').insert([fallbackMessage]);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div style={{
// // //       width: '350px',
// // //       height: '500px',
// // //       background: 'var(--card-bg)',
// // //       borderRadius: '12px',
// // //       boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
// // //       display: 'flex',
// // //       flexDirection: 'column',
// // //       overflow: 'hidden',
// // //       border: '1px solid var(--border)'
// // //     }}>
// // //       {/* Header */}
// // //       <div style={{
// // //         background: 'var(--gold)',
// // //         color: 'var(--black)',
// // //         padding: '15px',
// // //         display: 'flex',
// // //         justifyContent: 'space-between',
// // //         alignItems: 'center',
// // //         borderTopLeftRadius: '12px',
// // //         borderTopRightRadius: '12px'
// // //       }}>
// // //         <div>
// // //           <strong style={{ fontWeight: '600' }}>AI Assistant</strong>
// // //           <div style={{ fontSize: '12px', opacity: 0.8 }}>Ready to help you</div>
// // //         </div>
// // //         <button
// // //           onClick={onClose}
// // //           style={{
// // //             background: 'rgba(0,0,0,0.1)',
// // //             border: 'none',
// // //             color: 'var(--black)',
// // //             cursor: 'pointer',
// // //             fontSize: '18px',
// // //             padding: '6px',
// // //             borderRadius: '50%',
// // //             width: '32px',
// // //             height: '32px',
// // //             display: 'flex',
// // //             alignItems: 'center',
// // //             justifyContent: 'center',
// // //             transition: 'all 0.2s ease'
// // //           }}
// // //           onMouseEnter={e => {
// // //             e.currentTarget.style.background = 'rgba(0,0,0,0.2)';
// // //           }}
// // //           onMouseLeave={e => {
// // //             e.currentTarget.style.background = 'rgba(0,0,0,0.1)';
// // //           }}
// // //         >
// // //           <FiX />
// // //         </button>
// // //       </div>

// // //       {/* Messages */}
// // //       <div style={{
// // //         flex: 1,
// // //         padding: '15px',
// // //         overflowY: 'auto',
// // //         background: 'var(--background)'
// // //       }}>
// // //         {messages.map(msg => (
// // //           <div key={msg.id || msg.timestamp} style={{
// // //             marginBottom: '15px',
// // //             display: 'flex',
// // //             justifyContent: msg.isBot ? 'flex-start' : 'flex-end'
// // //           }}>
// // //             <div style={{
// // //               background: msg.isBot ? 'var(--card-bg)' : 'var(--gold)',
// // //               color: msg.isBot ? 'var(--foreground)' : 'var(--black)',
// // //               padding: '12px 16px',
// // //               borderRadius: '18px',
// // //               maxWidth: '80%',
// // //               boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
// // //               border: msg.isBot ? '1px solid var(--border)' : 'none'
// // //             }}>
// // //               <ReactMarkdown>
// // //                 {msg.text}
// // //               </ReactMarkdown>
// // //               <div style={{
// // //                 fontSize: '11px',
// // //                 opacity: 0.7,
// // //                 marginTop: '5px',
// // //                 textAlign: msg.isBot ? 'left' : 'right'
// // //               }}>
// // //                 {msg.isBot ? 'Agent' : 'You'}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         ))}

// // //         {loading && (
// // //           <div style={{
// // //             display: 'flex',
// // //             justifyContent: 'flex-start',
// // //             marginBottom: '15px'
// // //           }}>
// // //             <div style={{
// // //               background: 'var(--card-bg)',
// // //               padding: '12px 16px',
// // //               borderRadius: '18px',
// // //               boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
// // //               display: 'flex',
// // //               alignItems: 'center',
// // //               gap: '10px'
// // //             }}>
// // //               <div style={{
// // //                 width: '12px',
// // //                 height: '12px',
// // //                 borderRadius: '50%',
// // //                 background: 'var(--gold)',
// // //                 animation: 'pulse 1.5s infinite'
// // //               }}></div>
// // //               <span style={{ fontSize: '14px', color: 'var(--foreground)' }}>Typing...</span>
// // //             </div>
// // //           </div>
// // //         )}

// // //         <div ref={messagesEndRef} />
// // //       </div>

// // //       {/* Input */}
// // //       <div style={{
// // //         padding: '15px',
// // //         background: 'var(--card-bg)',
// // //         borderTop: '1px solid var(--border)'
// // //       }}>
// // //         <form onSubmit={sendMessage} style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
// // //           <textarea
// // //             value={input}
// // //             onChange={(e) => setInput(e.target.value)}
// // //             onKeyDown={handleKeyDown}
// // //             placeholder="Type your message..."
// // //             disabled={loading}
// // //             style={{
// // //               flex: 1,
// // //               padding: '12px 16px',
// // //               border: '1px solid var(--border)',
// // //               borderRadius: '20px',
// // //               resize: 'none',
// // //               minHeight: '44px',
// // //               maxHeight: '100px',
// // //               fontFamily: 'inherit',
// // //               fontSize: '14px',
// // //               outline: 'none',
// // //               transition: 'border-color 0.2s ease',
// // //               background: 'var(--background)',
// // //               color: 'var(--foreground)'
// // //             }}
// // //             onFocus={e => {
// // //               e.target.style.borderColor = 'var(--gold)';
// // //             }}
// // //             onBlur={e => {
// // //               e.target.style.borderColor = 'var(--border)';
// // //             }}
// // //           />
// // //           <button
// // //             type="submit"
// // //             disabled={loading || !input.trim()}
// // //             style={{
// // //               width: '44px',
// // //               height: '44px',
// // //               borderRadius: '50%',
// // //               background: 'var(--gold)',
// // //               color: 'var(--black)',
// // //               border: 'none',
// // //               cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
// // //               display: 'flex',
// // //               alignItems: 'center',
// // //               justifyContent: 'center',
// // //               opacity: (loading || !input.trim()) ? 0.6 : 1,
// // //               transition: 'all 0.2s ease',
// // //               flexShrink: 0
// // //             }}
// // //             onMouseEnter={e => {
// // //               if (!loading && input.trim()) {
// // //                 e.target.style.background = 'var(--gold-light)';
// // //                 e.target.style.transform = 'scale(1.05)';
// // //               }
// // //             }}
// // //             onMouseLeave={e => {
// // //               if (!loading && input.trim()) {
// // //                 e.target.style.background = 'var(--gold)';
// // //                 e.target.style.transform = 'scale(1)';
// // //               }
// // //             }}
// // //           >
// // //             <FiSend size={16} />
// // //           </button>
// // //         </form>
// // //       </div>

// // //       <style>
// // //         {`
// // //           @keyframes pulse {
// // //             0% { opacity: 1; }
// // //             50% { opacity: 0.5; }
// // //             100% { opacity: 1; }
// // //           }
// // //         `}
// // //       </style>
// // //     </div>
// // //   );
// // // };

// // // export default ChatWindow;




























// // import React, { useState, useEffect, useRef } from 'react';
// // import { supabase } from '../../../lib/supabase';
// // import ReactMarkdown from 'react-markdown';
// // import { v4 as uuidv4 } from 'uuid';
// // import { FiSend, FiX } from "react-icons/fi";

// // const ChatWindow = ({ onClose }) => {
// //   const [messages, setMessages] = useState([
// //     {
// //       id: 'welcome-msg',
// //       text: "Hello! I'm your AI assistant. How can I help improve your website today?",
// //       sender: 'bot',
// //       isBot: true,
// //       timestamp: new Date().toISOString(),
// //     }
// //   ]);

// //   const [input, setInput] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const [userId, setUserId] = useState(null);
// //   const [userVerified, setUserVerified] = useState(null);
// //   const [userCompany, setUserCompany] = useState(null);
// //   const [userBusinessType, setUserBusinessType] = useState(null);
// //   const [userUsername, setUserName] = useState(null);
// //   const [userApplicationType, setUserApplicationType] = useState(null);
// //   const messagesEndRef = useRef(null);
// //   const pollingRef = useRef(null);

// //   useEffect(() => {
// //     const setupUser = () => {
// //       let currentUserId = localStorage.getItem('chat_user_id');
// //       if (!currentUserId) {
// //         currentUserId = uuidv4();
// //         localStorage.setItem('chat_user_id', currentUserId);
// //       }
// //       setUserId(currentUserId);
// //     };
// //     setupUser();
// //   }, []);

// //   useEffect(() => {
// //     const checkUserPlan = async () => {
// //       try {
// //         const { data: { user } } = await supabase.auth.getUser();
        
// //         if (user) {
// //           const { data: profile, error } = await supabase
// //             .from('profiles')
// //             .select('verified, business_name, business_type, name, application_type')
// //             .eq('id', user.id)
// //             .single();
            
// //           if (error) throw error;
// //           setUserVerified(profile?.verified || null);
// //           setUserCompany(profile?.business_name || null);
// //           setUserBusinessType(profile?.business_type || null);
// //           setUserName(profile?.name || null);
// //           setUserApplicationType(profile?.application_type || null);
// //         }
// //       } catch (error) {
// //         console.error('Error checking user plan:', error);
// //       }
// //     };

// //     checkUserPlan();
// //   }, []);

// //   // Fetch messages with polling instead of real-time
// //   const fetchMessages = async () => {
// //     if (!userId) return;

// //     try {
// //       const { data, error } = await supabase
// //         .from('messages')
// //         .select('*')
// //         .order('timestamp', { ascending: true });

// //       if (error) {
// //         console.error('Error fetching messages:', error);
// //       } else if (data && data.length > 0) {
// //         setMessages(data);
// //       }
// //     } catch (error) {
// //       console.error('Error in fetchMessages:', error);
// //     }
// //   };

// //   // Initial fetch and setup polling
// //   useEffect(() => {
// //     if (!userId) return;

// //     fetchMessages();

// //     // Set up polling every 2 seconds
// //     pollingRef.current = setInterval(fetchMessages, 2000);

// //     return () => {
// //       if (pollingRef.current) {
// //         clearInterval(pollingRef.current);
// //       }
// //     };
// //   }, [userId]);

// //   // Auto-scroll to bottom
// //   useEffect(() => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// //   }, [messages]);

// //   const handleKeyDown = (e) => {
// //     if (e.key === "Enter" && !e.shiftKey) {
// //       e.preventDefault();
// //       if (!loading && input.trim()) {
// //         sendMessage(e);
// //       }
// //     }
// //   };

// //   const sendMessage = async (e) => {
// //     e.preventDefault();
// //     if (!input.trim() || !userId || loading) return;

// //     const userMessage = {
// //       text: input,
// //       sender: userId,
// //       isBot: false,
// //       timestamp: new Date().toISOString(),
// //     };

// //     // Optimistic update for user message
// //     setMessages(prev => [...prev, userMessage]);
// //     setLoading(true);
// //     setInput('');

// //     try {
// //       // Insert user message
// //       const { error: userError } = await supabase
// //         .from('messages')
// //         .insert([userMessage]);

// //       if (userError) throw userError;

// //       // Prepare chat history for OpenAI
// //       const chatHistory = messages
// //         .filter(m => m.text && m.id !== 'welcome-msg')
// //         .map(m => ({
// //           role: m.isBot ? 'assistant' : 'user',
// //           content: m.text,
// //         }));

// //       chatHistory.push({ role: 'user', content: userMessage.text });

// //       const systemPrompt = `
// //         You are the "MVP JumpStart Assistant," an AI expert dedicated to helping businesses rapidly launch and optimize their SaaS (Software as a Service) Minimum Viable Product (MVP).

// //         Your core mission is to provide actionable, pragmatic, and immediate advice to validate the business idea, attract early users, and lay a strong foundation for growth.

// //         **User Context for Tailored Advice:**
// //         - **User:** ${userUsername || 'Founder'}
// //         - **Company:** ${userCompany || 'Not Provided'}
// //         - **Business/Industry:** ${userBusinessType || 'Not Specified'}
// //         - **Application Type:** ${userApplicationType || 'Not Specified'}

// //         **Primary Focus Areas (Tailored to the above context):**
// //         1.  **MVP Strategy & Scope:** Advice on core feature prioritization for a ${userApplicationType} in the ${userBusinessType} industry, user stories, and avoiding scope creep.
// //         2.  **Landing Page Optimization:** Critiquing and improving the key page that converts visitors into leads or users (value proposition, call-to-action, social proof).
// //         3.  **User Onboarding & Flow:** Simplifying the sign-up and first-time user experience for a ${userApplicationType} to reduce friction and increase activation.
// //         4.  **Growth & Validation Loops:** Suggestions for waitlists, beta programs, feedback collection, and early-stage marketing channels relevant to ${userBusinessType}.
// //         5.  **Technical Foundation:** High-level recommendations on tech stack, scalability, and security best practices for a nascent ${userApplicationType}.

// //         **Rules of Engagement:**
// //         - **Be Actionable:** Provide concrete, implementable fixes, not just theory. Use bullet points, checklists, and clear steps.
// //         - **Be Concise:** Founders are busy. Prioritize the most critical "quick wins" and "must-haves" first.
// //         - **Be Pragmatic:** Recommend cost-effective and time-efficient solutions suitable for an MVP, not enterprise-grade systems.
// //         - **Score the MVP:** Provide a "Launch Readiness Score" (0-100) based on the provided information. This score should assess the clarity of the value proposition, simplicity of the user journey, and effectiveness of the call-to-action.
// //         - **Stay On Topic:** If a user asks unrelated questions, politely redirect them to the core focus areas of SaaS MVP building and optimization.
// //         - **Leverage Context:** Use the provided User Context (Company, Business Type, App Type) to make your recommendations specific and highly relevant. If this data is missing, politely ask for it to give better advice.

// //         **Always begin your analysis by assessing the single most important thing for ${userCompany}: Is the core value proposition for their ${userApplicationType} immediately clear to a first-time visitor?**
// //         `;

// //       // Call OpenAI API
// //       const response = await fetch('/api/chat', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           messages: chatHistory,
// //           systemPrompt: systemPrompt,
// //           userCompany: userCompany,
// //           userBusinessType: userBusinessType,
// //           userUsername: userUsername
// //         })
// //       });

// //       if (!response.ok) {
// //         const errorResult = await response.json();
// //         throw new Error(errorResult.error || 'Failed to get response from API');
// //       }

// //       const result = await response.json();
// //       const botReply = result.message;

// //       // Create bot message
// //       const botMessage = {
// //         text: botReply,
// //         sender: 'bot',
// //         isBot: true,
// //         timestamp: new Date().toISOString(),
// //       };

// //       // Optimistic update for bot message
// //       setMessages(prev => [...prev, botMessage]);

// //       // Insert bot message to database
// //       const { error: botError } = await supabase
// //         .from('messages')
// //         .insert([botMessage]);

// //       if (botError) throw botError;

// //     } catch (err) {
// //       console.error('Chat error:', err);
      
// //       // Remove optimistic updates on error
// //       setMessages(prev => prev.filter(msg => 
// //         msg.timestamp !== userMessage.timestamp && 
// //         (!msg.timestamp || msg.timestamp !== userMessage.timestamp)
// //       ));

// //       const fallbackMessage = {
// //         text: "Oops! Something went wrong. Please try again later.",
// //         sender: 'bot',
// //         isBot: true,
// //         timestamp: new Date().toISOString(),
// //       };
      
// //       // Add fallback message
// //       setMessages(prev => [...prev, fallbackMessage]);
      
// //       // Also save to database
// //       await supabase.from('messages').insert([fallbackMessage]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div style={{
// //       width: '350px',
// //       height: '500px',
// //       background: 'var(--card-bg)',
// //       borderRadius: '12px',
// //       boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
// //       display: 'flex',
// //       flexDirection: 'column',
// //       overflow: 'hidden',
// //       border: '1px solid var(--border)'
// //     }}>
// //       {/* Header */}
// //       <div style={{
// //         background: 'var(--gold)',
// //         color: 'var(--black)',
// //         padding: '15px',
// //         display: 'flex',
// //         justifyContent: 'space-between',
// //         alignItems: 'center',
// //         borderTopLeftRadius: '12px',
// //         borderTopRightRadius: '12px'
// //       }}>
// //         <div>
// //           <strong style={{ fontWeight: '600' }}>AI Assistant</strong>
// //           <div style={{ fontSize: '12px', opacity: 0.8 }}>Ready to help you</div>
// //         </div>
// //         <button
// //           onClick={onClose}
// //           style={{
// //             background: 'rgba(0,0,0,0.1)',
// //             border: 'none',
// //             color: 'var(--black)',
// //             cursor: 'pointer',
// //             fontSize: '18px',
// //             padding: '6px',
// //             borderRadius: '50%',
// //             width: '32px',
// //             height: '32px',
// //             display: 'flex',
// //             alignItems: 'center',
// //             justifyContent: 'center',
// //             transition: 'all 0.2s ease'
// //           }}
// //           onMouseEnter={e => {
// //             e.currentTarget.style.background = 'rgba(0,0,0,0.2)';
// //           }}
// //           onMouseLeave={e => {
// //             e.currentTarget.style.background = 'rgba(0,0,0,0.1)';
// //           }}
// //         >
// //           <FiX />
// //         </button>
// //       </div>

// //       {/* Messages */}
// //       <div style={{
// //         flex: 1,
// //         padding: '15px',
// //         overflowY: 'auto',
// //         background: 'var(--background)'
// //       }}>
// //         {messages.map(msg => (
// //           <div key={`${msg.id}-${msg.timestamp}`} style={{
// //             marginBottom: '15px',
// //             display: 'flex',
// //             justifyContent: msg.isBot ? 'flex-start' : 'flex-end'
// //           }}>
// //             <div style={{
// //               background: msg.isBot ? 'var(--card-bg)' : 'var(--gold)',
// //               color: msg.isBot ? 'var(--foreground)' : 'var(--black)',
// //               padding: '12px 16px',
// //               borderRadius: '18px',
// //               maxWidth: '80%',
// //               boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
// //               border: msg.isBot ? '1px solid var(--border)' : 'none'
// //             }}>
// //               <ReactMarkdown>
// //                 {msg.text}
// //               </ReactMarkdown>
// //               <div style={{
// //                 fontSize: '11px',
// //                 opacity: 0.7,
// //                 marginTop: '5px',
// //                 textAlign: msg.isBot ? 'left' : 'right'
// //               }}>
// //                 {msg.isBot ? 'Agent' : 'You'}
// //               </div>
// //             </div>
// //           </div>
// //         ))}

// //         {loading && (
// //           <div style={{
// //             display: 'flex',
// //             justifyContent: 'flex-start',
// //             marginBottom: '15px'
// //           }}>
// //             <div style={{
// //               background: 'var(--card-bg)',
// //               padding: '12px 16px',
// //               borderRadius: '18px',
// //               boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
// //               display: 'flex',
// //               alignItems: 'center',
// //               gap: '10px'
// //             }}>
// //               <div style={{
// //                 width: '12px',
// //                 height: '12px',
// //                 borderRadius: '50%',
// //                 background: 'var(--gold)',
// //                 animation: 'pulse 1.5s infinite'
// //               }}></div>
// //               <span style={{ fontSize: '14px', color: 'var(--foreground)' }}>Typing...</span>
// //             </div>
// //           </div>
// //         )}

// //         <div ref={messagesEndRef} />
// //       </div>

// //       {/* Input */}
// //       <div style={{
// //         padding: '15px',
// //         background: 'var(--card-bg)',
// //         borderTop: '1px solid var(--border)'
// //       }}>
// //         <form onSubmit={sendMessage} style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
// //           <textarea
// //             value={input}
// //             onChange={(e) => setInput(e.target.value)}
// //             onKeyDown={handleKeyDown}
// //             placeholder="Type your message..."
// //             disabled={loading}
// //             style={{
// //               flex: 1,
// //               padding: '12px 16px',
// //               border: '1px solid var(--border)',
// //               borderRadius: '20px',
// //               resize: 'none',
// //               minHeight: '44px',
// //               maxHeight: '100px',
// //               fontFamily: 'inherit',
// //               fontSize: '14px',
// //               outline: 'none',
// //               transition: 'border-color 0.2s ease',
// //               background: 'var(--background)',
// //               color: 'var(--foreground)'
// //             }}
// //             onFocus={e => {
// //               e.target.style.borderColor = 'var(--gold)';
// //             }}
// //             onBlur={e => {
// //               e.target.style.borderColor = 'var(--border)';
// //             }}
// //           />
// //           <button
// //             type="submit"
// //             disabled={loading || !input.trim()}
// //             style={{
// //               width: '44px',
// //               height: '44px',
// //               borderRadius: '50%',
// //               background: 'var(--gold)',
// //               color: 'var(--black)',
// //               border: 'none',
// //               cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
// //               display: 'flex',
// //               alignItems: 'center',
// //               justifyContent: 'center',
// //               opacity: (loading || !input.trim()) ? 0.6 : 1,
// //               transition: 'all 0.2s ease',
// //               flexShrink: 0
// //             }}
// //             onMouseEnter={e => {
// //               if (!loading && input.trim()) {
// //                 e.target.style.background = 'var(--gold-light)';
// //                 e.target.style.transform = 'scale(1.05)';
// //               }
// //             }}
// //             onMouseLeave={e => {
// //               if (!loading && input.trim()) {
// //                 e.target.style.background = 'var(--gold)';
// //                 e.target.style.transform = 'scale(1)';
// //               }
// //             }}
// //           >
// //             <FiSend size={16} />
// //           </button>
// //         </form>
// //       </div>

// //       <style>
// //         {`
// //           @keyframes pulse {
// //             0% { opacity: 1; }
// //             50% { opacity: 0.5; }
// //             100% { opacity: 1; }
// //           }
// //         `}
// //       </style>
// //     </div>
// //   );
// // };

// // export default ChatWindow;





































// import React, { useState, useEffect, useRef } from 'react';
// import { supabase } from '../../../lib/supabase';
// import ReactMarkdown from 'react-markdown';
// import { v4 as uuidv4 } from 'uuid';
// import { FiSend, FiX } from "react-icons/fi";

// const ChatWindow = ({ onClose }) => {
//   const [messages, setMessages] = useState([
//     {
//       id: 'welcome-msg',
//       text: "Hello! I'm your AI assistant. How can I help improve your website today?",
//       sender: 'bot',
//       isBot: true,
//       timestamp: new Date().toISOString(),
//     }
//   ]);

//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [userId, setUserId] = useState(null);
//   const [userVerified, setUserVerified] = useState(null);
//   const [userCompany, setUserCompany] = useState(null);
//   const [userBusinessType, setUserBusinessType] = useState(null);
//   const [userUsername, setUserName] = useState(null);
//   const [userApplicationType, setUserApplicationType] = useState(null);
  
//   const messagesEndRef = useRef(null);
//   const chatContainerRef = useRef(null);
//   const pollingRef = useRef(null);
//   const isUserScrollingRef = useRef(false);

//   useEffect(() => {
//     const setupUser = () => {
//       let currentUserId = localStorage.getItem('chat_user_id');
//       if (!currentUserId) {
//         currentUserId = uuidv4();
//         localStorage.setItem('chat_user_id', currentUserId);
//       }
//       setUserId(currentUserId);
//     };
//     setupUser();
//   }, []);

//   useEffect(() => {
//     const checkUserPlan = async () => {
//       try {
//         const { data: { user } } = await supabase.auth.getUser();
        
//         if (user) {
//           const { data: profile, error } = await supabase
//             .from('profiles')
//             .select('verified, business_name, business_type, name, application_type')
//             .eq('id', user.id)
//             .single();
            
//           if (error) throw error;
//           setUserVerified(profile?.verified || null);
//           setUserCompany(profile?.business_name || null);
//           setUserBusinessType(profile?.business_type || null);
//           setUserName(profile?.name || null);
//           setUserApplicationType(profile?.application_type || null);
//         }
//       } catch (error) {
//         console.error('Error checking user plan:', error);
//       }
//     };

//     checkUserPlan();
//   }, []);

//   // Fetch messages with polling instead of real-time
//   const fetchMessages = async () => {
//     if (!userId) return;

//     try {
//       const { data, error } = await supabase
//         .from('messages')
//         .select('*')
//         .order('timestamp', { ascending: true });

//       if (error) {
//         console.error('Error fetching messages:', error);
//       } else if (data && data.length > 0) {
//         setMessages(data);
//       }
//     } catch (error) {
//       console.error('Error in fetchMessages:', error);
//     }
//   };

//   // Initial fetch and setup polling
//   useEffect(() => {
//     if (!userId) return;

//     fetchMessages();

//     // Set up polling every 2 seconds
//     pollingRef.current = setInterval(fetchMessages, 2000);

//     return () => {
//       if (pollingRef.current) {
//         clearInterval(pollingRef.current);
//       }
//     };
//   }, [userId]);

//   // Smart auto-scroll to bottom only if user was already at bottom
//   useEffect(() => {
//     if (isUserScrollingRef.current) return;
    
//     const container = chatContainerRef.current;
//     if (!container) return;
    
//     // Check if user is near the bottom of the chat
//     const scrollThreshold = 100; // pixels from bottom
//     const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight <= scrollThreshold;
    
//     // Only scroll to bottom if user was already near bottom
//     if (isNearBottom) {
//       messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   // Handle scroll events to detect user scrolling
//   useEffect(() => {
//     const container = chatContainerRef.current;
//     if (!container) return;

//     const handleScroll = () => {
//       const scrollThreshold = 100;
//       const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight <= scrollThreshold;
      
//       // If user is scrolling manually and not near bottom, mark as user scrolling
//       isUserScrollingRef.current = !isNearBottom;
      
//       // If user scrolls to bottom, reset the flag
//       if (isNearBottom) {
//         isUserScrollingRef.current = false;
//       }
//     };

//     container.addEventListener('scroll', handleScroll);
//     return () => container.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       if (!loading && input.trim()) {
//         sendMessage(e);
//       }
//     }
//   };

//   const sendMessage = async (e) => {
//     e.preventDefault();
//     if (!input.trim() || !userId || loading) return;

//     const userMessage = {
//       text: input,
//       sender: userId,
//       isBot: false,
//       timestamp: new Date().toISOString(),
//     };

//     // Optimistic update for user message
//     setMessages(prev => [...prev, userMessage]);
//     setLoading(true);
//     setInput('');

//     try {
//       // Insert user message
//       const { error: userError } = await supabase
//         .from('messages')
//         .insert([userMessage]);

//       if (userError) throw userError;

//       // Prepare chat history for OpenAI
//       const chatHistory = messages
//         .filter(m => m.text && m.id !== 'welcome-msg')
//         .map(m => ({
//           role: m.isBot ? 'assistant' : 'user',
//           content: m.text,
//         }));

//       chatHistory.push({ role: 'user', content: userMessage.text });

//       const systemPrompt = `
//         You are the "MVP JumpStart Assistant," an AI expert dedicated to helping businesses rapidly launch and optimize their SaaS (Software as a Service) Minimum Viable Product (MVP).

//         Your core mission is to provide actionable, pragmatic, and immediate advice to validate the business idea, attract early users, and lay a strong foundation for growth.

//         **User Context for Tailored Advice:**
//         - **User:** ${userUsername || 'Founder'}
//         - **Company:** ${userCompany || 'Not Provided'}
//         - **Business/Industry:** ${userBusinessType || 'Not Specified'}
//         - **Application Type:** ${userApplicationType || 'Not Specified'}

//         **Primary Focus Areas (Tailored to the above context):**
//         1.  **MVP Strategy & Scope:** Advice on core feature prioritization for a ${userApplicationType} in the ${userBusinessType} industry, user stories, and avoiding scope creep.
//         2.  **Landing Page Optimization:** Critiquing and improving the key page that converts visitors into leads or users (value proposition, call-to-action, social proof).
//         3.  **User Onboarding & Flow:** Simplifying the sign-up and first-time user experience for a ${userApplicationType} to reduce friction and increase activation.
//         4.  **Growth & Validation Loops:** Suggestions for waitlists, beta programs, feedback collection, and early-stage marketing channels relevant to ${userBusinessType}.
//         5.  **Technical Foundation:** High-level recommendations on tech stack, scalability, and security best practices for a nascent ${userApplicationType}.

//         **Rules of Engagement:**
//         - **Be Actionable:** Provide concrete, implementable fixes, not just theory. Use bullet points, checklists, and clear steps.
//         - **Be Concise:** Founders are busy. Prioritize the most critical "quick wins" and "must-haves" first.
//         - **Be Pragmatic:** Recommend cost-effective and time-efficient solutions suitable for an MVP, not enterprise-grade systems.
//         - **Score the MVP:** Provide a "Launch Readiness Score" (0-100) based on the provided information. This score should assess the clarity of the value proposition, simplicity of the user journey, and effectiveness of the call-to-action.
//         - **Stay On Topic:** If a user asks unrelated questions, politely redirect them to the core focus areas of SaaS MVP building and optimization.
//         - **Leverage Context:** Use the provided User Context (Company, Business Type, App Type) to make your recommendations specific and highly relevant. If this data is missing, politely ask for it to give better advice.

//         **Always begin your analysis by assessing the single most important thing for ${userCompany}: Is the core value proposition for their ${userApplicationType} immediately clear to a first-time visitor?**
//         `;

//       // Call OpenAI API
//       const response = await fetch('/api/chat', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           messages: chatHistory,
//           systemPrompt: systemPrompt,
//           userCompany: userCompany,
//           userBusinessType: userBusinessType,
//           userUsername: userUsername
//         })
//       });

//       if (!response.ok) {
//         const errorResult = await response.json();
//         throw new Error(errorResult.error || 'Failed to get response from API');
//       }

//       const result = await response.json();
//       const botReply = result.message;

//       // Create bot message
//       const botMessage = {
//         text: botReply,
//         sender: 'bot',
//         isBot: true,
//         timestamp: new Date().toISOString(),
//       };

//       // Optimistic update for bot message
//       setMessages(prev => [...prev, botMessage]);

//       // Insert bot message to database
//       const { error: botError } = await supabase
//         .from('messages')
//         .insert([botMessage]);

//       if (botError) throw botError;

//     } catch (err) {
//       console.error('Chat error:', err);
      
//       // Remove optimistic updates on error
//       setMessages(prev => prev.filter(msg => 
//         msg.timestamp !== userMessage.timestamp && 
//         (!msg.timestamp || msg.timestamp !== userMessage.timestamp)
//       ));

//       const fallbackMessage = {
//         text: "Oops! Something went wrong. Please try again later.",
//         sender: 'bot',
//         isBot: true,
//         timestamp: new Date().toISOString(),
//       };
      
//       // Add fallback message
//       setMessages(prev => [...prev, fallbackMessage]);
      
//       // Also save to database
//       await supabase.from('messages').insert([fallbackMessage]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{
//       width: '350px',
//       height: '500px',
//       background: 'var(--card-bg)',
//       borderRadius: '12px',
//       boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
//       display: 'flex',
//       flexDirection: 'column',
//       overflow: 'hidden',
//       border: '1px solid var(--border)'
//     }}>
//       {/* Header */}
//       <div style={{
//         background: 'var(--gold)',
//         color: 'var(--black)',
//         padding: '15px',
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         borderTopLeftRadius: '12px',
//         borderTopRightRadius: '12px'
//       }}>
//         <div>
//           <strong style={{ fontWeight: '600' }}>AI Assistant</strong>
//           <div style={{ fontSize: '12px', opacity: 0.8 }}>Ready to help you</div>
//         </div>
//         <button
//           onClick={onClose}
//           style={{
//             background: 'rgba(0,0,0,0.1)',
//             border: 'none',
//             color: 'var(--black)',
//             cursor: 'pointer',
//             fontSize: '18px',
//             padding: '6px',
//             borderRadius: '50%',
//             width: '32px',
//             height: '32px',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             transition: 'all 0.2s ease'
//           }}
//           onMouseEnter={e => {
//             e.currentTarget.style.background = 'rgba(0,0,0,0.2)';
//           }}
//           onMouseLeave={e => {
//             e.currentTarget.style.background = 'rgba(0,0,0,0.1)';
//           }}
//         >
//           <FiX />
//         </button>
//       </div>

//       {/* Messages */}
//       <div 
//         ref={chatContainerRef}
//         style={{
//           flex: 1,
//           padding: '15px',
//           overflowY: 'auto',
//           background: 'var(--background)'
//         }}
//       >
//         {messages.map(msg => (
//           <div key={`${msg.id}-${msg.timestamp}`} style={{
//             marginBottom: '15px',
//             display: 'flex',
//             justifyContent: msg.isBot ? 'flex-start' : 'flex-end'
//           }}>
//             <div style={{
//               background: msg.isBot ? 'var(--card-bg)' : 'var(--gold)',
//               color: msg.isBot ? 'var(--foreground)' : 'var(--black)',
//               padding: '12px 16px',
//               borderRadius: '18px',
//               maxWidth: '80%',
//               boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//               border: msg.isBot ? '1px solid var(--border)' : 'none'
//             }}>
//               <ReactMarkdown>
//                 {msg.text}
//               </ReactMarkdown>
//               <div style={{
//                 fontSize: '11px',
//                 opacity: 0.7,
//                 marginTop: '5px',
//                 textAlign: msg.isBot ? 'left' : 'right'
//               }}>
//                 {msg.isBot ? 'Agent' : 'You'}
//               </div>
//             </div>
//           </div>
//         ))}

//         {loading && (
//           <div style={{
//             display: 'flex',
//             justifyContent: 'flex-start',
//             marginBottom: '15px'
//           }}>
//             <div style={{
//               background: 'var(--card-bg)',
//               padding: '12px 16px',
//               borderRadius: '18px',
//               boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '10px'
//             }}>
//               <div style={{
//                 width: '12px',
//                 height: '12px',
//                 borderRadius: '50%',
//                 background: 'var(--gold)',
//                 animation: 'pulse 1.5s infinite'
//               }}></div>
//               <span style={{ fontSize: '14px', color: 'var(--foreground)' }}>Typing...</span>
//             </div>
//           </div>
//         )}

//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input */}
//       <div style={{
//         padding: '15px',
//         background: 'var(--card-bg)',
//         borderTop: '1px solid var(--border)'
//       }}>
//         <form onSubmit={sendMessage} style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
//           <textarea
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder="Type your message..."
//             disabled={loading}
//             style={{
//               flex: 1,
//               padding: '12px 16px',
//               border: '1px solid var(--border)',
//               borderRadius: '20px',
//               resize: 'none',
//               minHeight: '44px',
//               maxHeight: '100px',
//               fontFamily: 'inherit',
//               fontSize: '14px',
//               outline: 'none',
//               transition: 'border-color 0.2s ease',
//               background: 'var(--background)',
//               color: 'var(--foreground)'
//             }}
//             onFocus={e => {
//               e.target.style.borderColor = 'var(--gold)';
//             }}
//             onBlur={e => {
//               e.target.style.borderColor = 'var(--border)';
//             }}
//           />
//           <button
//             type="submit"
//             disabled={loading || !input.trim()}
//             style={{
//               width: '44px',
//               height: '44px',
//               borderRadius: '50%',
//               background: 'var(--gold)',
//               color: 'var(--black)',
//               border: 'none',
//               cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               opacity: (loading || !input.trim()) ? 0.6 : 1,
//               transition: 'all 0.2s ease',
//               flexShrink: 0
//             }}
//             onMouseEnter={e => {
//               if (!loading && input.trim()) {
//                 e.target.style.background = 'var(--gold-light)';
//                 e.target.style.transform = 'scale(1.05)';
//               }
//             }}
//             onMouseLeave={e => {
//               if (!loading && input.trim()) {
//                 e.target.style.background = 'var(--gold)';
//                 e.target.style.transform = 'scale(1)';
//               }
//             }}
//           >
//             <FiSend size={16} />
//           </button>
//         </form>
//       </div>

//       <style>
//         {`
//           @keyframes pulse {
//             0% { opacity: 1; }
//             50% { opacity: 0.5; }
//             100% { opacity: 1; }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default ChatWindow;
























import React, { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import ReactMarkdown from 'react-markdown';
import { v4 as uuidv4 } from 'uuid';
import { FiSend, FiX } from "react-icons/fi";

const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome-msg',
      text: "Hello! I'm your AI assistant. How can I help improve your website today?",
      sender: 'bot',
      isBot: true,
      timestamp: new Date().toISOString(),
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userVerified, setUserVerified] = useState(null);
  const [userCompany, setUserCompany] = useState(null);
  const [userBusinessType, setUserBusinessType] = useState(null);
  const [userUsername, setUserName] = useState(null);
  const [userApplicationType, setUserApplicationType] = useState(null);
  
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const pollingRef = useRef(null);
  const isUserScrollingRef = useRef(false);
  const lastMessageCountRef = useRef(0);
  const initialLoadRef = useRef(true);

  useEffect(() => {
    const setupUser = () => {
      let currentUserId = localStorage.getItem('chat_user_id');
      if (!currentUserId) {
        currentUserId = uuidv4();
        localStorage.setItem('chat_user_id', currentUserId);
      }
      setUserId(currentUserId);
    };
    setupUser();
  }, []);

  useEffect(() => {
    const checkUserPlan = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('verified, business_name, business_type, name, application_type')
            .eq('id', user.id)
            .single();
            
          if (error) throw error;
          setUserVerified(profile?.verified || null);
          setUserCompany(profile?.business_name || null);
          setUserBusinessType(profile?.business_type || null);
          setUserName(profile?.name || null);
          setUserApplicationType(profile?.application_type || null);
        }
      } catch (error) {
        console.error('Error checking user plan:', error);
      }
    };

    checkUserPlan();
  }, []);

  // Scroll to bottom function
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Fetch messages with polling instead of real-time
  const fetchMessages = async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('timestamp', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
      } else if (data && data.length > 0) {
        setMessages(data);
      }
    } catch (error) {
      console.error('Error in fetchMessages:', error);
    }
  };

  // Initial fetch and setup polling
  useEffect(() => {
    if (!userId) return;

    fetchMessages();

    // Set up polling every 2 seconds
    pollingRef.current = setInterval(fetchMessages, 2000);

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, [userId]);

  // Auto-scroll to bottom on new messages and initial load
  useEffect(() => {
    // Always scroll to bottom on initial load
    if (initialLoadRef.current) {
      scrollToBottom();
      initialLoadRef.current = false;
      return;
    }

    // Don't scroll if user is manually scrolling
    if (isUserScrollingRef.current) return;
    
    // Scroll to bottom when new messages arrive
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Handle scroll events to detect user scrolling
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    let scrollTimeout;
    
    const handleScroll = () => {
      // Clear any existing timeout
      clearTimeout(scrollTimeout);
      
      // User is actively scrolling
      isUserScrollingRef.current = true;
      
      // Set a timeout to reset the flag when scrolling stops
      scrollTimeout = setTimeout(() => {
        isUserScrollingRef.current = false;
      }, 300);
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!loading && input.trim()) {
        sendMessage(e);
      }
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || !userId || loading) return;

    const userMessage = {
      text: input,
      sender: userId,
      isBot: false,
      timestamp: new Date().toISOString(),
    };

    // Optimistic update for user message
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setInput('');

    try {
      // Insert user message
      const { error: userError } = await supabase
        .from('messages')
        .insert([userMessage]);

      if (userError) throw userError;

      // Prepare chat history for OpenAI
      const chatHistory = messages
        .filter(m => m.text && m.id !== 'welcome-msg')
        .map(m => ({
          role: m.isBot ? 'assistant' : 'user',
          content: m.text,
        }));

      chatHistory.push({ role: 'user', content: userMessage.text });

      const systemPrompt = `
        You are the "MVP JumpStart Assistant," an AI expert dedicated to helping businesses rapidly launch and optimize their SaaS (Software as a Service) Minimum Viable Product (MVP).

        Your core mission is to provide actionable, pragmatic, and immediate advice to validate the business idea, attract early users, and lay a strong foundation for growth.

        **User Context for Tailored Advice:**
        - **User:** ${userUsername || 'Founder'}
        - **Company:** ${userCompany || 'Not Provided'}
        - **Business/Industry:** ${userBusinessType || 'Not Specified'}
        - **Application Type:** ${userApplicationType || 'Not Specified'}

        **Primary Focus Areas (Tailored to the above context):**
        1.  **MVP Strategy & Scope:** Advice on core feature prioritization for a ${userApplicationType} in the ${userBusinessType} industry, user stories, and avoiding scope creep.
        2.  **Landing Page Optimization:** Critiquing and improving the key page that converts visitors into leads or users (value proposition, call-to-action, social proof).
        3.  **User Onboarding & Flow:** Simplifying the sign-up and first-time user experience for a ${userApplicationType} to reduce friction and increase activation.
        4.  **Growth & Validation Loops:** Suggestions for waitlists, beta programs, feedback collection, and early-stage marketing channels relevant to ${userBusinessType}.
        5.  **Technical Foundation:** High-level recommendations on tech stack, scalability, and security best practices for a nascent ${userApplicationType}.

        **Rules of Engagement:**
        - **Be Actionable:** Provide concrete, implementable fixes, not just theory. Use bullet points, checklists, and clear steps.
        - **Be Concise:** Founders are busy. Prioritize the most critical "quick wins" and "must-haves" first.
        - **Be Pragmatic:** Recommend cost-effective and time-efficient solutions suitable for an MVP, not enterprise-grade systems.
        - **Score the MVP:** Provide a "Launch Readiness Score" (0-100) based on the provided information. This score should assess the clarity of the value proposition, simplicity of the user journey, and effectiveness of the call-to-action.
        - **Stay On Topic:** If a user asks unrelated questions, politely redirect them to the core focus areas of SaaS MVP building and optimization.
        - **Leverage Context:** Use the provided User Context (Company, Business Type, App Type) to make your recommendations specific and highly relevant. If this data is missing, politely ask for it to give better advice.

        **Always begin your analysis by assessing the single most important thing for ${userCompany}: Is the core value proposition for their ${userApplicationType} immediately clear to a first-time visitor?**
        `;

      // Call OpenAI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: chatHistory,
          systemPrompt: systemPrompt,
          userCompany: userCompany,
          userBusinessType: userBusinessType,
          userUsername: userUsername
        })
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.error || 'Failed to get response from API');
      }

      const result = await response.json();
      const botReply = result.message;

      // Create bot message
      const botMessage = {
        text: botReply,
        sender: 'bot',
        isBot: true,
        timestamp: new Date().toISOString(),
      };

      // Optimistic update for bot message
      setMessages(prev => [...prev, botMessage]);

      // Insert bot message to database
      const { error: botError } = await supabase
        .from('messages')
        .insert([botMessage]);

      if (botError) throw botError;

    } catch (err) {
      console.error('Chat error:', err);
      
      // Remove optimistic updates on error
      setMessages(prev => prev.filter(msg => 
        msg.timestamp !== userMessage.timestamp && 
        (!msg.timestamp || msg.timestamp !== userMessage.timestamp)
      ));

      const fallbackMessage = {
        text: "Oops! Something went wrong. Please try again later.",
        sender: 'bot',
        isBot: true,
        timestamp: new Date().toISOString(),
      };
      
      // Add fallback message
      setMessages(prev => [...prev, fallbackMessage]);
      
      // Also save to database
      await supabase.from('messages').insert([fallbackMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      width: '350px',
      height: '500px',
      background: 'var(--card-bg)',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      border: '1px solid var(--border)'
    }}>
      {/* Header */}
      <div style={{
        background: 'var(--gold)',
        color: 'var(--black)',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopLeftRadius: '12px',
        borderTopRightRadius: '12px'
      }}>
        <div>
          <strong style={{ fontWeight: '600' }}>AI Assistant</strong>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>Ready to help you</div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'rgba(0,0,0,0.1)',
            border: 'none',
            color: 'var(--black)',
            cursor: 'pointer',
            fontSize: '18px',
            padding: '6px',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(0,0,0,0.2)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(0,0,0,0.1)';
          }}
        >
          <FiX />
        </button>
      </div>

      {/* Messages */}
      <div 
        ref={chatContainerRef}
        style={{
          flex: 1,
          padding: '15px',
          overflowY: 'auto',
          background: 'var(--background)'
        }}
      >
        {messages.map(msg => (
          <div key={`${msg.id}-${msg.timestamp}`} style={{
            marginBottom: '15px',
            display: 'flex',
            justifyContent: msg.isBot ? 'flex-start' : 'flex-end'
          }}>
            <div style={{
              background: msg.isBot ? 'var(--card-bg)' : 'var(--gold)',
              color: msg.isBot ? 'var(--foreground)' : 'var(--black)',
              padding: '12px 16px',
              borderRadius: '18px',
              maxWidth: '80%',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              border: msg.isBot ? '1px solid var(--border)' : 'none'
            }}>
              <ReactMarkdown>
                {msg.text}
              </ReactMarkdown>
              <div style={{
                fontSize: '11px',
                opacity: 0.7,
                marginTop: '5px',
                textAlign: msg.isBot ? 'left' : 'right'
              }}>
                {msg.isBot ? 'Agent' : 'You'}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div style={{
            display: 'flex',
            justifyContent: 'flex-start',
            marginBottom: '15px'
          }}>
            <div style={{
              background: 'var(--card-bg)',
              padding: '12px 16px',
              borderRadius: '18px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: 'var(--gold)',
                animation: 'pulse 1.5s infinite'
              }}></div>
              <span style={{ fontSize: '14px', color: 'var(--foreground)' }}>Typing...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: '15px',
        background: 'var(--card-bg)',
        borderTop: '1px solid var(--border)'
      }}>
        <form onSubmit={sendMessage} style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={loading}
            style={{
              flex: 1,
              padding: '12px 16px',
              border: '1px solid var(--border)',
              borderRadius: '20px',
              resize: 'none',
              minHeight: '44px',
              maxHeight: '100px',
              fontFamily: 'inherit',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s ease',
              background: 'var(--background)',
              color: 'var(--foreground)'
            }}
            onFocus={e => {
              e.target.style.borderColor = 'var(--gold)';
            }}
            onBlur={e => {
              e.target.style.borderColor = 'var(--border)';
            }}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'var(--gold)',
              color: 'var(--black)',
              border: 'none',
              cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: (loading || !input.trim()) ? 0.6 : 1,
              transition: 'all 0.2s ease',
              flexShrink: 0
            }}
            onMouseEnter={e => {
              if (!loading && input.trim()) {
                e.target.style.background = 'var(--gold-light)';
                e.target.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={e => {
              if (!loading && input.trim()) {
                e.target.style.background = 'var(--gold)';
                e.target.style.transform = 'scale(1)';
              }
            }}
          >
            <FiSend size={16} />
          </button>
        </form>
      </div>

      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default ChatWindow;