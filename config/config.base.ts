export interface ConfigBaseProps {
  persistNavigation: "always" | "dev" | "prod" | "never"
  catchErrors: "always" | "dev" | "prod" | "never"
  exitRoutes: string[]
  ads: {
    rewardedAdUnitId: string
    bannerAdUnitId: string
  }
  api: {
    discordWebhook: string // Para o feedback
  }
  version: string
  privacyUrl: string
  termsUrl: string
  rateUsUrl: string
  appName: string
}

export type PersistNavigationConfig = ConfigBaseProps["persistNavigation"]

const BaseConfig: ConfigBaseProps = {
  // This feature is particularly useful in development mode, but
  // can be used in production as well if you prefer.
  persistNavigation: "dev",

  /**
   * Only enable if we're catching errors in the right environment
   */
  catchErrors: "always",

  /**
   * This is a list of all the route names that will exit the app if the back button
   * is pressed while in that screen. Only affects Android.
   */
  exitRoutes: ["Welcome"],

  ads: {
    rewardedAdUnitId: __DEV__
      ? "ca-app-pub-3940256099942544/5224354917" // TestIds.REWARDED
      : "ca-app-pub-2875410688436106/7203720130",
    bannerAdUnitId: __DEV__
      ? "ca-app-pub-3940256099942544/6300978111" // TestIds.BANNER
      : "ca-app-pub-2875410688436106/YOUR_BANNER_ID",
  },

  api: {
    discordWebhook: __DEV__
      ? "https://discord.com/api/webhooks/1315518948636098640/cQ5HsKGiFJsWYt4uhMykuS65vkRfxFnj7yBSBedHeal5Sfb2yqfY7znhhVmd1n2QUVXN" // TestIds.DISCORD_WEBHOOK
      : "https://discord.com/api/webhooks/1312153065691942952/dqxSVAFvXApMg7CFIL2JoZa70tQHfH4O4Uc4NlZNG5CtQzwCkW-XsjmLW3gmc3f8OTtn",
  },
  appName: "Sora Template",
  version: "1.0.0",
  privacyUrl: "https://www.google.com",
  termsUrl: "https://www.google.com",
  rateUsUrl: "https://play.google.com/store/apps/details?id=com.anonymous.admob",
}

export default BaseConfig
