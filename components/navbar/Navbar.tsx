'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CiDark, CiHeart, CiUser } from 'react-icons/ci'
import { IoLanguageOutline } from 'react-icons/io5'
import { PiShoppingCartLight } from 'react-icons/pi'
import { Search } from '@/services/search'
import AnnouncementTopBar from './AnnouncementTopBar'

type SearchResult = {
  id?: string | number
  name?: string
  title?: string
  slug?: string
  image?: { url?: string }
  pricing?: {
    on_sale?: boolean
    sale_price?: { formatted?: string }
    regular_price?: { formatted?: string }
  }
}

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const urlQuery = searchParams.get('q') ?? ''
  const [query, setQuery] = useState(urlQuery)
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [isNavigatingToSearch, setIsNavigatingToSearch] = useState(false)

  useEffect(() => {
    setQuery(urlQuery)
    setIsNavigatingToSearch(false)
  }, [urlQuery])

  useEffect(() => {
    setIsNavigatingToSearch(false)
  }, [pathname])

  useEffect(() => {
    const searchTerm = query.trim()
    let isCurrentSearch = true
    const controller = new AbortController()

    if (searchTerm.length < 2) {
      setResults([])
      setHasSearched(false)
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    const timeout = window.setTimeout(async () => {
      try {
        const response = await Search(searchTerm, controller.signal)
        if (isCurrentSearch) {
          setResults(Array.isArray(response?.data) ? response.data : [])
          setHasSearched(true)
        }
      } catch {
        if (isCurrentSearch) {
          setResults([])
          setHasSearched(true)
        }
      } finally {
        if (isCurrentSearch) setIsSearching(false)
      }
    }, 150)

    return () => {
      isCurrentSearch = false
      window.clearTimeout(timeout)
      controller.abort()
    }
  }, [query])

  function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const searchTerm = query.trim()
    if (searchTerm.length < 2) return

    setResults([])
    setHasSearched(false)
    setIsNavigatingToSearch(true)
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
  }

  return (
    <div className="bg-white">
      <AnnouncementTopBar
        announcements={[
          { text: 'Welcome to Eldokan' },
          { text: 'Great deals on your favorite products' },
          { text: 'Shop with us today' },
        ]}
      />
      <div className="border-b border-gray-200 shadow-sm">
        <nav aria-label="Main navigation" className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 px-4 py-3 sm:px-6 lg:grid-cols-[auto_minmax(16rem,1fr)_auto] lg:gap-10 lg:px-8">
          <Link href="/" className="flex w-fit items-center" aria-label="Eldokan home">
            <Image src="/image/Eldokan-logo.webp" alt="Eldokan" width={132} height={72} priority className="h-12 w-auto object-contain sm:h-14" />
          </Link>

          <form onSubmit={handleSearchSubmit} className="relative col-span-2 row-start-2 w-full lg:col-span-1 lg:row-start-auto">
            <label htmlFor="navbar-product-search" className="sr-only">Search products</label>
            <input
              id="navbar-product-search"
              type="search"
              placeholder="Search for products..."
              aria-expanded={query.trim() !== ''}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-11 w-full rounded-full border border-gray-300 bg-gray-50 py-2 pl-4 pr-24 text-sm outline-none transition focus:border-[#C58A36] focus:bg-white focus:ring-2 focus:ring-[#C58A36]/20"
            />
            <button type="submit" className="absolute right-1 top-1 h-9 rounded-full bg-[#222222] px-5 text-sm font-medium text-white transition hover:bg-[#3b3b3b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C58A36]">
              Search
            </button>

            {query.trim() !== '' && pathname !== '/search' && !isNavigatingToSearch && (
              <div className="absolute z-50 mt-2 max-h-[70vh] w-full overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-xl">
              {query.trim().length < 2 ? (
                <p className="p-3 text-sm text-gray-500">Type at least 2 characters to search.</p>
              ) : isSearching ? (
                <p className="p-3 text-sm text-gray-500">Searching products...</p>
              ) : results.length > 0 ? (
                <ul>
                  {results.map((result, index) => {
                    const name = result.name ?? result.title ?? 'Product'
                    const price = result.pricing?.on_sale
                      ? result.pricing.sale_price?.formatted
                      : result.pricing?.regular_price?.formatted

                    return (
                      <li key={result.id ?? result.slug ?? index} className="border-b last:border-0">
                        {result.id ? (
                          <Link
                            href={`/product/${result.id}`}
                            className="flex items-center gap-3 p-3 hover:bg-gray-50"
                            onClick={() => setQuery('')}
                          >
                            {result.image?.url && (
                              <Image src={result.image.url} alt="" width={48} height={48} className="h-12 w-12 rounded object-cover" />
                            )}
                            <span className="min-w-0 flex-1 truncate">{name}</span>
                            {price && <span className="text-sm text-gray-600">{price}</span>}
                          </Link>
                        ) : (
                          <span className="block p-3">{name}</span>
                        )}
                      </li>
                    )
                  })}
                </ul>
              ) : hasSearched ? (
                <p className="p-3 text-sm text-gray-500">No matching products found.</p>
              ) : null}
              </div>
            )}
          </form>

          <div className="col-start-2 row-start-1 flex items-center justify-end gap-1 sm:gap-2 lg:col-start-auto lg:row-start-auto">
            <button type="button" aria-label="Change language" className="hidden h-10 w-10 items-center justify-center rounded-full text-xl text-gray-700 transition hover:bg-gray-100 sm:flex"><IoLanguageOutline /></button>
            <button type="button" aria-label="Toggle dark mode" className="hidden h-10 w-10 items-center justify-center rounded-full text-xl text-gray-700 transition hover:bg-gray-100 sm:flex"><CiDark /></button>
            <button type="button" aria-label="Favorites" className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-gray-700 transition hover:bg-gray-100 hover:text-[#C58A36]"><CiHeart /></button>
            <button type="button" aria-label="Shopping cart" className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-gray-700 transition hover:bg-gray-100 hover:text-[#C58A36]"><PiShoppingCartLight /></button>
            <button type="button" aria-label="Account" className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-gray-700 transition hover:bg-gray-100 hover:text-[#C58A36]"><CiUser /></button>
          </div>
        </nav>
      </div>
    </div>
  )
}
