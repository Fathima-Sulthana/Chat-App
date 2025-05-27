import { SignInButton, useAuth } from "@clerk/clerk-react";

const Landing = () => {
  const { userId } = useAuth();

  if (userId) return null;

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary leading-tight">
          Welcome to <span className="text-secondary">Chatgram</span>
        </h1>
        <p className="text-base-content text-lg md:text-xl">
          Connect, chat, and collaborate with your friends. <br />
          Please log in to continue using Chatgram.
        </p>

        <SignInButton mode="redirect" forceRedirectUrl="/sign-in">
          <button className="btn btn-primary btn-wide text-lg md:text-xl mt-4 shadow-lg hover:shadow-xl transition">
            Login
          </button>
        </SignInButton>
      </div>
    </div>
  );
};

export default Landing;
