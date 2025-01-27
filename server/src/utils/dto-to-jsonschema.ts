import { OpenAPIV3 } from "openapi-types";
import { ZodSchema } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export function dtoToJsonSchema(dto: ZodSchema<any>) {
  return zodToJsonSchema(dto, { name: "dto", target: "openApi3" })
    ?.definitions?.["dto"] as OpenAPIV3.SchemaObject;
}
