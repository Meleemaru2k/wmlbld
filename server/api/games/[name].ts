import fs from "fs";

export default defineEventHandler((event) => {
  const foldername = event.context.params.name;
  return {
    api: "works",
  };
});
