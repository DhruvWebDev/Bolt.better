import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="border-b border-zinc-800 bg-black">
            <div className="container mx-auto text-center">
                <p className="text-zinc-400 text-sm">
                    &copy; {new Date().getFullYear()} Bolt.newer. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;