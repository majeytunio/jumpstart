import Image from "next/image";
import Dashboard from "./dashboard/page";



export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white px-6 py-12">
      <section className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">
          Build SaaS Faster with <span className="text-blue-600">SaaS Jumpstart</span>
        </h1>
        <p className="text-xl mb-10 text-gray-600 dark:text-gray-300">
          Everything you need to launch your SaaS business – Authentication, Dashboard, Database, AI Tools, and Beautiful UI.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/auth/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg transition"
          >
            Get Started
          </a>
          <a
            href="#features"
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 px-6 py-3 rounded-md text-lg transition"
          >
            See Features
          </a>
        </div>
      </section>

      <section id="features" className="max-w-6xl mx-auto mt-24 grid md:grid-cols-2 gap-12">
        <Feature
          title="🔐 Ready-to-Go Authentication"
          description="Email/password, magic link, and social login built-in using Supabase."
        />
        <Feature
          title="🧠 AI Tools Included"
          description="Integrated with OpenAI out-of-the-box so you can build smart apps from day one."
        />
        <Feature
          title="🎨 Beautiful Tailwind UI"
          description="Pre-designed components and layouts – dashboard, account settings, admin panel, and more."
        />
        <Feature
          title="🚀 One-click Deployment"
          description="Optimized for Vercel or Netlify – just push to GitHub and deploy."
        />
        <Feature
          title="💳 Stripe Billing Setup"
          description="Plug-and-play pricing pages and subscription logic with Stripe."
        />
        <Feature
          title="📦 Modular Codebase"
          description="Easily extend, remove, or swap features. It's your app, your way."
        />
      </section>

      <section className="max-w-4xl mx-auto mt-24 text-center">
        <h2 className="text-3xl font-semibold mb-6">Built for Founders & Makers</h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Whether you're validating an idea, building your MVP, or scaling your SaaS, SaaS Jumpstart gives you the foundation to move fast.
        </p>
        <div className="mt-10">
          <a
            href="/auth/login"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md text-lg"
          >
            Start Building Now
          </a>
        </div>
      </section>

      <footer className="mt-32 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} SaaS Jumpstart. All rights reserved.
      </footer>
    </main>
  );
}

function Feature({ title, description }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}



// export default function Home() {
//   return (

//     <Dashboard />

//     // <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
//     //   <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//     //     <Image
//     //       className="dark:invert"
//     //       src="/next.svg"
//     //       alt="Next.js logo"
//     //       width={180}
//     //       height={38}
//     //       priority
//     //     />
//     //     <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
//     //       <li className="mb-2 tracking-[-.01em]">
//     //         Get started by editing{" "}
//     //         <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
//     //           app/page.js
//     //         </code>
//     //         .
//     //       </li>
//     //       <li className="tracking-[-.01em]">
//     //         Save and see your changes instantly.
//     //       </li>
//     //     </ol>

//     //     <div className="flex gap-4 items-center flex-col sm:flex-row">
//     //       <a
//     //         className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//     //         href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//     //         target="_blank"
//     //         rel="noopener noreferrer"
//     //       >
//     //         <Image
//     //           className="dark:invert"
//     //           src="/vercel.svg"
//     //           alt="Vercel logomark"
//     //           width={20}
//     //           height={20}
//     //         />
//     //         Deploy now
//     //       </a>
//     //       <a
//     //         className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//     //         href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//     //         target="_blank"
//     //         rel="noopener noreferrer"
//     //       >
//     //         Read our docs
//     //       </a>
//     //     </div>
//     //   </main>
//     //   <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//     //     <a
//     //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//     //       href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//     //       target="_blank"
//     //       rel="noopener noreferrer"
//     //     >
//     //       <Image
//     //         aria-hidden
//     //         src="/file.svg"
//     //         alt="File icon"
//     //         width={16}
//     //         height={16}
//     //       />
//     //       Learn
//     //     </a>
//     //     <a
//     //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//     //       href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//     //       target="_blank"
//     //       rel="noopener noreferrer"
//     //     >
//     //       <Image
//     //         aria-hidden
//     //         src="/window.svg"
//     //         alt="Window icon"
//     //         width={16}
//     //         height={16}
//     //       />
//     //       Examples
//     //     </a>
//     //     <a
//     //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//     //       href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//     //       target="_blank"
//     //       rel="noopener noreferrer"
//     //     >
//     //       <Image
//     //         aria-hidden
//     //         src="/globe.svg"
//     //         alt="Globe icon"
//     //         width={16}
//     //         height={16}
//     //       />
//     //       Go to nextjs.org →
//     //     </a>
//     //   </footer>
//     // </div>
//   );
// }
