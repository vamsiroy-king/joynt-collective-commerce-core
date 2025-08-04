/**
 * React Hooks for Google API Integration
 * 
 * Custom hooks to easily integrate Google services in React components
 */

import { useState, useEffect, useCallback } from 'react';
import { 
  googleConfig, 
  validateGoogleConfig, 
  loadGoogleMaps, 
  translateText, 
  generateContent,
  isClientSide 
} from '@/lib/google-api';

// Hook for Google API configuration status
export function useGoogleConfig() {
  const [config, setConfig] = useState(() => validateGoogleConfig());
  
  useEffect(() => {
    setConfig(validateGoogleConfig());
  }, []);
  
  return config;
}

// Hook for Google Maps integration
export function useGoogleMaps() {
  const [maps, setMaps] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const loadMaps = useCallback(async () => {
    if (!isClientSide || !googleConfig.mapsApiKey) {
      setError('Google Maps API key not configured or not running in browser');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const mapsApi = await loadGoogleMaps();
      setMaps(mapsApi);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load Google Maps');
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    if (isClientSide && googleConfig.mapsApiKey) {
      loadMaps();
    }
  }, [loadMaps]);
  
  return { maps, loading, error, reload: loadMaps };
}

// Hook for Google Translate
export function useGoogleTranslate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const translate = useCallback(async (
    text: string, 
    targetLanguage: string, 
    sourceLanguage = 'auto'
  ) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await translateText(text, targetLanguage, sourceLanguage);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Translation failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);
  
  return { translate, loading, error };
}

// Hook for Google AI (Gemini)
export function useGoogleAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const generate = useCallback(async (prompt: string, model = 'gemini-pro') => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await generateContent(prompt, model);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'AI generation failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);
  
  return { generate, loading, error };
}

// Hook for Google Analytics tracking
export function useGoogleAnalytics() {
  const [initialized, setInitialized] = useState(false);
  
  useEffect(() => {
    if (isClientSide && googleConfig.analyticsId && !initialized) {
      import('@/lib/google-api').then(({ initializeGoogleAnalytics }) => {
        initializeGoogleAnalytics();
        setInitialized(true);
      });
    }
  }, [initialized]);
  
  const trackEvent = useCallback((
    action: string,
    category: string,
    label?: string,
    value?: number
  ) => {
    if (isClientSide && (window as any).gtag) {
      (window as any).gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  }, []);
  
  const trackPageView = useCallback((page_path: string) => {
    if (isClientSide && (window as any).gtag) {
      (window as any).gtag('config', googleConfig.analyticsId, {
        page_path: page_path,
      });
    }
  }, []);
  
  return { trackEvent, trackPageView, initialized };
}

// Combined hook for all Google services
export function useGoogleServices() {
  const config = useGoogleConfig();
  const maps = useGoogleMaps();
  const translate = useGoogleTranslate();
  const ai = useGoogleAI();
  const analytics = useGoogleAnalytics();
  
  return {
    config,
    maps,
    translate,
    ai,
    analytics,
    isConfigured: config.isValid,
  };
}