export const UMAMI_CLOUD_API = 'https://api.umami.is/v1';

// Umami Cloud expects an API key header; self-hosted Umami expects a Bearer token.
export function umamiAuthHeaders(
  apiEndpoint: string,
  apiToken: string
): HeadersInit {
  const isCloud = new URL(apiEndpoint).hostname === 'api.umami.is';
  return {
    Accept: 'application/json',
    ...(isCloud
      ? { 'x-umami-api-key': apiToken }
      : { Authorization: `Bearer ${apiToken}` })
  };
}
