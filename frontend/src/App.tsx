import { Routes, Route } from "react-router-dom";
import { SignIn, SignUp, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Navbar from "./components/Navbar";
import Homepage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";
import Landing from "./components/landing";



function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut><RedirectToSignIn /></SignedOut>
    </>
  );
}

function App() {

  return (
    
    <><Navbar />
    <Landing />
    <Routes>
      
      <Route path="/sign-in" element={<SignIn routing="path" path="/sign-in" />} />
      <Route path="/sign-up" element={<SignUp routing="path" path="/sign-up" />} />
      <Route
        path="/"
        element={<ProtectedRoute>
          <div>

            
            <Homepage />

          </div>


          {/* <UserButton afterSignOutUrl="/sign-in" /> */}
        </ProtectedRoute>} />

    </Routes><Toaster /></>
  );
}

export default App;



