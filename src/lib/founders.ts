export type Founder = {
  id: string;
  name: string;
  credentials: string;
  role: string;
  location: string;
  linkedIn: string;
  /** Local path under public/ (sourced from LinkedIn profile) */
  headshot?: string;
  bio: string[];
  highlights: string[];
  education: string[];
};

export const founders: Founder[] = [
  {
    id: "patrick-steiner",
    name: "Patrick Steiner",
    credentials: "MBA",
    role: "Co-Founder",
    location: "Toledo, Ohio Metropolitan Area",
    linkedIn: "https://www.linkedin.com/in/steinerpr/",
    headshot: "/founders/patrick-steiner.jpg",
    bio: [
      "Patrick is a proven sales leader with nearly two decades of experience building high-performing teams in complex, high-pressure environments—from combat deployments to enterprise medical device sales.",
      "A U.S. Army veteran who commissioned through Officer Candidate School after serving as a Human Intelligence Collector in Iraq, he led infantry platoons and company-level operations through Ranger School, Airborne, and deployments to Afghanistan. That same discipline and mission focus now guides Mission 2 Markets’s approach to sales and leadership development for all professionals.",
      "After the military, Patrick built a career in cardiac rhythm management—rising from field clinical specialist to regional sales director at BIOTRONIK and now leading territory sales at RhythmScience. He draws on military leadership to coach teams, solve complex problems, and deliver superior results for customers.",
    ],
    highlights: [
      "U.S. Army Captain — infantry leadership, Ranger-qualified",
      "Regional sales leadership at BIOTRONIK; territory sales at RhythmScience",
      "Certified Cardiac Device Specialist (CCDS)",
      "Lean Six Sigma Green Belt",
    ],
    education: [
      "MBA, University of Notre Dame — Mendoza College of Business",
      "B.A. Political Science, University of California, Davis",
    ],
  },
  {
    id: "andrew-letarte",
    name: "Andrew Letarte",
    credentials: "MBA",
    role: "Co-Founder",
    location: "Iowa City, Iowa",
    linkedIn: "https://www.linkedin.com/in/andrewletarte/",
    headshot: "/founders/andrew-letarte.jpg",
    bio: [
      "Andrew is a competitive, results-driven leader with deep experience in medical device sales and nearly a decade of service as a U.S. Army Infantry Officer.",
      "From platoon-level operations to senior logistics and battalion staff roles at Fort Lewis and Fort Campbell, he managed complex missions, multi-million-dollar equipment accountability, and teams under pressure—skills he now translates into sales strategy and mentorship for professionals in the private sector.",
      "In medical technology, Andrew progressed from field clinical specialist to principal account manager at Inari Medical, with prior tenure at BIOTRONIK. He is known for building efficient teams, clear communication, and disciplined execution in highly technical, relationship-driven sales environments.",
    ],
    highlights: [
      "U.S. Army Infantry Officer — Captain, operations & logistics leadership",
      "Principal Account Manager at Inari Medical",
      "Former sales representative & field clinical specialist at BIOTRONIK",
      "Focused on team building, prioritization, and complex account management",
    ],
    education: [
      "MBA, Management & Leadership — University of Iowa Tippie College of Business",
      "B.S. Finance, Providence College",
    ],
  },
];
