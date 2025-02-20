"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [currency, setCurrency] = useState<string>("USD");
  const [amount, setAmount] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [targetYear, setTargetYear] = useState<string>("2024");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !year || !targetYear) return;
    router.push(`/${currency}/${amount}/${year}-to-${targetYear}`);
  };

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold">Inflation Comparison Tool</h1>
      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <select
          className="border p-2"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="INR">INR</option>
        </select>
        <input
          type="number"
          placeholder="Amount"
          className="border p-2"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="number"
          placeholder="Start Year"
          className="border p-2"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <input
          type="number"
          placeholder="Target Year"
          className="border p-2"
          value={targetYear}
          onChange={(e) => setTargetYear(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Compare
        </button>
      </form>
    </div>
  );
}
