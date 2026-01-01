"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from 'next/image';

export default function DocDownloads() {
  const [currentUser, setCurrentUser] = useState(null);
  const [docFiles, setDocFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isApproved, setApproved] = useState(false);

  // Fetch Documents from 'doc_files' table
  const fetchDocs = async () => {
    console.log("🔍 Fetching Document files...");
    const { data, error } = await supabase
      .from("doc_files")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ Error fetching Docs:", error);
    } else {
      console.log("✅ Documents fetched:", data);
      setDocFiles(data);
    }
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
        setApproved(false);
      } else {
        setApproved(Boolean(data?.verified));
      }
    };

    const init = async () => {
      console.log('🔑 Checking session...');
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        console.log('✅ Logged in user:', session.user);
        setCurrentUser(session.user);
        await fetchDocs();
        await fetchProfile(session.user.id);
      } else {
        console.log('⚠️ No user session found');
      }
      setLoading(false);
    };

    init();

    // Listen to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setCurrentUser(session.user);
        fetchDocs();
      } else {
        setCurrentUser(null);
        setDocFiles([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <Navbar currentUser={currentUser} />
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6">

        {/* Header */}
        <section className="max-w-4xl mx-auto text-center mb-12">

          <Image
            alt="The Book Cover"
            src={'/the_architects_vault.png'}
            width={400}
            height={600}
            className="w-50 h-auto object-contain rounded-xl mx-auto mb-12 shadow-lg"
            />

          <h1 className="text-3xl font-bold mb-4">The Architect’s Vault</h1>
          <h2 className="text-2xl font-bold mb-4">Done-For-You Assets, Frameworks & Authority Systems</h2>
          <p className="text-lg text-[var(--muted-foreground)]">
            <span className="font-semibold">The Architect’s Vault</span> 
            is not a library of templates — it is a risk-compression system. 
            Every asset inside is designed to shorten decision cycles, eliminate costly missteps, and move you directly toward a built-ready SaaS AI outcome. 
            From the Founder Risk Compression Session, where blind spots are identified before they become expensive mistakes, to Authority Transmission frameworks that position you as the clear decision-maker in the room, each component exists for one reason: Results. 
            The Founder Idea Lab – Build-Ready Blueprint removes ambiguity by translating your idea into a precise handoff your Gold-Standard agency can execute with confidence. 
            And when precision matters most, 1-to-1 access via Voxer ensures real-time guidance, clarity, and course correction — so momentum is never lost. 
            Nothing here is theoretical. These are pre-engineered systems designed to work because they already have.

          </p>
        </section>

        {/* Documents Grid Section */}
        <section className="max-w-6xl mx-auto py-10">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-[var(--gold)] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : docFiles.length === 0 ? (
            <p className="text-center text-[var(--muted-foreground)] mt-8">
              No documents available for download yet.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {docFiles.map((doc) => (
                <div key={doc.id} className="bg-[var(--card-bg)] p-6 rounded-xl border border-[var(--border)] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                       {/* Simple Document Icon */}
                       <div className="w-10 h-10 bg-[var(--gold)]/10 rounded flex items-center justify-center text-[var(--gold)]">
                         📄
                       </div>
                       <h2 className="text-lg font-semibold leading-tight">{doc.title}</h2>
                    </div>
                    <p className="text-sm text-[var(--muted-foreground)] line-clamp-3">
                      {doc.description}
                    </p>
                  </div>
                  
                  <div className="flex gap-3 mt-6">
                    <a
                      href={doc.file_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center bg-[var(--gold)] px-4 py-2 rounded-md text-black font-bold hover:opacity-90 transition-opacity"
                    >
                      View
                    </a>
                    <a
                      href={doc.file_url}
                      download
                      className="flex-1 text-center border border-[var(--gold)] px-4 py-2 rounded-md text-[var(--gold)] font-bold hover:bg-[var(--gold)] hover:text-black transition-all"
                    >
                      Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>
      <Footer currentUser={currentUser} isApproved={isApproved} />
    </>
  );
}