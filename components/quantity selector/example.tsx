"use client";

import QuantitySelector from "./index";

export default function QuantitySelectorExample() {
  const exaltedOrb = {
    name: "exaltedOrb",
    picture: "/data/img/exaltedOrb.webp",
  };

  const divineOrb = {
    name: "divineOrb",
    picture: "/data/img/divineOrb.webp",
  };

  const handleQuantityChange = (value: number) => {
    console.log("Quantity changed to:", value);
  };

  return (
    <div className="flex flex-col gap-4 p-8">
      <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
        Quantity Selector Examples
      </h2>

      <div className="flex flex-col gap-4">
        <div>
          <p className="mb-2 text-sm text-zinc-600 dark:text-zinc-400">
            Exalted Orb
          </p>
          <QuantitySelector
            currency={exaltedOrb}
            initialValue={0}
            onChange={handleQuantityChange}
          />
        </div>

        <div>
          <p className="mb-2 text-sm text-zinc-600 dark:text-zinc-400">
            Divine Orb (with initial value)
          </p>
          <QuantitySelector
            currency={divineOrb}
            initialValue={10}
            max={100}
            onChange={handleQuantityChange}
          />
        </div>
      </div>
    </div>
  );
}
