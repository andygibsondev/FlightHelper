import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wind Triangle Calculator - FlightNav",
  description: "Calculate aircraft heading, drift angle, and ground speed based on wind conditions, true airspeed, and desired track using professional wind triangle calculations",
};

export default function CalculatorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
