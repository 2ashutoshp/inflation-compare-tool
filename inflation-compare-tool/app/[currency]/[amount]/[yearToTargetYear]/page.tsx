"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { InflationResponse } from "../../../../types";

export default function ResultPage() {
  const params = useParams();

  // Extract parameters and split year-to-targetYear
  const currency = params.currency as string;
  const amount = params.amount as string;
  const yearToTargetYear = params.yearToTargetYear as string;

  // Split the string into year and targetYear
  const [year, targetYear] = yearToTargetYear.split("-to-");

  const [data, setData] = useState<InflationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (currency && amount && year && targetYear) {
        try {
          const res = await fetch(
            `/api/inflation?currency=${currency}&amount=${amount}&year=${year}&targetYear=${targetYear}`
          );

          if (!res.ok) throw new Error(`API Error: ${res.status}`);

          const result = await res.json();
          setData(result);
        } catch (err) {
          console.error("API Fetch Error:", err);
          setError("Failed to fetch data. Please try again.");
        }
      }
    }

    fetchData();
  }, [currency, amount, year, targetYear]);

  if (error) return <p>{error}</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold">Inflation Result</h1>
      <p className="mt-4">
        {data.originalAmount} {data.currency} from {year} is worth approximately{" "}
        <strong>
          {data.adjustedValue} {data.currency}
        </strong>{" "}
        in {targetYear}.
      </p>
      <p className="mt-2">
        Exchange Rate in {year}: {data.rateStart} | In {targetYear}:{" "}
        {data.rateTarget}
      </p>
    </div>
  );
}
