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

type commandType = 'whoami' | 'experience' | 'contact' | 'help' | 'clear';
type aliasedCommandType = 'ls';
const aliasedCommandList = ['ls'] as const;
const initialCommands: commandType[] = ['whoami', 'experience', 'contact'];
// const initialCommands: commandType[] = ['experience'];

// =================================================================
// 1. Define Output Components
// Each command's output is its own component.
// =================================================================

const WhoamiOutput: React.FC = () => {
  const ref = React.useRef(null);

  const isInView = useInView(ref, { once: true });

  const text =
    'You could say I have a healthy obsession with building things. From complex software platforms to a streamlined command-line workflow, I’m driven by the process of turning a great idea into an efficient reality.';
  return (
    <div>
      <strong className="text-base  sm:text-xl text-white">
        Phaneendra Pilli. Full Stack Developer.
      </strong>
      <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:items-center">
        <motion.h2
          ref={ref}
          initial={{ filter: 'blur(20px)', opacity: 0 }}
          animate={isInView ? { filter: 'blur(0px)', opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xl text-center sm:text-4xl font-bold tracking-tighter md:text-6xl md:leading-[4rem]"
        >
          <img
            src="/me.jpeg"
            alt="penguin"
            loading="lazy"
            className="w-24 min-w-[96px] h-24 rounded-md"
          />
        </motion.h2>
        <p className="mt-2 text-white w-full" ref={ref}>
          {text.split('').map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.1, delay: index * 0.025 }}
            >
              {letter}
            </motion.span>
          ))}
        </p>
      </div>
    </div>
  );
};

const ExperienceOutput: React.FC = () => (
  <div className="flex flex-col gap-4">
    {/* <div>
      <span className="project-name">
        -rw-r--r-- 1 phaneendra dev 4.2K Oct 13 20:00
        InterviewBuddy_Website_Relaunch
      </span>
      <span className="output-text">
        Sole developer for the company's revamped website. Built from scratch
        using Next.js, engineered payment systems with Razorpay/PayPal, and
        deployed in a Dockerized environment.
      </span>
      <span className="tech-stack">
        [Next.js] [TypeScript] [PostgreSQL] [Docker] [Nginx]
      </span>
    </div>
    <div>
      <span className="project-name">
        -rw-r--r-- 1 phaneendra dev 3.8K Jul 22 14:30 B2C_Interview_Platform
      </span>
      <span className="output-text">
        Lead developer for the B2C portal. Architected and built core features
        including real-time video interviews with Twilio, secure assessments,
        and complex booking flows.
      </span>
      <span className="tech-stack">
        [Angular] [NestJS] [Twilio] [FFmpeg] [WebSockets]
      </span>
    </div> */}
    <ExperienceCard />
  </div>
);

