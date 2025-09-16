

// // 'use client'

// // import { useState, useEffect } from "react";
// // import Navbar from '../components/Navbar';
// // import Footer from '../components/Footer';
// // import { supabase } from "../../lib/supabase";

// // import Image from 'next/image';

// // export default function Assessment360() {
// //   const [currentUser, setCurrentUser] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   const [selectedTier, setSelectedTier] = useState(null);
  
// //   // ✅ Auth init
// //   useEffect(() => {
// //     const init = async () => {
// //       const { data: { session } } = await supabase.auth.getSession();
// //       if (session?.user) {
// //         setCurrentUser(session.user);
// //       }
// //       setLoading(false);
// //     };

// //     init();

// //     const { data: { subscription } } = supabase.auth.onAuthStateChange(
// //       async (_, session) => {
// //         if (session?.user) {
// //           setCurrentUser(session.user);
// //         } else {
// //           setCurrentUser(null);
// //         }
// //       }
// //     );

// //     return () => {
// //       subscription.unsubscribe();
// //     };
// //   }, []);


// //   return (
// //     <>
// //       <Navbar currentUser={currentUser} />
// //       <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 py-12">
        
// //         {/* Header */}
// //         <section className="max-w-4xl mx-auto text-center mb-12">

// //           <Image
// //             alt="The Book Cover"
// //             src={'/360_assessment_logo.png'}
// //             width={400}
// //             height={600}
// //             className="w-50 h-auto object-contain rounded-xl mx-auto mb-12 shadow-lg"
// //             />

// //           <h1 className="text-3xl font-bold mb-4">Stabilizing Your Life. Scaling Your SaaS.</h1>
// //           <p className="text-lg text-[var(--muted-foreground)]">
// //             With the <span className="font-semibold">Founder Life Balance 360 Assessment, SaaS Jumpstart MVP</span> helps you recalibrate
// //             every month—so your health, focus, and identity stay stable while you act on AI-powered
// //             predictions and turn ideas into scalable SaaS platforms.
// //           </p>
// //         </section>

// //         {/* Credibility Block */}
// //         <section className="max-w-5xl mx-auto bg-[var(--card-bg)] p-6 rounded-xl border border-[var(--border)] shadow-sm mb-12">
// //           <h2 className="text-xl font-semibold mb-3">The Founder Life Balance 360 Assessment</h2>
// //           <p className="text-[var(--muted-foreground)] leading-relaxed">
// //             is essential for everyone in SaaS Jumpstart MVP
// //             because prediction without readiness is wasted potential. SaaS AI solutions thrive by turning
// //             uncertainty into reliable prediction, but if you are unbalanced—financially, physically, socially,
// //             intellectually, or in your identity—you won’t have the capacity to act on those insights. Just as
// //             private equity firms protect value by eliminating key-person risk, the 360 ensures you eliminate
// //             blind spots that could stall your growth. By taking it monthly, you create a rhythm of recalibration
// //             that strengthens your health, focus, and execution. In SaaS AI, prediction is the engine, but your
// //             readiness is the operating system—and the 360 keeps both aligned so your ideas can scale into
// //             lasting platforms.
// //           </p>
// //         </section>

// //       </main>
// //       <Footer />
// //     </>
// //   );
// // }













// 'use client';

// import { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import { supabase } from '../../lib/supabase';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';

