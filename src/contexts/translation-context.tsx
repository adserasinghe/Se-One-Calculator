"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { translateUi } from '@/ai/flows/translate-ui';
import { TRANSLATION_KEYS } from '@/lib/translations';

type TranslationContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  translations: Record<string, string>;
  t: (key: string) => string;
  isLoading: boolean;
};

export const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('English');
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTranslations = async () => {
      if (language === 'English') {
        setTranslations({});
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const newTranslations: Record<string, string> = {};
      const translationPromises = Object.entries(TRANSLATION_KEYS).map(async ([key, value]) => {
        try {
          const result = await translateUi({ text: value, language });
          newTranslations[key] = result.translatedText;
        } catch (error) {
          console.error(`Failed to translate key: ${key}`, error);
          newTranslations[key] = value; // Fallback to original text
        }
      });

      await Promise.all(translationPromises);
      setTranslations(newTranslations);
      setIsLoading(false);
    };

    fetchTranslations();
  }, [language]);

  const t = (key: string): string => {
    if (language === 'English') {
      return TRANSLATION_KEYS[key] || key;
    }
    return translations[key] || TRANSLATION_KEYS[key] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, translations, t, isLoading }}>
      {children}
    </TranslationContext.Provider>
  );
};
