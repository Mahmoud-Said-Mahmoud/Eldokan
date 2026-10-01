
import { fetchUsers } from "@/services/category";
import Link from "next/link";

export default async function Category() {
  const response = await fetchUsers();
  const data = Array.isArray(response?.data) ? response.data : [];

  return (
    <div className="border-b border-gray-200 bg-white">
      <nav aria-label="Shop by category" className="category-scrollbar-hidden mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8">
        {data.map((item: any, index: number) => (
          <Link
            href={`/category/${item.slug || item.name}`}
            className="shrink-0 rounded-full px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-[#F5E7C6] hover:text-[#222222] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C58A36]"
            key={item.slug || item.name || index}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
