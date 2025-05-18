"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Use useEffect for redirects instead of doing it in the render function
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simple validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      // In a real app, you would make an API call to register the user
      // For this demo, we'll just sign in with credentials after "registration"
      
      // Simulate successful registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Then sign in
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/");
      }
    } catch (err) {
      setError("An error occurred during sign up");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProviderSignIn = (providerId) => {
    signIn(providerId, { callbackUrl: "/" });
  };

  // If still loading or authenticated, show a loading state
  if (status === "loading" || status === "authenticated") {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem",marginTop: "4rem",color: "black" }}>
      <div style={{ width: "100%", maxWidth: "400px", padding: "2rem", backgroundColor: "white", borderRadius: "0.5rem", boxShadow: "0 4px 20px 20px rgba(0, 0, 0, 0.1)" }}>
        <div>
          <h2 style={{ textAlign: "center", fontSize: "1.875rem", fontWeight: "bold", marginBottom: "1rem" ,color: "black" }}>
            Create your account
          </h2>
          <p style={{ textAlign: "center", fontSize: "0.875rem", color: "black", marginBottom: "2rem" }}>
            Or{" "}
            <Link href="/login" style={{ fontWeight: "500", color: "black", textDecoration: "none" }}>
              sign in to your existing account
            </Link>
          </p>
        </div>

        {error && (
          <div style={{ backgroundColor: "#fef2f2", padding: "1rem", borderRadius: "0.375rem", marginBottom: "1rem" }}>
            <div style={{ color: "#b91c1c", fontSize: "0.875rem" }}>{error}</div>
          </div>
        )}

        <form onSubmit={handleSignup} style={{ marginBottom: "1.5rem" }}>
          <div style={{ marginBottom: "1.5rem",color: "black" }}>
            <label htmlFor="name" style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", fontWeight: "500" }}>
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #d1d5db" }}
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div style={{ marginBottom: "1.5rem",color: "black" }}>
            <label htmlFor="email-address" style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", fontWeight: "500" }}>
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #d1d5db" }}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div style={{ marginBottom: "1.5rem",color: "black" }}>
            <label htmlFor="password" style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", fontWeight: "500" }}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #d1d5db" }}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <div style={{ marginBottom: "1.5rem" ,color: "black"}}>
            <label htmlFor="confirm-password" style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", fontWeight: "500" }}>
              Confirm Password
            </label>
            <input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #d1d5db" }}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{ 
              width: "100%", 
              padding: "0.625rem", 
              backgroundColor: "#2563eb", 
              color: "white", 
              borderRadius: "0.375rem", 
              fontWeight: "500",
              border: "none",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <div>
          <div style={{ position: "relative", textAlign: "center", marginBottom: "1rem" }}>
            <span style={{ backgroundColor: "white", padding: "0 0.5rem", color: "#6b7280", fontSize: "0.875rem" }}>
              Or continue with
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", color: "black" }}>
            <button
              onClick={() => handleProviderSignIn("github")}
              style={{ 
                padding: "0.5rem", 
                border: "1px solid #d1d5db", 
                borderRadius: "0.375rem", 
                backgroundColor: "white",
                cursor: "pointer"
              }}
            >
              GitHub
            </button>
            <button
              onClick={() => handleProviderSignIn("google")}
              style={{ 
                padding: "0.5rem", 
                border: "1px solid #d1d5db", 
                borderRadius: "0.375rem", 
                backgroundColor: "white",
                cursor: "pointer"
              }}
            >
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
