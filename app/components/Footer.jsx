
'use client'

export default function Footer({ currentUser }) {
    return(
        <footer className="mt-32 text-center text-[var(--gray)] text-sm">
            © {new Date().getFullYear()} SaaS Jumpstart. All rights reserved.
        </footer>
    );
}