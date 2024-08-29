import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import logo from "../assets/logo-no-background.svg";
import ilustration from "../assets/undraw_online_connection_6778.svg";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useUser } from "@clerk/clerk-react";

export default function Home() {
  const {isSignedIn, user} =useUser()
  const navigate =useNavigate()
  console.log(user)
  if(isSignedIn){
    // navigate("/dashboard")
  }
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link
          href="#"
          className="flex items-center justify-center"
          
        >
          <img className=" mt-8 w-[12vw]" src={logo} alt="" />
          <span className="sr-only">Founder Platform</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            
          >
            Founders
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            
          >
            Startups
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            
          >
            Investors
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            
          >
            Suppoters
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    The all-in-one platform for founders
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Discover new startups, connect with founders, and access
                    valuable resources to grow your business.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    to="/sign-in"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    
                  >
                    Get Started
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <img
                src={ilustration}
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video  rounded-xl  sm:w-full lg:order-last "
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Unlock Your Startup's Potential</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform offers a comprehensive suite of tools and resources to help your startup thrive, from
                  startup listings and community discussions to a curated library of industry insights.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Startup Listings</h3>
                      <p className="text-muted-foreground">
                        Discover a diverse range of startups, connect with founders, and explore investment
                        opportunities.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Community Discussions</h3>
                      <p className="text-muted-foreground">
                        Engage with a vibrant community of entrepreneurs, share insights, and collaborate on innovative
                        ideas.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Resource Library</h3>
                      <p className="text-muted-foreground">
                        Access a curated collection of industry reports, guides, and expert advice to fuel your
                        startup's growth.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <img
                src="/placeholder.svg"
                width="550"
                height="310"
                alt="Features"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Discover Founders
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Browse through the profiles of founders and startups on our
                  platform. Connect with like-minded individuals and explore
                  potential collaborations.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1">
                <Link
                  href="#"
                  className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        John Doe
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Founder, Acme Inc.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="grid gap-1">
                <Link
                  href="#"
                  className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        Sarah Miller
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Founder, Startup X
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="grid gap-1">
                <Link
                  href="#"
                  className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>TW</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        Tom Wilson
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Founder, Startup Y
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="grid gap-1">
                <Link
                  href="#"
                  className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>LM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        Lisa Martinez
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Founder, Startup Z
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="grid gap-1">
                <Link
                  href="#"
                  className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>MK</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        Michael Kim
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Founder, Startup A
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="grid gap-1">
                <Link
                  href="#"
                  className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JL</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        Jessica Lee
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Founder, Startup B
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Discover Startups
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Browse through the profiles of startups on our platform.
                  Discover new opportunities and explore potential
                  collaborations.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1">
                <Link
                  href="#"
                  className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-[#00b894] text-6xl text-primary-foreground flex items-center justify-center w-12 h-12">
                      🚀
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        Acme Inc.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        AI-powered productivity tools
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="grid gap-1">
                <Link
                  href="#"
                  className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-[#00b894] text-6xl text-primary-foreground flex items-center justify-center w-12 h-12">
                      🌐
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        Startup X
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Web3 infrastructure solutions
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="grid gap-1">
                <Link
                  href="#"
                  className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-[#00b894] text-6xl text-primary-foreground flex items-center justify-center w-12 h-12">
                      🧠
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        Startup Y
                      </p>
                      <p className="text-sm text-muted-foreground">
                        AI-powered decision support
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Success Stories</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Hear from Our Thriving Community
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform has helped countless startups achieve their goals. Hear from some of our successful members
                and how they leveraged our resources to take their business to new heights.
              </p>
            </div>
            <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-sm text-muted-foreground">Founder, Acme Inc.</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "The Startup Platform has been a game-changer for my\n business. The community, resources, and
                  connections I've\n made have been invaluable in driving our growth."
                </p>
              </Card>
              <Card className="p-6 space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Sarah Miller</p>
                    <p className="text-sm text-muted-foreground">Co-founder, Startup Ventures</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "The Startup Platform has been instrumental in helping us\n connect with the right investors and
                  partners. It's been a\n valuable resource for our entire team."
                </p>
              </Card>
              <Card className="p-6 space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>MK</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Michael Kim</p>
                    <p className="text-sm text-muted-foreground">Founder, Innovative Solutions</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "The Startup Platform has been a game-changer for my\n business. The community, resources, and
                  connections I've\n made have been invaluable in driving our growth."
                </p>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
