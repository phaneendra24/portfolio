import React from 'react';
import {
  SiTypescript,
  SiJavascript,
  SiAngular,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiNestjs,
  SiNodedotjs,
  SiExpress,
  SiPrisma,
  SiHasura,
  SiPostgresql,
  SiDocker,
  SiNginx,
  SiLinux,
  SiGit,
  SiGraphql,
  SiTwilio,
  SiFfmpeg,
  SiDigitalocean,
  SiPortainer,
  SiRedis,
} from 'react-icons/si';
import { FaDatabase } from 'react-icons/fa';

// Flattened list of skills with their corresponding icons
const skills = [
  {
    name: 'TypeScript',
    icon: <SiTypescript size={20} className="text-blue-400" />,
  },
  {
    name: 'JavaScript',
    icon: <SiJavascript size={20} className="text-yellow-400" />,
  },
  { name: 'SQL', icon: <FaDatabase size={20} className="text-cyan-400" /> },
  { name: 'Angular', icon: <SiAngular size={20} className="text-red-500" /> },
  { name: 'React', icon: <SiReact size={20} className="text-blue-500" /> },
  { name: 'Next.js', icon: <SiNextdotjs size={20} /> },
  {
    name: 'Tailwind CSS',
    icon: <SiTailwindcss size={20} className="text-teal-400" />,
  },
  { name: 'HTML5', icon: <SiHtml5 size={20} className="text-orange-500" /> },
  { name: 'CSS3', icon: <SiCss3 size={20} className="text-blue-500" /> },
  { name: 'NestJS', icon: <SiNestjs size={20} className="text-red-600" /> },
  {
    name: 'Node.js',
    icon: <SiNodedotjs size={20} className="text-green-500" />,
  },
  { name: 'Express', icon: <SiExpress size={20} /> },
  { name: 'Prisma', icon: <SiPrisma size={20} className="text-teal-500" /> },
  { name: 'Hasura', icon: <SiHasura size={20} className="text-purple-500" /> },
  {
    name: 'PostgreSQL',
    icon: <SiPostgresql size={20} className="text-blue-400" />,
  },
  { name: 'Docker', icon: <SiDocker size={20} className="text-blue-600" /> },
  { name: 'Nginx', icon: <SiNginx size={20} className="text-green-600" /> },
  { name: 'Linux', icon: <SiLinux size={20} /> },
  { name: 'Git', icon: <SiGit size={20} className="text-orange-600" /> },
  { name: 'GraphQL', icon: <SiGraphql size={20} className="text-pink-500" /> },
  { name: 'REST APIs', icon: null },
  { name: 'WebSockets', icon: null },
  { name: 'Twilio', icon: <SiTwilio size={20} className="text-red-500" /> },
  { name: 'FFmpeg', icon: <SiFfmpeg size={20} className="text-green-500" /> },
  { name: 'Redis', icon: <SiRedis size={20} className="text-green-500" /> },

  {
    name: 'DigitalOcean',
    icon: <SiDigitalocean size={20} className="text-blue-500" />,
  },
  {
    name: 'Portainer',
    icon: <SiPortainer size={20} className="text-blue-500" />,
  },
];

export default function SkillsComponent() {
  return (
    <div className="w-full ">
      {/* Skills Output Grid */}
      <div className="mt-4 flex flex-wrap gap-2 sm:gap-4">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex items-center gap-2 bg-gray-800/50 py-2 px-3 rounded-md border border-gray-700/50 transition-colors hover:border-cyan-400/50"
          >
            {skill.icon}
            <span className="text-gray-300 font-medium">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
