/**
 * Google API Configuration and Utilities
 * 
 * This module provides utilities for integrating Google services with your Students Pro account.
 * Get your API keys from Google Cloud Console: https://console.cloud.google.com/
 * 
 * With Google for Education (Students Pro), you get:
 * - $300 in Google Cloud credits
 * - Access to Google Workspace for Education
 * - Free access to many Google APIs
 */

// Environment variables validation
const requiredEnvVars = {
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
} as const;

// Google API Configuration
export const googleConfig = {
  // Core API Key (for general Google APIs)
  apiKey: process.env.GOOGLE_API_KEY,
  
  // Maps API Key (client-side safe)
  mapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  
  // Analytics
  analyticsId: process.env.GOOGLE_ANALYTICS_ID,
  
  // OAuth Credentials
  oauth: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  
  // AI Services
  ai: {
    apiKey: process.env.GOOGLE_AI_API_KEY,
    translateApiKey: process.env.GOOGLE_TRANSLATE_API_KEY,
    visionApiKey: process.env.GOOGLE_CLOUD_VISION_API_KEY,
  },
  
  // API Endpoints
  endpoints: {
    translate: 'https://translation.googleapis.com/language/translate/v2',
    maps: 'https://maps.googleapis.com/maps/api',
    analytics: 'https://www.googleapis.com/analytics/v3',
    vision: 'https://vision.googleapis.com/v1',
    gemini: 'https://generativelanguage.googleapis.com/v1beta',
  },
};

// Validation function
export function validateGoogleConfig(): { isValid: boolean; missingKeys: string[] } {
  const missingKeys: string[] = [];
  
  Object.entries(requiredEnvVars).forEach(([key, value]) => {
    if (!value) {
      missingKeys.push(key);
    }
  });
  
  return {
    isValid: missingKeys.length === 0,
    missingKeys,
  };
}

// Google Maps loader
export function loadGoogleMaps(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Google Maps can only be loaded in the browser'));
      return;
    }

    if (window.google?.maps) {
      resolve(window.google.maps);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleConfig.mapsApiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      if (window.google?.maps) {
        resolve(window.google.maps);
      } else {
        reject(new Error('Google Maps failed to load'));
      }
    };
    
    script.onerror = () => {
      reject(new Error('Failed to load Google Maps script'));
    };
    
    document.head.appendChild(script);
  });
}

// Google Analytics helper
export function initializeGoogleAnalytics() {
  if (typeof window === 'undefined' || !googleConfig.analyticsId) return;

  // Load gtag script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${googleConfig.analyticsId}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  
  gtag('js', new Date());
  gtag('config', googleConfig.analyticsId);
  
  // Make gtag available globally
  (window as any).gtag = gtag;
}

// Google Translate API helper
export async function translateText(text: string, targetLanguage: string, sourceLanguage = 'auto') {
  if (!googleConfig.ai.translateApiKey) {
    throw new Error('Google Translate API key not configured');
  }

  const response = await fetch(`${googleConfig.endpoints.translate}?key=${googleConfig.ai.translateApiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      q: text,
      target: targetLanguage,
      source: sourceLanguage === 'auto' ? undefined : sourceLanguage,
    }),
  });

  if (!response.ok) {
    throw new Error(`Translation failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data.translations[0].translatedText;
}

// Google AI (Gemini) helper
export async function generateContent(prompt: string, model = 'gemini-pro') {
  if (!googleConfig.ai.apiKey) {
    throw new Error('Google AI API key not configured');
  }

  const response = await fetch(`${googleConfig.endpoints.gemini}/models/${model}:generateContent?key=${googleConfig.ai.apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    }),
  });

  if (!response.ok) {
    throw new Error(`AI generation failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

// Helper to check if running on client side
export const isClientSide = typeof window !== 'undefined';

// Export types for better TypeScript support
export type GoogleConfig = typeof googleConfig;
export type GoogleEndpoints = typeof googleConfig.endpoints;

declare global {
  interface Window {
    google?: any;
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}