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

const getConfig = async () => {
  const configPath = `${import.meta.dir.replace("src", "")}/config.json`;
  const configFile = Bun.file(configPath);
  const configJSON = await configFile.text();
  const configObj = JSON.parse(configJSON);

  return Config.parse(configObj);
};

export default getConfig;
