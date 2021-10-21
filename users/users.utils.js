import jwt from "jsonwebtoken";
import client from "../client";
import * as bcrypt from "bcrypt";

export const getUser = async (authorization) => {
  if (!authorization) {
    return null;
  }
  let userId = null;
  try {
    const { id } = jwt.verify(authorization, process.env.SECRET_KEY);
    userId = id;
    const user = await client.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export function protectedResolver(ourResolver) {
  return function (root, args, context, info) {
    if (!context.loggedInUser) {
      const query = info.operation.operation === "query";
      if (query) {
        return null;
      } else {
        return {
          ok: false,
          error: "Please log in to perform this action.",
        };
      }
    }
    return ourResolver(root, args, context, info);
  };
}

//export const convertPassword = async (password) => {
//  return await bcrypt.c
//}
