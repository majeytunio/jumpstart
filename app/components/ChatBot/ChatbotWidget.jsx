// // // // src/ChatbotWidget.js
// // // // This component handles the floating behavior and toggles the ChatWindow visibility.

// // // import React, { useState, useEffect } from 'react';
// // // // Import react-icons
// // // import { BsChatDots, BsXLg } from 'react-icons/bs';
// // // import ChatWindow from './ChatWindow'; // Assuming ChatWindow.js is in the same directory

// // // import { supabase } from '../../../lib/supabase';

// // // const ChatbotWidget = () => {
// // //   const [isOpen, setIsOpen] = useState(false);


// // //   // const [userPlan, setUserPlan] = useState(null);
// // //   // useEffect(() => {
// // //   //   const checkUserPlan = async () => {
// // //   //     try {
// // //   //       const { data: { user } } = await supabase.auth.getUser();
        
// // //   //       if (user) {
// // //   //         const { data: profile, error } = await supabase
// // //   //           .from('profiles')
// // //   //           .select('plan')
// // //   //           .eq('id', user.id)
// // //   //           .single();
            
// // //   //         if (error) throw error;
// // //   //         setUserPlan(profile?.plan || null);
// // //   //       }
// // //   //     } catch (error) {
// // //   //       console.error('Error checking user plan:', error);
// // //   //     }
// // //   //   };

// // //   //   checkUserPlan();
// // //   // }, []);

// // //   // console.log("User Plan: " + userPlan);

// // //   // // Don't render anything if user doesn't have pro/business plan
// // //   // if (!['pro', 'business'].includes(userPlan)) {
// // //   //   return null;
// // //   // }


// // //   return (
// // //     <>
// // //       {/* Floating Chat Button */}
// // //       <button
// // //         onClick={() => setIsOpen(!isOpen)}
// // //         className="btn rounded-circle shadow-lg position-fixed bottom-0 end-0 m-4"
// // //         style={{ 
// // //           lineHeight: '30px', 
// // //           width: '60px', 
// // //           height: '60px', 
// // //           fontSize: '1.7rem',
// // //           zIndex: 70, 
// // //           transition: 'transform 0.3s ease-in-out', 
// // //           transform: isOpen ? 'scale(1.0)' : 'scale(1.0)',
// // //           background: '#fff'
// // //         }}
// // //         onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
// // //         onMouseLeave={e => e.currentTarget.style.transform = 'scale(1.0)'}
// // //         aria-label={isOpen ? "Close Chat" : "Open Chat"}
// // //       >
// // //         {isOpen ? (
// // //           // Close icon (X) from react-icons
// // //           <BsXLg />
// // //         ) : (
// // //           // Chat icon from react-icons
// // //           <BsChatDots />
// // //         )}
// // //       </button>

// // //       {/* Chat Window - conditionally rendered based on isOpen state */}
// // //       {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
// // //     </>
// // //   );
// // // };

// // // export default ChatbotWidget;













// // import React, { useState } from 'react';
// // import { BsChatDots, BsXLg } from 'react-icons/bs';
// // import ChatWindow from './ChatWindow';

// // const ChatbotWidget = () => {
// //   const [isOpen, setIsOpen] = useState(false);

// //   return (
// //     <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 10000 }}>
// //       {/* Floating Chat Button */}
// //       <button
// //         onClick={() => setIsOpen(!isOpen)}
// //         className="btn rounded-circle shadow"
// //         style={{ 
// //           width: '60px', 
// //           height: '60px', 
// //           fontSize: '1.7rem',
// //           background: '#007bff',
// //           color: 'white',
// //           border: 'none',
// //           display: 'flex',
// //           alignItems: 'center',
// //           justifyContent: 'center',
// //           transition: 'all 0.3s ease',
// //           boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
// //         }}
// //         onMouseEnter={e => {
// //           e.currentTarget.style.transform = 'scale(1.1)';
// //           e.currentTarget.style.background = '#0056b3';
// //         }}
// //         onMouseLeave={e => {
// //           e.currentTarget.style.transform = 'scale(1.0)';
// //           e.currentTarget.style.background = '#007bff';
// //         }}
// //         aria-label={isOpen ? "Close Chat" : "Open Chat"}
// //       >
// //         {isOpen ? <BsXLg /> : <BsChatDots />}
// //       </button>

// //       {/* Chat Window */}
// //       {isOpen && (
// //         <div style={{ 
// //           position: 'absolute', 
// //           bottom: '70px', 
// //           right: '0',
// //           zIndex: 10001 
// //         }}>
// //           <ChatWindow onClose={() => setIsOpen(false)} />
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ChatbotWidget;




















// import React, { useState } from 'react';
// import { BsChatDots, BsXLg } from 'react-icons/bs';
// import ChatWindow from './ChatWindow';

// const ChatbotWidget = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 10000 }}>
//       {/* Floating Chat Button - Hidden when chat is open */}
//       {!isOpen && (
//         <button
//           onClick={() => setIsOpen(true)}
//           className="btn rounded-circle shadow"
//           style={{ 
//             width: '60px', 
//             height: '60px', 
//             fontSize: '1.7rem',
//             background: '#007bff',
//             color: 'white',
//             border: 'none',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             transition: 'all 0.3s ease',
//             boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
//             borderRadius: '50%'
//           }}
//           onMouseEnter={e => {
//             e.currentTarget.style.transform = 'scale(1.1)';
//             e.currentTarget.style.background = '#0056b3';
//           }}
//           onMouseLeave={e => {
//             e.currentTarget.style.transform = 'scale(1.0)';
//             e.currentTarget.style.background = '#007bff';
//           }}
//           aria-label="Open Chat"
//         >
//           <BsChatDots />
//         </button>
//       )}

//       {/* Chat Window */}
//       {isOpen && (
//         <div style={{ 
//           position: 'absolute', 
//           bottom: '0',
//           right: '0',
//           zIndex: 10001 
//         }}>
//           <ChatWindow onClose={() => setIsOpen(false)} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatbotWidget;





















import React, { useState } from 'react';
import { BsChatDots, BsXLg } from 'react-icons/bs';
import ChatWindow from './ChatWindow';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '20px', 
      right: '20px', 
      zIndex: 10000 
    }}>
      {/* Floating Chat Button - Hidden when chat is open */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{ 
            width: '60px', 
            height: '60px', 
            fontSize: '1.7rem',
            background: 'var(--gold)',
            color: 'var(--black)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            borderRadius: '50%',
            cursor: 'pointer'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--gold-light)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'var(--gold)';
            e.currentTarget.style.transform = 'scale(1.0)';
          }}
          aria-label="Open Chat"
        >
          <BsChatDots />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div style={{ 
          position: 'absolute', 
          bottom: '0',
          right: '0',
          zIndex: 10001 
        }}>
          <ChatWindow onClose={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;