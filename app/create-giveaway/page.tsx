"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import currencyData from "@/data/currency.json";
import { useGiveaway } from "@/lib/hooks/useGiveaway";
import QuantitySelector from "@/components/quantity selector";
import { currencyToColumnMap, type CurrencyName } from "@/lib/utils/currencyMapper";
import { generateRandomPassword } from "@/lib/utils/passwordGenerator";
import { setGiveawayPassword } from "@/lib/utils/cookies";
import PasswordModal from "@/components/password-modal";

export default function CreateGiveaway() {
  const [poeName, setPoeName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requireReddit, setRequireReddit] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [createdGiveawaySlug, setCreatedGiveawaySlug] = useState("");

  // Track quantities for each currency
  const [currencyQuantities, setCurrencyQuantities] = useState<Record<string, number>>({});

  const { createGiveaway, loading, error } = useGiveaway();
  const router = useRouter();

  const handleCurrencyChange = (currencyName: string, value: number) => {
    setCurrencyQuantities((prev) => ({
      ...prev,
      [currencyName]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if at least one currency has a quantity > 0
    const hasAnyCurrency = Object.values(currencyQuantities).some((qty) => qty > 0);

    if (!poeName || !title || !hasAnyCurrency) {
      alert("Please fill in all required fields and select at least one currency");
      return;
    }

    // Generate a random password
    const password = generateRandomPassword(16);

    // Build the giveaway data with currency quantities
    const giveawayData: any = {
      creator_name: poeName,
      title: title,
      description: description || null,
      creator_password: password,
      allow_strict: requireReddit,
      status: "active" as const,
    };

    // Add currency quantities to the data
    currencyData.currency.forEach((currency) => {
      const columnName = currencyToColumnMap[currency.name as CurrencyName];
      giveawayData[columnName] = currencyQuantities[currency.name] || 0;
    });

    const giveaway = await createGiveaway(giveawayData);

    if (giveaway) {
      // Save password to cookie
      setGiveawayPassword(giveaway.slug, password);

      // Set state for modal
      setGeneratedPassword(password);
      setCreatedGiveawaySlug(giveaway.slug);
      setShowPasswordModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowPasswordModal(false);
    // Redirect to the giveaway page
    router.push(`/giveaway/${createdGiveawaySlug}`);
  };

  // Calculate total currencies selected
  const totalCurrenciesSelected = Object.values(currencyQuantities).filter(
    (qty) => qty > 0
  ).length;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col gap-8 py-16 px-8 bg-white dark:bg-black">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Create a Giveaway
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Set up your giveaway with one or more currencies
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
          className="flex flex-col gap-6"
        >
          {/* POE Name Input */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="poe-name"
              className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
            >
              POE Name <span className="text-red-500">*</span>
            </label>
            <input
              id="poe-name"
              type="text"
              value={poeName}
              onChange={(e) => setPoeName(e.target.value)}
              placeholder="Enter your POE character name"
              className="rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600"
            />
          </div>

          {/* Title Input */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="title"
              className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
            >
              Giveaway Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Big Currency Giveaway"
              className="rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600"
            />
          </div>

          {/* Description Input */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
            >
              Description (Optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details about your giveaway"
              rows={3}
              className="rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600"
            />
          </div>

          {/* Require Reddit Toggle */}
          <div className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <label
                  htmlFor="require-reddit"
                  className="text-sm font-medium text-zinc-900 dark:text-zinc-100 cursor-pointer"
                >
                  Require Reddit Username & Profile Link
                </label>
                <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                  When enabled, participants must provide their Reddit username and link to their Reddit profile to join this giveaway. This helps verify participant identity and reduce duplicate entries.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={requireReddit}
                onClick={() => setRequireReddit(!requireReddit)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 ${
                  requireReddit ? "bg-zinc-900 dark:bg-zinc-100" : "bg-zinc-300 dark:bg-zinc-700"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    requireReddit ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Currency Quantities */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Select Currencies and Quantities <span className="text-red-500">*</span>
              </label>
              {totalCurrenciesSelected > 0 && (
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  {totalCurrenciesSelected} {totalCurrenciesSelected === 1 ? "currency" : "currencies"} selected
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {currencyData.currency.map((currency) => (
                <QuantitySelector
                  key={currency.name}
                  currency={currency}
                  initialValue={currencyQuantities[currency.name] || 0}
                  onChange={(value) => handleCurrencyChange(currency.name, value)}
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !poeName || !title || totalCurrenciesSelected === 0}
            className="mt-4 rounded-lg bg-zinc-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            {loading ? "Creating Giveaway..." : "Create Giveaway"}
          </button>

          {/* Error Message */}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Selected Summary */}
          {poeName && title && totalCurrenciesSelected > 0 && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Giveaway Summary
              </h3>
              <div className="flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <p>
                  <span className="font-medium">POE Name:</span> {poeName}
                </p>
                <p>
                  <span className="font-medium">Title:</span> {title}
                </p>
                {description && (
                  <p>
                    <span className="font-medium">Description:</span> {description}
                  </p>
                )}
                <div className="mt-2">
                  <span className="font-medium">Currencies:</span>
                  <ul className="ml-4 mt-1 list-disc">
                    {Object.entries(currencyQuantities)
                      .filter(([_, qty]) => qty > 0)
                      .map(([name, qty]) => (
                        <li key={name}>
                          {qty}x {name}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </form>
      </main>

      {/* Password Modal */}
      {showPasswordModal && (
        <PasswordModal
          password={generatedPassword}
          giveawaySlug={createdGiveawaySlug}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
