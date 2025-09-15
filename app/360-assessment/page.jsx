

'use client'

import { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from "../../lib/supabase";

import Image from 'next/image';

export default function Assessment360() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedTier, setSelectedTier] = useState(null);
  
  // ✅ Auth init
  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setCurrentUser(session.user);
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

      </main>
      <Footer />
    </>
  );
}
