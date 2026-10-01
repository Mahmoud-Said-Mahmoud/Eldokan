import { notFound } from 'next/navigation'
import Link from 'next/link'
import ParentImage from '@/components/ParentImage/ParentImage'
import ProductDetails from '@/components/productDetails/ProductDetails'
import { ProductViewTracker } from '@/components/home/RecentlyViewed'
import DescriptionProduct from '@/components/descriptionProduct/DescriptionProduct'
import Footer from '@/components/footer/Footer'
import ProductCard, { type StoreProduct } from '@/components/productCard/ProductCard'
import { ProductsDetails } from '@/services/productdetails'
import { Products } from '@/services/product'

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const response = await ProductsDetails(id)
  const product = response?.data

  if (!product?.id) notFound()

  const category = product.categories?.[0]
  const [allProductsResponse, categoryResponse] = await Promise.all([
    Products(),
    category?.name ? Products(category.name) : Promise.resolve({ data: [] }),
  ])
  const allProducts: StoreProduct[] = Array.isArray(allProductsResponse?.data) ? allProductsResponse.data : []
  const categoryProducts: StoreProduct[] = Array.isArray(categoryResponse?.data) ? categoryResponse.data : []
  const listings = [...new Map<string, StoreProduct>(
    [...allProducts, ...categoryProducts]
      .filter((listing) => listing.id != null)
      .map((listing) => [String(listing.id), listing] as const),
  ).values()]
  const normalizedName = (value?: string) => (value ?? '').trim().toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ')
  const normalizedSku = (value?: string) => (value ?? '').trim().toLocaleLowerCase()
  const isSameProduct = (listing: StoreProduct) => {
    if (String(listing.id) === String(product.id)) return true
    if (product.sku && listing.sku) return normalizedSku(product.sku) === normalizedSku(listing.sku)
    return Boolean(normalizedName(product.name) && normalizedName(listing.name ?? listing.title) === normalizedName(product.name))
  }
  const otherSellerOffers = listings.filter((listing) =>
    isSameProduct(listing) && String(listing.id) !== String(product.id),
  )
  const relatedProducts = categoryProducts
    .filter((listing) => listing.stock?.status !== 'out_of_stock' && !isSameProduct(listing))
    .slice(0, 10)

  return (
    <>
      <main className="container mx-auto  px-4 pb-12">
        <ProductViewTracker product={product} />
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 py-5 text-sm text-gray-500">
          <Link href="/" className="transition hover:text-gray-900">Home</Link>
          <span aria-hidden="true">/</span>
          {category && (
            <>
              <Link href={`/category/${encodeURIComponent(category.name)}`} className="transition hover:text-gray-900">{category.name}</Link>
              <span aria-hidden="true">/</span>
            </>
          )}
          <span className="line-clamp-1 font-medium text-gray-800">{product.name}</span>
        </nav>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)] lg:gap-8">
          <div className="min-w-0 rounded-2xl border border-gray-200 bg-white p-3 sm:p-5">
            <ParentImage data={product} />
          </div>
          <ProductDetails data={product} />
        </div>
<DescriptionProduct data={product} />
        {relatedProducts.length > 0 && (
          <section className="mt-10" aria-labelledby="related-products-title">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a66d00]">More to explore</p>
              <h2 id="related-products-title" className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">Related products</h2>
              <p className="mt-1 text-sm text-gray-500">More picks from {category?.name ?? 'this collection'}.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
              {relatedProducts.map((relatedProduct, index) => (
                <ProductCard key={relatedProduct.id ?? index} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}

        

        {otherSellerOffers.length > 0 && (
          <section className="mt-12" aria-labelledby="other-sellers-title">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a66d00]">Compare sellers</p>
              <h2 id="other-sellers-title" className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">The same product from other sellers</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
              {otherSellerOffers.map((offer, index) => (
                <ProductCard key={offer.id ?? `${offer.seller?.name ?? 'seller'}-${index}`} product={offer} />
              ))}
            </div>
          </section>
        )}

      </main>
      <Footer />
    </>
  )
}
