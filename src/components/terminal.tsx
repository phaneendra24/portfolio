import React, { useEffect, useRef } from 'react';
import './Terminal.css'; // Move styles from <style> tag into a CSS file (see below)

const Terminal: React.FC = () => {
  const terminalBodyRef = useRef<HTMLDivElement | null>(null);

  const typingDelay = 50;
  const commandDelay = 500;

  const commands: Record<string, { description: string; output: string }> = {
    whoami: {
      description: 'A little bit about me.',
      output: `
<strong class="text-xl text-white">Phaneendra Pilli. Full Stack Developer.</strong>

You could say I have a healthy obsession with building things. From complex software platforms to a streamlined command-line workflow, I’m driven by the process of turning a great idea into an efficient reality.
`,
    },
    projects: {
      description: 'View my professional work.',
      output: `
<span class="project-name">-rw-r--r-- 1 phaneendra dev 4.2K Oct 13 20:00 InterviewBuddy_Website_Relaunch</span>
  <span class="output-text">Sole developer for the company's revamped website. Built from scratch using Next.js, engineered payment systems with Razorpay/PayPal, and deployed in a Dockerized environment.</span>
  <span class="tech-stack">[Next.js] [TypeScript] [PostgreSQL] [Docker] [Nginx]</span>

<span class="project-name">-rw-r--r-- 1 phaneendra dev 3.8K Jul 22 14:30 B2C_Interview_Platform</span>
  <span class="output-text">Lead developer for the B2C portal. Architected and built core features including real-time video interviews with Twilio, secure assessments, and complex booking flows.</span>
  <span class="tech-stack">[Angular] [NestJS] [Twilio] [FFmpeg] [WebSockets]</span>
`,
    },
    contact: {
      description: 'How to get in touch.',
      output: `
  <span class="output-text">github:</span>     <a href="https://github.com/phaneendra24" target="_blank" class="contact-link">github.com/phaneendra24</a>
  <span class="output-text">linkedin:</span>   <a href="https://linkedin.com/in/phaneendra-pilli/" target="_blank" class="contact-link">linkedin.com/in/phaneendra-pilli</a>
  <span class="output-text">email:</span>      <a href="mailto:phaneendrapilli777@gmail.com" class="contact-link">phaneendrapilli777@gmail.com</a>
`,
    },
    help: {
      description: 'Lists all available commands.',
      output: '',
    },
    ls: {
      description: 'Lists all available commands.',
      output: '',
    },
    clear: {
      description: 'Clears the terminal screen.',
      output: '',
    },
  };

  commands.ls.output =
    '\n<span class="output-text">Available commands:</span>\n' +
    Object.keys(commands)
      .map(
        (cmd) =>
          `  <span class="command">${cmd.padEnd(
            10
          )}</span> - <span class="output-text">${
            commands[cmd].description
          }</span>`
      )
      .join('\n') +
    '\n';

  commands.help.output =
    '\n<span class="output-text">Available commands:</span>\n' +
    Object.keys(commands)
      .map(
        (cmd) =>
          `  <span class="command">${cmd.padEnd(
            10
          )}</span> - <span class="output-text">${
            commands[cmd].description
          }</span>`
      )
      .join('\n') +
    '\n';

  const scrollToBottom = () => {
    const el = terminalBodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  };

  const appendOutput = (html: string) => {
    const el = terminalBodyRef.current;
    if (!el) return;
    const outputEl = document.createElement('div');
    outputEl.innerHTML = html;
    el.appendChild(outputEl);
    scrollToBottom();
  };

  const createPrompt = (isInteractive = false) => {
    const promptContainer = document.createElement('div');
    promptContainer.classList.add('flex');
    promptContainer.classList.add('gap-1');
    let content =
      '<span class="prompt-user">phaneendra@portfolio</span><span class="prompt-symbol">:~$</span> ';
    if (isInteractive) {
      content += `
          <span class="command-input-container">
            <input type="text" id="terminal-input" class="terminal-input" autocomplete="off" />
          </span>
          `;
    }
    promptContainer.innerHTML = content;
    return promptContainer;
  };

  const processCommand = (command: string) => {
    const el = terminalBodyRef.current;
    if (!el) return;

    if (!command) return;

    if (commands[command]) {
      if (command === 'clear') {
        el.innerHTML = '';
      } else {
        appendOutput(commands[command].output);
      }
    } else {
      appendOutput(
        `<span class="error">bash: command not found: ${command}</span>\n<span class="output-text">Try 'help' for a list of available commands.</span>`
      );
    }
  };

  const createNewInteractiveLine = () => {
    const el = terminalBodyRef.current;
    if (!el) return;

    const newLine = createPrompt(true);
    el.appendChild(newLine);

    const currentInput =
      newLine.querySelector<HTMLInputElement>('#terminal-input');
    currentInput?.focus();

    currentInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const command = currentInput.value.trim();

        const staticLine = currentInput.closest('div');
        if (staticLine) {
          staticLine.innerHTML = `<span class="prompt-user">phaneendra@portfolio</span><span class="prompt-symbol">:~$</span> <span class="command">${command}</span>`;
        }

        processCommand(command);
        createNewInteractiveLine();
      }
    });
  };

  const typeText = (element: HTMLElement, text: string): Promise<void> => {
    return new Promise((resolve) => {
      let i = 0;
      const type = () => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          scrollToBottom();
          setTimeout(type, typingDelay);
        } else {
          resolve();
        }
      };
      type();
    });
  };

  const runInitialSequence = async () => {
    const el = terminalBodyRef.current;
    if (!el) return;

    const initialCommands = ['whoami', 'projects', 'contact'];

    for (const command of initialCommands) {
      const promptEl = createPrompt();
      el.appendChild(promptEl);

      const commandSpan = document.createElement('span');
      commandSpan.className = 'command';
      promptEl.appendChild(commandSpan);

      await typeText(commandSpan, command);
      await new Promise((resolve) => setTimeout(resolve, commandDelay / 2));
      appendOutput(commands[command].output);
      await new Promise((resolve) => setTimeout(resolve, commandDelay));
    }

    appendOutput(
      '\n<span class="output-text">Type `help` to see the list of available commands.</span>'
    );
    createNewInteractiveLine();
  };

  useEffect(() => {
    runInitialSequence();
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'l') {
        event.preventDefault(); // Prevent browser default (address bar focus)
        console.log('Ctrl+L or Cmd+L pressed!');
        processCommand('clear');

        createNewInteractiveLine();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full ">
      <div className="bg-red-600 w-full text-center text-white">
        Site is under construction
      </div>
      <div
        className="terminal-window max-w-4xl min-w-[50%] mx-auto rounded-lg shadow-2xl overflow-hidden"
        onClick={() => {
          const input = document.getElementById(
            'terminal-input'
          ) as HTMLInputElement | null;
          input?.focus();
        }}
      >
        {/* Terminal Header */}
        <div className="bg-gray-800 px-4 py-2 flex items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-grow text-center text-sm text-gray-400">
            phaneendra -- -bash
          </div>
        </div>

        {/* Terminal Body */}
        <div
          id="terminal-body"
          ref={terminalBodyRef}
          className="p-6 text-sm sm:text-base whitespace-pre-wrap min-h-[600px] overflow-y-auto"
        ></div>
      </div>
    </div>
  );
};

export default Terminal;
