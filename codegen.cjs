require("dotenv/config");

const config = {
  schema: process.env.ME_API_GRAPHQL_URL,
  documents: ["src/**/*.ts", "src/**/*.tsx"],
  emitLegacyCommonJSImports: false,
  generates: {
    "./generated/gql/": {
      preset: "client-preset",
      config: {
        useTypeImports: true,
      },
    },
  },
};

module.exports = config;