// // 3. Static Question Bank
// const questions = [
//   { category: 'Financial', text: 'I actively study how Private Equity creates wealth through leverage and systems.', key: 'q1' },
//   { category: 'Financial', text: 'I understand how SaaS AI multiplies value faster than traditional business models.', key: 'q2' },
//   { category: 'Financial', text: 'I invest time/resources into learning how to position SaaS as an asset class.', key: 'q3' },
//   { category: 'Financial', text: 'I can explain how leverage, whether through capital, code, premium offers, or people compounds financial outcomes.', key: 'q4' },
//   { category: 'Financial', text: 'I regularly educate myself with books, courses, or mentors in Private Equity or SaaS AI.', key: 'q5' },
//   { category: 'Physical Fitness', text: 'I have consistent energy throughout most days to focus on building my SaaS.', key: 'q6' },
//   { category: 'Physical Fitness', text: 'I exercise at least 3 times per week to strengthen my body and clarity of mind.', key: 'q7' },
//   { category: 'Physical Fitness', text: 'My nutrition supports high performance and mental sharpness.', key: 'q8' },
//   { category: 'Physical Fitness', text: 'I sleep enough to feel restored and ready to execute daily.', key: 'q9' },
//   { category: 'Physical Fitness', text: 'My physical health gives me momentum rather than holding me back.', key: 'q10' },
//   { category: 'Social', text: 'My family and close relationships support my entrepreneurial journey.', key: 'q11' },
//   { category: 'Social', text: 'I have at least one mentor or peer I can talk to about business challenges.', key: 'q12' },
//   { category: 'Social', text: 'I intentionally make time to connect with people outside of work.', key: 'q13' },
//   { category: 'Social', text: 'I feel a sense of community with other SaaS founders and builders.', key: 'q14' },
//   { category: 'Social', text: 'My closest relationships energize me rather than drain me.', key: 'q15' },
//   { category: 'Intellectual', text: 'I dedicate time each week to learning new skills or knowledge.', key: 'q16' },
//   { category: 'Intellectual', text: 'I actively study SaaS, AI, or business systems to stay sharp.', key: 'q17' },
//   { category: 'Intellectual', text: 'I quickly apply what I learn into action for my SaaS.', key: 'q18' },
//   { category: 'Intellectual', text: 'I challenge my own assumptions and seek better models for growth.', key: 'q19' },
//   { category: 'Intellectual', text: 'I’m consistently curious and open to new ideas that can create leverage.', key: 'q20' },
//   { category: 'Identity', text: 'I see myself fully as a SaaS founder, not just \'trying it out.\'', key: 'q21' },
//   { category: 'Identity', text: 'My daily actions reflect the long-term SaaS vision I’m building.', key: 'q22' },
//   { category: 'Identity', text: 'I believe I am worthy of creating significant wealth and impact through SaaS.', key: 'q23' },
//   { category: 'Identity', text: 'I speak and act with certainty that my SaaS success is inevitable.', key: 'q24' },
//   { category: 'Identity', text: 'I feel that my life purpose is aligned with my SaaS journey.', key: 'q25' },
// ];

// export default function Assessment360() {
//   const router = useRouter();
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [responses, setResponses] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [assessmentDisabled, setAssessmentDisabled] = useState(false);

//   useEffect(() => {
//     const init = async () => {
//       const { data: { session } } = await supabase.auth.getSession();
//       if (session?.user) {
//         setCurrentUser(session.user);
//         // Check for existing assessment this month
//         const { data, error } = await supabase
//           .from('assessments')
//           .select('*')
//           .eq('user_id', session.user.id)
//           .gte('created_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString())
//           .limit(1);

//         if (data && data.length > 0) {
//           setAssessmentDisabled(true);
//           // Redirect to results page if needed, or show a message
//           // router.push('/assessment/results');
//         }
//       }
//       setLoading(false);
//     };

//     init();

//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       async (_, session) => {
//         if (session?.user) {
//           setCurrentUser(session.user);
//         } else {
//           setCurrentUser(null);
//         }
//       }
//     );

//     return () => {
//       subscription.unsubscribe();
//     };
//   }, []);

//   const handleResponseChange = (questionKey, value) => {
//     setResponses(prevResponses => ({
//       ...prevResponses,
//       [questionKey]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const requiredKeys = questions.map(q => q.key);
//     const hasAllResponses = requiredKeys.every(key => responses[key] != null);

//     if (!hasAllResponses) {
//       alert('Please answer all questions before submitting.');
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const res = await fetch('/api/assess', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ responses, userId: currentUser.id }),
//       });

//       if (!res.ok) {
//         throw new Error('Failed to submit assessment.');
//       }

//       const result = await res.json();
//       console.log('Assessment result:', result);

//       // Redirect or navigate to the results page with the returned data
//       // router.push('/assessment/results');
//       alert('Assessment submitted successfully! Check the console for the result.');

//     } catch (error) {
//       console.error('Submission error:', error);
//       alert('An error occurred during submission. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <>
//         <Navbar currentUser={currentUser} />
//         <main className="min-h-screen flex items-center justify-center">
//           <p>Loading...</p>
//         </main>
//         <Footer />
//       </>
//     );
//   }

