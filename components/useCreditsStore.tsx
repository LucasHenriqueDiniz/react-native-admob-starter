import { create } from 'zustand';

export const useCreditsStore = create((set) => ({
  credits: 0,
  addCredits: (amount: any) => set((state: any) => ({ credits: state.credits + amount })),
  resetCredits: () => set({ credits: 0 }),
}));
