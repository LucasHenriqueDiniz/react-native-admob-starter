export interface ConfigBaseProps {
  persistNavigation: "always" | "dev" | "prod" | "never"
  catchErrors: "always" | "dev" | "prod" | "never"
  exitRoutes: string[]
  API_URL: string
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
  subscription: {
    productIds: {
      monthly: string
      yearly: string
    }
  }
  revenueCat: {
    apiKey: string
  }
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
  exitRoutes: ["(tabs/index)"],

  ads: {
    rewardedAdUnitId: __DEV__
      ? "ca-app-pub-1234566789098765/1234567890" // Test ID
      : "ca-app-pub-1234566789098765/1234567890", // Seu novo Ad Unit ID
    bannerAdUnitId: __DEV__
      ? "ca-app-pub-1234566789098765/1234567890" // Test ID
      : "ca-app-pub-1234566789098765/1234567890", // Seu novo Ad Unit ID
  },
  API_URL: __DEV__ ? "https://api.yourapp.com" : "https://api.yourapp.com",
  api: {
    discordWebhook: __DEV__
      ? "https://discord.com/api/webhooks/1315518948636098640/cQ5HsKGiFJsWYt4uhMykuS65vkRfxFnj7yBSBedHeal5Sfb2yqfY7znhhVmd1n2QUVXN" // TestIds.DISCORD_WEBHOOK
      : "https://discord.com/api/webhooks/1312153065691942952/dqxSVAFvXApMg7CFIL2JoZa70tQHfH4O4Uc4NlZNG5CtQzwCkW-XsjmLW3gmc3f8OTtn",
  },
  appName: "Your app name",
  version: "1.0.0",
  privacyUrl: "https://www.google.com",
  termsUrl: "https://www.google.com",
  rateUsUrl: "https://play.google.com/store/apps/details?id=com.anonymous.yourapp",
  subscription: {
    productIds: {
      monthly: "your.monthly.subscription.id",
      yearly: "your.yearly.subscription.id",
    },
  },
  revenueCat: {
    apiKey: __DEV__
      ? "appl_YOUR_NEW_PUBLIC_SDK_KEY" // Novo app iOS
      : "goog_YOUR_NEW_PUBLIC_SDK_KEY", // Novo app Android
  },
}

export default BaseConfig
