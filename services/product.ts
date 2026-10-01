
const API_BASE_URL = 'https://www.eldokan.com/wp-json/eldokan-customer/v1'; 

export async function Products(
  category?: string,
  options?: { page?: number; perPage?: number; brand?: string; minPrice?: number; maxPrice?: number },
) {
  try {
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (options?.brand) params.set('brand', options.brand)
    if (options?.minPrice !== undefined) params.set('min_price', String(options.minPrice))
    if (options?.maxPrice !== undefined) params.set('max_price', String(options.maxPrice))
    if (options?.page) params.set('page', String(options.page))
    if (options?.perPage) params.set('per_page', String(options.perPage))
    const query = params.size ? `?${params.toString()}` : ''
    const response = await fetch(`${API_BASE_URL}/products${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
  
      cache: 'no-store', 
    });

   

    const data = await response.json();
    return data;
  }catch{
    return { data: [] };
  }
}

export async function ProductsByBrand(brand: string) {
  const firstPage = await Products(undefined, { brand, page: 1, perPage: 100 })
  const firstPageProducts = Array.isArray(firstPage?.data) ? firstPage.data : []
  const totalPages = Math.max(1, Number(firstPage?.meta?.total_pages) || 1)

  const remainingPages = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, index) =>
      Products(undefined, { brand, page: index + 2, perPage: 100 }),
    ),
  )

  return [firstPageProducts, ...remainingPages.map((page) => Array.isArray(page?.data) ? page.data : [])]
    .flat()
}

export async function ProductsByPriceRange(minPrice?: number, maxPrice?: number) {
  const firstPage = await Products(undefined, { minPrice, maxPrice, page: 1, perPage: 100 })
  const firstPageProducts = Array.isArray(firstPage?.data) ? firstPage.data : []
  const totalPages = Math.max(1, Number(firstPage?.meta?.total_pages) || 1)

  const remainingPages = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, index) =>
      Products(undefined, { minPrice, maxPrice, page: index + 2, perPage: 100 }),
    ),
  )

  return [firstPageProducts, ...remainingPages.map((page) => Array.isArray(page?.data) ? page.data : [])]
    .flat()
}
