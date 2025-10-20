import { cn } from '../lib/utils';

import { motion, AnimatePresence, useInView } from 'framer-motion';

const cardContent = {
  title: 'Lorem ipsum dolor',
  description:
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum, hic ipsum! Qui dicta debitis aliquid quo molestias explicabo iure!',
};
const CardBody = ({ className = 'p-4' }) => (
  <div className={cn('text-start', className)}>
    <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-gray-100">
      {cardContent.title}
    </h3>
    <p className="text-gray-700 dark:text-gray-300">
      {cardContent.description}
    </p>
  </div>
);

export default function ExperienceCard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Each child will animate 0.1s after the previous one
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const techStack = [
    'Angular',
    'NestJS',
    'Next.js',
    'TypeScript',
    'PostgreSQL',
    'Docker',
    'Twilio',
  ];
  const Line = ({ className = '' }) => (
    <div
      className={cn(
        'h-px w-full via-zinc-400 from-[1%] from-zinc-200 to-zinc-600 absolute -z-0 dark:via-zinc-700 dark:from-zinc-900 dark:to-zinc-500',
        className
      )}
    />
  );
  const Container = ({ children }: { children: React.ReactNode }) => (
    <div className="relative mx-auto w-full ">
      {/* <Line className="bg-gradient-to-l left-0 top-2 sm:top-4 md:top-6" />
      <Line className="bg-gradient-to-r bottom-2 sm:bottom-4 md:bottom-6 left-0" />

      <Line className="w-px bg-gradient-to-t right-2 sm:right-4 md:right-6 h-full inset-y-0" />
      <Line className="w-px bg-gradient-to-t left-2 sm:left-4 md:left-6 h-full inset-y-0" /> */}
      <div className="relative z-20 mx-auto ">{children}</div>
    </div>
  );
  return (
    <Container>
      <div className=" w-full center">
        <motion.div className="flex-1" variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <span className="text-green-400 flex gap-1">
              InterviewBuddy (July 2024- Present) -
              <a
                href="https://interviewbuddy.net"
                target="_blank"
                className="text-blue-400 underline"
              >
                visit
              </a>
            </span>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="w-full border-b border-dashed border-gray-700 my-3"
          ></motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-[auto_1fr] gap-x-4 text-sm"
          >
            <span className="text-pink-400 font-bold">Role:</span>
            <span className="text-white">Full Stack Developer</span>

            <span className="text-pink-400 font-bold">Period:</span>
            <span className="text-white">Nov 2024 - Present</span>

            <span className="text-pink-400 font-bold">Focus:</span>
            <span className="text-white">
              Platform Architecture & Development
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-4 text-sm">
            <p className="text-pink-400 font-bold mb-2">Highlights:</p>
            <ul className="list-none text-white pl-2">
              <li>
                <span className="text-cyan-400 mr-2">{'>'}</span>Led development
                of B2C video interview platform.
              </li>
              <li>
                <span className="text-cyan-400 mr-2">{'>'}</span>Engineered
                company website relaunch with payment systems.
              </li>
              <li>
                <span className="text-cyan-400 mr-2">{'>'}</span>Managed
                Dockerized deployments for all services.
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-4">
            <p className="text-pink-400 font-bold mb-2 text-sm">Stack:</p>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="bg-gray-700 text-cyan-300 text-xs font-semibold px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ✨ INTERNSHIP SECTION ADDED BELOW ✨ */}
        <motion.div
          variants={itemVariants}
          className="w-full border-b border-dashed border-gray-700 my-3"
        ></motion.div>

        <motion.div variants={itemVariants}>
          <span className="text-green-400 ">
            InterviewBuddy (Jan 2024- Jun 2024)
          </span>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-[auto_1fr] gap-x-4 text-sm"
        >
          <span className="text-pink-400 font-bold">Role:</span>
          <span className="text-white">Full Stack Developer Intern</span>

          <span className="text-pink-400 font-bold">Period:</span>
          <span className="text-white">Jun 2024 - Oct 2024</span>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-4 text-sm">
          <p className="text-pink-400 font-bold mb-2">Highlights:</p>
          <ul className="list-none text-white pl-2">
            <li>
              <span className="text-cyan-400 mr-2">{'>'}</span>Contributed to
              front-end features using Angular.
            </li>
            <li>
              <span className="text-cyan-400 mr-2">{'>'}</span>Assisted in the
              development of RESTful API endpoints with NestJS.
            </li>
            <li>
              <span className="text-cyan-400 mr-2">{'>'}</span>Gained hands-on
              experience with Docker and the full development lifecycle.
            </li>
          </ul>
        </motion.div>
      </div>
    </Container>
  );
}
