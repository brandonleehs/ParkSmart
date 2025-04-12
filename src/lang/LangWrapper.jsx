import { createContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

// Create context for user authentication
export const LangContext = createContext();

export function LangWrapper({ children }) {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const lang = localStorage.getItem("language");
    if (lang) {
      i18n.changeLanguage(lang);
      setLang(lang);
      document.documentElement.setAttribute("lang", lang);
    }
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}
