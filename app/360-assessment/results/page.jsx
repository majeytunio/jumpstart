'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { supabase } from '../../../lib/supabase';
import { useRouter } from 'next/navigation';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Register Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function AssessmentResults() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [assessmentData, setAssessmentData] = useState(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchResults = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/auth/login');
        return;
      }
      setCurrentUser(session.user);

      // Fetch the user's latest assessment
      const { data, error } = await supabase
        .from('assessments')
        .select('scores, report')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error || !data) {
        console.error('Error fetching assessment:', error);
        setAssessmentData(null);
      } else {
        setAssessmentData(data);
      }
      setLoading(false);
    };

    fetchResults();
  }, [router]);

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;

    const canvas = await html2canvas(contentRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    
    // A4 size in mm
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('founder-assessment-report.pdf');
  };

  const chartData = {
    labels: assessmentData ? Object.keys(assessmentData.scores) : [],
    datasets: [{
      label: 'Your Founder Life Balance Score',
      data: assessmentData ? Object.values(assessmentData.scores) : [],
      backgroundColor: 'rgba(212, 175, 55, 0.2)',
      borderColor: '#d4af37',
      pointBackgroundColor: '#d4af37',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#d4af37',
    }]
  };

  const chartOptions = {
    responsive: true,
    scales: {
      r: {
        angleLines: { color: 'rgba(255,255,255,0.2)' },
        grid: { color: 'rgba(255,255,255,0.2)' },
        pointLabels: { color: '#ffffff' },
        ticks: { 
            display: false,
            backdropColor: 'transparent',
        },
        min: 0,
        max: 100
      }
    },
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            callbacks: {
                label: (context) => `${context.dataset.label}: ${context.raw}%`
            }
        }
    }
  };

  if (loading) {
    return (
      <>
        <Navbar currentUser={currentUser} />
        <main className="min-h-screen flex items-center justify-center">
          <p>Loading results...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!assessmentData) {
    return (
      <>
        <Navbar currentUser={currentUser} />
        <main className="min-h-screen flex items-center justify-center text-center px-6">
          <p>No assessment data found. Please complete the <a href="/360-assessment" className="text-[var(--gold)] underline">assessment</a> first.</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar currentUser={currentUser} />
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 py-12">
        <section ref={contentRef} className="max-w-5xl mx-auto bg-[var(--card-bg)] p-8 rounded-xl border border-[var(--border)] shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Your Founder Life Balance Report</h1>
            <p className="text-lg text-[var(--muted-foreground)]">Here are your personalized insights from the 360 Assessment.</p>
          </div>
          
          <div className="max-w-xl mx-auto mb-12">
            <Radar data={chartData} options={chartOptions} />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Summary</h2>
            <p className="text-[var(--foreground)] leading-relaxed">{assessmentData.report.summary}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-[var(--gold)]">Strengths</h3>
              <ul className="list-disc list-inside space-y-1 text-[var(--foreground)]">
                {assessmentData.report.strengths.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-[var(--danger-color)]">Growth Areas</h3>
              <ul className="list-disc list-inside space-y-1 text-[var(--foreground)]">
                {assessmentData.report.growthAreas.map((area, index) => (
                  <li key={index}>{area}</li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-1">
              <h3 className="text-xl font-semibold mb-2">Action Steps</h3>
              <ul className="list-decimal list-inside space-y-1 text-[var(--foreground)]">
                {assessmentData.report.actionSteps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <div className="text-center mt-12">
          <button
            onClick={handleDownloadPDF}
            className="bg-[var(--gold)] text-[var(--white)] px-8 py-3 rounded-lg font-semibold hover:bg-[var(--gold-light)] transition-colors duration-200"
          >
            Download Report as PDF
          </button>
          <p className="text-xs text-[var(--muted-foreground)] mt-2">
            Tip: You can also use your browser's print function to save the page.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}