//   if (!currentUser) {
//     return (
//       <>
//         <Navbar currentUser={currentUser} />
//         <main className="min-h-screen flex items-center justify-center">
//           <p>Please log in to take the assessment.</p>
//         </main>
//         <Footer />
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar currentUser={currentUser} />
//       <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 py-12">


//         <section className="max-w-4xl mx-auto text-center mb-12">

//           <Image
//             alt="The Book Cover"
//             src={'/360_assessment_logo.png'}
//             width={400}
//             height={600}
//             className="w-50 h-auto object-contain rounded-xl mx-auto mb-12 shadow-lg"
//             />

//           <h1 className="text-3xl font-bold mb-4">Stabilizing Your Life. Scaling Your SaaS.</h1>
//           <p className="text-lg text-[var(--muted-foreground)]">
//             With the <span className="font-semibold">Founder Life Balance 360 Assessment, SaaS Jumpstart MVP</span> helps you recalibrate
//             every month—so your health, focus, and identity stay stable while you act on AI-powered
//             predictions and turn ideas into scalable SaaS platforms.
//           </p>
//         </section>

//         {/* Credibility Block */}
//         <section className="max-w-5xl mx-auto bg-[var(--card-bg)] p-6 rounded-xl border border-[var(--border)] shadow-sm mb-12">
//           <h2 className="text-xl font-semibold mb-3">The Founder Life Balance 360 Assessment</h2>
//           <p className="text-[var(--muted-foreground)] leading-relaxed">
//             is essential for everyone in SaaS Jumpstart MVP
//             because prediction without readiness is wasted potential. SaaS AI solutions thrive by turning
//             uncertainty into reliable prediction, but if you are unbalanced—financially, physically, socially,
//             intellectually, or in your identity—you won’t have the capacity to act on those insights. Just as
//             private equity firms protect value by eliminating key-person risk, the 360 ensures you eliminate
//             blind spots that could stall your growth. By taking it monthly, you create a rhythm of recalibration
//             that strengthens your health, focus, and execution. In SaaS AI, prediction is the engine, but your
//             readiness is the operating system—and the 360 keeps both aligned so your ideas can scale into
//             lasting platforms.
//           </p>
//         </section>


//         <section className="max-w-4xl mx-auto text-center mb-12">
//           <h1 className="text-3xl font-bold mb-4">Founder Life Balance 360 Assessment</h1>
//           <p className="text-lg text-[var(--muted-foreground)]">
//             Answer the questions below to get your personalized report.
//           </p>
//         </section>

//         {assessmentDisabled ? (
//           <section className="max-w-4xl mx-auto bg-[var(--card-bg)] p-6 rounded-xl border border-[var(--border)] shadow-sm text-center">
//             <h2 className="text-xl font-semibold mb-3">Assessment Complete for this Month</h2>
//             <p className="text-[var(--muted-foreground)]">You have already completed your assessment for the current month. Please check back next month.</p>
//           </section>
//         ) : (
//           <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-[var(--card-bg)] p-6 rounded-xl border border-[var(--border)] shadow-sm">
//             {questions.map((q, index) => (
//               <div key={q.key} className="mb-6">
//                 <p className="font-semibold text-[var(--foreground)] mb-2">
//                   <span className="text-[var(--accent)] font-bold">Q{index + 1}:</span> {q.text}
//                 </p>
//                 <div className="flex justify-between items-center bg-[var(--background)] p-4 rounded-lg border border-[var(--border)]">
//                   {[1, 2, 3, 4, 5].map(value => (
//                     <label key={value} className="flex flex-col items-center cursor-pointer">
//                       <input
//                         type="radio"
//                         name={q.key}
//                         value={value}
//                         onChange={() => handleResponseChange(q.key, value)}
//                         checked={responses[q.key] === value}
//                         className="peer hidden"
//                       />
//                       <span className={`w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border)] transition-colors duration-200 ease-in-out ${
//                         responses[q.key] === value ? 'bg-[var(--primary)] text-[var(--primary-foreground)]' : 'bg-[var(--card-bg)] hover:bg-[var(--muted)]'
//                       }`}>
//                         {value}
//                       </span>
//                       <span className="text-xs mt-1 text-[var(--muted-foreground)]">
//                         {value === 1 ? 'Disagree' : value === 5 ? 'Agree' : ''}
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             ))}
//             <div className="text-center mt-8">
//               <button
//                 type="submit"
//                 className="bg-[var(--primary)] text-[var(--primary-foreground)] px-8 py-3 rounded-lg font-semibold hover:bg-[var(--primary-hover)] transition-colors duration-200"
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
//               </button>
//             </div>
//           </form>
//         )}

