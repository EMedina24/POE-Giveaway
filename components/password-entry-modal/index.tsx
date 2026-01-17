"use client";

import { useState } from "react";

interface PasswordEntryModalProps {
  giveawaySlug: string;
  onVerify: (password: string) => void;
  onClose: () => void;
  error?: string;
}

export default function PasswordEntryModal({ giveawaySlug, onVerify, onClose, error: externalError }: PasswordEntryModalProps) {
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!password.trim()) {
      setLocalError("Please enter a password");
      return;
    }

    onVerify(password.trim());
  };

  const displayError = externalError || localError;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-lg border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          aria-label="Close"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Enter Giveaway Password
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Enter the password for this giveaway to manage it.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
            >
              Password
            </label>
            <input
              id="password"
              type="text"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setLocalError("");
              }}
              placeholder="Enter your giveaway password"
              className="rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-600"
              autoFocus
            />
          </div>

          {displayError && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900/20">
              <p className="text-sm text-red-600 dark:text-red-400">{displayError}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-zinc-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Verify Password
          </button>
        </form>

        {/* Info */}
        <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-900/20">
          <p className="text-xs text-blue-800 dark:text-blue-400">
            This is the password that was displayed when you created the giveaway. If you saved it in your browser, it will be automatically loaded.
          </p>
        </div>
      </div>
    </div>
  );
}
