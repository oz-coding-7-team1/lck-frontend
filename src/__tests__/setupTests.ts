import { server } from "./server";
import nodeFetch from "node-fetch";

// Setup for fetch and Response globals with proper type assertions
global.fetch = nodeFetch as unknown as typeof global.fetch;
global.Response = nodeFetch.Response as unknown as typeof global.Response;
global.Request = nodeFetch.Request as unknown as typeof global.Request;
global.Headers = nodeFetch.Headers as unknown as typeof global.Headers;

// Start server
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
