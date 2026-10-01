import Footer from '@/components/footer/Footer'
import ProductCard from '@/components/productCard/ProductCard'
import { Search } from '@/services/search'

type SearchProduct = {
  id?: string | number
  name?: string
  title?: string
  image?: { url?: string }
  pricing?: {
    on_sale?: boolean
    sale_price?: { formatted?: string }
    regular_price?: { formatted?: string }
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>
}) {
  const params = await searchParams
  const query = Array.isArray(params.q) ? params.q[0] ?? '' : params.q ?? ''
  const searchTerm = query.trim()
  const response = searchTerm.length >= 2 ? await Search(searchTerm) : { data: [] }
  const products: SearchProduct[] = Array.isArray(response?.data) ? response.data : []

  return (
    <>
      <main className="container mx-auto min-h-screen px-4 pb-6 mb-10">
        <section className="mt-8 ">
          <h1 className="text-2xl font-semibold">Search results for &quot;{searchTerm}&quot;</h1>
          <p className="mt-1 text-sm text-gray-500">
            {products.length} {products.length === 1 ? 'product' : 'products'} found
          </p>

          {products.length > 0 ? (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
              {products.map((product, index) => {
                return <ProductCard key={product.id ?? index} product={product} />
              })}
            </div>
          ) : (
            <p className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center text-gray-600">
              {searchTerm.length < 2
                ? 'Enter at least 2 characters to search for products.'
                : 'No matching products found.'}
            </p>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