//       </main>
//       <Footer />
//     </>
//   );
// }












'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const questions = [
  { category: 'Financial', text: 'I actively study how Private Equity creates wealth through leverage and systems.', key: 'q1' },
  { category: 'Financial', text: 'I understand how SaaS AI multiplies value faster than traditional business models.', key: 'q2' },
  { category: 'Financial', text: 'I invest time/resources into learning how to position SaaS as an asset class.', key: 'q3' },
  { category: 'Financial', text: 'I can explain how leverage, whether through capital, code, premium offers, or people compounds financial outcomes.', key: 'q4' },
  { category: 'Financial', text: 'I regularly educate myself with books, courses, or mentors in Private Equity or SaaS AI.', key: 'q5' },
  { category: 'Physical Fitness', text: 'I have consistent energy throughout most days to focus on building my SaaS.', key: 'q6' },
  { category: 'Physical Fitness', text: 'I exercise at least 3 times per week to strengthen my body and clarity of mind.', key: 'q7' },
  { category: 'Physical Fitness', text: 'My nutrition supports high performance and mental sharpness.', key: 'q8' },
  { category: 'Physical Fitness', text: 'I sleep enough to feel restored and ready to execute daily.', key: 'q9' },
  { category: 'Physical Fitness', text: 'My physical health gives me momentum rather than holding me back.', key: 'q10' },
  { category: 'Social', text: 'My family and close relationships support my entrepreneurial journey.', key: 'q11' },
  { category: 'Social', text: 'I have at least one mentor or peer I can talk to about business challenges.', key: 'q12' },
  { category: 'Social', text: 'I intentionally make time to connect with people outside of work.', key: 'q13' },
  { category: 'Social', text: 'I feel a sense of community with other SaaS founders and builders.', key: 'q14' },
  { category: 'Social', text: 'My closest relationships energize me rather than drain me.', key: 'q15' },
  { category: 'Intellectual', text: 'I dedicate time each week to learning new skills or knowledge.', key: 'q16' },
  { category: 'Intellectual', text: 'I actively study SaaS, AI, or business systems to stay sharp.', key: 'q17' },
  { category: 'Intellectual', text: 'I quickly apply what I learn into action for my SaaS.', key: 'q18' },
  { category: 'Intellectual', text: 'I challenge my own assumptions and seek better models for growth.', key: 'q19' },
  { category: 'Intellectual', text: 'I’m consistently curious and open to new ideas that can create leverage.', key: 'q20' },
  { category: 'Identity', text: 'I see myself fully as a SaaS founder, not just \'trying it out.\'', key: 'q21' },
  { category: 'Identity', text: 'My daily actions reflect the long-term SaaS vision I’m building.', key: 'q22' },
  { category: 'Identity', text: 'I believe I am worthy of creating significant wealth and impact through SaaS.', key: 'q23' },
  { category: 'Identity', text: 'I speak and act with certainty that my SaaS success is inevitable.', key: 'q24' },
  { category: 'Identity', text: 'I feel that my life purpose is aligned with my SaaS journey.', key: 'q25' },
];

