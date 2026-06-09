/** @type {import('@rtk-query/codegen-openapi').ConfigFile} */
const config = {
  schemaFile: './swagger-cache.json',
  apiFile: '../frontend/src/store/api.ts',
  apiImport: 'baseApi',
  outputFile: '../frontend/src/store/generatedApi.ts',
  exportName: 'generatedApi',
  hooks: true,
};

module.exports = config;
