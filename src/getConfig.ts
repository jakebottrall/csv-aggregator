import fs from "fs";
import { z } from "zod";

const Config = z.object({
  sourceDirectory: z.string(),
  includeHeaders: z.boolean(),
  columns: z
    .object({
      name: z.string(),
      type: z.enum(["string", "date", "number", "static"]),
      format: z.string().optional(),
    })
    .array(),
  sourceOptions: z
    .object({
      name: z.string(),
      startingRowIndex: z.number(),
      columns: z
        .object({
          destinationName: z.string(),
          columnIndex: z.number().optional(),
          format: z.string().optional(),
          value: z.string().optional(),
        })
        .array(),
    })
    .array(),
});

export type Config = z.infer<typeof Config>;

export function getConfig() {
  const configFile = fs.readFileSync("config.json").toString();
  const configObj = JSON.parse(configFile);
  return Config.parse(configObj);
}