const ContactOutput: React.FC = () => (
  <div className="grid grid-cols-[auto_1fr] gap-x-4">
    <span className="output-text">github:</span>
    <a
      href="https://github.com/phaneendra24"
      target="_blank"
      rel="noopener noreferrer"
      className="contact-link"
    >
      github.com/phaneendra24
    </a>
    <span className="output-text">linkedin:</span>
    <a
      href="https://linkedin.com/in/phaneendra-pilli/"
      target="_blank"
      rel="noopener noreferrer"
      className="contact-link"
    >
      linkedin.com/in/phaneendra-pilli
    </a>
    <span className="output-text">email:</span>
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

const CommandNotFound: React.FC<{ command: string }> = ({ command }) => (
  <div>
    <span className="error">bash: command not found: {command}</span>
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

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
      clear: { description: 'Clears the terminal screen.', output: null }, // 'clear' is a special case
    }),
    []
  );

  // Populate dynamic 'help' command output
  commands.help.output = <HelpOutput commands={commands} />;

  // Aliases for commands
  const aliasedCommands = {
    ls: commands.help,
  };

  // Focus input on click anywhere in the terminal
  const focusInput = () => inputRef.current?.focus();

  useEffect(focusInput, []);

  // Auto-scroll to bottom
  useEffect(() => {
    const el = terminalBodyRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [lines]);

  // Initial animation sequence

  useEffect(() => {
    const runInitialSequence = async () => {
      for (const command of initialCommands) {
        // Add the command line
        setLines((prev) => [
          ...prev,
          <Prompt key={`prompt-${prev.length}`} command={command} />,
        ]);
        await new Promise((res) => setTimeout(res, 500)); // Wait before showing output
        // Add the output
        setLines((prev) => [
          ...prev,
          <div key={`output-${prev.length}`}>{commands[command].output}</div>,
        ]);
        await new Promise((res) => setTimeout(res, 800)); // Wait before next command
      }
      // Add final help message
      setLines((prev) => [
        ...prev,
        <div key={`final-msg-${prev.length}`} className="output-text mt-4">
          Type `help` to see the list of available commands.
        </div>,
      ]);
    };
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
    } else if (e.key === 'Tab') {
      e.preventDefault();
      handleCommandSubmit('ls');
    }
  };

  return (
    <div
      className={`w-full h-screen flex sm:items-center mt-5 transition-all duration-300 ease-linear ${
        showPenguin || ShowMailMe
          ? 'max-sm:translate-y-24  transition-all duration-300 ease-linear '
          : ''
      }`}
    >
      <div
        className={`bg-[#24283b] border border-[#414868] terminal-window h-fit  max-w-4xl min-w-[50%] mx-auto rounded-lg shadow-2xl relative max-sm:max-w-[90%] transition-all duration-100`}
      >
        {/* Your AnimatePresence and Penguin popup JSX can remain here */}
        <AnimatePresence>
          {showPenguin && (
            <motion.div
              key="penguin"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 14,
              }}
              className="absolute -top-32  left-0 right-0 z-[100] grid grid-cols-3  rounded-b-xl shadow-2xl sm:p-6"
            >
              <img
                src="https://media.tenor.com/staU78dYIK4AAAAi/working-work.gif"
                alt="Tux Penguin"
                className="w-20 order-2 max-sm:col-span-2 sm:order-1 h-20 animate-bounce-slow "
              />
              <div className="order-1 sm:order-2 text-left w-full max-sm:col-span-3 text-xs  relative mt-3  text-gray-200 font-mono  sm:bg-[#1f2937] px-4 py-2 rounded-xl penguin-message">
                Maybe you want to view my resume?
              </div>
              <a
                href="https://your-public-resume-link.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 order-3 col-span-1 flex justify-end items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-transform hover:scale-105"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                View Resume
              </a>
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
              className="absolute -top-32  left-0 right-0 z-[100] flex items-center justify-between  rounded-b-xl shadow-2xl p-6"
            >
              <div className=" max-sm:hidden relative mt-3 text-center text-gray-200 font-mono text-base bg-[#1f2937] px-4 py-2 rounded-xl penguin-message">
                Maybe you want to Email me?
              </div>
              <a
                href="mailto:phaneendrapilli777@gmail.com"
                rel="noopener noreferrer"
                className="mt-3 flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-transform hover:scale-105"
              >
                <div className="box" data-state={ShowMailMe} />
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
                  }}
                >
                  <img
                    src="/mail.png"
                    alt="Mail icon"
                    className="w-10 h-10 bg-transparent "
                  />
                </motion.div>
                @phaneendrapilli777
              </a>
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
              }}
              className="w-3 h-3 rounded-full bg-red-500 cursor-pointer"
            ></div>
            <div
              className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer"
              onClick={() => {
                setShowMailMe(false);
                setShowPenguin(true);
              }}
            ></div>
            <div
              className="w-3 h-3 rounded-full bg-green-500 cursor-pointer"
              onClick={() => {
                setShowPenguin(false);
                setShowMailMe(true);
              }}
            ></div>
          </div>
          <div className="flex-grow text-center text-sm text-gray-400">
            phaneendra -- -bash
          </div>
        </div>

        {/* Terminal Body */}
        <div
          ref={terminalBodyRef}
          className="p-6 text-sm sm:text-base whitespace-pre-wrap min-h-[600px] overflow-y-auto"
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
          {lines.length === 0 && "Try 'help' for commands"}
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
      <span className="command">{command}</span>
    )}
  </div>
);

export default Terminal;
