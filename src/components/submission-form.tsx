"use client";

import { useState, type FormEvent } from "react";
import type { SolarPostFormData, SolarPostWithCalculations } from "@/lib/types";
import { calculateTotalCapacity, calculateSpecificYield } from "@/lib/mock-data";

function getTodayString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getMaxDate(): string {
  return getTodayString();
}

const emptyForm: SolarPostFormData = {
  dailyProduction: 0,
  place: "",
  postDate: getTodayString(),
  panelWattage: 0,
  panelCount: 0,
};

interface SubmissionFormProps {
  onPostCreated: (post: SolarPostWithCalculations) => void;
}

export default function SubmissionForm({ onPostCreated }: SubmissionFormProps) {
  const [form, setForm] = useState<SolarPostFormData>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof SolarPostFormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): boolean {
    const newErrors: Partial<Record<keyof SolarPostFormData, string>> = {};

    if (!form.dailyProduction || form.dailyProduction <= 0) {
      newErrors.dailyProduction = "Must be greater than 0";
    }
    if (!form.place.trim()) {
      newErrors.place = "Location is required";
    } else if (form.place.length > 100) {
      newErrors.place = "Max 100 characters";
    }
    if (!form.postDate) {
      newErrors.postDate = "Date is required";
    } else if (form.postDate > getTodayString()) {
      newErrors.postDate = "Cannot be a future date";
    }
    if (!form.panelWattage || form.panelWattage < 1) {
      newErrors.panelWattage = "Must be at least 1 watt";
    }
    if (!form.panelCount || form.panelCount < 1) {
      newErrors.panelCount = "Must be at least 1 panel";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const created = await res.json();
    onPostCreated(created);
    setForm(emptyForm);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  const totalKwp = calculateTotalCapacity(
    form.panelWattage || 0,
    form.panelCount || 0
  );
  const specYield =
    form.dailyProduction && totalKwp
      ? calculateSpecificYield(form.dailyProduction, totalKwp)
      : null;

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-amber-200 bg-white p-6 shadow-sm dark:border-amber-800 dark:bg-zinc-900"
    >
      <h2 className="mb-4 text-lg font-semibold text-amber-900 dark:text-amber-100">
        Submit Your Solar Data
      </h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="dailyProduction"
            className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Daily Production (kWh)
          </label>
          <input
            id="dailyProduction"
            type="number"
            step="any"
            min="0"
            placeholder="e.g. 32.5"
            value={form.dailyProduction || ""}
            onChange={(e) =>
              setForm({ ...form, dailyProduction: parseFloat(e.target.value) || 0 })
            }
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          />
          {errors.dailyProduction && (
            <p className="mt-1 text-xs text-red-500">{errors.dailyProduction}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="place"
            className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Place / Location
          </label>
          <input
            id="place"
            type="text"
            maxLength={100}
            placeholder='e.g. "Kerala, India"'
            value={form.place}
            onChange={(e) => setForm({ ...form, place: e.target.value })}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          />
          {errors.place && (
            <p className="mt-1 text-xs text-red-500">{errors.place}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="postDate"
            className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Date
          </label>
          <input
            id="postDate"
            type="date"
            max={getMaxDate()}
            value={form.postDate}
            onChange={(e) => setForm({ ...form, postDate: e.target.value })}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          />
          {errors.postDate && (
            <p className="mt-1 text-xs text-red-500">{errors.postDate}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="panelWattage"
              className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Panel Wattage (W)
            </label>
            <input
              id="panelWattage"
              type="number"
              min="1"
              placeholder="e.g. 450"
              value={form.panelWattage || ""}
              onChange={(e) =>
                setForm({ ...form, panelWattage: parseInt(e.target.value) || 0 })
              }
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
            />
            {errors.panelWattage && (
              <p className="mt-1 text-xs text-red-500">{errors.panelWattage}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="panelCount"
              className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Panel Count
            </label>
            <input
              id="panelCount"
              type="number"
              min="1"
              placeholder="e.g. 12"
              value={form.panelCount || ""}
              onChange={(e) =>
                setForm({ ...form, panelCount: parseInt(e.target.value) || 0 })
              }
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
            />
            {errors.panelCount && (
              <p className="mt-1 text-xs text-red-500">{errors.panelCount}</p>
            )}
          </div>
        </div>

        {totalKwp > 0 && (
          <div className="rounded-lg bg-amber-50 p-3 text-sm dark:bg-amber-950/30">
            <p className="text-amber-800 dark:text-amber-200">
              Total Capacity:{" "}
              <span className="font-semibold">{totalKwp.toFixed(2)} kWp</span>
            </p>
            {specYield !== null && specYield > 0 && (
              <p className="text-amber-700 dark:text-amber-300">
                Specific Yield:{" "}
                <span className="font-semibold">{specYield.toFixed(2)} kWh/kWp</span>
              </p>
            )}
          </div>
        )}

        {/* Honeypot field for spam mitigation */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
        >
          Share My Solar Data
        </button>

        {submitted && (
          <p className="text-center text-sm text-emerald-600 dark:text-emerald-400">
            Post submitted successfully!
          </p>
        )}
      </div>
    </form>
  );
}
