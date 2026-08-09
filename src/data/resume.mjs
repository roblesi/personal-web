// Single source of truth for the resume.
// Rendered to the web at /resume (src/pages/resume.astro) and to the downloadable
// PDF at /resume.pdf (resume-src/build.mjs). Edit here; both stay in sync.

export const resume = {
  name: 'Ignacio Robles',
  tagline: 'Staff Software Engineer at Google. AI-native and versatile.',
  location: 'San Francisco, CA',
  contact: {
    email: 'hello@ignaciorobl.es',
    web: 'ignaciorobl.es',
    github: 'github.com/roblesi',
    linkedin: 'in/ignaciorobles',
  },

  summary:
    'Staff Software Engineer at Google and an AI-native builder with 15 years of experience across the stack. I bring large language models and modern AI into products people use every day, and I build with AI tooling to ship faster and go further. My background runs from applied ML to large scale distributed systems at Amazon and Google, plus a startup CTO role. Versatile, senior, and product focused, with a record of high impact systems, patents, and mentoring.',

  skills: [
    { label: 'AI & Machine Learning', items: 'Large language models and generative AI, AI-native development workflows, applied machine learning, genetic and evolutionary algorithms, parallel and distributed computing.' },
    { label: 'Languages', items: 'Python, Java, TypeScript, SQL.' },
    { label: 'Systems & Cloud', items: 'Large scale distributed systems, system design, AWS (EC2, S3, SQS, SNS, RDS), Google Cloud, Redis, Memcached, PostgreSQL.' },
    { label: 'Leadership', items: 'Technical mentoring, Amazon Bar Raiser, cross-organization design reviews.' },
  ],

  experience: [
    {
      title: 'Staff Software Engineer', org: 'Google', location: 'San Francisco, CA', dates: 'Apr 2025 – Present',
      bullets: [
        'Bring AI and the power of large language models to products people use every day.',
        'Drive an AI-native way of building, designing and shipping LLM-powered features across the team.',
        'Named inventor on 4 patents at Google.',
      ],
    },
    {
      title: 'Senior Software Engineer', org: 'Google (Nest)', location: 'Seattle, WA', dates: 'Oct 2019 – Apr 2025',
      bullets: [
        'Owned energy control features for the Nest Thermostat on the Nest Energy team, helping customers reduce their impact on the climate.',
        'Contributed to the launch of Nest Renew.',
        'Technologies: Java, Python.',
      ],
    },
    {
      title: 'Senior Software Development Engineer (SDE-III)', org: 'Amazon', location: 'Seattle, WA', dates: 'Apr 2018 – Oct 2019',
      bullets: [
        'Designed and led a scalable system to cartonize items for Prime Now orders, reducing P99 latency by 89% and 78% on average.',
        'Nominated by Prime Now leadership and presented at the F3 Amazon Science Fair.',
        'Designed a new system for online order fulfillment spanning three technology organizations.',
        'Member of the F3 Samurai Group; led weekly design reviews and consultations, and coached two Bar Raisers in Training to certification.',
      ],
    },
    {
      title: 'Software Development Engineer (SDE-II)', org: 'Amazon', location: 'Seattle, WA', dates: 'Jun 2014 – Mar 2018',
      bullets: [
        'Ranked top tier year over year and won the Amazon A2Z Award for performance and peer recognition.',
        'Engineered machine learning models for offline ad campaigns, peaking at 91% registrations per click.',
        'Built tools that saved $2.8M yearly and raised productivity by an average of 13% across Prime Now warehouses in North America.',
        'Main author of a machine learning paper accepted with positive blind peer reviews at the Amazon Machine Learning Conference 2016.',
        'Certified Bar Raiser across 400+ interviews; won the Amazon Bringer of Talent award.',
      ],
    },
    {
      title: 'Lead Platform Engineer', org: 'Rushmore', location: 'Madrid, Spain', dates: 'Dec 2013 – May 2014',
      bullets: [
        'Owned the product RESTful API and the AWS infrastructure, shipping new features and resolving critical bottlenecks.',
        'Migrated the API to a more stable version and removed heavy dependencies. Featured in TechCrunch and The Next Web.',
      ],
    },
    {
      title: 'Senior Backend Engineer & CTO', org: 'Fever', location: 'Madrid, Spain', dates: 'Nov 2012 – Nov 2013',
      bullets: [
        'Defined the entire system architecture from scratch, from databases and web servers to monitoring.',
        'Designed and built the main RESTful API consumed by the iOS and Android clients, over 85,000 lines of code, plus third-party integrations for payments, social, metrics, and push.',
        'Featured in Forbes, Business Insider, TechCrunch, Mashable, and the Wall Street Journal.',
      ],
    },
    {
      title: 'Senior Backend Engineer', org: 'Massive Knowledge', location: 'Ciudad Real, Spain', dates: 'Sep 2011 – Oct 2012',
      bullets: [
        'Built a distributed vertical crawler from scratch and owned the company database and systems infrastructure across local and cloud fleets.',
      ],
    },
    {
      title: 'Software Development Engineer', org: 'DiCITS Lab, University of Granada', location: 'Granada, Spain', dates: 'Jan 2010 – Jan 2011',
      bullets: [
        'Developed new greedy algorithms for time series forecasting and implemented state-of-the-art techniques from the literature, applied to infrastructure evaluation and preservation.',
      ],
    },
  ],

  patents: {
    lead: 'Named inventor on 4 patents at Google, including',
    title: 'Generating Actionable Insights from Smart Home Event Data',
    tail: '(2025).',
  },

  publications: [
    { cite: 'Robles, I., Alcala, R., Benitez, J.M. (2010).', title: 'On the Use of Distributed Genetic Algorithms for the Tuning of Fuzzy Rule-Based Systems.', venue: 'Parallel and Distributed Computational Intelligence, SCI 269.' },
    { cite: 'Alcala, J., Garcia, S., Sanchez, L., Robles, I. (2010).', title: 'Introduction to the Experimental Design in the Data Mining Tool KEEL.', venue: 'Intelligent Soft Computation and Evolving Data Mining: Integrating Advanced Technology.' },
    { cite: 'Robles, I., Alcala, R., Benitez, J.M. (2009).', title: 'Evolutionary Parallel and Gradually Distributed Lateral Tuning of Fuzzy Rule-Based Systems.', venue: 'Evolutionary Intelligence, volume 2, 5-19.' },
    { cite: 'Robles, I., Alcala, R., Benitez, J.M. (2009).', title: 'Distributed Genetic Tuning of Fuzzy Rule-Based Systems.', venue: 'IFSA/EUSFLAT 2009, 1740-1744.' },
  ],

  education: [
    { degree: 'Ph.D., Machine Learning, 2013', meta: 'University of Granada, Spain. Thesis: Evolutionary Fuzzy Systems, Multiple Objectives, Scalability and Distributed Models.' },
    { degree: 'M.Sc., Soft Computing and Intelligent Systems, 2010', meta: 'University of Granada, Spain. Project published in an international journal.' },
    { degree: 'B.Sc., Computer Science Engineering, 2009', meta: 'University of Granada, Spain. Distributed computational intelligence.' },
    { degree: 'B.Sc., Information Technology Engineering, 2006', meta: 'University of Granada, Spain. Valedictorian, honors in Theory of Algorithms and Object-Oriented Software Design.' },
  ],
};
