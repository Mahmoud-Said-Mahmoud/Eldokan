import { Products } from '@/services/product'

const API_BASE_URL = 'https://www.eldokan.com/wp-json/eldokan-customer/v1'
const PRODUCTS_PER_PAGE = 100

export type SellerData = {
  id: string
  name: string
  slug?: string
  rating?: number | null
  rating_count?: number | null
}

export async function SellerDetails(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/sellers/${encodeURIComponent(id)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    })

    if (!response.ok) return null
    const result = await response.json()
    return result?.data as SellerData | undefined
  } catch {
    return null
  }
}

export async function SellerProducts(sellerId: string) {
  const firstPage = await Products(undefined, { page: 1, perPage: PRODUCTS_PER_PAGE })
  const firstPageProducts = Array.isArray(firstPage?.data) ? firstPage.data : []
  const totalPages = Math.max(1, Number(firstPage?.meta?.total_pages) || 1)

  const remainingPages = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, index) =>
      Products(undefined, { page: index + 2, perPage: PRODUCTS_PER_PAGE }),
    ),
  )

  return [firstPageProducts, ...remainingPages.map((page) => Array.isArray(page?.data) ? page.data : [])]
    .flat()
    .filter((product) => String(product.seller?.id ?? '') === sellerId)
}
