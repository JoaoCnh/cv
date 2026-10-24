export type Job = {
  title: string;
  company: string;
  period: string;
  highlights: string[];
}

export type Education = {
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

  experience: [
    {
      title: 'Senior Staff Software Engineer',
      company: 'Mindera',
      period: 'May 2019 - Present',
      highlights: [
        'Built (from the ground-up) the new Homepage & Landing Page experiences for the Burberry website (Next.js, Node.js, React, TypeScript);',
        'Led the effort to create a full fledged Design System with extensive test coverage. Unit, Integration and Screenshot testing.',
        'Focused on clean code and performance tuning to deliver the best e-commerce experience;',
        "Led the effort to reduce the main application's bundle size by 60% improving page load performance significantly;",
        'Led the effort to migrate from Jest to Vitest. Reduced test execution time by 31% while increasing test coverage, improving efficiency and scalability.',
        'Implemented a custom visual regression testing plugin for Vitest for a design system; Vitest did not support it at the moment.',
        'Built a React Native all-in-one crypto and cash app;',
        "Built the app's marketing website using Next.js (https://hold.io);",
        'Built a custom backoffice app for managers and support to help customers;',
      ],
    },
    {
      title: 'Software Engineer',
      company: 'Wiremaze',
      period: 'Aug 2014 - May 2019',
      highlights: [
        "Added features to and maintained a complex CMS system used to build municipalities' websites;",
        'Built and maintained CMS systems using Ruby on Rails, Laravel, and .NET;',
        'Helped create the new generation of SAAS services for the company all the way from database architecture to the frontend using Ruby on Rails;',
        'Led the Petcare project. A platform to help municipal dog kennels manage their animals and take better care of them;',
        "Introduced and maintained React islands in Ruby on Rails applications creating the application's custom asset pipeline using Gulp and (later) Webpack as the main tools;",
        "Developed a React Native mobile application for Portugal's Health Regulatory Authority to facilitate the registration and management of inspections at healthcare establishments, including private clinics. Integrated API-driven dynamic forms to retrieve and render complex form structures, enabling data capture and storage, with offline functionality to support reliable operation without an internet connection.",
        'Developed multiple React Native mobile applications for municipal authorities, integrating with a custom-built CMS to retrieve, display, and manage dynamic content. Implemented API integrations to ensure content was delivered efficiently and consistently across applications.',
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
    'React Expert',
    'TypeScript',
    'Next.js and SvelteKit',
    'Svelte, Vue and Solid.js',
    'CSS, SCSS, Tailwind',
    'Vite and Vitest',
    'React Native',
    'Node.js',
    '.NET',
    'Ruby on Rails',
    'PHP',
    'Golang',
    'PostgreSQL, SQLServer and MySQL',
    'Software Design & Principles',
  ],
};