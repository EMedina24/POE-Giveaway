"use client";

import { useState } from "react";
import Image from "next/image";

export interface Currency {
  name: string;
  picture: string;
}

export interface QuantitySelectorProps {
  currency: Currency;
  initialValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

export default function QuantitySelector({
  currency,
  initialValue = 0,
  min = 0,
  max = 999999,
  onChange,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialValue);

  const handleIncrement = () => {
    const newValue = Math.min(quantity + 1, max);
    setQuantity(newValue);
    onChange?.(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(quantity - 1, min);
    setQuantity(newValue);
    onChange?.(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow empty string for user to clear and type
    if (value === "") {
      setQuantity(0);
      onChange?.(0);
      return;
    }

    const numValue = parseInt(value, 10);

    if (!isNaN(numValue)) {
      const clampedValue = Math.max(min, Math.min(numValue, max));
      setQuantity(clampedValue);
      onChange?.(clampedValue);
    }
  };

  const handleBlur = () => {
    // Ensure value is within bounds when user leaves the input
    if (quantity < min) {
      setQuantity(min);
      onChange?.(min);
    } else if (quantity > max) {
      setQuantity(max);
      onChange?.(max);
    }
  };

  return (
    <div className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
      {/* Currency Image */}
      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded">
        <Image
          src={currency.picture}
          alt={currency.name}
          fill
          className="object-contain"
          sizes="48px"
        />
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        {/* Decrement Button */}
        <button
          onClick={handleDecrement}
          disabled={quantity <= min}
          className="flex h-8 w-8 items-center justify-center rounded border border-zinc-300 bg-zinc-50 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          aria-label="Decrease quantity"
        >
          <svg
            className="h-4 w-4 text-zinc-700 dark:text-zinc-300"
            fill="none"
            strokeWidth="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 12H5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Input Field */}
        <input
          type="text"
          inputMode="numeric"
          value={quantity}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className="h-8 w-20 rounded border border-zinc-300 bg-white px-2 text-center text-sm font-medium text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-zinc-500"
          aria-label="Quantity"
        />

        {/* Increment Button */}
        <button
          onClick={handleIncrement}
          disabled={quantity >= max}
          className="flex h-8 w-8 items-center justify-center rounded border border-zinc-300 bg-zinc-50 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          aria-label="Increase quantity"
        >
          <svg
            className="h-4 w-4 text-zinc-700 dark:text-zinc-300"
            fill="none"
            strokeWidth="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 5v14M5 12h14"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
