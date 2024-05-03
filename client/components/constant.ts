interface ListeningCategoriesMap {
  [key: string]: string[] | undefined;
}
export const level = [
  { value: "A2", label: "A2" },
  { value: "B1", label: "B1" },
  { value: "B2", label: "B2" },
  { value: "C1", label: "C1" },
  { value: "C2", label: "C2" },
];

export const ageGroup = [
  { value: "Young Learners 7-12", label: "Young Learners 7-12" },
  { value: "Teens 13-18", label: "Teens 13-18" },
  { value: "Adult&Young Adults 19-35", label: "Adult&Young Adults 19-35" },
];

export const numberOfWordsOptions = ["20", "40", "60", "80", "100", "200"];

export const listeningTaskOptions = [
  {
    value: "Personal Narratives",
    label: "Personal Narratives",
  },
  {
    value: "Descriptive Monologues",
    label: "Descriptive Monologues",
  },
  {
    value: "Dialogues in Social and Functional Contexts",
    label: "Dialogues in Social and Functional Contexts",
  },
  {
    value: "Workplace Interactions and Professional Scenarios",
    label: "Workplace Interactions and Professional Scenarios",
  },
  {
    value: "Informational Content",
    label: "Informational Content",
  },
  {
    value: "Adventurous and Travel Experiences",
    label: "Adventurous and Travel Experiences",
  },
];

export type TaskOptionType =
  | "Personal Narratives"
  | "Descriptive Monologues"
  | "Dialogues in Social and Functional Contexts"
  | "Workplace Interactions and Professional Scenarios"
  | "Informational Content"
  | "Adventurous and Travel Experiences";

export const listeningCategoriesMap: ListeningCategoriesMap = {
  "Personal Narratives": [
    "Journey of Self-Discovery",
    "Overcoming Personal Challenges",
    "Cultural Identity and Heritage",
    "Significant Life Events",
    "Achievements and Milestones",
    "Relationships and Connections",
  ],
  "Descriptive Monologues": [
    "Personal Experience Monologue",
    "Historical/Cultural Narrative",
    "Imaginative Storytelling",
    "Educational/Instructional",
    "Advocacy/Persuasive",
    "Expository/Analytical",
  ],
  "Dialogues in Social and Functional Contexts": [
    "Making Plans",
    "Dining Out",
    "Shopping Experiences",
    "Seeking Directions",
    "Workplace Communications",
    "Health and Well-being",
    "Housing and Accommodations",
    "Educational Settings",
    "Service Encounters",
    "Cultural Exchanges",
    "Event Planning and Organization",
    "Travel and Tourism Inquiries",
    "Leisure Activities and Hobbies",
    "Environmental and Community Issues",
    "Technology and Gadgets",
  ],
  "Workplace Interactions and Professional Scenarios": [
    "Team Collaboration",
    "Professional Growth",
    "Client Meetings and Negotiations",
    "Problem Resolution",
    "Onboarding and Training",
    "Client and Communication Strategies",
  ],
  "Informational Content": [
    "Scientific Discoveries and Innovations",
    "Environmental Awareness",
    "Global Issues and Current Events",
    "Health and Wellness Innovations",
    "Technological Ethics and Impact",
    "Space Exploration and Discoveries",
    "Sustainability in Modern Living",
  ],
  "Adventurous and Travel Experiences": [
    "Solo Travel Journeys",
    "Cultural Immersion Stories",
    "Adventure Sports and Activities",
    "Historical Site Explorations",
    "Wildlife and Nature Expeditions",
    "Volunteering Abroad",
    "Backpacking Adventures",
    "Culinary Tours",
    "Road Trips",
    "Island Escapades",
  ],
};
