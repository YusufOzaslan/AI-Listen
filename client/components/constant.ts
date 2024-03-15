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
    value: "personalNarratives",
    label: "Personal Narratives",
  },
  {
    value: "descriptiveMonologues",
    label: "Descriptive Monologues",
  },
  {
    value: "dialogues",
    label: "Dialogues in Social and Functional Contexts",
  },
  {
    value: "workplaceInteractions",
    label: "Workplace Interactions and Professional Scenarios",
  },
  {
    value: "informationalContent",
    label: "Informational Content",
  },
  {
    value: "adventurousTravel",
    label: "Adventurous and Travel Experiences",
  },
];

export type TaskOptionType =
  | "personalNarratives"
  | "descriptiveMonologues"
  | "dialogues"
  | "workplaceInteractions"
  | "informationalContent"
  | "adventurousTravel";

export const listeningCategoriesMap: ListeningCategoriesMap = {
  personalNarratives: [
    "Journey of Self-Discovery",
    "Overcoming Personal Challenges",
    "Cultural Identity and Heritage",
    "Significant Life Events",
    "Achievements and Milestones",
    "Relationships and Connections",
  ],
  descriptiveMonologues: [
    "Personal Experience Monologue",
    "Historical/Cultural Narrative",
    "Imaginative Storytelling",
    "Educational/Instructional",
    "Advocacy/Persuasive",
    "Expository/Analytical",
  ],
  dialogues: [
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
  workplaceInteractions: [
    "Team Collaboration",
    "Professional Growth",
    "Client Meetings and Negotiations",
    "Problem Resolution",
    "Onboarding and Training",
    "Client and Communication Strategies",
  ],
  informationalContent: [
    "Scientific Discoveries and Innovations",
    "Environmental Awareness",
    "Global Issues and Current Events",
    "Health and Wellness Innovations",
    "Technological Ethics and Impact",
    "Space Exploration and Discoveries",
    "Sustainability in Modern Living",
  ],
  adventurousTravel: [
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
