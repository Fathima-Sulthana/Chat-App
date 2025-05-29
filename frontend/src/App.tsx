import { Routes, Route } from "react-router-dom";
import {
  SignIn,
  SignUp,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useUser,
} from "@clerk/clerk-react";
import Navbar from "./components/Navbar";
import Homepage from "./pages/HomePage";
import Landing from "./components/Landing";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "./context/SocketContext";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoaded } = useUser();
  if (!isLoaded) return null;

  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

function App() {
  return (
    <SocketProvider>
      <Navbar />
      <Routes>
        {/* ✅ Public Landing page shown first */}
        <Route path="/" element={<Landing />} />

        {/* ✅ Public sign-in and sign-up pages */}
        <Route path="/sign-in" element={<SignIn routing="path" path="/sign-in" />} />
        <Route path="/sign-up" element={<SignUp routing="path" path="/sign-up" />} />

        {/* ✅ Private chat page */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </SocketProvider>
  );
}

export default App;
