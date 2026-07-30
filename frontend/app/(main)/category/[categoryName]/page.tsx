
import { Funnel, IndianRupee, ListSortAscending, Palette, Star } from 'lucide-react'
import Link from 'next/link'
import { ProductCategories, createCategorySlug } from '@/lib/product-categories'
import Product from '@/components/Product';
import CategoryProduct from '@/components/CategoryProduct';
import Dropdown from '@/components/Dropdown';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categoryName: string }>;
}) {
  const { categoryName } = await params

  // const [openPrice,setOpenPrice] = useState<boolean>(false)

  return (
    <div className="grid grid-cols-12 w-full">
      <section className="max-w-full col-span-2 overflow-y-auto border-r px-2">
        <div className="flex items-center gap-2 px-1 py-3">
          <h2>Categories</h2>
          <span>
            <ListSortAscending />
          </span>
        </div>
        <hr className='bg-teal-500'/>
        <div className="my-3 px-2">
          <ul className="flex flex-col gap-4">
            {ProductCategories.map((category, idx) => {
              const slug = createCategorySlug(category.title)
              const isActive = slug === categoryName

              return (
                <li
                  key={`${category.title}-${idx}`}
                  className={`rounded-lg border px-2 py-1 text- text- font- line-clamp-1 duration-300 hover:scale-105 font-medium 
                  ${isActive&&"border-teal-500"}`}
                >
                  <Link href={`/category/${slug}`}>{category.title}</Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    <section className='w-full col-span-10 overflow-y-auto px-5 py-2'>
        <div className='w-full flex items-center justify-between'>
          <div className='py-2 flex items-center gap-5'>
            <h1 className='col-span-1 flex items-center gap-4 px-2 py-1 border rounded-sm w-fit h-fit bg-teal-500'>Filters <span><Funnel size={18}/></span></h1>
            <ul className='flex items-center gap-3'>
                <li  className='flex items-center gap-1 rounded-full px-1 py-0.5 hover:shadow-lg hover:shadow-teal-500 cursor-pointer duration-300 border'><IndianRupee size={16}/> By Price </li>
                <li  className='flex items-center gap-1 rounded-full px-1 py-0.5 hover:shadow-lg hover:shadow-teal-500 cursor-pointer duration-300 border'><Star size={16}/> By Ratings </li>
            </ul>
            {<Dropdown/>}
        </div>
        <div className='flex items-center gap-1 shadow-lg rounded-full border px-2 py-0.5'>
          <p>Total Results :</p>
          <span>20</span>
        </div>
        </div>
        <hr />
        <div className='flex flex-wrap gap-5 h-[80vh] overflow-y-auto py-5'>
            <CategoryProduct/>
            <CategoryProduct/>
            <CategoryProduct/>
            <CategoryProduct/>
            <CategoryProduct/>
            <CategoryProduct/>
            <CategoryProduct/>
            <CategoryProduct/>1
            <CategoryProduct/>
            <CategoryProduct/>
            <CategoryProduct/>
            <CategoryProduct/>
            <CategoryProduct/>
        </div>
    </section>
    </div>
  )
}