'use client'

import Link from 'next/link'
import { Heart, ShoppingBag, CircleHelp, Star, Store } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ProductDetailData } from '@/types/product'

export default function ProductDetails({ data }: { data: ProductDetailData }) {
  const categories = (data.categories ?? []).map((category) => category.name)
  const salePrice = data.pricing.sale_price
  const regularPrice = data.pricing.regular_price
  const sellerRating = Number(data.seller?.rating)
  const sellerRatingCount = Number(data.seller?.rating_count ?? 0)
  const discount = data.pricing.on_sale && regularPrice.amount > 0
    ? Math.round(((regularPrice.amount - salePrice.amount) / regularPrice.amount) * 100)
    : null

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          {data.brand?.name && <p className="text-sm font-semibold text-[#a66d00]">{data.brand.name}</p>}
          <h1 className="mt-2 text-2xl font-semibold leading-tight text-gray-900 sm:text-3xl">{data.name}</h1>
          {data.sku && <p className="mt-3 text-xs text-gray-500">SKU: {data.sku}</p>}
        </div>
        <button type="button" aria-label="Add to favorites" className="rounded-full border border-gray-200 p-2.5 text-gray-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600">
          <Heart className="size-5" />
        </button>
      </div>

      <div className="mt-6 border-y border-gray-100 py-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-3xl font-bold tracking-tight text-gray-950">
            {data.pricing.on_sale ? salePrice.formatted : regularPrice.formatted}
          </span>
          {data.pricing.on_sale && <span className="text-base text-gray-400 line-through">{regularPrice.formatted}</span>}
          {discount !== null && <span className="rounded-md bg-[#fff2c9] px-2 py-1 text-sm font-semibold text-[#805400]">Save {discount}%</span>}
        </div>
        <p className="mt-2 text-xs text-gray-500">Current price from Eldokan marketplace.</p>
      </div>

      {data.stock?.status && (
        <p className={`mt-5 text-sm font-semibold ${data.stock.status === 'in_stock' ? 'text-emerald-700' : 'text-rose-600'}`}>
          {data.stock.status === 'in_stock' ? 'In stock' : 'Currently unavailable'}
        </p>
      )}

      {data.seller && (
        <section className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4" aria-label="Seller information">
          <div className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-gray-600 shadow-sm">
              <Store className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-500">Sold by</p>
              {data.seller.id ? (
                <Link href={`/seller/${encodeURIComponent(data.seller.id)}`} className="block truncate font-semibold text-gray-900 underline decoration-gray-300 underline-offset-4 hover:decoration-[#d99500]">
                  {data.seller.name || 'Marketplace seller'}
                </Link>
              ) : (
                <p className="truncate font-semibold text-gray-900">{data.seller.name || 'Marketplace seller'}</p>
              )}
              <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-600">
                {Number.isFinite(sellerRating) && sellerRatingCount > 0 ? (
                  <>
                    <Star className="size-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                    <span className="font-semibold text-gray-800">{sellerRating.toFixed(1)}</span>
                    <span>({sellerRatingCount} {sellerRatingCount === 1 ? 'rating' : 'ratings'})</span>
                  </>
                ) : (
                  <span>No seller ratings yet</span>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {categories.length > 0 && (
        <p className="mt-4 text-sm text-gray-600">
          Category:{' '}
          <Link href={`/category/${encodeURIComponent(categories[0])}`} className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 hover:decoration-[#d99500]">
            {categories[0]}
          </Link>
        </p>
      )}

      {(data.attributes ?? []).length > 0 && (
        <dl className="mt-5 space-y-3 rounded-xl bg-gray-50 p-4">
          {data.attributes.map((attribute, index) => (
            <div key={`${attribute.name}-${index}`} className="flex flex-wrap gap-x-2 text-sm">
              <dt className="font-semibold text-gray-700">{attribute.name}:</dt>
              <dd className="text-gray-600">{attribute.options.map((option) => option.name).join(', ')}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Button className="h-12 rounded-full bg-[#f5b400] font-semibold text-gray-950 hover:bg-[#e4a600]">
          Buy now
        </Button>
        <Button variant="outline" className="h-12 rounded-full border-gray-300 font-semibold text-gray-800 hover:border-gray-500 hover:bg-gray-50">
          <ShoppingBag className="mr-2 size-4" /> Add to cart
        </Button>
      </div>
      <p className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-500">
        <CircleHelp className="size-4 text-gray-400" /> Product information provided by the seller
      </p>
    </section>
  )
}
