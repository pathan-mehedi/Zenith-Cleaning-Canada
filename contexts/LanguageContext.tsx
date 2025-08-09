"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "fr"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.booking": "Book Now",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.login": "Login",
    "nav.register": "Register",

    // Homepage
    "hero.title": "Professional Home Cleaning Services",
    "hero.subtitle": "Trusted cleaning professionals across Canada and Europe",
    "hero.cta": "Book Your Cleaning",
    "hero.learn_more": "Learn More",

    // Services
    "services.title": "Our Services",
    "services.regular": "Regular Cleaning",
    "services.deep": "Deep Cleaning",
    "services.kitchen": "Kitchen & Bathroom",
    "services.carpet": "Carpet Cleaning",
    "services.window": "Window Cleaning",
    "services.movein": "Move-in/Move-out",

    // Booking
    "booking.title": "Book Your Service",
    "booking.service_type": "Service Type",
    "booking.date": "Date",
    "booking.time": "Time",
    "booking.rooms": "Number of Rooms",
    "booking.name": "Full Name",
    "booking.email": "Email",
    "booking.phone": "Phone",
    "booking.address": "Address",
    "booking.submit": "Book Now",

    // Common
    "common.loading": "Loading...",
    "common.price": "Price",
    "common.duration": "Duration",
    "common.rating": "Rating",
    "common.reviews": "Reviews",
  },
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.services": "Services",
    "nav.booking": "Réserver",
    "nav.about": "À propos",
    "nav.contact": "Contact",
    "nav.login": "Connexion",
    "nav.register": "S'inscrire",

    // Homepage
    "hero.title": "Services de Nettoyage Professionnel",
    "hero.subtitle": "Professionnels de confiance au Canada et en Europe",
    "hero.cta": "Réservez Votre Nettoyage",
    "hero.learn_more": "En Savoir Plus",

    // Services
    "services.title": "Nos Services",
    "services.regular": "Nettoyage Régulier",
    "services.deep": "Nettoyage en Profondeur",
    "services.kitchen": "Cuisine et Salle de Bain",
    "services.carpet": "Nettoyage de Tapis",
    "services.window": "Nettoyage de Vitres",
    "services.movein": "Déménagement",

    // Booking
    "booking.title": "Réservez Votre Service",
    "booking.service_type": "Type de Service",
    "booking.date": "Date",
    "booking.time": "Heure",
    "booking.rooms": "Nombre de Pièces",
    "booking.name": "Nom Complet",
    "booking.email": "Email",
    "booking.phone": "Téléphone",
    "booking.address": "Adresse",
    "booking.submit": "Réserver",

    // Common
    "common.loading": "Chargement...",
    "common.price": "Prix",
    "common.duration": "Durée",
    "common.rating": "Note",
    "common.reviews": "Avis",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)["en"]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
