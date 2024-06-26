import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
  secret:
    "sk_dev_H0q-t3lkyE7kFYp_pDTNYRbfi4kis7-mQ6qiCb1X24Wt_tQvHKDwjJLYy9OuIOHM",
});

export async function POST(request: Request) {
  // Get the current user from your database
  const authorization = await auth();
  const user = await currentUser();

  // console.log("Auth_Info", {
  //   authorization,
  //   user,
  // });

  if (!authorization || !user) {
    return new Response("Unauthorized", { status: 403 });
  }

  const room = await request.json();

  const board = await convex.query(api.board.get, { id: room.room });

  // console.log("ROOM ID", board);

  // console.log("INFOS2", {
  //   room: room.room,
  //   board,
  //   boardOrgId: board?.orgId,
  //   userOrgId: authorization.orgId,
  // });

  if (board?.orgId !== authorization.orgId) {
    return new Response("Unauthorized", { status: 403 });
  }

  const userInfo = {
    name: user.firstName,
    picture: user.imageUrl,
  };

  // console.log("USERINFO", {
  //   userInfo,
  // });

  // Start an auth session inside your endpoint
  const session = liveblocks.prepareSession(
    user.id,
    {
      userInfo: {
        name: user.firstName ?? "Anônimo",
        picture: user.imageUrl || "",
      },
    } // Optional
  );

  if (room.room) {
    session.allow(room.room, session.FULL_ACCESS);
  }

  // Authorize the user and return the result
  const { status, body } = await session.authorize();
  // console.log("STATUS_BODY", {
  //   status,
  //   body,
  // });
  return new Response(body, { status });

  // // Use a naming pattern to allow access to rooms with wildcards
  // // Giving the user read access on their org, and write access on their group
  // session.allow(`${user.organization}:*`, session.READ_ACCESS);
  // session.allow(`${user.organization}:${user.group}:*`, session.FULL_ACCESS);
}
