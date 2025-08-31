import type { User } from "@/contexts/auth-context"

export interface Entrepreneur extends User {
  role: "entrepreneur"
  company: string
  industry: string
  fundingStage: "pre-seed" | "seed" | "series-a" | "series-b" | "growth"
  fundingGoal: string
  description: string
  achievements: string[]
  technologies: string[]
}

export interface Investor extends User {
  role: "investor"
  firm: string
  investmentFocus: string[]
  ticketSize: string
  portfolioSize: number
  description: string
  expertise: string[]
}

export interface CollaborationRequest {
  id: string
  fromUserId: string
  toUserId: string
  fromUser: User
  message: string
  status: "pending" | "accepted" | "declined"
  createdAt: string
  projectTitle?: string
}

export const mockEntrepreneurs: Entrepreneur[] = [
  {
    id: "ent-1",
    email: "alex.chen@techstart.com",
    name: "Alex Chen",
    role: "entrepreneur",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    bio: "Building the future of AI-powered healthcare solutions",
    company: "HealthTech AI",
    location: "San Francisco, CA",
    industry: "Healthcare Technology",
    fundingStage: "seed",
    fundingGoal: "$2M",
    description:
      "Developing AI-powered diagnostic tools to revolutionize early disease detection. Our platform uses machine learning to analyze medical imaging with 95% accuracy.",
    achievements: [
      "Featured in TechCrunch",
      "Winner of Healthcare Innovation Award 2024",
      "Partnership with Stanford Medical Center",
    ],
    technologies: ["AI/ML", "Python", "TensorFlow", "React", "Node.js"],
    interests: ["Healthcare", "AI", "Machine Learning"],
  },
  {
    id: "ent-2",
    email: "sarah.johnson@greentech.com",
    name: "Sarah Johnson",
    role: "entrepreneur",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    bio: "Sustainable technology for a better tomorrow",
    company: "GreenTech Solutions",
    location: "Austin, TX",
    industry: "Clean Technology",
    fundingStage: "series-a",
    fundingGoal: "$5M",
    description:
      "Creating innovative solar panel technology that's 40% more efficient than traditional panels. Our breakthrough in perovskite cells is changing the renewable energy landscape.",
    achievements: [
      "DOE Innovation Grant Recipient",
      "Clean Energy Startup of the Year",
      "Patent holder for advanced solar cell technology",
    ],
    technologies: ["IoT", "Python", "React", "MongoDB", "AWS"],
    interests: ["Clean Energy", "Sustainability", "Innovation"],
  },
  {
    id: "ent-3",
    email: "mike.rodriguez@fintech.com",
    name: "Mike Rodriguez",
    role: "entrepreneur",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
    bio: "Democratizing financial services for everyone",
    company: "FinTech Pro",
    location: "New York, NY",
    industry: "Financial Technology",
    fundingStage: "pre-seed",
    fundingGoal: "$1M",
    description:
      "Building a mobile-first banking platform for underserved communities. Our app provides micro-loans, savings tools, and financial education.",
    achievements: ["Y Combinator Alumni", "Featured in Forbes 30 Under 30", "10,000+ active users in beta"],
    technologies: ["React Native", "Node.js", "PostgreSQL", "Stripe", "AWS"],
    interests: ["FinTech", "Financial Inclusion", "Mobile Technology"],
  },
]

export const mockInvestors: Investor[] = [
  {
    id: "inv-1",
    email: "david.kim@venturecap.com",
    name: "David Kim",
    role: "investor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    bio: "Early-stage investor focused on deep tech innovations",
    company: "Venture Capital Partners",
    location: "Palo Alto, CA",
    firm: "Venture Capital Partners",
    investmentFocus: ["AI/ML", "Healthcare", "Deep Tech"],
    ticketSize: "$500K - $2M",
    portfolioSize: 15,
    description:
      "20+ years of experience in venture capital with a focus on transformative technologies. Led investments in 3 unicorn companies.",
    expertise: ["AI/ML", "Healthcare", "SaaS", "B2B"],
    interests: ["Technology", "Innovation", "Startups"],
  },
  {
    id: "inv-2",
    email: "lisa.wang@growthfund.com",
    name: "Lisa Wang",
    role: "investor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
    bio: "Growth-stage investor passionate about sustainable technology",
    company: "Growth Fund Ventures",
    location: "Seattle, WA",
    firm: "Growth Fund Ventures",
    investmentFocus: ["Clean Tech", "Sustainability", "B2B SaaS"],
    ticketSize: "$2M - $10M",
    portfolioSize: 8,
    description:
      "Former entrepreneur turned investor. Specializes in scaling sustainable technology companies from Series A to IPO.",
    expertise: ["Clean Technology", "Operations", "Scaling", "ESG"],
    interests: ["Sustainability", "Clean Energy", "Growth"],
  },
]

export const mockCollaborationRequests: CollaborationRequest[] = [
  {
    id: "req-1",
    fromUserId: "inv-1",
    toUserId: "ent-1",
    fromUser: mockInvestors[0],
    message:
      "Hi Alex, I'm very interested in your AI healthcare platform. I'd love to discuss a potential investment and how we can help scale your technology. Would you be available for a call this week?",
    status: "pending",
    createdAt: "2024-01-15T10:30:00Z",
    projectTitle: "HealthTech AI Investment Discussion",
  },
  {
    id: "req-2",
    fromUserId: "inv-2",
    toUserId: "ent-2",
    fromUser: mockInvestors[1],
    message:
      "Sarah, your solar panel technology breakthrough caught my attention. As someone focused on clean tech investments, I believe there's great synergy here. Let's explore partnership opportunities.",
    status: "pending",
    createdAt: "2024-01-14T14:20:00Z",
    projectTitle: "GreenTech Partnership Opportunity",
  },
  {
    id: "req-3",
    fromUserId: "ent-3",
    toUserId: "inv-1",
    fromUser: mockEntrepreneurs[2],
    message:
      "David, I've been following your portfolio and would love to discuss how FinTech Pro aligns with your investment thesis. Our traction in underserved markets could be of interest.",
    status: "accepted",
    createdAt: "2024-01-13T09:15:00Z",
    projectTitle: "FinTech Pro Seed Round",
  },
]
