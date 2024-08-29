

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Link, useNavigate } from "react-router-dom"
import logo from '../../assets/logo-no-background.svg'
import { UserButton, useUser } from "@clerk/clerk-react"



export default function Navbar() {
    const navigate = useNavigate()
    const {isSignedIn}=useUser()
  return (
    <header className=" sticky mb-4 top-0 z-20 w-full bg-accent">
      <div className="container flex flex-col gap-4 px-4 py-3 md:flex-row md:items-center md:justify-between md:py-4 lg:px-6">
        <div className="flex items-center justify-between">
          <Link href="#" className="flex items-center gap-2" >
            {/* <MountainIcon className="h-6 w-6 text-[#007bff]" />
            <span className="font-semibold text-[#343a40]">Acme Inc</span> */}
            <img className="w-[10vw]" src={logo} alt="" />
          </Link>
          <div className="flex items-center gap-4 md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MenuIcon className="h-6 w-6 text-[#6c757d]" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="#" className="flex items-center gap-2 text-[#495057]" >
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="#" className="flex items-center gap-2 text-[#495057]" >
                    <UsersIcon className="h-4 w-4" />
                    <span>Friend Request</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="#" className="flex items-center gap-2 text-[#495057]" >
                    <BellIcon className="h-4 w-4" />
                    <span>Notification</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="#" className="flex items-center gap-2 text-[#495057]" >
                    <MailIcon className="h-4 w-4" />
                    <span>Messages</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-[#495057]">
          <Link href="#" className="font-medium hover:underline" >
            Founders
          </Link>
          <Link href="#" className="font-medium hover:underline" >
            Investors
          </Link>
          <Link to="/startup" className="font-medium hover:underline" >
            Startups
          </Link>
          <Link href="#" className="mr-[45vw] font-medium hover:underline" >
            Supporters
          </Link>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-secondary-foreground hover:text-primary" >
              {/* <Avatar className="h-5 w-5">
                <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar> */}
              {isSignedIn && <div onClick={()=>navigate("/dashboard")}><UserButton /></div> }
              <span className="sr-only">Profile</span>
            </Link>
            <Link href="#" className="text-secondary-foreground hover:text-primary" >
              <UsersIcon className="h-5 w-5" />
              <span className="sr-only">Friend Request</span>
            </Link>
            <Link href="#" className="text-secondary-foreground hover:text-primary" >
              <BellIcon className="h-5 w-5" />
              <span className="sr-only">Notification</span>
            </Link>
            <Link href="#" className="text-secondary-foreground hover:text-primary" >
              <MailIcon className="h-5 w-5" />
              <span className="sr-only">Messages</span>
            </Link>
          </div>
        </nav>
      </div>
      <div className="container flex items-center justify-center gap-6 px-4 py-3 md:justify-start lg:px-6 border-t border-[#dee2e6]">
        <Link href="#" className="font-medium hover:underline text-[#495057]" >
          Feed
        </Link>
        <Link href="#" className="font-medium hover:underline text-[#495057]" >
          Jobs
        </Link>
        <Link href="#" className="font-medium hover:underline text-[#495057]" >
          Matchings
        </Link>
        <Link href="#" className="font-medium hover:underline text-[#495057]" >
          Deck Pitch
        </Link>
      </div>
    </header>
  )
}

function BellIcon(props) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}


function MailIcon(props) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}


function MenuIcon(props) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
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
  )
}


function UsersIcon(props) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}