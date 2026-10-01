import { ArrowUpRight, LifeBuoy, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { fetchUsers } from '@/services/category'

type FooterCategory = {
  id?: string | number
  name: string
  slug?: string
  parent_id?: string | number | null
  children?: FooterCategory[]
  subcategories?: FooterCategory[]
}

function categoryHref(category: FooterCategory) {
  return `/category/${category.slug || encodeURIComponent(category.name)}`
}

export default async function Footer() {
  const response = await fetchUsers()
  const categories: FooterCategory[] = Array.isArray(response?.data) ? response.data : []
  const roots = categories.filter((category) => {
    if (category.parent_id === undefined || category.parent_id === null || category.parent_id === '' || category.parent_id === 0) return true
    return !categories.some((parent) => String(parent.id) === String(category.parent_id))
  })

  function getChildren(parent: FooterCategory) {
    const explicitChildren = [...(parent.children ?? []), ...(parent.subcategories ?? [])]
    const linkedChildren = categories.filter((category) =>
      category.parent_id !== undefined &&
      category.parent_id !== null &&
      String(category.parent_id) === String(parent.id),
    )
    const unique = new Map<string, FooterCategory>()
    for (const child of [...explicitChildren, ...linkedChildren]) {
      unique.set(String(child.id ?? child.slug ?? child.name), child)
    }
    return [...unique.values()]
  }

  return (
    <div className='relative bottom-0'>
      <section className="border-y border-[#e8d39e] bg-[#fff8e7]">
        <div className="container mx-auto flex flex-col gap-5 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-[#a66d00] shadow-sm">
              <LifeBuoy className="size-5" />
            </span>
            <div>
              <h2 className="font-semibold text-gray-900">We&apos;re here to help</h2>
              <p className="mt-1 text-sm text-gray-600">Contact our team whenever you need assistance.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="https://wa.me/201006806022" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#202124] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700">
              <LifeBuoy className="size-4" /> WhatsApp support
            </Link>
            <a href="tel:+201006806022" className="inline-flex items-center gap-2 rounded-full border border-[#d9c58f] bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 transition hover:border-[#a66d00]">
              <Phone className="size-4 text-[#a66d00]" /> 01006806022
            </a>
          </div>
        </div>
      </section>

      <div className="bg-[#202124] text-white">
        <div className="container mx-auto px-4 py-10 sm:py-12">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_2.2fr]">
            <div>
              <Link href="/" aria-label="Eldokan home" className="inline-flex rounded-xl bg-white p-2.5">
                <Image src="/image/Eldokan-logo.webp" width={140} height={70} className="h-12 w-auto object-contain" alt="Eldokan" />
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-6 text-gray-300">Discover everyday essentials and great finds at Eldokan.</p>
              <Link href="https://sell.eldokan.com/login" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#ffd45b] transition hover:text-white">
                Sell with us <ArrowUpRight className="size-4" />
              </Link>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-white">Shop categories</h2>
              {roots.length > 0 ? (
                <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-7 sm:grid-cols-3">
                  {roots.map((category, index) => {
                    const children = getChildren(category)
                    return (
                      <section key={category.id ?? category.slug ?? category.name ?? index}>
                        <Link href={categoryHref(category)} className="text-sm font-semibold text-white transition hover:text-[#ffd45b]">
                          {category.name}
                        </Link>
                        {children.length > 0 && (
                          <ul className="mt-3 space-y-2 border-l border-white/15 pl-3">
                            {children.map((child, childIndex) => (
                              <li key={child.id ?? child.slug ?? child.name ?? childIndex}>
                                <Link href={categoryHref(child)} className="text-xs leading-5 text-gray-400 transition hover:text-[#ffd45b] sm:text-sm">
                                  {child.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </section>
                    )
                  })}
                </div>
              ) : (
                <p className="mt-4 text-sm text-gray-400">Categories are temporarily unavailable.</p>
              )}
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-white/15 pt-5 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">
            <p>Copyright {new Date().getFullYear()} Eldokan. All rights reserved.</p>
            <p>Made for everyday shopping.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
