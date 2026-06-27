"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { CustomSelect } from "@/components/custom-select";

const TIERS = [
  { value: "", label: "All Types" },
  { value: "economy", label: "Economy (3-Star)" },
  { value: "standard", label: "Comfort (4-Star)" },
  { value: "premium", label: "Royale (5-Star)" },
];
const AUDIENCES = [
  { value: "", label: "Everyone" },
  { value: "group", label: "Group" },
  { value: "family", label: "Family" },
  { value: "couple", label: "Couple" },
];
const DURATIONS = [
  { value: "", label: "Any Duration" },
  { value: "7", label: "7 Days" },
  { value: "10", label: "10 Days" },
  { value: "14", label: "14 Days" },
  { value: "21", label: "21 Days" },
];

export function PackageFilters({ cities }: { cities: string[] }) {
  const router = useRouter();
  const params = useSearchParams();

  const update = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      router.push(`/packages?${next.toString()}`);
    },
    [params, router],
  );

  const get = (key: string) => params.get(key) ?? "";
  const hasFilters = Array.from(params.keys()).length > 0;

  const cityOptions = [
    { value: "", label: "All Cities" },
    ...cities.map((c) => ({ value: c, label: c })),
  ];

  return (
    <div className="rounded-2xl border border-outline-variant bg-white p-4 shadow-sm">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-6">
        <input
          type="search"
          placeholder="Search packages…"
          defaultValue={get("q")}
          onChange={(e) => update("q", e.target.value)}
          className="rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary lg:col-span-2"
        />

        <CustomSelect
          variant="standalone"
          value={get("city")}
          onChange={(v) => update("city", v)}
          options={cityOptions}
          placeholder="All Cities"
        />

        <CustomSelect
          variant="standalone"
          value={get("tier")}
          onChange={(v) => update("tier", v)}
          options={TIERS}
        />

        <CustomSelect
          variant="standalone"
          value={get("audience")}
          onChange={(v) => update("audience", v)}
          options={AUDIENCES}
        />

        <CustomSelect
          variant="standalone"
          value={get("duration")}
          onChange={(v) => update("duration", v)}
          options={DURATIONS}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <input
          type="number"
          placeholder="Min price"
          defaultValue={get("minPrice")}
          onChange={(e) => update("minPrice", e.target.value)}
          className="w-32 rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
        <span className="text-neutral">—</span>
        <input
          type="number"
          placeholder="Max price"
          defaultValue={get("maxPrice")}
          onChange={(e) => update("maxPrice", e.target.value)}
          className="w-32 rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
        {hasFilters && (
          <button
            type="button"
            onClick={() => router.push("/packages")}
            className="ml-auto text-sm font-semibold text-primary hover:underline"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}
