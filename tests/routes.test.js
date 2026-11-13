import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { spawn } from 'node:child_process';

const serverUrl = 'http://localhost:8888';
let server;

async function waitForServer(process) {
  const deadline = Date.now() + 10000;

  while (Date.now() < deadline) {
    if (process.exitCode !== null) {
      throw new Error(`Server exited with code ${process.exitCode}`);
    }

    try {
      await fetch(serverUrl);
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  throw new Error('Server did not start within 10 seconds');
}

describe('HTTP routes', () => {
  beforeAll(async () => {
    server = spawn(process.execPath, ['index.js'], { stdio: 'ignore' });
    await waitForServer(server);
  });

  afterAll(() => {
    if (server && server.exitCode === null) {
      server.kill();
    }
  });

  it('serves the home route', async () => {
    const response = await fetch(serverUrl);
    expect(response.status).toBe(200);
    expect(await response.text()).toBe('Hello MyLoev');
  });

  it('serves the about route', async () => {
    const response = await fetch(`${serverUrl}/about`);
    expect(response.status).toBe(200);
    expect(await response.text()).toBe('Hello Myme');
  });
});
