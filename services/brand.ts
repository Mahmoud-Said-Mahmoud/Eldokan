const API_BASE_URL = 'https://www.eldokan.com/wp-json/eldokan-customer/v1'

export async function Brands() {
  try {
    const firstResponse = await fetch(`${API_BASE_URL}/brands?page=1&per_page=100`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    })
    if (!firstResponse.ok) return []

    const firstPage = await firstResponse.json()
    const firstBrands = Array.isArray(firstPage?.data) ? firstPage.data : []
    const totalPages = Math.max(1, Number(firstPage?.meta?.total_pages) || 1)

    const remainingPages = await Promise.all(
      Array.from({ length: totalPages - 1 }, async (_, index) => {
        const response = await fetch(`${API_BASE_URL}/brands?page=${index + 2}&per_page=100`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-store',
        })
        if (!response.ok) return []
        const page = await response.json()
        return Array.isArray(page?.data) ? page.data : []
      }),
    )

    return [firstBrands, ...remainingPages].flat()
  } catch {
    return []
  }
}
