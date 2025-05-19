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
      // CALL your signup API
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to register");
        setIsLoading(false);
        return;
      }

      // Then sign in after successful signup
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
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        marginTop: "4rem",
        color: "black",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "2rem",
          backgroundColor: "white",
          borderRadius: "0.5rem",
          boxShadow: "0 4px 20px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div>
          <h2
            style={{
              textAlign: "center",
              fontSize: "1.875rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              color: "black",
            }}
          >
            Create your account
          </h2>
          <p
            style={{
              textAlign: "center",
              fontSize: "0.875rem",
              color: "black",
              marginBottom: "2rem",
            }}
          >
            Or{" "}
            <Link
              href="/login"
              style={{
                fontWeight: "500",
                color: "black",
                textDecoration: "none",
              }}
            >
              sign in to your existing account
            </Link>
          </p>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: "#fef2f2",
              padding: "1rem",
              borderRadius: "0.375rem",
              marginBottom: "1rem",
            }}
          >
            <div style={{ color: "#b91c1c", fontSize: "0.875rem" }}>{error}</div>
          </div>
        )}

        <form onSubmit={handleSignup} style={{ marginBottom: "1.5rem" }}>
          <div style={{ marginBottom: "1.5rem", color: "black" }}>
            <label
              htmlFor="name"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "0.375rem",
                border: "1px solid #d1d5db",
              }}
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: "1.5rem", color: "black" }}>
            <label
              htmlFor="email-address"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "0.375rem",
                border: "1px solid #d1d5db",
              }}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: "1.5rem", color: "black" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "0.375rem",
                border: "1px solid #d1d5db",
              }}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: "1.5rem", color: "black" }}>
            <label
              htmlFor="confirm-password"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              Confirm Password
            </label>
            <input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "0.375rem",
                border: "1px solid #d1d5db",
              }}
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
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <div>
          <div
            style={{
              position: "relative",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            <span
              style={{
                backgroundColor: "white",
                padding: "0 0.5rem",
                color: "#6b7280",
                fontSize: "0.875rem",
              }}
            >
              Or continue with
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.75rem",
              color: "black",
            }}
          >
            <button
              onClick={() => handleProviderSignIn("github")}
              style={{
                padding: "0.5rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.375rem",
                backgroundColor: "white",
                cursor: "pointer",
              }}
              aria-label="Sign in with GitHub"
            >
              {/* GitHub SVG Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="20"
                height="20"
                style={{ margin: "0 auto", display: "block" }}
              >
                <path d="M12 0C5.372 0 0 5.373 0 12a12.013 12.013 0 008.207 11.385c.6.11.793-.26.793-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.386-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.996.108-.775.418-1.305.762-1.605-2.665-.3-5.467-1.335-5.467-5.932 0-1.31.468-2.382 1.235-3.222-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 016 0c2.29-1.552 3.296-1.23 3.296-1.23.655 1.653.244 2.873.12 3.176.77.84 1.233 1.912 1.233 3.222 0 4.61-2.807 5.628-5.48 5.923.43.37.813 1.102.813 2.222 0 1.606-.015 2.9-.015 3.293 0 .32.19.694.8.576A12.015 12.015 0 0024 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </button>

            <button
              onClick={() => handleProviderSignIn("google")}
              style={{
                padding: "0.5rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.375rem",
                backgroundColor: "white",
                cursor: "pointer",
              }}
              aria-label="Sign in with Google"
            >
              {/* Google SVG Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 48 48"
                style={{ margin: "0 auto", display: "block" }}
              >
                <path
                  fill="#FFC107"
                  d="M43.6 20.5h-1.8v-.1H24v7.5h11.3c-1.1 3-3.8 5.2-7.3 5.2-4.4 0-7.9-3.7-7.9-8.2s3.5-8.2 7.9-8.2c2.3 0 4.4 1 5.8 2.7l4-3.9c-2.5-2.3-5.7-3.6-9.7-3.6-7.9 0-14.3 6.7-14.3 14.9s6.4 14.9 14.3 14.9c8.3 0 13.8-6 13.8-14.5 0-1-.1-1.7-.2-2.4z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.3 14.1l6.6 4.8c1.8-3.6 5.7-6.1 10.3-6.1 2.3 0 4.4 1 5.8 2.7l4-3.9c-2.5-2.3-5.7-3.6-9.7-3.6-5.4 0-10.1 3.3-12.9 8.1z"
                />
                <path
                  fill="#4CAF50"
                  d="M24 44c4.7 0 8.6-1.6 11.5-4.3l-5.3-4.3c-1.5 1-3.5 1.6-6.2 1.6-4.6 0-8.5-3.1-9.9-7.3l-6.7 5.2C9.7 39.7 16.3 44 24 44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.6 20.5h-1.8v-.1H24v7.5h11.3c-.8 2.1-2.6 3.7-4.9 4.3v3.6h7.8c4.3-3.9 6.8-9.8 6.8-16.9 0-1-.1-1.7-.2-2.4z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
