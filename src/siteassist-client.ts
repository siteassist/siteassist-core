import type { Assistant, Message, Project, Thread } from "./types";

export interface SiteAssistClientConfig {
  apiKey: string;
  apiUri?: string;
  assistantId?: string;
}

export class SiteAssistClient {
  public apiKey: string;
  public apiUri: string;
  public assistantId: string | undefined;

  constructor({ apiKey, apiUri, assistantId }: SiteAssistClientConfig) {
    this.apiKey = apiKey;
    this.apiUri = apiUri ?? "https://app.siteassist.io/api";
    this.assistantId = assistantId;
  }

  async getProject(): Promise<Project> {
    const res = await fetch(`${this.apiUri}/v1/projects/get-project`, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res.json();
  }

  async getAssistant(): Promise<Assistant> {
    const res = await fetch(
      this.assistantId
        ? `${this.apiUri}/v1/assistants/${this.assistantId}`
        : `${this.apiUri}/v1/assistants/default`,
      {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
        credentials: "include",
      }
    );
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res.json();
  }

  async createThread(): Promise<Thread> {
    const res = await fetch(`${this.apiUri}/v1/threads`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
      credentials: "include",
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error);
    }
    return res.json();
  }

  async getThread(threadId: string): Promise<Thread> {
    const res = await fetch(`${this.apiUri}/v1/threads/${threadId}`, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
      credentials: "include",
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error);
    }
    return res.json();
  }

  async getThreads(): Promise<Thread[]> {
    const res = await fetch(`${this.apiUri}/v1/threads`, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
      credentials: "include",
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error);
    }
    return res.json();
  }

  async getMessages(threadId: string): Promise<Message[]> {
    const res = await fetch(`${this.apiUri}/v1/threads/${threadId}/messages`, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
      credentials: "include",
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error);
    }
    return res.json();
  }
}
