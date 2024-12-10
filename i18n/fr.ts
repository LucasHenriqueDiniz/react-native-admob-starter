import { Translations } from "./en"

const fr: Translations = {
  common: {
    ok: "OK !",
    cancel: "Annuler",
    back: "Retour",
    send: "Envoyer",
    loading: "Chargement...",
    maybeLater: "Peut-être plus tard",
    watchAd: "Voir l'ad",
    wantToEarnCredits: "Vous voulez gagner des crédits ?",
    watchShortVideoToEarnCredits: "Regardez une courte vidéo pour gagner des crédits",
    notFound: "404 - Page non trouvée",
    return: "Retour à la page principale",
    google: "Google",
    apple: "Apple",
  },
  network: {
    title: "Pas de connexion internet",
    message:
      "Cette application nécessite une connexion internet pour fonctionner correctement. Veuillez vérifier votre connexion et réessayer.",
  },
  rateUs: {
    title: "Qu'en pensez-vous de l'application ?",
    rateNow: "Évaluer maintenant",
    dontRemind: "Ne plus demander",
    message: "Veuillez évaluer l'application dans la boutique d'applications",
  },
  error: {
    title: "Quelque chose s'est mal passé !",
    subtitle:
      "C'est l'écran que vos utilisateurs verront en production lorsqu'une erreur sera lancée. Vous voudrez personnaliser ce message (situé dans `app/i18n/fr.ts`) et probablement aussi la mise en page (`app/screens/ErrorScreen`). Si vous voulez le supprimer complètement, vérifiez `app/app.tsx` pour le composant <ErrorBoundary>.",
    reset: "RÉINITIALISER L'APPLICATION",
    invalidEmail: "Adresse e-mail invalide.",
    emptyFields: "Veuillez remplir tous les champs.",
    emptyEmail: "Veuillez entrer votre email.",
    passwordTooShort: "Le mot de passe doit contenir au moins 8 caractères.",
    passwordsDontMatch: "Les mots de passe ne correspondent pas.",
    generic: "Quelque chose s'est mal passé !",
  },
  emptyState: {
    generic: {
      heading: "Si vide... si triste",
      content:
        "Aucune donnée trouvée pour le moment. Essayez de cliquer sur le bouton pour rafraîchir ou recharger l'application.",
      button: "Essayons à nouveau",
    },
  },
  auth: {
    welcome: "Bienvenue",
    loginDescription: "Connectez-vous pour accéder à votre profil et gérer vos crédits",
    name: "Nom",
    email: "Email",
    login: "Se connecter",
    password: "Mot de passe",
    noAccount: "Vous n'avez pas de compte ?",
    or: "ou",
    signUp: "S'inscrire",
    createAccount: "Créer un compte",
    signupDescription: "Remplissez vos détails pour commencer",
    confirmPassword: "Confirmer le mot de passe",
    backToLogin: "Retour à la connexion",
    forgotPasswordTitle: "Réinitialiser le mot de passe",
    forgotPasswordDescription:
      "Entrez votre email et nous vous enverrons les instructions pour réinitialiser votre mot de passe",
    resetPassword: "Réinitialiser le mot de passe",
    resetPasswordSuccess: "Vérifiez votre email pour les instructions de réinitialisation",
    forgotPassword: "Mot de passe oublié ?",
  },
  settings: {
    preferences: "Préférences",
    language: "Langue",
    theme: "Thème",
    darkMode: "Mode sombre",
    notifications: "Notifications",
    sendFeedback: "Envoyer un retour",
    version: "Version",
    terms: "Conditions d'utilisation",
    privacy: "Politique de confidentialité",
    termsDescription: "Lire les conditions d'utilisation de l'application",
    privacyDescription: "Lire la politique de confidentialité de l'application",
    about: "À propos de l'application",
    feedback: {
      title: "Retour",
      email: "E-mail",
      content: "Contenu",
      feedbackThanks: "Retour envoyé !",
      feedbackError: "Erreur lors de l'envoi du retour",
      feedbackAndSuggestions: "Retour et suggestions",
      titlePlaceholder: "Titre",
      descriptionPlaceholder: "Description",
      emailPlaceholder: "E-mail",
      subtitle: "Envoyez-nous vos commentaires et suggestions",
    },
  },
  premium: {
    title: "Premium",
    subtitle: "Utilisez les fonctionnalités premium mensuellement pour €1,00.",
    monthly: "Mensuel",
    yearly: "Annuel",
    priceMonthly: "€1,00",
    priceYearly: "€10,00",
    monthlyDescription: "Utilisez les fonctionnalités premium mensuellement pour €1,00.",
    yearlyDescription: "Utilisez les fonctionnalités premium annuellement pour €10,00.",
    subscribe: "S'abonner",
    or: "Ou",
    watchAd: "Voir l'ad",
    watchAdDescription: "Voir l'ad pour utiliser les fonctionnalités premium.",
  },
  home: {
    credits: "Crédits",
    loadingAd: "Chargement de l'ad...",
    watchAd: "Voir l'ad",
  },
  language: {
    fr: "Français",
    pt: "Portugais",
    en: "Anglais",
    es: "Espagnol",
    ja: "Japonais",
    ko: "Coréen",
    hi: "Hindi",
    ar: "Arabe",
  },
  tabs: {
    home: "Accueil",
    premium: "Premium",
    settings: "Paramètres",
    store: "Magasin",
  },
  store: {
    yourCredits: "Vous avez {{amount}} Crédits",
    watchAdTitle: "Voir l'ad pour 10 Crédits",
    watchAdDescription: "Voir une courte vidéo pour gagner des crédits",
    watchAdButton: "Voir l'ad",
    creditsAmount: "{{amount}} Crédits",
    buyNow: "Acheter maintenant",
    removeBannerTitle: "Supprimer les bannières",
    removeBannerDescription: "Achat unique pour {{price}}",
    bannerRemovedMessage: "Bannières supprimées",
    or: "ou",
    bannerRemoved: "Bannières supprimées",
    bestValue: "MEILLEUR VALEUR",
    popular: "POPULAIRE",
    removeBanner: "Supprimer les bannières",
  },
  profile: {
    logout: "Déconnexion",
    credits: "Crédits",
    noPlan: "Gratuit",
    currentPlan: "Plan actuel",
  },
}

export default fr
