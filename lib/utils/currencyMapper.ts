// Helper functions to convert between currency names and database column names

export type CurrencyName =
  | "divineOrb"
  | "exaltedOrb"
  | "chaosOrb"
  | "mirrorOfKalandra"
  | "orbOfAlchemy"
  | "orbOfAugmentation"
  | "orbOfChance"
  | "orbOfTransmutation"
  | "regalOrb"
  | "vaalOrb"
  | "annulmentOrb";

export type CurrencyColumnName =
  | "divine_orb"
  | "exalted_orb"
  | "chaos_orb"
  | "mirror_of_kalandra"
  | "orb_of_alchemy"
  | "orb_of_augmentation"
  | "orb_of_chance"
  | "orb_of_transmutation"
  | "regal_orb"
  | "vaal_orb"
  | "annulment_orb";

// Map currency display names to database column names
export const currencyToColumnMap: Record<CurrencyName, CurrencyColumnName> = {
  divineOrb: "divine_orb",
  exaltedOrb: "exalted_orb",
  chaosOrb: "chaos_orb",
  mirrorOfKalandra: "mirror_of_kalandra",
  orbOfAlchemy: "orb_of_alchemy",
  orbOfAugmentation: "orb_of_augmentation",
  orbOfChance: "orb_of_chance",
  orbOfTransmutation: "orb_of_transmutation",
  regalOrb: "regal_orb",
  vaalOrb: "vaal_orb",
  annulmentOrb: "annulment_orb",
};

// Map database column names to currency display names
export const columnToCurrencyMap: Record<CurrencyColumnName, CurrencyName> = {
  divine_orb: "divineOrb",
  exalted_orb: "exaltedOrb",
  chaos_orb: "chaosOrb",
  mirror_of_kalandra: "mirrorOfKalandra",
  orb_of_alchemy: "orbOfAlchemy",
  orb_of_augmentation: "orbOfAugmentation",
  orb_of_chance: "orbOfChance",
  orb_of_transmutation: "orbOfTransmutation",
  regal_orb: "regalOrb",
  vaal_orb: "vaalOrb",
  annulment_orb: "annulmentOrb",
};

// Convert currency name to database column name
export function toColumnName(currencyName: CurrencyName): CurrencyColumnName {
  return currencyToColumnMap[currencyName];
}

// Convert database column name to currency name
export function toCurrencyName(columnName: CurrencyColumnName): CurrencyName {
  return columnToCurrencyMap[columnName];
}
