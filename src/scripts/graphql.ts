import * as https from "node:https";
import type { ExecutionResult } from "graphql";
import { print } from "graphql";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";

export function executeOperation<TResult, TVariables>(
  url: string,
  operation: TypedDocumentNode<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
): Promise<ExecutionResult<TResult>> {
  return new Promise((resolve, reject) => {
    const request = https.request(
      url,
      { method: "POST", headers: { "content-type": "application/json" } },
      (response) => {
        let data = "";
        response.on("data", (chunk) => {
          data += chunk;
        });
        response.on("end", () => {
          resolve(JSON.parse(data));
        });
        response.on("error", reject);
      }
    );
    request.write(
      JSON.stringify({
        query: print(operation),
        variables: variables == null ? undefined : variables,
      })
    );
    request.end();
  });
}

// rome-ignore lint/style/noNonNullAssertion: Always defined
export const GRAPHQL_URL = process.env.ME_API_GRAPHQL_URL!;
