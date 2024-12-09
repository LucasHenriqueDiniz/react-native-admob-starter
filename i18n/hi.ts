import { Translations } from "./en"

const hi: Translations = {
  common: {
    ok: "ठीक है!",
    cancel: "रद्द करें",
    back: "वापस",
    send: "भेजें",
    loading: "लोड हो रहा है...",
    maybeLater: "शायद बाद में",
    watchAd: "विज्ञापन देखें",
    wantToEarnCredits: "क्रेडिट्स अर्जित करना चाहते हैं?",
    watchShortVideoToEarnCredits: "छोटे वीडियो देखकर क्रेडिट्स अर्जित करें",
    notFound: "404 - पृष्ठ नहीं मिल सका",
    return: "होम पृष्ठ पर वापस जाएं",
  },
  rateUs: {
    title: "अपनी अनुप्रयोग कैसी है?",
    rateNow: "अभी वरीयता दें",
    dontRemind: "फिर से प्रदर्शित न करें",
    message: "कृपया अपनी अनुप्रयोग को विकल्पों में दें",
  },
  network: {
    title: "इंटरनेट कनेक्शन नहीं है",
    message:
      "यह अनुप्रयोग इंटरनेट कनेक्शन की आवश्यकता है जो सही काम करने के लिए। कृपया अपना कनेक्शन जांचें और फिर पुनः प्रयास करें।",
  },
  error: {
    title: "कुछ गलत हो गया!",
    subtitle:
      "यह वह स्क्रीन है जो आपके उपयोगकर्ता संचालन में देखेंगे जब कोई त्रुटि होगी। आप इस संदेश को बदलना चाहेंगे (जो `app/i18n/hi.ts` में स्थित है) और शायद लेआउट भी (`app/screens/ErrorScreen`)। यदि आप इसे पूरी तरह से हटाना चाहते हैं, तो `app/app.tsx` में <ErrorBoundary> कंपोनेंट की जांच करें।",
    reset: "ऐप रीसेट करें",
    invalidEmail: "अमान्य ईमेल पता।",
    emptyFields: "कृपया सभी फ़ील्ड भरें।",
    emptyEmail: "कृपया अपना ईमेल दर्ज करें।",
    passwordTooShort: "पासवर्ड कम से कम 8 अक्षरों का होना चाहिए।",
    passwordsDontMatch: "पासवर्ड मेल नहीं खाते।",
    generic: "कुछ गलत हो गया!",
  },
  emptyState: {
    generic: {
      heading: "इतना खाली... इतना उदास",
      content: "अभी तक कोई डेटा नहीं मिला। रीफ्रेश करने या ऐप को पुनः लोड करने के लिए बटन दबाएं।",
      button: "चलो फिर से कोशिश करते हैं",
    },
  },
  auth: {
    welcome: "स्वागत है",
    loginDescription: "लॉग इन करें अपने प्रोफ़ाइल और अपने क्रेडिट्स को प्रबंधित करने के लिए",
    name: "नाम",
    email: "ईमेल",
    login: "लॉग इन करें",
    password: "पासवर्ड",
    noAccount: "एक खाता नहीं है?",
    or: "या",
    signUp: "साइन अप",
    createAccount: "खाता बनाएं",
    signupDescription: "अपने विवरण दर्ज करें और शुरू करने के लिए",
    confirmPassword: "पासवर्ड सत्यापित करें",
    backToLogin: "लॉग इन पर वापस जाएं",
    forgotPasswordTitle: "पासवर्ड रीसेट करें",
    forgotPasswordDescription:
      "अपना ईमेल दर्ज करें और हम आपको पासवर्ड रीसेट करने के लिए ट्रैक देंगे",
    resetPassword: "पासवर्ड रीसेट करें",
    resetPasswordSuccess: "अपने ईमेल पर रीसेट ट्रैक दें",
    forgotPassword: "पासवर्ड भूल गए?",
  },
  tabs: {
    home: "होम",
    premium: "प्रीमियम",
    settings: "सेटिंग्स",
    store: "स्टोर",
  },
  settings: {
    preferences: "प्रासंगिकताएं",
    language: "भाषा",
    theme: "थीम",
    darkMode: "डार्क मोड",
    notifications: "सूचनाएं",
    sendFeedback: "फीडबैक भेजें",
    version: "संस्करण",
    terms: "उपयोग की शर्तें",
    privacy: "गोपनीयता नीति",
    termsDescription: "अपनी अनुप्रयोग की उपयोग की शर्तें पढ़ें",
    privacyDescription: "अपनी अनुप्रयोग की गोपनीयता नीति पढ़ें",
    about: "अनुप्रयोग की जानकारी",
    feedback: {
      title: "फीडबैक",
      email: "ईमेल",
      content: "सामग्री",
      feedbackThanks: "फीडबैक धन्यवाद!",
      feedbackError: "फीडबैक भेजने में त्रुटि",
      feedbackAndSuggestions: "फीडबैक और सुझाव",
      titlePlaceholder: "शीर्षक",
      descriptionPlaceholder: "विवरण",
      emailPlaceholder: "ईमेल",
    },
  },
  premium: {
    title: "प्रीमियम",
    subtitle: "मासिक ₹1,000 में प्रीमियम सुविधाओं का उपयोग करें।",
    monthly: "मासिक",
    yearly: "वार्षिक",
    priceMonthly: "₹1,000",
    priceYearly: "₹10,000",
    monthlyDescription: "मासिक ₹1,000 में प्रीमियम सुविधाओं का उपयोग करें।",
    yearlyDescription: "वार्षिक ₹10,000 में प्रीमियम सुविधाओं का उपयोग करें।",
    subscribe: "खरीदें",
    or: "या",
    watchAd: "विज्ञापन देखें",
    watchAdDescription: "विज्ञापन देखने पर, प्रीमियम सुविधाओं का उपयोग करें।",
  },
  language: {
    pt: "पुर्तगाली",
    en: "अंग्रेजी",
    es: "स्पेनी",
    ja: "जापानी",
    ko: "कोरियाई",
    hi: "हिंदी",
    ar: "अरबी",
    fr: "फ्रांसीसी",
  },
  home: {
    credits: "क्रेडिट्स",
    loadingAd: "विज्ञापन लोड हो रहा है...",
    watchAd: "विज्ञापन देखें",
  },
  store: {
    yourCredits: "आपके पास {{amount}} क्रेडिट्स हैं",
    watchAdTitle: "10 क्रेडिट्स देखने के लिए विज्ञापन देखें",
    watchAdDescription: "एक छोटे वीडियो देखने पर क्रेडिट्स प्राप्त करें",
    watchAdButton: "विज्ञापन देखें",
    creditsAmount: "{{amount}} क्रेडिट्स",
    buyNow: "अभी खरीदें",
    removeBannerTitle: "विज्ञापन हटाएं",
    removeBannerDescription: "एक बार की खरीद के लिए {{price}}",
    bannerRemovedMessage: "विज्ञापन हटाए गए",
    or: "या",
    bannerRemoved: "विज्ञापन हटाए गए",
    bestValue: "अच्छा मूल्य",
    popular: "लोकप्रिय",
    removeBanner: "विज्ञापन हटाएं",
  },
  profile: {
    logout: "लॉग आउट",
    credits: "क्रेडिट्स: {{count}}",
  },
}

export default hi
