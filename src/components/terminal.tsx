//src="https://media1.tenor.com/m/xDxQcEqYO-gAAAAC/kika-rune-kika.gif"
import React, {
  Children,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import './Terminal.css'; // Your existing CSS file
import ExperienceCard from './experience-card';
import { div, output } from 'framer-motion/client';
import MaximizeBar from './maximize-bar';
import { EmailIcon, GitHubIcon, LinkedInIcon, XIcon } from '../icons/icons';
import SkillsComponent from './Skills';

type commandType =
  | 'whoami'
  | 'experience'
  | 'contact'
  | 'help'
  | 'clear'
  | 'skills'
  | 'resume';
type aliasedCommandType = 'ls' | 'abandon';
const aliasedCommandList = ['ls', 'abandon'] as const;
const initialCommands: commandType[] = [
  'whoami',
  'experience',
  'contact',
  'skills',
];
// const initialCommands: commandType[] = ['skills'];

// =================================================================
// 1. Define Output Components
// Each command's output is its own component.
// =================================================================

const WhoamiOutput: React.FC = () => {
  const ref = React.useRef(null);

  const isInView = useInView(ref, { once: true });

  // You could say I have a healthy obsession with building things. From complex software platforms to a streamlined command-line workflow, I’m driven by the process of turning a great idea into an efficient reality.
  const text = `
Hey! I’m Phaneendra Pilli — a full-stack developer who loves building, maintaining, and deploying web applications. With 1.5 years of hands-on experience across the stack, I enjoy turning ideas into products that are stable, scalable, and used by real people every day.

I primarily work with TypeScript across the stack — Angular, Next.js, and NestJS — and use PostgreSQL, Docker, and Nginx for backend and deployment workflows. I’m currently working at InterviewBuddy, where I help build real-time communication systems, payment gateways, AI-driven interviews, and assessment platforms used by thousands of learners.

I’m passionate about clean architecture, automation, and the joy of building products that are fast, reliable, and delightful to use.
    `;
  return (
    <div>
      <strong className="text-base  sm:text-2xl text-white flex gap-3">
        <motion.h2
          ref={ref}
          initial={{ filter: 'blur(20px)', opacity: 0 }}
          animate={isInView ? { filter: 'blur(0px)', opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className=" text-center  font-bold tracking-tighter  md:leading-[4rem] flex"
        >
          <img
            src="/me.jpeg"
            alt="penguin"
            loading="lazy"
            className="w-24 min-w-[96px] h-24 rounded-md"
          />
        </motion.h2>
        <div>
          {/* Hello there!, I'm */}
          Phaneendra Pilli
          <p className="text-sm font-normal">Software Developer</p>
          <div className="flex gap-4 mt-2">
            <a href="https://github.com/phaneendra24" target="_blank">
              <GitHubIcon />
            </a>

            <a href="https://linkedin.com/in/phaneendra-pilli/" target="_blank">
              <LinkedInIcon />
            </a>

            <a href="https://x.com/phaneendra_24" target="_blank">
              <XIcon />
            </a>
          </div>
        </div>
      </strong>
      <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:items-center">
        <div className="mt-2 text-white w-full" ref={ref}>
          <p className="font-bold">About me.</p>
          {text}
          {/* {text.split('').map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.1, delay: index * 0.025 }}
            >
              {letter}
            </motion.span>
          ))} */}
        </div>
      </div>
    </div>
  );
};

const ExperienceOutput: React.FC = () => (
  <div className="flex flex-col gap-4">
    <ExperienceCard />
  </div>
);

const ContactOutput: React.FC = () => (
  <div className="grid grid-cols-[auto_1fr] gap-y-2 gap-x-4">
    <span className="output-text flex gap-1 items-center">
      <GitHubIcon />
      github:
    </span>
    <a
      href="https://github.com/phaneendra24"
      target="_blank"
      rel="noopener noreferrer"
      className="contact-link"
    >
      github.com/phaneendra24
    </a>
    <span className="output-text flex gap-1 items-center">
      <LinkedInIcon />
      linkedin:
    </span>
    <a
      href="https://linkedin.com/in/phaneendra-pilli/"
      target="_blank"
      rel="noopener noreferrer"
      className="contact-link"
    >
      linkedin.com/in/phaneendra-pilli
    </a>
    <span className="output-text flex gap-1 items-center">
      <EmailIcon />
      email:
    </span>
    <a href="mailto:phaneendrapilli777@gmail.com" className="contact-link">
      phaneendrapilli777@gmail.com
    </a>
  </div>
);

// The 'help' and 'ls' commands are dynamic, so they take props
interface HelpOutputProps {
  commands: Record<string, { description: string }>;
}

const HelpOutput: React.FC<HelpOutputProps> = ({ commands }) => (
  <div>
    <span className="output-text">Available commands:</span>
    {Object.entries(commands).map(([cmd, { description }]) => (
      <div key={cmd}>
        <span className="command">{cmd.padEnd(10)}</span>
        <span className="output-text">- {description}</span>
      </div>
    ))}
  </div>
);

const SkillsOutput: React.FC = () => (
  <div>
    <SkillsComponent />
  </div>
);

const ResumeOutput: React.FC = () => (
  <div className="flex flex-col gap-3">
    <p className="output-text">📄 Here's my resume:</p>
    <a
      href="/Phaneendra_Pilli_Resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg w-fit transition-all hover:scale-105"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Download Resume (PDF)
    </a>
    <p className="text-gray-400 text-sm">Or view it directly in your browser by clicking the link above.</p>
  </div>
);

const CommandNotFound: React.FC<{ command: string }> = ({ command }) => (
  <div className="gap-1 flex">
    <span className="error">bash: command not found: {command}.</span>
    <span className="output-text">
      Try 'help' for a list of available commands.
    </span>
  </div>
);

// =================================================================
// 2. Main Terminal Component
// =================================================================
const AnimationLayoutForCommand = ({ children }: { children: ReactNode }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }} // Start invisible and slightly down
        animate={{ opacity: 1, y: 0 }} // Animate to fully visible and original position
        transition={{ duration: 0.3, ease: 'linear' }}
        className="mb-2"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const Terminal: React.FC = () => {
  const [lines, setLines] = useState<React.ReactNode[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showPenguin, setShowPenguin] = useState(false);
  const [ShowMailMe, setShowMailMe] = useState(false);
  const [isInitialSequenceRunning, setIsInitialSequenceRunning] = useState(true);

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Store commands in a memoized object
  const commands = React.useMemo(
    () => ({
      whoami: {
        description: 'A little bit about me.',
        output: (
          <AnimationLayoutForCommand>
            <WhoamiOutput />
          </AnimationLayoutForCommand>
        ),
      },
      experience: {
        description: 'View my professional work.',
        output: (
          <AnimationLayoutForCommand>
            <ExperienceOutput />
          </AnimationLayoutForCommand>
        ),
      },
      contact: {
        description: 'How to get in touch.',
        output: (
          <AnimationLayoutForCommand>
            <ContactOutput />
          </AnimationLayoutForCommand>
        ),
      },
      help: {
        description: 'Lists all available commands.',
        output: (
          <AnimationLayoutForCommand>
            <HelpOutput commands={{}} />
          </AnimationLayoutForCommand>
        ),
      },
      skills: {
        description: 'View my skills.',
        output: (
          <AnimationLayoutForCommand>
            <SkillsOutput />
          </AnimationLayoutForCommand>
        ),
      },
      resume: {
        description: 'View/download my resume.',
        output: (
          <AnimationLayoutForCommand>
            <ResumeOutput />
          </AnimationLayoutForCommand>
        ),
      },
      clear: {
        description:
          'Clears the terminal screen. And and guess what you can use cntrl + l too',
        output: null,
      }, // 'clear' is a special case
    }),
    []
  );

  // Populate dynamic 'help' command output
  commands.help.output = <HelpOutput commands={commands} />;

  // Aliases for commands
  const aliasedCommands = {
    ls: commands.help,
    abandon: {
      description: '',
      output: null,
    },
  };

  // Focus input on click anywhere in the terminal
  const focusInput = () => inputRef.current?.focus();

  useEffect(focusInput, []);

  // NOTE: Auto-scroll removed - only scroll when user manually types commands via scrollToBottom() in handleCommandSubmit

  // Initial animation sequence
  const runInitialSequence = async () => {
    setIsInitialSequenceRunning(true);
    for (const command of initialCommands) {
      // Add the command line
      setLines((prev) => [
        ...prev,
        <Prompt key={`prompt-${prev.length}`} command={command} />,
      ]);
      await new Promise((res) => setTimeout(res, 300)); // Brief pause before output
      // Add the output
      setLines((prev) => [
        ...prev,
        <div key={`output-${prev.length}`}>{commands[command].output}</div>,
      ]);
      await new Promise((res) => setTimeout(res, 400)); // Pause between commands
    }
    // Add final help message
    setLines((prev) => [
      ...prev,
      <div key={`final-msg-${prev.length}`} className="output-text mt-4">
        Type `help` to see the list of available commands. Try `resume` to download my resume!
      </div>,
    ]);

    setIsInitialSequenceRunning(false); // Re-enable scrolling after sequence completes
  };

  useEffect(() => {
    runInitialSequence();
  }, [commands]); // Rerun if commands object changes

  const handleCommandSubmit = (command: commandType | aliasedCommandType) => {
    if (!command) return;

    // Add executed command to the history
    const newHistory = [command, ...history];
    setHistory(newHistory);
    setHistoryIndex(-1);

    // Add the prompt with the executed command to the lines
    setLines((prev) => [...prev, <Prompt command={command} />]);

    // Type guard for runtime checking
    function isAliasedCommand(cmd: string): cmd is aliasedCommandType {
      return (aliasedCommandList as readonly string[]).includes(cmd);
    }

    const cmd = isAliasedCommand(command)
      ? aliasedCommands[command]
      : commands[command];

    if (command === 'clear') {
      setLines([]);
    } else if (cmd) {
      setLines((prev) => [...prev, <div key={prev.length}>{cmd.output}</div>]);
    } else {
      setLines((prev) => [
        ...prev,
        <CommandNotFound key={prev.length} command={command} />,
      ]);
    }

    scrollToBottom();
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      if (inputRef.current && !showPenguin && !ShowMailMe) {
        inputRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommandSubmit(input.trim().toLowerCase() as any);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'l') {
      e.preventDefault();
      setLines([]);
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c') {
      e.preventDefault();
      handleCommandSubmit('abandon');
      console.log('fired cntl c');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      
      // Get all available commands
      const allCommands = ['whoami', 'experience', 'contact', 'help', 'clear', 'skills', 'resume', 'ls'];
      const currentInput = input.trim().toLowerCase();
      
      if (currentInput === '') {
        // If empty, show help
        handleCommandSubmit('help');
        return;
      }
      
      // Find matching commands
      const matches = allCommands.filter(cmd => cmd.startsWith(currentInput));
      
      if (matches.length === 1) {
        // Single match - auto-complete
        setInput(matches[0]);
      } else if (matches.length > 1) {
        // Multiple matches - show suggestions and complete common prefix
        const commonPrefix = matches.reduce((prefix, cmd) => {
          while (!cmd.startsWith(prefix)) {
            prefix = prefix.slice(0, -1);
          }
          return prefix;
        }, matches[0]);
        
        setInput(commonPrefix);
        
        // Show available options
        setLines((prev) => [
          ...prev,
          <Prompt key={`prompt-${prev.length}`} command={currentInput} />,
          <div key={`suggestions-${prev.length}`} className="text-[#7dcfff] mb-2">
            {matches.join('  ')}
          </div>,
        ]);
      }
      // If no matches, do nothing
    }
  };

  return (
    <div className={`w-full h-full overflow-hidden mt-5`}>
      <div
        className={`relative h-[90%] max-w-4xl min-w-[60%] max-sm:max-w-[90%] mx-auto transition-all duration-300 ease-linear no-scrollbar
${
  showPenguin || ShowMailMe
    ? 'max-sm:translate-y-24 translate-y-24 transition-all duration-300 ease-linear '
    : ''
}
        `}
      >
        <div
          ref={terminalRef}
          className={`bg-[#24283b] flex flex-col max-h-full w-full border border-[#414868] terminal-window rounded-lg shadow-2xl transition-all duration-100
            `}
        >
          {/* Your AnimatePresence and Penguin popup JSX can remain here */}
          <AnimatePresence>
            {showPenguin && (
              <motion.div
                key="penguin"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                // exit={{ opacity: 0, y: 40 }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 14,
                }}
                className="absolute -top-24  left-0 right-0 z-[100] flex justify-between items-end cursor-pointer  rounded-b-xl "
              >
                <MaximizeBar />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {ShowMailMe && (
              <motion.div
                key="mailme"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 14,
                }}
                className="absolute -top-20  left-0 right-0 z-[100] flex items-center "
              >
                <div className="  relative  text-center text-gray-200 font-mono text-base px-4 py-2 rounded-xl flex flex-col sm:flex-row gap-1   sm:items-end">
                  You can reach out to me
                  <a
                    href="mailto:phaneendrapilli777@gmail.com"
                    rel="noopener noreferrer"
                    className="  text-blue-400 text-start hover:text-blue-300 font-semibold transition-transform hover:scale-105"
                  >
                    @phaneendrapilli777
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Terminal Header */}
          <div className="bg-gray-800 px-4 py-2 flex items-center rounded-t-xl relative z-20">
            {/* Window Controls */}
            <div className="flex space-x-2">
              <div
                onClick={() => {
                  setShowPenguin(false);
                  setShowMailMe(false);
                  if (!showPenguin && !ShowMailMe) {
                    handleCommandSubmit('clear');
                    runInitialSequence();
                  }
                }}
                className="w-3 h-3 rounded-full bg-red-500 cursor-pointer"
                title="Reset terminal"
              ></div>
              <div
                className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer"
                onClick={() => {
                  setShowMailMe(false);
                  setShowPenguin(!showPenguin);
                }}
                title="Show social links & resume"
              ></div>
              <div
                className="w-3 h-3 rounded-full bg-green-500 cursor-pointer"
                onClick={() => {
                  setShowPenguin(false);
                  setShowMailMe(!ShowMailMe);
                }}
                title="Quick contact"
              ></div>
            </div>
            <div className="flex-grow text-center text-sm text-gray-400">
              phaneendra -- -bash
            </div>
            {/* Always visible Resume button */}
            <a
              href="/Phaneendra_Pilli_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-all hover:scale-105 shadow-lg"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Resume
            </a>
          </div>

          {/* Terminal Body - SINGLE scroll container */}
          <div
            ref={terminalBodyRef}
            className="p-3 sm:p-6 text-sm sm:text-base whitespace-pre-wrap overflow-y-auto no-scrollbar flex-1 transition-all duration-200 ease-in"
            onClick={focusInput}
          >
            {lines.map((line, index) => (
              <div key={index} className="mb-2">
                {line}
              </div>
            ))}
            <Prompt
              command={input}
              isInput={true}
              inputRef={inputRef}
              onKeyDown={handleKeyDown}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="text-gray-500">
              {lines.length === 0 &&
                'Type `help` to see the list of available commands.'}
            </div>
          </div>
        </div>

        <div className="pb-10 h-[5%]">
          <div className=" border-t border-gray-700 mt-10 text-center pt-5 min-w-[60%] max-sm:max-w-[90%] text-gray-400">
            © 2025 Phaneendra. All rights reserved.
          </div>

          <div className="mt-4  flex gap-6 items-center px-4 py-2 border border-gray-600 outline-none rounded-xl w-fit mx-auto">
            <a href="https://github.com/phaneendra24" target="_blank">
              <GitHubIcon />
            </a>

            <a href="https://linkedin.com/in/phaneendra-pilli/" target="_blank">
              <LinkedInIcon />
            </a>

            <a href="https://x.com/phaneendra_24" target="_blank">
              <XIcon />
            </a>
            <div className="border-l border-gray-300 pl-2">
              <img
                src="/profile.png"
                alt="My profile"
                className="w-8 h-8 rounded-full "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// =================================================================
// 3. Helper Component for the Prompt Line
// =================================================================

interface PromptProps {
  command?: string;
  isInput?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Prompt: React.FC<PromptProps> = ({
  command,
  isInput = false,
  inputRef,
  onKeyDown,
  onChange,
}) => (
  <div className="flex gap-1 items-center">
    <span className="prompt-user">phaneendra@portfolio</span>
    <span className="prompt-symbol">:~$</span>
    {isInput ? (
      <input
        ref={inputRef}
        type="text"
        value={command}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="terminal-input flex-1"
        autoComplete="off"
      />
    ) : (
      <span className="command">{command != 'abandon' && command}</span>
    )}
  </div>
);

export default Terminal;
