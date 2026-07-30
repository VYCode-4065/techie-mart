import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import boatImage from '@/public/product-image/boatImage.webp'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import AmountBeforeDiscountConverter from "@/lib/AmountBeforeDiscountConverter"

function CategoryProduct() {
  return (
    <Card className="h-72">
      <div className="relative overflow-hidden w-full">
        <Image
          src={boatImage}
          alt="Featured product"
          className="h-full"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent" />
        <div className="absolute left-3 top-3">
          <Badge variant="secondary" className="brand-pill rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em]">
            Featured
          </Badge>
        </div>
      </div>

      <div className="px-4 pb-4 pt-4">
        <CardHeader className="px-0 pb-2 pt-0">
          <CardAction className="mb- items-center justify-between">
            <span className="rounded-full border border-teal-400/25 bg-teal-400/10 px-2.5 py-1 text-[11px] font-semibold text-teal-300">
              In Stock
            </span>
          </CardAction>
          <CardTitle className="text-lg font-semibold text-slate-50 line-clamp-1">Design systems meetup</CardTitle>
        </CardHeader>

        <CardFooter className="flex gap-4 bg-transparent px-0 pb-0 pt-0">
          <div className="flex items-center justify-between gap-3">
            <div>
              <Button className="brand-btn rounded-full px-2 py-1 text-sm text-slate-100 font-semibold shadow-lg shadow-teal-500/20 hover:brightness-[1.04]">
                <strong>₹ 499</strong>
              </Button>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-teal-400">15% off</p>
              <p className="text-xs text-slate-500 line-through">₹{AmountBeforeDiscountConverter(500, 15)}</p>
            </div>
          </div>

          <div className=" mt-2">

          {/* <Button className="brand-btn">Add to Cart</Button> */}
          <div className=" lex items-center gap-0. justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-2 py-1 h-full ">
            {/* <span className="text-sm font-medium text-slate-300">Qty</span> */}
            <div className="flex items-center gap-">
              <Button className="brand-btn-secondary h-6 w-6 rounded-full p-0 text-base">−</Button>
              <p className="min-w-6 text-center text-sm font-semibold text-slate-50">2</p>
              <Button className="brand-btn h-6 w-6 rounded-full p-0 text-base hover:brightness-[1.04]">+</Button>
            </div>
          </div>
          </div>
        </CardFooter>
      </div>
    </Card>
  )
}

export default CategoryProduct;