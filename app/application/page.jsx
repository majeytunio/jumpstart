// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { supabase } from '../../lib/supabase';
// import { toast } from 'react-hot-toast';

// export default function ApplicationForm() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     first_last_name: '',
//     date_of_birth: '',
//     address: '',
//     city_state_zip: '',
//     email: '',
//     cell_phone: '',
//     target_monthly_income: '',
//     current_annual_income: '',
//     target_annual_income: '',
//     biggest_obstacle: '',
//     investment_willingness: '',
//     expected_accomplishments: '',
//     start_timeline: '',
//     referral_source: ''
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const { data: { user } } = await supabase.auth.getUser();
      
//       if (!user) {
//         throw new Error('User not authenticated');
//       }

//       const { error } = await supabase
//         .from('user_applications')
//         .upsert({
//           user_id: user.id,
//           completed: true,
//           ...formData
//         });

//       if (error) throw error;

//       toast.success('Application submitted successfully!');
//       router.push('/dashboard');
//     } catch (error) {
//       console.error('Application error:', error);
//       toast.error(error.message || 'Failed to submit application');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto py-8 px-4">
//         <div className="bg-gray-50 dark:bg-gray-900 px-4 p-5 rounded">
//         <h1 className="text-3xl font-bold mb-6">Applicant Information</h1>
//         <p className="mb-8 text-gray-600">
//             We respect your privacy and will use the information you provide to determine whether you are a right fit,
//             communicate with you, and provide information about our program.
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Applicant Information */}
//             <div className="space-y-4">
//                 <h2 className="text-xl font-semibold">Applicant Information</h2>
                
//                 <div>
//                 <label className="block mb-1 font-medium">First and Last Name *</label>
//                 <input
//                     type="text"
//                     name="first_last_name"
//                     value={formData.first_last_name}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-2 border rounded"
//                 />
//                 </div>

//                 <div>
//                 <label className="block mb-1 font-medium">Date of Birth (mm/dd/yyyy) *</label>
//                 <input
//                     type="date"
//                     name="date_of_birth"
//                     value={formData.date_of_birth}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-2 border rounded"
//                 />
//                 </div>

//                 <div>
//                 <label className="block mb-1 font-medium">Address (number, street, and apt. or suite no.) *</label>
//                 <input
//                     type="text"
//                     name="address"
//                     value={formData.address}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-2 border rounded"
//                 />
//                 </div>

//                 <div>
//                 <label className="block mb-1 font-medium">City, state, and ZIP code *</label>
//                 <input
//                     type="text"
//                     name="city_state_zip"
//                     value={formData.city_state_zip}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-2 border rounded"
//                 />
//                 </div>

//                 <div>
//                 <label className="block mb-1 font-medium">Email Address *</label>
//                 <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-2 border rounded"
//                 />
//                 </div>

//                 <div>
//                 <label className="block mb-1 font-medium">Cell Phone *</label>
//                 <input
//                     type="tel"
//                     name="cell_phone"
//                     value={formData.cell_phone}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-2 border rounded"
//                 />
//                 </div>
//             </div>

//             {/* Occupation Information */}
//             <div className="space-y-4">
//                 <h2 className="text-xl font-semibold">Occupation Information</h2>
                
//                 <div>
//                 <label className="block mb-1 font-medium">What is your target monthly income? *</label>
//                 <select
//                     name="target_monthly_income"
//                     value={formData.target_monthly_income}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-2 border rounded"
//                 >
//                     <option value="">Select</option>
//                     <option value="Under $5,000">Under $5,000</option>
//                     <option value="$5,000 - $10,000">$5,000 - $10,000</option>
//                     <option value="$10,000 - $20,000">$10,000 - $20,000</option>
//                     <option value="$20,000+">$20,000+</option>
//                 </select>
//                 </div>

//                 <div>
//                 <label className="block mb-1 font-medium">Current Annual Income *</label>
//                 <select
//                     name="current_annual_income"
//                     value={formData.current_annual_income}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-2 border rounded"
//                 >
//                     <option value="">Select</option>
//                     <option value="Under $50,000">Under $50,000</option>
//                     <option value="$50,000 - $100,000">$50,000 - $100,000</option>
//                     <option value="$100,000 - $200,000">$100,000 - $200,000</option>
//                     <option value="$200,000+">$200,000+</option>
//                 </select>
//                 </div>

