const posts = [
    {
      title: 'Lorem Ipsum',
      slug: 'lorem-ipsum',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
    },
  ];

  import { NextResponse } from "next/server";
  import { getServerSession } from "next-auth";

  export async function GET() {

    const session = await getServerSession() // server-side authentication
    return NextResponse.json(posts)
  }