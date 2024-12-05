import { create } from "zustand";
import mobileAds from 'react-native-google-mobile-ads';

export const useAdsStore = create((set) => ({
  isInitialized: false,
  initAds: async () => {
    try {
      const adapterStatuses = await mobileAds().initialize();
      set({ isInitialized: true });
      console.log('AdMob Initialization Statuses:', adapterStatuses);
      return adapterStatuses;
    } catch (error) {
      console.error('AdMob Initialization Error:', error);
      set({ isInitialized: false });
      throw error;
    }
  }
}));
