/**
 * Google API Integration Examples
 * 
 * These components demonstrate how to use Google APIs with your Students Pro account
 * in the collective commerce platform.
 */

'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useGoogleServices } from '@/hooks/use-google-services';
import { 
  MapPin, 
  Languages, 
  Bot, 
  BarChart3, 
  CheckCircle, 
  AlertCircle,
  Loader2
} from 'lucide-react';

// Google Maps Component
export function GoogleMapsDemo() {
  const { maps } = useGoogleServices();
  const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null);
  const [mapInstance, setMapInstance] = useState<any | null>(null);

  React.useEffect(() => {
    if (maps.maps && mapContainer && !mapInstance) {
      const map = new maps.maps.Map(mapContainer, {
        center: { lat: 28.6139, lng: 77.2090 }, // Delhi, India
        zoom: 10,
        styles: [
          {
            featureType: 'all',
            elementType: 'geometry.fill',
            stylers: [{ color: '#f5f5f5' }]
          }
        ]
      });
      
      // Add a marker for group buying location
      new maps.maps.Marker({
        position: { lat: 28.6139, lng: 77.2090 },
        map: map,
        title: 'Group Buying Hub - Delhi'
      });
      
      setMapInstance(map);
    }
  }, [maps.maps, mapContainer, mapInstance]);

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Google Maps Integration</h3>
          <Badge variant={maps.maps ? "success" : "secondary"}>
            {maps.maps ? "Connected" : "Loading"}
          </Badge>
        </div>
        
        {maps.loading && (
          <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="ml-2">Loading Google Maps...</span>
          </div>
        )}
        
        {maps.error && (
          <div className="flex items-center gap-2 p-4 bg-destructive/10 rounded-lg">
            <AlertCircle className="w-5 h-5 text-destructive" />
            <span>Error: {maps.error}</span>
          </div>
        )}
        
        {!maps.loading && !maps.error && (
          <div 
            ref={setMapContainer}
            className="w-full h-64 rounded-lg border"
            style={{ minHeight: '256px' }}
          />
        )}
        
        <p className="text-sm text-muted-foreground mt-4">
          Use Google Maps to show group buying locations and delivery zones.
        </p>
      </CardContent>
    </Card>
  );
}

