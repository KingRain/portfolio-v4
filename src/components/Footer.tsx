import React from 'react';
import { bricolage_grotesque } from "@/utils/fonts";

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className={`bg-white dark:bg-black text-gray-800 dark:text-white py-6 ${bricolage_grotesque}`}>
            <div className="container mx-auto px-4 pb-16">
                <div className="flex flex-col items-center justify-center text-center">
                    <p className="mb-2">Designed and developed by <a href="https://linkedin.com/in/samjoe404" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">Sam Joe</a></p>
                    <p>&copy; {currentYear} All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
