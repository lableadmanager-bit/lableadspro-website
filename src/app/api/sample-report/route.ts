import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const VALID_STATES = new Set([
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY","DC","PR",
]);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const state = (searchParams.get("state") || "NC").toUpperCase();

  if (!VALID_STATES.has(state)) {
    return NextResponse.json({ error: `Invalid state code: ${state}` }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), "public", "samples", `${state.toLowerCase()}.html`);

  if (!fs.existsSync(filePath)) {
    return new NextResponse(
      `<html><body style="font-family:sans-serif;text-align:center;padding:80px;">
        <h1>Sample Report</h1>
        <p>No sample data available for this state. Try a different one!</p>
        <p><a href="https://lableadspro.com">← Back to Lab Leads Pro</a></p>
      </body></html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }

  const html = fs.readFileSync(filePath, "utf-8");
  return new NextResponse(html, {
    headers: { "Content-Type": "text/html" },
  });
}
