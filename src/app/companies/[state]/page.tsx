import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { STATE_BY_CODE, STATES } from "@/lib/companies";
import CompaniesBrowser from "./CompaniesBrowser";

export function generateStaticParams() {
  return STATES.map((s) => ({ state: s.code }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const info = STATE_BY_CODE[state.toUpperCase()];
  if (!info) return { title: "Company Directory | Lab Leads Pro" };
  return {
    title: `${info.name} Biotech & Pharma Companies | Lab Leads Pro`,
    description: `Browse ${info.count.toLocaleString()} active life-science companies in ${info.name}. Filter by company type and size. Built for equipment sales reps.`,
  };
}

export default async function StateCompaniesPage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const code = state.toUpperCase();
  const info = STATE_BY_CODE[code];
  if (!info) notFound();

  return (
    <>
      <Header />
      <CompaniesBrowser stateCode={code} stateName={info.name} seedCount={info.count} />
      <Footer />
    </>
  );
}
