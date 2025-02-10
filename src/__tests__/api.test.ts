import { setupServer } from "msw/node";
import { handlers } from "./handlers";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../app/page";

const server = setupServer(...handlers);
const baseUrl = "http://localhost";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("fetches player information", async () => {
  const response = await fetch(`${baseUrl}/api/players`);
  
  if (!response.ok) {
    console.error('Response status:', response.status);
    console.error('Response status text:', response.statusText);
  }
  
  expect(response.ok).toBe(true);
  const data = await response.json();
  console.log('Player response:', data);
  
  expect(Array.isArray(data.players)).toBe(true);
  expect(data.players).toHaveLength(4);
  expect(data.players[0].name).toBe("FAKER");
  expect(data.players[1].name).toBe("CHOVY");
  expect(data.players[2].name).toBe("GUMAYUSI");
  expect(data.players[3].name).toBe("KERIA");
});

test("fetches team information", async () => {
  const response = await fetch(`${baseUrl}/api/teams`);
  
  if (!response.ok) {
    console.error('Response status:', response.status);
    console.error('Response status text:', response.statusText);
  }
  
  expect(response.ok).toBe(true);
  const data = await response.json();
  console.log('Team response:', data);
  
  expect(Array.isArray(data.teams)).toBe(true);
  expect(data.teams).toHaveLength(5);
  expect(data.teams[0].name).toBe("T1");
  expect(data.teams[1].name).toBe("GEN.G");
  expect(data.teams[2].name).toBe("Hanwha Life Esports");
  expect(data.teams[3].name).toBe("Dplus KIA");
  expect(data.teams[4].name).toBe("kt Rolster");
});