// Google Translate Component
export function GoogleTranslateDemo() {
  const { translate } = useGoogleServices();
  const [text, setText] = useState('Welcome to our group buying platform!');
  const [targetLang, setTargetLang] = useState('hi'); // Hindi
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = async () => {
    try {
      const result = await translate.translate(text, targetLang);
      setTranslatedText(result);
    } catch (error) {
      console.error('Translation failed:', error);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Languages className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold">Google Translate</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Text to translate:</label>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to translate"
              className="mt-1"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Target language:</label>
            <select 
              value={targetLang} 
              onChange={(e) => setTargetLang(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-md"
            >
              <option value="hi">Hindi</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="ja">Japanese</option>
              <option value="ko">Korean</option>
            </select>
          </div>
          
          <Button 
            onClick={handleTranslate} 
            disabled={translate.loading}
            className="w-full"
          >
            {translate.loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Translating...
              </>
            ) : (
              'Translate'
            )}
          </Button>
          
          {translatedText && (
            <div className="p-4 bg-muted rounded-lg">
              <label className="text-sm font-medium">Translation:</label>
              <p className="mt-1">{translatedText}</p>
            </div>
          )}
          
          {translate.error && (
            <div className="flex items-center gap-2 p-4 bg-destructive/10 rounded-lg">
              <AlertCircle className="w-5 h-5 text-destructive" />
              <span>Error: {translate.error}</span>
            </div>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground mt-4">
          Use Google Translate to make your platform accessible in multiple languages.
        </p>
      </CardContent>
    </Card>
  );
}

// Google AI (Gemini) Component
export function GoogleAIDemo() {
  const { ai } = useGoogleServices();
  const [prompt, setPrompt] = useState('Generate a catchy description for a group buying deal on premium headphones');
  const [response, setResponse] = useState('');

  const handleGenerate = async () => {
    try {
      const result = await ai.generate(prompt);
      setResponse(result);
    } catch (error) {
      console.error('AI generation failed:', error);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bot className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold">Google AI (Gemini)</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Prompt:</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your AI prompt here"
              className="mt-1 w-full px-3 py-2 border rounded-md h-24 resize-none"
            />
          </div>
          
          <Button 
            onClick={handleGenerate} 
            disabled={ai.loading}
            className="w-full"
          >
            {ai.loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Content'
            )}
          </Button>
          
          {response && (
            <div className="p-4 bg-muted rounded-lg">
              <label className="text-sm font-medium">AI Response:</label>
              <p className="mt-1 whitespace-pre-wrap">{response}</p>
            </div>
          )}
          
          {ai.error && (
            <div className="flex items-center gap-2 p-4 bg-destructive/10 rounded-lg">
              <AlertCircle className="w-5 h-5 text-destructive" />
              <span>Error: {ai.error}</span>
            </div>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground mt-4">
          Use Google AI to generate product descriptions, marketing content, and customer support responses.
        </p>
      </CardContent>
    </Card>
  );
}

// Google Analytics Demo Component
export function GoogleAnalyticsDemo() {
  const { analytics } = useGoogleServices();

  const trackSampleEvents = () => {
    analytics.trackEvent('demo_click', 'engagement', 'Google Analytics Demo');
    analytics.trackEvent('group_join', 'conversion', 'Electronics Group');
    analytics.trackEvent('purchase', 'conversion', 'Premium Headphones', 299);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-orange-600" />
          <h3 className="text-lg font-semibold">Google Analytics</h3>
          <Badge variant={analytics.initialized ? "success" : "secondary"}>
            {analytics.initialized ? "Initialized" : "Not Initialized"}
          </Badge>
        </div>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Track user behavior, group buying patterns, and conversion metrics.
          </p>
          
          <Button onClick={trackSampleEvents} className="w-full">
            Track Sample Events
          </Button>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm font-medium">Events Tracked</div>
              <ul className="text-sm text-muted-foreground mt-1">
                <li>• Group joins</li>
                <li>• Purchases</li>
                <li>• Page views</li>
                <li>• User engagement</li>
              </ul>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm font-medium">Key Metrics</div>
              <ul className="text-sm text-muted-foreground mt-1">
                <li>• Conversion rates</li>
                <li>• Group completion</li>
                <li>• User retention</li>
                <li>• Revenue tracking</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Configuration Status Component
export function GoogleConfigStatus() {
  const { config } = useGoogleServices();

  return (
    <Card className="w-full mb-6">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          {config.isValid ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-orange-600" />
          )}
          <h3 className="text-lg font-semibold">Google API Configuration</h3>
          <Badge variant={config.isValid ? "success" : "destructive"}>
            {config.isValid ? "Configured" : "Incomplete"}
          </Badge>
        </div>
        
        {!config.isValid && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Missing environment variables:
            </p>
            <ul className="text-sm text-destructive">
              {config.missingKeys.map((key) => (
                <li key={key}>• {key}</li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground mt-2">
              Configure these in your .env.local file to enable Google services.
            </p>
          </div>
        )}
        
        {config.isValid && (
          <p className="text-sm text-green-600">
            All Google API keys are configured correctly!
          </p>
        )}
      </CardContent>
    </Card>
  );
}

// Main demo component
export function GoogleAPIDemo() {
  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Google API Integration Demo</h1>
        <p className="text-muted-foreground">
          Examples of using Google APIs with your Students Pro account in the collective commerce platform
        </p>
      </div>
      
      <GoogleConfigStatus />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GoogleMapsDemo />
        <GoogleTranslateDemo />
        <GoogleAIDemo />
        <GoogleAnalyticsDemo />
      </div>
    </div>
  );
}