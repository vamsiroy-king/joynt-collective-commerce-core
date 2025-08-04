# Google API Integration Guide for Students Pro Account

This guide explains how to obtain and use Google API keys from your Google for Education (Students Pro) account in your collective commerce platform.

## What is Google for Education (Students Pro)?

Google for Education provides students with:
- **$300 in Google Cloud credits** (valid for 12 months)
- Access to Google Workspace for Education
- Free access to many Google APIs and services
- Premium features for learning and development

## Step-by-Step: Getting Your API Keys

### 1. Access Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your **student email account** (the one with Google for Education access)
3. Accept the terms and conditions if prompted
4. You should see the $300 credit banner at the top

### 2. Create a New Project

1. Click on the project dropdown (top left, next to "Google Cloud")
2. Click "New Project"
3. Enter project name: `joynt-collective-commerce`
4. Select your organization (your school/university)
5. Click "Create"

### 3. Enable Required APIs

Navigate to "APIs & Services" > "Library" and enable these APIs:

#### Essential APIs:
- **Maps JavaScript API** - For location services
- **Geocoding API** - For address conversion
- **Places API** - For location search
- **Cloud Translation API** - For multi-language support
- **Google Analytics Reporting API** - For user analytics

#### AI/ML APIs (with your $300 credit):
- **Generative Language API** (Gemini) - For AI content generation
- **Cloud Vision API** - For image analysis
- **Cloud Natural Language API** - For text analysis

### 4. Create API Keys

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the generated API key immediately
4. Click "Restrict Key" for security

#### Key Restrictions (Recommended):

**For Public APIs (like Maps):**
- Application restrictions: HTTP referrers
- Add your domains: `localhost:3000`, `yourdomain.com`
- API restrictions: Select specific APIs only

**For Server APIs:**
- Application restrictions: IP addresses
- Add your server IPs
- API restrictions: Select specific APIs only

### 5. Create OAuth 2.0 Credentials (Optional)

For user authentication with Google:

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Configure consent screen first if prompted
4. Application type: Web application
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google`

### 6. Set Up Service Account (For Server APIs)

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in service account details
4. Download the JSON key file
5. Store securely and reference in your environment variables

## Environment Variables Setup

Create a `.env.local` file in your project root with the following:

```env
# Google APIs (from your Students Pro account)
GOOGLE_API_KEY=your_general_google_api_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
GOOGLE_ANALYTICS_ID=GA4_measurement_id
GOOGLE_CLIENT_ID=your_oauth_client_id
GOOGLE_CLIENT_SECRET=your_oauth_client_secret

# Google AI Services (using your $300 credit)
GOOGLE_AI_API_KEY=your_gemini_api_key
GOOGLE_TRANSLATE_API_KEY=your_translate_api_key
GOOGLE_CLOUD_VISION_API_KEY=your_vision_api_key

# Service Account (JSON key file path or inline JSON)
GOOGLE_SERVICE_ACCOUNT_KEY=path/to/service-account-key.json
```

## Usage Examples

### 1. Google Maps Integration

```tsx
import { useGoogleMaps } from '@/hooks/use-google-services';

function DeliveryMap() {
  const { maps, loading, error } = useGoogleMaps();
  
  // Map will automatically load when component mounts
  return (
    <div>
      {loading && <p>Loading map...</p>}
      {error && <p>Error: {error}</p>}
      {maps && <div id="map" />}
    </div>
  );
}
```

### 2. Multi-language Support

```tsx
import { useGoogleTranslate } from '@/hooks/use-google-services';

function ProductDescription({ text }) {
  const { translate, loading } = useGoogleTranslate();
  const [translatedText, setTranslatedText] = useState('');
  
  const handleTranslate = async (targetLang) => {
    const result = await translate(text, targetLang);
    setTranslatedText(result);
  };
  
  return (
    <div>
      <p>{text}</p>
      <button onClick={() => handleTranslate('hi')}>
        Translate to Hindi
      </button>
      {translatedText && <p>{translatedText}</p>}
    </div>
  );
}
```

### 3. AI Content Generation

```tsx
import { useGoogleAI } from '@/hooks/use-google-services';

