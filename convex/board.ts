import { v } from "convex/values";
import { mutation } from "./_generated/server";

const images = [
  "/placeholders/1.svg",
  "/placeholders/2.svg",
  "/placeholders/3.svg",
  "/placeholders/4.svg",
  "/placeholders/5.svg",
  "/placeholders/6.svg",
  "/placeholders/7.svg",
  "/placeholders/8.svg",
  "/placeholders/9.svg",
  "/placeholders/10.svg",
];

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Sem autorização");
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];

    const board = await ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUrl: randomImage,
    });

    return board;
  },
});

export const remove = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Não autorizado!");
    }

    // TODO: Later check to delete favorite relation as well

    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: { id: v.id("boards"), title: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    const title = args.title.trim();
    if (!title) {
      throw new Error("Título é obrigatório");
    }

    if (title.length > 60) {
      throw new Error("Título não pode haver mais do que 60 caracteres");
    }

    if (!identity) {
      throw new Error("Não autorizado!");
    }

    // TODO: Later check to delete favorite relation as well

    const board = await ctx.db.patch(args.id, {
      title: args.title,
    });

    return board;
  },
});

export const favorite = mutation({
  args: { id: v.id("boards"), orgId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Sem autorização");
    }

    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error("Quadro não encontrado");
    }

    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board_org", (q) =>
        q.eq("userId", userId).eq("boardId", board._id).eq("orgId", args.orgId)
      )
      .unique();

    if (existingFavorite) {
      throw new Error("Quadro já favoritado antes");
    }

    await ctx.db.insert("userFavorites", {
      userId,
      boardId: board._id,
      orgId: args.orgId,
    });

    return board;
  },
});

export const unfavorite = mutation({
  args: { id: v.id("boards"), orgId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Sem autorização");
    }

    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error("Quadro não encontrado");
    }

    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex(
        "by_user_board",
        (q) => q.eq("userId", userId).eq("boardId", board._id)
        // TODO: check if orgId needed
      )
      .unique();

    if (!existingFavorite) {
      throw new Error("Quadro favorito não encontrado");
    }

    await ctx.db.delete(existingFavorite._id);

    return board;
  },
});
