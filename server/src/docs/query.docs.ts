import { oapi } from "../config/docs.config";

const description = `
Available operators include

\`eq\` 
\`gt\`
\`lt\`
\`gte\`
\`lte\`
\`in\`
\`between\`
\`like\`
\`exists\`
\`ne\`
\`nin\`
\`not between\`
\`not like\`
`;

export const FilterQueryDocs = oapi.component("parameters", "FilterQueryDto", {
  name: "filter",
  in: "query",
  schema: { type: "string" },
  description,
  example: '[["name", "like", "%villa%"]]'
});

export const OrFilterQueryDocs = oapi.component(
  "parameters",
  "OrFilterQueryDto",
  {
    name: "or_filter",
    in: "query",
    schema: { type: "string" },
    description,
    example: '[["name", "like", "%villa%"]]'
  }
);

export const ShiftQueryDocs = oapi.component("parameters", "ShiftQueryDto", {
  name: "shift",
  in: "query",
  schema: { type: "boolean" },
  description: `Shift decides if the \`filter\` and \`or_filter\` conditions are join by \`or\` or \`and\`

Example
filter_condition and or_filter_condition
filter_condition or or_filter_condition
`
});

export const BasicQueriesDocs = [
  { $ref: "#/components/parameters/FilterQueryDto" },
  { $ref: "#/components/parameters/OrFilterQueryDto" },
  { $ref: "#/components/parameters/ShiftQueryDto" }
];
