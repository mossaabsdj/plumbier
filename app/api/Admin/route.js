import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  // Get the first admin (or null if none)
  const admin = await prisma.admin.findFirst();
  if (!admin) {
    return NextResponse.json({ user: "", password: "" });
  }
  return NextResponse.json({ user: admin.User, password: admin.Password });
}

export async function POST(req) {
  // Create a new admin (if not exists)
  const { user, password } = await req.json();
  // Only allow one admin (for demo)
  const existing = await prisma.admin.findFirst();
  if (existing) {
    return NextResponse.json(
      { error: "Admin already exists. Use PUT to update." },
      { status: 400 }
    );
  }
  const admin = await prisma.admin.create({
    data: { User: user, Password: password },
  });
  return NextResponse.json({ user: admin.User, password: admin.Password });
}

export async function PUT(req) {
  // Update the first admin
  const { user, password } = await req.json();
  const existing = await prisma.admin.findFirst();
  if (!existing) {
    return NextResponse.json(
      { error: "No admin found. Use POST to create." },
      { status: 404 }
    );
  }
  const admin = await prisma.admin.update({
    where: { id: existing.id },
    data: { User: user, Password: password },
  });
  return NextResponse.json({ user: admin.User, password: admin.Password });
}