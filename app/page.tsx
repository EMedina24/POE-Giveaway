"use client";

import QuantitySelector from "@/components/quantity selector";
import currencyData from "@/data/currency.json";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col gap-8 py-16 px-8 bg-white dark:bg-black">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            POE Currency Selector
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Select quantities for each currency type
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {currencyData.currency.map((currency) => (
            <QuantitySelector
              key={currency.name}
              currency={currency}
              initialValue={0}
              onChange={(value) =>
                console.log(`${currency.name}: ${value}`)
              }
            />
          ))}
        </div>
      </main>
    </div>
  );
}
