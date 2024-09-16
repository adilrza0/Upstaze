import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from "lucide-react"
import { Link } from "react-router-dom"


export default function AuthRequired() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-4">
            <Lock className="w-6 h-6 text-yellow-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Authentication Required</CardTitle>
          <CardDescription className="text-center">
            You need to log in to access this page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-sm text-gray-600">
            Please log in with your credentials to view the content of this page. If you don't have an account, you may need to sign up first.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link to="/sign-in">Log In</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}