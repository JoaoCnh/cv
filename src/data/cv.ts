export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface Tech {
  name: string;
  /** simple-icons slug(s), tried in order. Leave out for a text-only tile. */
  icon?: string | string[];
}

export interface Job {
  title: string;
  company: string;
  period: string;
  highlights: string[];
  stats?: Stat[];
  stack: Tech[];
}

export interface Education {
  school: string;
  degree: string;
  period: string;
}

export const cv = {
  name: 'João Cunha',
  headline: 'Software Engineer',
  email: 'joaomarinho.cunha@gmail.com',
  location: 'Porto, Portugal',

  summary:
    'Full-Stack Software Engineer with over 10 years of experience in designing, developing, and maintaining robust, scalable software systems. Proficient in React, TypeScript, Node.js, PostgreSQL, AWS, Docker, and related technologies, with experience delivering end-to-end solutions across web and mobile platforms. A collaborative and results-driven professional committed to writing high-quality code, solving complex technical challenges, and contributing to the success of cross-functional teams.',

  stats: [
    { value: 10, suffix: '+', label: 'years of experience' },
    { value: 50, suffix: '+', label: 'production delivered projects' },
  ],

  experience: [
    {
      title: 'Senior Staff Software Engineer',
      company: 'Mindera',
      period: 'May 2019 - Present',
      stack: [
        { name: 'React', icon: 'react' },
        { name: 'React Native', icon: 'react' },
        { name: 'TypeScript', icon: 'typescript' },
        { name: 'Emotion', icon: 'emotion' },
        { name: 'CSS', icon: ['css', 'css3'] },
        { name: 'CSS Modules', icon: ['cssmodules', 'css3'] },
        { name: 'Node.js', icon: 'nodedotjs' },
        { name: 'DynamoDB & AWS', icon: ['amazondynamodb', 'amazonaws'] },
        { name: 'Next.js', icon: 'nextdotjs' },
        { name: 'Webpack', icon: 'webpack' },
        { name: 'Vite', icon: 'vite' },
        { name: 'Vitest', icon: 'vitest' },
        { name: 'Cypress', icon: 'cypress' },
        { name: 'Playwright', icon: 'playwright' },
        { name: 'Tailwind', icon: 'tailwindcss' },
      ],
      highlights: [
        'Built (from the ground-up) the new Homepage & Landing Page experiences for the Burberry website (Next.js, Node.js, React, TypeScript);',
        'Led the effort to create a full fledged Design System with extensive test coverage. Unit, Integration and Screenshot testing.',
        'Focused on clean code and performance tuning to deliver the best e-commerce experience;',
        "Led the effort to reduce the main application's bundle size by 60% improving page load performance significantly;",
        'Led the effort to migrate from Jest to Vitest. Reduced test execution time by 31% while increasing test coverage, improving efficiency and scalability.',
        'Implemented a custom visual regression testing plugin for Vitest for a design system; Vitest did not support it at the moment.',
        'Created an integration testing system using Playwright to separate unit testing from actual integration testing',
        'Built a React Native all-in-one crypto and cash app;',
        "Built the app's marketing website using Next.js (https://hold.io);",
        'Built a custom backoffice app for managers and support to help customers;',
      ],
      stats: [
        { value: 60, suffix: '%', label: 'reduced main bundle size' },
        {
          value: 31,
          suffix: '%',
          label: 'improved test runtime (Jest to Vitest migration)',
        },
        { value: 200, suffix: '+', label: 'tests added' },
        {
          value: 120,
          suffix: 'secs',
          label: 'shaved across CI/CD pipelines runtime',
        },
      ],
    },
    {
      title: 'Software Engineer',
      company: 'Wiremaze',
      period: 'Aug 2014 - May 2019',
      stack: [
        { name: 'Ruby on Rails', icon: 'rubyonrails' },
        { name: '.NET', icon: 'dotnet' },
        { name: 'PHP & Laravel', icon: ['laravel', 'php'] },
        { name: 'Golang', icon: 'go' },
        { name: 'Node.js', icon: 'nodedotjs' },
        { name: 'PostgreSQL', icon: 'postgresql' },
        { name: 'SQL Server', icon: 'microsoftsqlserver' },
        { name: 'MySQL', icon: 'mysql' },
        { name: 'SQLite', icon: 'sqlite' },
        { name: 'Angular', icon: 'angular' },
        { name: 'React', icon: 'react' },
        { name: 'React Native', icon: 'react' },
        { name: 'Handlebars.js', icon: 'handlebarsdotjs' },
        { name: 'JavaScript', icon: 'javascript' },
        { name: 'CSS', icon: 'css' },
        { name: 'SCSS', icon: 'sass' },
        { name: 'styled components', icon: 'styledcomponents' },
        { name: 'Jest', icon: 'jest' },
        { name: 'Gulp', icon: 'gulp' },
        { name: 'Grunt', icon: 'grunt' },
        { name: 'Webpack', icon: 'webpack' },
        { name: 'Cypress', icon: 'cypress' },
      ],
      highlights: [
        "Added features to and maintained a complex CMS system used to build municipalities' websites;",
        'Built and maintained CMS systems using Ruby on Rails, Laravel, and .NET;',
        'Helped create the new generation of SAAS services for the company all the way from database architecture to the frontend using Ruby on Rails;',
        'Led the Petcare project. A platform to help municipal dog kennels manage their animals and take better care of them;',
        "Introduced and maintained React islands in Ruby on Rails applications creating the application's custom asset pipeline using Gulp and (later) Webpack as the main tools;",
        "Developed a React Native mobile application for Portugal's Health Regulatory Authority to facilitate the registration and management of inspections at healthcare establishments, including private clinics. Integrated API-driven dynamic forms to retrieve and render complex form structures, enabling data capture and storage, with offline functionality to support reliable operation without an internet connection.",
        'Developed multiple React Native mobile applications for municipal authorities, integrating with a custom-built CMS to retrieve, display, and manage dynamic content. Implemented API integrations to ensure content was delivered efficiently and consistently across applications.',
      ],
      stats: [
        { value: 10, suffix: '+', label: 'apps shipped across web and mobile' },
        {
          value: 220,
          suffix: '+',
          label: 'municipal websites running on the CMS',
        },
        {
          value: 50,
          suffix: '%',
          label: 'improvement on LCP on all CMS delivered pages',
        },
      ],
    },
  ] satisfies Job[],

  education: [
    {
      school: 'ISEP',
      degree: 'Computer Science Bachelor',
      period: '2011 - 2014',
    },
  ] satisfies Education[],

  skills: [
    'Software Design & Principles',
    'System Design',
    'React Expert',
    'TypeScript',
    'Next.js and SvelteKit',
    'Svelte, Vue and Solid.js',
    'CSS, SCSS, Tailwind',
    'Vite and Vitest',
    'Playwright',
    'CI/CD Optimisation',
    'React Native',
    'Node.js',
    '.NET',
    'Ruby on Rails',
    'PHP',
    'Golang',
    'PostgreSQL, SQLServer and MySQL',
  ],
};
