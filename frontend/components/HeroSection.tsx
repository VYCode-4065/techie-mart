"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import Image from 'next/image'
import Crousal1 from '@/public/product-image/crousal1.png'
import Crousal2 from '@/public/product-image/crousal2.png'
import Crousal3 from '@/public/product-image/crousal3.png'
import Crousal4 from '@/public/product-image/crousal4.png'
import Crousal5 from '@/public/product-image/crousal5.png'
import HerosectionCategory from './HeroSectionCategory'
import Link from 'next/link'
import { ProductCategories, createCategorySlug } from '@/lib/product-categories'

const slides = [
  {
    image: Crousal1,
    title: 'Discover premium gadgets',
    subtitle: 'Top deals on smartphones, laptops and accessories',
  },
  {
    image: Crousal2,
    title: 'Power your home office',
    subtitle: 'High-performance desktops and monitors built for productivity',
  },
  {
    image: Crousal3,
    title: 'Sound that moves you',
    subtitle: 'Wireless headphones and speakers with studio clarity',
  },
  {
    image: Crousal4,
    title: 'Stay connected anywhere',
    subtitle: 'Fast routers and smart home devices for every room',
  },
  {
    image: Crousal5,
    title: 'Smart living essentials',
    subtitle: 'Portable gadgets, wearables and next-gen accessories',
  },
]

const HeroSection = () => {
  return (
    <main className='flex items-center justify-center flex-col overflow-hidden w-full'>
        <div className='px-2 lg:px-20 w-full flex items-center gap-3 text-slate-50'>
            <ul className='lg:flex-1 overflow-x-scroll flex items-center gap-3 scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] py-3'>

            {
                ProductCategories.map((category,idx)=>(

                <li key={`${category.title}-${idx}`} className='px-2 py-1 text-slate-100 cursor-pointer duration-300 text-nowrap shadow-md hover:shadow-teal-500 rounded-full hover:scale-95'>
                    <Link href={`/category/${createCategorySlug(category.title)}`}>{category.title}</Link>
                </li>
                ))
            }
                
            </ul>
        </div>
      <div className='w-full'>
        <div className='rounded-3xl overflow-hidden lg:max-w-7xl bg-slate-950/90 relative shadow-2xl shadow-slate-950/40 mx-auto'>
          <Carousel autoplay autoplayInterval={5000} opts={{ loop: true, align: 'start' }}>
            <CarouselContent className='min-h-105 lg:min-h-130'>
              {slides.map((slide, index) => (
                <CarouselItem key={index} className='relative min-h-105 lg:130'>
                  <div className='absolute inset-0' />
                  <Image
                    src={slide.image}
                    alt={`slide-${index}`}
                    className='h-full w-full object-cover'
                    priority={index === 0}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className='mt-8 w-full'>
          <HerosectionCategory />
        </div>
      </div>
    </main>
  )
}

export default HeroSection
