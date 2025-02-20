import { NextResponse } from "next/server";
import { InflationResponse } from "../../../types";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const currency = searchParams.get("currency");
  const amount = searchParams.get("amount");
  const year = searchParams.get("year");
  const targetYear = searchParams.get("targetYear");

  if (!currency || !amount || !year || !targetYear) {
    return NextResponse.json(
      { error: "Missing required parameters." },
      { status: 400 }
    );
  }

  try {
    const startExchange = await fetch(`https://api.frankfurter.app/${year}`);
    const targetExchange = await fetch(
      `https://api.frankfurter.app/${targetYear}`
    );

    const startData = await startExchange.json();
    const targetData = await targetExchange.json();

    const rateStart = startData.rates[currency] || 1;
    const rateTarget = targetData.rates[currency] || 1;

    const inflationFactor = rateTarget / rateStart;
    const adjustedValue = (parseFloat(amount) * inflationFactor).toFixed(2);

    const response: InflationResponse = {
      originalAmount: parseFloat(amount),
      adjustedValue,
      currency,
      rateStart,
      rateTarget,
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data from API." },
      { status: 500 }
    );
  }
}