function ProductDescriptionGenerator() {
  const { generate, loading } = useGoogleAI();
  const [description, setDescription] = useState('');
  
  const generateDescription = async (productName) => {
    const prompt = `Generate an engaging product description for ${productName} for a group buying platform`;
    const result = await generate(prompt);
    setDescription(result);
  };
  
  return (
    <div>
      <button onClick={() => generateDescription('Premium Headphones')}>
        Generate Description
      </button>
      {description && <p>{description}</p>}
    </div>
  );
}
```

### 4. Analytics Tracking

```tsx
import { useGoogleAnalytics } from '@/hooks/use-google-services';

function GroupBuyingButton({ productId }) {
  const { trackEvent } = useGoogleAnalytics();
  
  const handleJoinGroup = () => {
    // Track the group join event
    trackEvent('group_join', 'engagement', `product_${productId}`);
    
    // Your group joining logic here
  };
  
  return (
    <button onClick={handleJoinGroup}>
      Join Group Buy
    </button>
  );
}
```

## Using External AI Applications (like "trae")

To use your Google API keys in other applications:

### For Web Applications:
1. Use your **restricted API keys** with domain restrictions
2. Add the application's domain to your API key restrictions
3. Share only the client-side safe keys (like Maps API key)

### For Server Applications:
1. Use **service account credentials** for server-to-server calls
2. Share the service account JSON file securely
3. Or use API keys with IP address restrictions

### For AI Applications:
1. Use your **Generative Language API key** for Gemini
2. Use **Cloud Translation API key** for translation features
3. Use **Cloud Vision API key** for image analysis

## Security Best Practices

### 1. API Key Security
- **Never** commit API keys to version control
- Use environment variables for all sensitive data
- Restrict API keys to specific services and domains
- Rotate keys regularly

### 2. Usage Monitoring
- Set up billing alerts in Google Cloud Console
- Monitor API usage in the Console dashboard
- Set quotas to prevent unexpected charges

### 3. Access Control
- Use service accounts for server-side operations
- Implement proper authentication and authorization
- Use OAuth 2.0 for user-facing features

## Cost Management with Students Pro Credit

Your $300 credit covers substantial usage:

- **Google Maps**: 28,500 map loads per month (free tier)
- **Translation API**: 500,000 characters per month
- **Gemini AI**: Significant API calls with pay-per-use pricing
- **Cloud Vision**: 1,000 images per month (free tier)

### Tips to Maximize Your Credit:
1. Use free tiers when available
2. Implement caching to reduce API calls
3. Set up budget alerts at 50%, 75%, and 90% of your credit
4. Use API quotas to prevent accidental overage

## Common Issues and Solutions

### Issue: "API key not valid"
**Solution**: Check that the API is enabled and the key has proper restrictions

### Issue: "This API is not enabled"
**Solution**: Go to Google Cloud Console > APIs & Services > Library and enable the required API

### Issue: "Quota exceeded"
**Solution**: Check your quotas in Cloud Console and increase if needed (using your credit)

### Issue: "Billing not enabled"
**Solution**: Make sure billing is set up with your student credit applied

## Integration with Other Platforms

### Using with TRAE or Other AI Applications:

1. **API Key Sharing**: Copy your Gemini API key from Google Cloud Console
2. **Endpoint**: Use `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`
3. **Authentication**: Add `?key=YOUR_API_KEY` to requests
4. **Format**: Follow the Gemini API request format

### Example for External Applications:

```bash
curl -X POST \
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "contents": [{
      "parts": [{
        "text": "Generate a product description for headphones"
      }]
    }]
  }'
```

## Support and Resources

- [Google Cloud Console](https://console.cloud.google.com/)
- [Google for Education Support](https://edu.google.com/support/)
- [Google AI Studio](https://makersuite.google.com/) - For testing Gemini prompts
- [Google Cloud Documentation](https://cloud.google.com/docs)

## Next Steps

1. **Set up your Google Cloud project** with your student account
2. **Enable the APIs** you need for your collective commerce platform
3. **Configure the environment variables** in your `.env.local` file
4. **Test the integration** using the demo components provided
5. **Deploy to production** with proper security restrictions

Remember: Your Google for Education benefits are available while you're a student, so make the most of the $300 credit and learning opportunities!