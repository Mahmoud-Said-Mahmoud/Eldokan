
const API_BASE_URL = 'https://www.eldokan.com/wp-json/eldokan-customer/v1'; 

const searchCache = new Map<string, { data: unknown; savedAt: number }>();
const CACHE_TTL_MS = 30_000;

export async function Search(productName: string, signal?: AbortSignal) {
  const searchTerm = productName.trim();
  const cacheKey = searchTerm.toLocaleLowerCase();
  const cached = searchCache.get(cacheKey);

  if (cached && Date.now() - cached.savedAt < CACHE_TTL_MS) {
    return { data: cached.data };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/search/suggestions?q=${encodeURIComponent(searchTerm)}`, {
      method: 'GET',
      cache: 'no-store',
      signal,
    });

    if (!response.ok) return { data: [] };

    const data = await response.json();
    searchCache.set(cacheKey, { data: data?.data ?? [], savedAt: Date.now() });
    return data;
  } catch {
    return { data: [] };
  }
}