//                 <div>
//                 <label className="block mb-1 font-medium">What is your target annual income? *</label>
//                 <select
//                     name="target_annual_income"
//                     value={formData.target_annual_income}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-2 border rounded"
//                 >
//                     <option value="">Select</option>
//                     <option value="$100,000 - $250,000">$100,000 - $250,000</option>
//                     <option value="$250,000 - $500,000">$250,000 - $500,000</option>
//                     <option value="$500,000 - $1,000,000">$500,000 - $1,000,000</option>
//                     <option value="$1,000,000+">$1,000,000+</option>
//                 </select>
//                 </div>

//                 <div>
//                 <label className="block mb-1 font-medium">What's the biggest obstacle keeping you from your goal? *</label>
//                 <textarea
//                     name="biggest_obstacle"
//                     value={formData.biggest_obstacle}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-2 border rounded"
//                     rows="3"
//                 />
//                 </div>
//             </div>
//             </div>

//             {/* Program Readiness */}
//             <div className="space-y-4">
//             <h2 className="text-xl font-semibold">Program Readiness and Expectations Information</h2>
            
//             <div>
//                 <label className="block mb-1 font-medium">How willing and able are you to invest in the growth of your SaaS Business right now? *</label>
//                 <select
//                 name="investment_willingness"
//                 value={formData.investment_willingness}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-2 border rounded"
//                 >
//                 <option value="">Select</option>
//                 <option value="Very willing and able">Very willing and able</option>
//                 <option value="Willing but limited funds">Willing but limited funds</option>
//                 <option value="Unsure about investment">Unsure about investment</option>
//                 <option value="Not currently able to invest">Not currently able to invest</option>
//                 </select>
//             </div>

//             <div>
//                 <label className="block mb-1 font-medium">If accepted, what do you believe you will accomplish due to your participation in the SaaS Jumpstart MVP Program? *</label>
//                 <textarea
//                 name="expected_accomplishments"
//                 value={formData.expected_accomplishments}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-2 border rounded"
//                 rows="3"
//                 />
//             </div>

//             <div>
//                 <label className="block mb-1 font-medium">If accepted, how soon are you looking to get started? *</label>
//                 <select
//                 name="start_timeline"
//                 value={formData.start_timeline}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-2 border rounded"
//                 >
//                 <option value="">Select</option>
//                 <option value="Immediately">Immediately</option>
//                 <option value="Within 1 month">Within 1 month</option>
//                 <option value="Within 3 months">Within 3 months</option>
//                 <option value="Not sure yet">Not sure yet</option>
//                 </select>
//             </div>

//             <div>
//                 <label className="block mb-1 font-medium">Where did you hear about us? *</label>
//                 <select
//                 name="referral_source"
//                 value={formData.referral_source}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-2 border rounded"
//                 >
//                 <option value="">Select</option>
//                 <option value="Social Media">Social Media</option>
//                 <option value="Friend/Colleague">Friend/Colleague</option>
//                 <option value="Google Search">Google Search</option>
//                 <option value="Podcast">Podcast</option>
//                 <option value="Other">Other</option>
//                 </select>
//             </div>
//             </div>

//             <div className="pt-4">
//             <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
//             >
//                 {loading ? 'Submitting...' : 'Submit Application'}
//             </button>
//             </div>
//         </form>
//         </div>
//     </div>
//   );
// }















'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import { toast } from 'react-hot-toast';

