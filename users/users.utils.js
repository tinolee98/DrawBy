import jwt from "jsonwebtoken";
import client from "../client";
import * as bcrypt from "bcrypt";

export const getUser = async (authorization) => {
  if (!authorization) {
    return null;
  }
  const { id } = await jwt.verify(authorization, process.env.SECRET_KEY);
  const user = await client.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) {
    return null;
  }
  return user;
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
