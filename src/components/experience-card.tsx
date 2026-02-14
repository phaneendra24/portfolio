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
    'Socket.io',
    'FFmpeg',
    'Razorpay',
    'Strapi CMS',
  ];

  const mainExperiencePoints = [
    'End-to-end development of the official website rebranding, making architectural decisions that resulted in improved SEO rankings and a 40% reduction in page load times.',
    'Designed and implemented a real-time interview room using Twilio and Socket.io, enabling low-latency collaboration (video, code, whiteboard) and real-time event logging for debugging.',
    'Built an adaptive \'Gen AI Interview\' module that processes candidate video responses using FFmpeg to drive context-aware follow-up questions and automated performance grading.',
    'Implemented end-to-end payment systems supporting domestic (Razorpay) and international (PayPal) transactions, featuring a custom coupon management system for discounts and automated refund processing.',
    'Reduced engineering dependency for content updates by integrating Strapi CMS, enabling the marketing team to publish blogs independently.',
    'Worked on Dockerized deployments that improved system stability, contributing to 99.99% uptime and a ~40% reduction in MTTR through better debugging and hotfix workflows.',
    'Developed a configurable assessment service supporting diverse question formats and enforced strict proctoring rules to ensure test integrity.',
    'Designed scalable database schemas for complex features, optimizing query performance and ensuring data integrity.',
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
            <span className="text-white">Associate Software Development Engineer</span>

            <span className="text-pink-400 font-bold">Period:</span>
            <span className="text-white">July 2024 - Present</span>

            <span className="text-pink-400 font-bold">Focus:</span>
            <span className="text-white">
              Platform Architecture & Development
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-4 text-sm">
            <p className="text-pink-400 font-bold mb-2">Highlights:</p>
            <ul className="list-none text-white pl-2">
              {mainExperiencePoints.map((text, index) => {
                return (
                  <li key={index + 21929} className="py-1">
                    <span className="text-cyan-400 mr-2">{'>'}</span>
                    {text}
                  </li>
                );
              })}
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
          <span className="text-white">Software Engineer Intern</span>

          <span className="text-pink-400 font-bold">Period:</span>
          <span className="text-white">Jan 2024 - Jun 2024</span>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-4 text-sm">
          <p className="text-pink-400 font-bold mb-2">Highlights:</p>
          <ul className="list-none text-white pl-2">
            <li className="py-1">
              <span className="text-cyan-400 mr-2">{'>'}</span>
              Refactored the core interview management module to improve code maintainability and secured platform data by implementing granular Role-Based Access Control (RBAC).
            </li>
            <li className="py-1">
              <span className="text-cyan-400 mr-2">{'>'}</span>
              Engineered a transactional notification service using React Email, ensuring reliable delivery of interview schedules and updates to thousands of users.
            </li>
          </ul>
        </motion.div>
      </div>
    </Container>
  );
}
