import Footer from '@/components/footer/Footer'
import ProductCard, { type StoreProduct } from '@/components/productCard/ProductCard'
import { ProductsByPriceRange } from '@/services/product'

function readPrice(value?: string | string[]) {
  const candidate = Array.isArray(value) ? value[0] : value
  if (candidate === undefined || candidate.trim() === '') return undefined
  const amount = Number(candidate)
  return Number.isFinite(amount) && amount >= 0 ? amount : undefined
}

function formatRange(min?: number, max?: number) {
  if (min !== undefined && max !== undefined) return `${min.toLocaleString()}–${max.toLocaleString()} EGP`
  if (max !== undefined) return `Up to ${max.toLocaleString()} EGP`
  if (min !== undefined) return `${min.toLocaleString()} EGP and above`
  return 'All prices'
}

export default async function BudgetPage({
  searchParams,
}: {
  searchParams: Promise<{ min?: string | string[]; max?: string | string[] }>
}) {
  const params = await searchParams
  const minPrice = readPrice(params.min)
  const maxPrice = readPrice(params.max)
  const rangeIsValid = minPrice === undefined || maxPrice === undefined || minPrice < maxPrice
  const response = rangeIsValid ? await ProductsByPriceRange(minPrice, maxPrice) : []
  const allProducts: StoreProduct[] = Array.isArray(response) ? response : []
  const products = allProducts.filter((product) => {
    if (product.stock?.status !== 'in_stock') return false
    const price = Number(product.pricing?.on_sale ? product.pricing.sale_price?.amount : product.pricing?.regular_price?.amount)
    if (!Number.isFinite(price)) return false
    return (minPrice === undefined || price >= minPrice) && (maxPrice === undefined || price <= maxPrice)
  })

  return (
    <>
      <main className="container mx-auto min-h-[60vh] px-4 pb-12">
        <section className="py-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a66d00]">Find something in your range</p>
          <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Shop by budget</h1>
            <p className="text-sm text-gray-500">{formatRange(minPrice, maxPrice)} · {products.length} products</p>
          </div>

          {!rangeIsValid ? (
            <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
              <h2 className="text-lg font-semibold text-gray-900">That price range is not valid</h2>
              <p className="mt-2 text-sm text-gray-500">Choose a minimum price lower than the maximum price.</p>
            </div>
          ) : products.length > 0 ? (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
              {products.map((product, index) => <ProductCard key={product.id ?? index} product={product} />)}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
              <h2 className="text-lg font-semibold text-gray-900">No products in this range yet</h2>
              <p className="mt-2 text-sm text-gray-500">Try another budget to see more products.</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
