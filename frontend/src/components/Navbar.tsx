import { SignOutButton, SignUpButton, useAuth, UserButton } from "@clerk/clerk-react"
import { CircleUser, LogOut, MessageSquare } from "lucide-react"
import { Link } from "react-router-dom"

function Navbar() {
  const { userId } = useAuth();

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Chatgram</h1>
            </Link>
          </div>

          <div className="flex items-center gap-6">
            {!userId ? (
              <SignUpButton mode="redirect" forceRedirectUrl='/sign-up'>
                <button className="btn btn-sm gap-2 transition-colors" >
                  <CircleUser className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign-up</span>
                </button>
              </SignUpButton>
            ) : (
              <>
                
                <UserButton afterSignOutUrl="/sign-in" />
                <SignOutButton>
                  <button className="btn btn-sm gap-2">
                    <LogOut className="size-5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </SignOutButton>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar