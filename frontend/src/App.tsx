import { Routes, Route } from "react-router-dom";
import { SignIn, SignUp, UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

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
    <Routes>
      <Route path="/sign-in" element={<SignIn routing="path" path="/sign-in" />} />
      <Route path="/sign-up" element={<SignUp routing="path" path="/sign-up" />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <div className="p-4">
              <h1 className="text-2xl font-bold">Welcome to the Chat App!</h1>
              <UserButton afterSignOutUrl="/sign-in" />
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;