export default function Assessment360() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [responses, setResponses] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assessmentDisabled, setAssessmentDisabled] = useState(false);
  const [submissionComplete, setSubmissionComplete] = useState(false); // New state variable

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setCurrentUser(session.user);
        const { data, error } = await supabase
          .from('assessments')
          .select('*')
          .eq('user_id', session.user.id)
          .gte('created_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString())
          .limit(1);

        if (data && data.length > 0) {
          setAssessmentDisabled(true);
        }
      }
      setLoading(false);
    };

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        if (session?.user) {
          setCurrentUser(session.user);
        } else {
          setCurrentUser(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleResponseChange = (questionKey, value) => {
    setResponses(prevResponses => ({
      ...prevResponses,
      [questionKey]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const requiredKeys = questions.map(q => q.key);
    const hasAllResponses = requiredKeys.every(key => responses[key] != null);

    if (!hasAllResponses) {
      alert('Please answer all questions before submitting.');
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/assess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ responses, userId: currentUser.id }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit assessment.');
      }

      const result = await res.json();
      console.log('Assessment result:', result);

      // On successful submission, set submissionComplete to true
      setSubmissionComplete(true);

    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred during submission. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar currentUser={currentUser} />
        <main className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!currentUser) {
    return (
      <>
        <Navbar currentUser={currentUser} />
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 py-12">

          {/* Header */}
          <section className="max-w-4xl mx-auto text-center mb-12">

            <Image
              alt="The Book Cover"
              src={'/360_assessment_logo.png'}
              width={400}
              height={600}
              className="w-50 h-auto object-contain rounded-xl mx-auto mb-12 shadow-lg"
              />

            <h1 className="text-3xl font-bold mb-4">Stabilizing Your Life. Scaling Your SaaS.</h1>
            <p className="text-lg text-[var(--muted-foreground)]">
              With the <span className="font-semibold">Founder Life Balance 360 Assessment, SaaS Jumpstart MVP</span> helps you recalibrate
              every month—so your health, focus, and identity stay stable while you act on AI-powered
              predictions and turn ideas into scalable SaaS platforms.
            </p>
          </section>

          {/* Credibility Block */}
          <section className="max-w-5xl mx-auto bg-[var(--card-bg)] p-6 rounded-xl border border-[var(--border)] shadow-sm mb-12">
            <h2 className="text-xl font-semibold mb-3">The Founder Life Balance 360 Assessment</h2>
            <p className="text-[var(--muted-foreground)] leading-relaxed">
              is essential for everyone in SaaS Jumpstart MVP
              because prediction without readiness is wasted potential. SaaS AI solutions thrive by turning
              uncertainty into reliable prediction, but if you are unbalanced—financially, physically, socially,
              intellectually, or in your identity—you won’t have the capacity to act on those insights. Just as
              private equity firms protect value by eliminating key-person risk, the 360 ensures you eliminate
              blind spots that could stall your growth. By taking it monthly, you create a rhythm of recalibration
              that strengthens your health, focus, and execution. In SaaS AI, prediction is the engine, but your
              readiness is the operating system—and the 360 keeps both aligned so your ideas can scale into
              lasting platforms.
            </p>
          </section>

          
          <section className="max-w-4xl mx-auto bg-[var(--card-bg)] p-6 rounded-xl border border-[var(--border)] shadow-sm text-center">
            <h2 className="text-xl font-semibold mb-3">Please login to take the assessment</h2>

            <a
              href="/auth/login"
              className="bg-[var(--gold)] hover:bg-[var(--gold-light)] 
              text-[var(--black)] px-6 py-3 rounded-md 
              text-lg font-semibold transition
              mt-12
              "
            >
              Login
            </a>

          </section>
          
        </main>
        <Footer />
      </>
    );
  }

  // --- Conditional Rendering for the main content section ---
  const renderAssessmentContent = () => {
    // 1. Show message if assessment is already disabled for the month
    if (assessmentDisabled) {
      return (
        <section className="max-w-4xl mx-auto bg-[var(--card-bg)] p-6 rounded-xl border border-[var(--border)] shadow-sm text-center">
          <h2 className="text-xl font-semibold mb-3">Assessment Complete for this Month</h2>
          <p className="text-[var(--muted-foreground)] mb-10">You have already completed your assessment for the current month. Please check back next month.</p>

          <a
            href="/360-assessment/results"
            className="bg-[var(--gold)] hover:bg-[var(--gold-light)] 
            text-[var(--black)] px-6 py-3 rounded-md 
            text-lg font-semibold transition
            mt-12
            "
          >
            See Result
          </a>

        </section>
      );
    }
    
    // 2. Show thank you message after successful submission
    if (submissionComplete) {
      return (
        <section className="max-w-4xl mx-auto bg-[var(--card-bg)] p-6 rounded-xl border border-[var(--border)] shadow-sm text-center">
          <h2 className="text-xl font-semibold mb-3">Thank You! Your Assessment Has Been Submitted.</h2>
          <p className="text-[var(--muted-foreground)] mb-10">We are generating your personalized report. Please check back soon!</p>

          <a
            href="/360-assessment/results"
            className="bg-[var(--gold)] hover:bg-[var(--gold-light)] 
            text-[var(--black)] px-6 py-3 rounded-md 
            text-lg font-semibold transition
            mt-12
            "
          >
            See Result
          </a>

        </section>
      );
    }

    // 3. Otherwise, show the assessment form
    return (
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-[var(--card-bg)] p-6 rounded-xl border border-[var(--border)] shadow-sm">
        <section className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Founder Life Balance 360 Assessment</h1>
            <p className="text-lg text-[var(--muted-foreground)]">
              Answer the questions below to get your personalized report.
            </p>
          </section>
        {questions.map((q, index) => (
          <div key={q.key} className="mb-6">
            <p className="font-semibold text-[var(--foreground)] mb-2">
              <span className="text-[var(--accent)] font-bold">Q{index + 1}:</span> {q.text}
            </p>
            <div className="flex justify-between items-center bg-[var(--background)] p-4 rounded-lg border border-[var(--border)]">
              {[1, 2, 3, 4, 5].map(value => (
                <label key={value} className="flex flex-col items-center cursor-pointer">
                  <input
                    type="radio"
                    name={q.key}
                    value={value}
                    onChange={() => handleResponseChange(q.key, value)}
                    checked={responses[q.key] === value}
                    className="peer hidden"
                  />
                  <span className={`w-8 h-8 flex items-center justify-center rounded-full 
                  border border-[var(--border)] transition-colors duration-200 ease-in-out 
                  ${
                    responses[q.key] === value  && value !== 1 ? 'bg-[var(--gold)] text-[var(--primary-foreground)]'
                     : 'bg-[var(--card-bg)] hover:bg-[var(--gold)]'
                  }

                  ${responses[q.key] === value && value === 1 ? 'bg-[var(--danger-color)]' : responses[q.key] === value && value === 5 ? 'bg-[var(--success-color)]' : ''}
                  `}>
                    {value}
                    
                  </span>
                  
                  <span className="text-xs mt-1 text-[var(--muted-foreground)]">
                    {value === 1 ? 'Disagree' : value === 5 ? 'Agree' : ''}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <div className="text-center mt-8">
          <button
            type="submit"
            className="bg-[var(--primary)] text-[var(--primary-foreground)] px-8 py-3 rounded-lg font-semibold hover:bg-[var(--primary-hover)] transition-colors duration-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
          </button>
        </div>
      </form>
    );
  };
  // --- End of conditional rendering function ---

  return (
    <>
      <Navbar currentUser={currentUser} />
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 py-12">
        <section className="max-w-4xl mx-auto text-center mb-12">
          <Image
            alt="The Book Cover"
            src={'/360_assessment_logo.png'}
            width={400}
            height={600}
            className="w-50 h-auto object-contain rounded-xl mx-auto mb-12 shadow-lg"
          />
          <h1 className="text-3xl font-bold mb-4">Stabilizing Your Life. Scaling Your SaaS.</h1>
          <p className="text-lg text-[var(--muted-foreground)]">
            With the <span className="font-semibold">Founder Life Balance 360 Assessment, SaaS Jumpstart MVP</span> helps you recalibrate
            every month—so your health, focus, and identity stay stable while you act on AI-powered
            predictions and turn ideas into scalable SaaS platforms.
          </p>
        </section>

        {/* Credibility Block */}
        <section className="max-w-5xl mx-auto bg-[var(--card-bg)] p-6 rounded-xl border border-[var(--border)] shadow-sm mb-12">
          <h2 className="text-xl font-semibold mb-3">The Founder Life Balance 360 Assessment</h2>
          <p className="text-[var(--muted-foreground)] leading-relaxed">
            is essential for everyone in SaaS Jumpstart MVP
            because prediction without readiness is wasted potential. SaaS AI solutions thrive by turning
            uncertainty into reliable prediction, but if you are unbalanced—financially, physically, socially,
            intellectually, or in your identity—you won’t have the capacity to act on those insights. Just as
            private equity firms protect value by eliminating key-person risk, the 360 ensures you eliminate
            blind spots that could stall your growth. By taking it monthly, you create a rhythm of recalibration
            that strengthens your health, focus, and execution. In SaaS AI, prediction is the engine, but your
            readiness is the operating system—and the 360 keeps both aligned so your ideas can scale into
            lasting platforms.
          </p>
        </section>

        {renderAssessmentContent()}

      </main>
      <Footer />
    </>
  );
}