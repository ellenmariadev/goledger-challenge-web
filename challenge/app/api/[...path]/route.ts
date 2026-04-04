import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.API_BASE_URL!;

function getAuthorizationHeader() {
  const credentials = `${process.env.API_USERNAME}:${process.env.API_PASSWORD}`;
  return `Basic ${Buffer.from(credentials).toString("base64")}`;
}

async function handler(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const endpoint = path.join("/");
  const body = request.method !== "GET" ? await request.text() : undefined;

  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: request.method,
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthorizationHeader(),
    },
    body,
  });

  if (response.status === 204) {
    return new NextResponse(null, { status: 204 });
  }

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}

export { handler as GET, handler as POST, handler as PUT, handler as PATCH, handler as DELETE };