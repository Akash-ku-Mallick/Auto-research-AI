import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface WaitlistSubmission {
  id: string;
  name: string;
  email: string;
  role: string;
  monthlyVolume: string;
  channels: string[];
  databasePref: string;
  notes?: string;
  ticketNumber: number;
  submittedAt: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  category: string;
  message: string;
  submittedAt: string;
}

export interface GeneratedBlueprint {
  title: string;
  summary: string;
  viralScore: number;
  developerImpact: string;
  indiaImpact: string;
  linkedinHook: string;
  linkedinPost: string;
  twitterThread: string[];
  videoScript: string;
  jsonOutput: string;
  tokensSavedPct: number;
  latencyMs: number;
}

export interface LandingState {
  isWaitlistOpen: boolean;
  isContactOpen: boolean;
  waitlistTickets: WaitlistSubmission[];
  currentTicket: WaitlistSubmission | null;
  // Playground state
  playground: {
    presetId: string;
    customTopic: string;
    customContent: string;
    aiMode: 'hybrid' | 'gemini';
    weights: {
      viral: number;
      devImpact: number;
      visual: number;
    };
    isSimulating: boolean;
    currentStep: number;
    blueprint: GeneratedBlueprint | null;
  };
  // Pricing state
  pricing: {
    monthlyArticles: number;
    billingCycle: 'monthly' | 'annual';
  };
}

const initialPresetContent = `Next.js 16 introduces dynamic partial pre-rendering (PPR) as a stable primitive, completely unifying static site generation with edge dynamic streaming. Benchmark tests show server response times dropped by 48% across heavy database-backed landing pages, whilst cold-start micro-delays were eliminated entirely by caching speculative chunk manifests.`;

const initialState: LandingState = {
  isWaitlistOpen: false,
  isContactOpen: false,
  waitlistTickets: [],
  currentTicket: null,
  playground: {
    presetId: 'nextjs-16',
    customTopic: 'Next.js 16 Dynamic Partial Pre-Rendering (PPR)',
    customContent: initialPresetContent,
    aiMode: 'hybrid',
    weights: {
      viral: 85,
      devImpact: 90,
      visual: 70,
    },
    isSimulating: false,
    currentStep: 0,
    blueprint: null,
  },
  pricing: {
    monthlyArticles: 15000,
    billingCycle: 'annual',
  },
};

export const landingSlice = createSlice({
  name: 'landing',
  initialState,
  reducers: {
    openWaitlist: (state) => {
      state.isWaitlistOpen = true;
    },
    closeWaitlist: (state) => {
      state.isWaitlistOpen = false;
    },
    openContact: (state) => {
      state.isContactOpen = true;
    },
    closeContact: (state) => {
      state.isContactOpen = false;
    },
    addWaitlistSubmission: (state, action: PayloadAction<Omit<WaitlistSubmission, 'id' | 'ticketNumber' | 'submittedAt'>>) => {
      const ticketNumber = Math.floor(400 + Math.random() * 350);
      const submission: WaitlistSubmission = {
        ...action.payload,
        id: 'wl-' + Date.now(),
        ticketNumber,
        submittedAt: new Date().toISOString(),
      };
      state.waitlistTickets.push(submission);
      state.currentTicket = submission;
    },
    clearCurrentTicket: (state) => {
      state.currentTicket = null;
    },
    setPlaygroundPreset: (state, action: PayloadAction<{ id: string; topic: string; content: string }>) => {
      state.playground.presetId = action.payload.id;
      state.playground.customTopic = action.payload.topic;
      state.playground.customContent = action.payload.content;
      state.playground.blueprint = null;
      state.playground.currentStep = 0;
    },
    setPlaygroundInputs: (state, action: PayloadAction<{ topic: string; content: string }>) => {
      state.playground.customTopic = action.payload.topic;
      state.playground.customContent = action.payload.content;
    },
    setAiMode: (state, action: PayloadAction<'hybrid' | 'gemini'>) => {
      state.playground.aiMode = action.payload;
    },
    setWeight: (state, action: PayloadAction<{ key: 'viral' | 'devImpact' | 'visual'; val: number }>) => {
      state.playground.weights[action.payload.key] = action.payload.val;
    },
    setSimulationStep: (state, action: PayloadAction<number>) => {
      state.playground.currentStep = action.payload;
    },
    setIsSimulating: (state, action: PayloadAction<boolean>) => {
      state.playground.isSimulating = action.payload;
    },
    setGeneratedBlueprint: (state, action: PayloadAction<GeneratedBlueprint | null>) => {
      state.playground.blueprint = action.payload;
    },
    setMonthlyArticles: (state, action: PayloadAction<number>) => {
      state.pricing.monthlyArticles = action.payload;
    },
    setBillingCycle: (state, action: PayloadAction<'monthly' | 'annual'>) => {
      state.pricing.billingCycle = action.payload;
    },
  },
});

export const {
  openWaitlist,
  closeWaitlist,
  openContact,
  closeContact,
  addWaitlistSubmission,
  clearCurrentTicket,
  setPlaygroundPreset,
  setPlaygroundInputs,
  setAiMode,
  setWeight,
  setSimulationStep,
  setIsSimulating,
  setGeneratedBlueprint,
  setMonthlyArticles,
  setBillingCycle,
} = landingSlice.actions;

export default landingSlice.reducer;
