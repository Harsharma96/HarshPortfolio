"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { defaultPortfolioData, type PortfolioData } from "@/data/portfolioDefaults";

const STORAGE_KEY = "harsh_portfolio_data_v1";
const SYNC_EVENT = "harsh_portfolio_sync";

interface PortfolioContextType {
  data: PortfolioData;
  updateHero: (heroData: Partial<PortfolioData["hero"]>) => void;
  updateAbout: (aboutData: Partial<PortfolioData["about"]>) => void;
  updateSkills: (skillsData: Partial<PortfolioData["skills"]>) => void;
  updateProject: (projectData: Partial<PortfolioData["project"]>) => void;
  updateCertification: (certData: Partial<PortfolioData["certification"]>) => void;
  updateContact: (contactData: Partial<PortfolioData["contact"]>) => void;
  updateAll: (newData: PortfolioData) => void;
  resetToDefaults: () => void;
  exportJSON: () => string;
  importJSON: (jsonStr: string) => boolean;
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioData>(defaultPortfolioData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load initial data from localStorage (on client side)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with defaults in case of missing keys
        setData({
          hero: {
            ...defaultPortfolioData.hero,
            ...parsed.hero,
            avatarUrl:
              !parsed.hero?.avatarUrl ||
              parsed.hero?.avatarUrl === "/harsh-avatar.jpg" ||
              parsed.hero?.avatarUrl === "/harsh-avatar.png" ||
              parsed.hero?.avatarUrl === "/harsh-frame.png" ||
              parsed.hero?.avatarUrl === "/white-wall-bg.png"
                ? defaultPortfolioData.hero.avatarUrl
                : parsed.hero.avatarUrl,
            avatarCutoutUrl:
              !parsed.hero?.avatarCutoutUrl ||
              parsed.hero?.avatarCutoutUrl === "/harsh-avatar-man.png" ||
              parsed.hero?.avatarCutoutUrl === "/harsh-3d-character.png"
                ? defaultPortfolioData.hero.avatarCutoutUrl
                : parsed.hero.avatarCutoutUrl,
          },
          about: { ...defaultPortfolioData.about, ...parsed.about },
          skills: { ...defaultPortfolioData.skills, ...parsed.skills },
          project: { ...defaultPortfolioData.project, ...parsed.project },
          certification: { ...defaultPortfolioData.certification, ...parsed.certification },
          contact: {
            ...defaultPortfolioData.contact,
            ...parsed.contact,
            socials: { ...defaultPortfolioData.contact.socials, ...(parsed.contact?.socials || {}) },
          },
        });
      }
    } catch (e) {
      console.warn("Could not load stored portfolio data:", e);
    } finally {
      setIsLoaded(true);
    }

    // Listen to sync events from other tabs / components
    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<PortfolioData>;
      if (customEvent.detail) {
        setData(customEvent.detail);
      }
    };

    window.addEventListener(SYNC_EVENT, handleSync);
    return () => window.removeEventListener(SYNC_EVENT, handleSync);
  }, []);

  // Helper to persist & broadcast
  const persistAndBroadcast = (updated: PortfolioData) => {
    setData(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: updated }));
    } catch (e) {
      console.error("Failed to persist portfolio data:", e);
    }
  };

  const updateHero = (heroData: Partial<PortfolioData["hero"]>) => {
    persistAndBroadcast({
      ...data,
      hero: { ...data.hero, ...heroData },
    });
  };

  const updateAbout = (aboutData: Partial<PortfolioData["about"]>) => {
    persistAndBroadcast({
      ...data,
      about: { ...data.about, ...aboutData },
    });
  };

  const updateSkills = (skillsData: Partial<PortfolioData["skills"]>) => {
    persistAndBroadcast({
      ...data,
      skills: { ...data.skills, ...skillsData },
    });
  };

  const updateProject = (projectData: Partial<PortfolioData["project"]>) => {
    persistAndBroadcast({
      ...data,
      project: { ...data.project, ...projectData },
    });
  };

  const updateCertification = (certData: Partial<PortfolioData["certification"]>) => {
    persistAndBroadcast({
      ...data,
      certification: { ...data.certification, ...certData },
    });
  };

  const updateContact = (contactData: Partial<PortfolioData["contact"]>) => {
    persistAndBroadcast({
      ...data,
      contact: {
        ...data.contact,
        ...contactData,
        socials: { ...data.contact.socials, ...(contactData.socials || {}) },
      },
    });
  };

  const updateAll = (newData: PortfolioData) => {
    persistAndBroadcast(newData);
  };

  const resetToDefaults = () => {
    persistAndBroadcast(defaultPortfolioData);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const exportJSON = () => {
    return JSON.stringify(data, null, 2);
  };

  const importJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr) as PortfolioData;
      if (!parsed.hero || !parsed.contact) {
        return false;
      }
      persistAndBroadcast(parsed);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        updateHero,
        updateAbout,
        updateSkills,
        updateProject,
        updateCertification,
        updateContact,
        updateAll,
        resetToDefaults,
        exportJSON,
        importJSON,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return ctx;
}
