import Link from "next/link";

export default function Footer() {
    return (
        <footer className="flex fixed bottom-0 min-w-full items-center h-16 px-4 border-t md:px-6 mt-auto dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
            <p className="text-sm text-gray-500 dark:text-gray-400">
                © 2025{" "}
                <a
                    className="hover:underline underline-offset-4 dark:text-pink-300 dark:hover:text-pink-200"
                    href="https://iqfareez.com"
                >
                    Muhammad Fareez
                </a>
            </p>
            <nav className="ml-auto flex gap-4 sm:gap-6">
                <Link
                    className="text-sm hover:underline underline-offset-4 hidden sm:block dark:text-gray-300 dark:hover:text-pink-200"
                    href="https://waktusolat.app"
                >
                    Waktu Solat Project
                </Link>
                <Link
                    className="text-sm hover:underline underline-offset-4 dark:text-gray-300 dark:hover:text-pink-200"
                    href="https://docs.google.com/forms/d/e/1FAIpQLSe-zlZBW-8hO9XPDlLf-K7AUxtgupmD6bo4iouyLXFPAMnxFA/viewform?usp=sf_link"
                >
                    Feedback
                </Link>
                <Link
                    className="text-sm hover:underline underline-offset-4 dark:text-gray-300 dark:hover:text-pink-200"
                    href="https://github.com/mptwaktusolat/mpt-server"
                >
                    GitHub
                </Link>
            </nav>
        </footer>
    );
}