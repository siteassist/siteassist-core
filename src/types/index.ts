export interface Project {
  id: string;
  name: string;
  createdAt: Date;
}

export interface Assistant {
  id: string;
  createdAt: Date;
  projectId: string;
  name?: string | null;
  avatar?: string | null;
  welcomeMessages?: string[] | null;
}

export interface AppUser {
  id: string;
  createdAt: Date;
  projectId: string;
  name: string | null;
  email: string | null;
}

export interface Thread {
  id: string;
  createdAt: Date;
  projectId: string;
  userId: string | null;
}

export interface LinkSource {
  type: 'link';
  url: string;
  title?: string | null;
}

export type Source = LinkSource;

export type Annotations = (
  | {type: 'status'; message: string}
  | {type: 'assistant'; assistantId: string}
  | {type: 'sources'; sources: Source[]}
)[];

export interface Message {
  id: string;
  createdAt: Date;
  threadId: string;
  content: string;
  role: 'assistant' | 'user';
  userReaction?: 'like' | 'dislike' | null;
  status?: 'streaming' | 'complete' | 'error' | null;
  error?: string | null;
  assistantId?: string | null;
  annotations?: Annotations | null;
  sources?: Source[];
}
