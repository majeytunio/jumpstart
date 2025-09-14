
'use client'

import ChatbotWidget from "./ChatBot/ChatbotWidget";

export default function Footer({ currentUser, isApproved }) {
    return(
        <>
        {(currentUser && isApproved) && <ChatbotWidget />}
        <footer className="mt-32 text-center text-[var(--gray)] text-sm">
            © {new Date().getFullYear()} SaaS Jumpstart. All rights reserved.
        </footer>
        </>
    );
}