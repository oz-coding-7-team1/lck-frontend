import "node-fetch";

declare global {
  let fetch: typeof fetch;
  let Request: typeof Request;
  let Response: typeof Response;
  let Headers: typeof Headers;
}

export {};
