import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { supabaseAdmin } from "@/lib/supabase-admin";

function getAuthClient(req: NextRequest) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll() {},
      },
    }
  );
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabaseAuth = getAuthClient(req);
    const { data: { user } } = await supabaseAuth.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { id } = await params;
    const format = req.nextUrl.searchParams.get("format");

    if (format !== "html" && format !== "excel") {
      return NextResponse.json({ error: "Invalid format. Use ?format=html or ?format=excel" }, { status: 400 });
    }

    if (format === "html") {
      const { data, error } = await supabaseAdmin
        .from("report_history")
        .select("id, user_id, report_html")
        .eq("id", id)
        .single();

      if (error || !data) {
        return NextResponse.json({ error: "Report not found" }, { status: 404 });
      }
      if (data.user_id !== user.id) {
        return NextResponse.json({ error: "Not authorized" }, { status: 403 });
      }

      return new NextResponse(data.report_html || "", {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    // Excel download
    const { data, error } = await supabaseAdmin
      .from("report_history")
      .select("id, user_id, excel_data, excel_filename")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }
    if (data.user_id !== user.id) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }
    if (!data.excel_data) {
      return NextResponse.json({ error: "Excel file not available" }, { status: 404 });
    }

    const buffer = Buffer.from(data.excel_data, "base64");
    const filename = data.excel_filename || "report.xlsx";

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    console.error("Report detail API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
