"use client";

import { useState } from "react";

interface PasswordModalProps {
  password: string;
  giveawaySlug: string;
  onClose: () => void;
}

export default function PasswordModal({ password, giveawaySlug, onClose }: PasswordModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-lg border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Giveaway Created Successfully!
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Your giveaway password has been generated. Save it securely - you'll need it to manage your giveaway.
          </p>
        </div>

        {/* Password Display */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Your Giveaway Password
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-3 font-mono text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100">
              {password}
            </div>
            <button
              type="button"
              onClick={handleCopyPassword}
              className="flex-shrink-0 rounded-lg bg-zinc-900 px-4 py-3 font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {/* Warning */}
        <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
          <p className="text-sm font-medium text-yellow-800 dark:text-yellow-400">
            ⚠️ Important: This password is stored in your browser cookies. If you clear your cookies or use a different device, you'll need this password to manage your giveaway.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg bg-zinc-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Go to Giveaway Page
          </button>
          <p className="text-center text-xs text-zinc-500 dark:text-zinc-500">
            You'll be redirected to /giveaway/{giveawaySlug}
          </p>
        </div>
      </div>
    </div>
  );
}
