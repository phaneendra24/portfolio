import React from 'react';
import { motion } from 'framer-motion';
import {
  CodeIcon,
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  UserIcon,
  XIcon,
} from '../icons/icons';
import { cn } from '../lib/utils';

// Helper component for individual modules to reduce repetition
const Module: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div
    className={`flex items-center gap-2    transition-colors duration-200 pb-1 hover:border-b hover:border-b-pink-500 ${className}`}
  >
    {children}
  </div>
);

const MaximizeBar: React.FC = () => {
  return (
    <motion.div
      className="font-mono flex items-end justify-between w-full max-w-4xl mx-auto   "
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Left Modules */}
      <div className="flex items-center space-x-2">
        <img
          src="https://media.tenor.com/staU78dYIK4AAAAi/working-work.gif"
          alt="Tux Penguin"
          className="w-20 order-2 max-sm:col-span-2 sm:order-1 h-20 animate-bounce-slow "
        />
      </div>

      {/* Right Modules */}
      <div className="flex items-center space-x-2 gap-3">
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          className=""
        >
          <a
            href="https://github.com/phaneendra24"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Module className="text-gray-400 hover:text-white">
              <GitHubIcon />
            </Module>
          </a>
        </motion.div>

        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
          <a
            href="https://linkedin.com/in/phaneendra-pilli/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Module className="text-gray-400 hover:text-white">
              <LinkedInIcon />
            </Module>
          </a>
        </motion.div>

        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
          <a
            href="https://x.com/phaneendra_24"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Module className="text-gray-400 hover:text-white">
              <XIcon />
            </Module>
          </a>
        </motion.div>

        <a
          href="https://your-public-resume-link.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="relative overflow-hidden rounded-full  dark:bg-zinc-900 bg-white shadow border dark:border-zinc-800 group border-zinc-400 p-0.5">
            <span className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite_reverse] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#fff_0%,#09090B_7%)] bg-[conic-gradient(from_90deg_at_50%_50%,#000_0%,#fff_5%)] group-hover:bg-none" />
            <button
              className={cn(
                'h-10 px-2 rounded-full font-semibold text-zinc-800 dark:text-zinc-200 bg-blue-500 backdrop-blur-xl '
              )}
            >
              Resume
            </button>
          </div>
        </a>
      </div>
    </motion.div>
  );
};

export default MaximizeBar;