export default function ApplicationForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_last_name: '',
    date_of_birth: '',
    address: '',
    city_state_zip: '',
    email: '',
    cell_phone: '',
    target_monthly_income: '',
    current_annual_income: '',
    target_annual_income: '',
    biggest_obstacle: '',
    investment_willingness: '',
    expected_accomplishments: '',
    start_timeline: '',
    referral_source: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const incomeRanges = {
    monthly: [
        { value: "under_5000", label: "Under $5,000" },
        { value: "5000_10000", label: "$5,000 - $10,000" },
        { value: "10000_20000", label: "$10,000 - $20,000" },
        { value: "over_20000", label: "$20,000+" }
    ],
    annual: [
        { value: "under_50000", label: "Under $50,000" },
        { value: "50000_100000", label: "$50,000 - $100,000" },
        { value: "100000_200000", label: "$100,000 - $200,000" },
        { value: "over_200000", label: "$200,000+" }
    ],
    targetAnnual: [
        { value: "100000_250000", label: "$100,000 - $250,000" },
        { value: "250000_500000", label: "$250,000 - $500,000" },
        { value: "500000_1000000", label: "$500,000 - $1,000,000" },
        { value: "over_1000000", label: "$1,000,000+" }
    ]
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { error } = await supabase
        .from('user_applications')
        .upsert({
          user_id: user.id,
          completed: true,
          ...formData
        });

      if (error) throw error;

      toast.success('Application submitted successfully!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Application error:', error);
      toast.error(error.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">Applicant Information</h1>
        <p className="mb-6 text-gray-600 dark:text-gray-300 text-center">
          We respect your privacy and will use the information you provide to determine whether you are a right fit,
          communicate with you, and provide information about our program.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Personal Information</h2>
            
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">First and Last Name *</label>
              <input
                type="text"
                name="first_last_name"
                value={formData.first_last_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth *</label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">City, State, ZIP *</label>
              <input
                type="text"
                name="city_state_zip"
                value={formData.city_state_zip}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Cell Phone *</label>
              <input
                type="tel"
                name="cell_phone"
                value={formData.cell_phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Occupation Information</h2>
            
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Target Monthly Income *</label>
              <select
                name="target_monthly_income"
                value={formData.target_monthly_income}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select</option>
                <option value="Under $5,000">Under $5,000</option>
                <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                <option value="$10,000 - $20,000">$10,000 - $20,000</option>
                <option value="$20,000+">$20,000+</option>
              </select>
            </div>

            {/* Then update your select fields like this: */}
            <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Current Annual Income *</label>
            <select
                name="current_annual_income"
                value={formData.current_annual_income}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
                <option value="">Select</option>
                {incomeRanges.annual.map((range) => (
                <option key={range.value} value={range.value}>
                    {range.label}
                </option>
                ))}
            </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Target Annual Income *</label>
              <select
                name="target_annual_income"
                value={formData.target_annual_income}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select</option>
                <option value="$100,000 - $250,000">$100,000 - $250,000</option>
                <option value="$250,000 - $500,000">$250,000 - $500,000</option>
                <option value="$500,000 - $1,000,000">$500,000 - $1,000,000</option>
                <option value="$1,000,000+">$1,000,000+</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Biggest Obstacle *</label>
              <textarea
                name="biggest_obstacle"
                value={formData.biggest_obstacle}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                rows="3"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Investment Willingness *</label>
              <select
                name="investment_willingness"
                value={formData.investment_willingness}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select</option>
                <option value="Very willing and able">Very willing and able</option>
                <option value="Willing but limited funds">Willing but limited funds</option>
                <option value="Unsure about investment">Unsure about investment</option>
                <option value="Not currently able to invest">Not currently able to invest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 space-y-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Program Expectations</h2>
          
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Expected Accomplishments *</label>
            <textarea
              name="expected_accomplishments"
              value={formData.expected_accomplishments}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              rows="3"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Start Timeline *</label>
            <select
              name="start_timeline"
              value={formData.start_timeline}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select</option>
              <option value="Immediately">Immediately</option>
              <option value="Within 1 month">Within 1 month</option>
              <option value="Within 3 months">Within 3 months</option>
              <option value="Not sure yet">Not sure yet</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Referral Source *</label>
            <select
              name="referral_source"
              value={formData.referral_source}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select</option>
              <option value="Social Media">Social Media</option>
              <option value="Friend/Colleague">Friend/Colleague</option>
              <option value="Google Search">Google Search</option>
              <option value="Podcast">Podcast</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  );
}