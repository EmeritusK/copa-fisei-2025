import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "5");
  const skip = (page - 1) * limit;
  const search = searchParams.get("search") || "";

  const whereClause: any = search
    ? {
        OR: [
          { homeTeam: { name: { contains: search, mode: "insensitive" } } },
          { awayTeam: { name: { contains: search, mode: "insensitive" } } },
        ],
      }
    : {};

  try {
    const matches = await prisma.match.findMany({
      skip,
      take: limit,
      where: whereClause,
      include: {
        homeTeam: { include: { players: true } },
        awayTeam: { include: { players: true } },
      },
      orderBy: {
        date: "asc",
      },
    });

    const total = await prisma.match.count({ where: whereClause });

    return NextResponse.json({
      data: matches,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching matches:", error);
    return NextResponse.json({ error: "Failed to fetch matches" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status, details } = body;

    if (!id) {
      return NextResponse.json({ error: "Match ID is required" }, { status: 400 });
    }

    const updateData: any = {};
    if (details !== undefined) {
      updateData.details = details;
      if (details.homeTeam?.goals) {
        updateData.home_team_goals = details.homeTeam.goals.length;
      }
      if (details.awayTeam?.goals) {
        updateData.away_team_goals = details.awayTeam.goals.length;
      }
    }
    if (status !== undefined) updateData.status = status;

    const updatedMatch = await prisma.match.update({
      where: { id },
      data: updateData,
      include: {
        homeTeam: { include: { players: true } },
        awayTeam: { include: { players: true } },
      }
    });

    return NextResponse.json({ data: updatedMatch });
  } catch (error) {
    console.error("Error updating match:", error);
    return NextResponse.json({ error: "Failed to update match" }, { status: 500 });
  }
}
