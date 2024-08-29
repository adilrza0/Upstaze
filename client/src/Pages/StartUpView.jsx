
import { Card, CardContent } from "@/components/ui/card"
import { useGetStartUpbyIdQuery } from "@/redux/api/starupApiSlice";
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"


export default function StartUpView({}) {
  const {id}= useParams()
  const {token} =useSelector((state)=>state.auth);
  const {data,error}= useGetStartUpbyIdQuery({token,id})
  console.log(data,error)

  return (
    <div className="flex justify-center w-full">
      <Card  className="w-full max-w-4xl">
        <div className="relative h-48 sm:h-64 md:h-80 lg:h-96">
          <img
            src={data?.logo}
            alt="Startup Cover"
            className="h-full w-full object-cover"
            width="640"
            height="384"
            style={{ aspectRatio: "640/384", objectFit: "cover" }}
          />
          <div className="absolute rounded-xl bottom-0 left-0 flex text-primary-foreground items-center gap-4 bg-primary/95 px-4 py-3 w-full sm:w-auto">
            <img
              src={data?.logo}
              width={64}
              height={64}
              alt="Startup Logo"
              className="rounded-md"
              style={{ aspectRatio: "64/64", objectFit: "cover" }}
            />
            <div>
              <h2 className="text-2xl font-bold">{data?.name}</h2>
              <p className="text-sm ">{data?.industry.join(", ")}</p>
            </div>
          </div>
        </div>
        <CardContent className="grid gap-6 p-6 sm:p-8 md:p-10">
          <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
            <p className="text-sm font-medium text-muted-foreground">{data?.city}</p>
            <p className="text-sm font-medium text-muted-foreground">Offer: {data?.whatOffer}</p>
          </div>
          <div className="grid gap-2">
            <h3 className="text-xl font-bold">Vision</h3>
            <p>
              {data?.startupVision}
            </p>
          </div>
          <div className="grid gap-2">
            <h3 className="text-xl font-bold">Website</h3>
            <a href={data?.website}>
            <Link href="#" className="text-primary underline" prefetch={false}>
              {data?.website}
            </Link>
            </a>
          </div>
          <div className="grid gap-2">
            <h3 className="text-xl font-bold">Target Audience</h3>
            <p>
             {data?.targetAudience}
            </p>
          </div>
          <div className="grid gap-2">
            <h3 className="text-xl font-bold">Challenges</h3>
            <p>
              {data?.challenges}
            </p>
          </div>
          <div className="grid gap-2">
            <h3 className="text-xl font-bold">Our Story</h3>
            <p>
              {data?.startupStory}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}