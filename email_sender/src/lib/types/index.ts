export type CreateUser = {
  name: string;
  email: string;
  password: string;
};

// Logged-in user type
export type User = {
  id: string;
  name: string;
  email: string;
};
    
export type LoginUser = {
	email: string;
	password: string;
};

// src/lib/types/index.ts

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: number;          // Make sure it's number, not string
  message: string;
  type: ToastType;
  duration?: number;
}

// SMTPConfig type bhi yahan ho sakta hai
export interface SMTPConfig {
  id: string;
  name: string;
  host: string;
  port: number;
  pass?: string;
  secure: boolean;
  user: string;
  fromEmail: string;
  fromName: string;
  isDefault: boolean;
  createdAt: string;
}


// ================= Email =================
export interface Email {
  id: string;
  subject: string;
  body: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  attachments?: string[];
  sentAt?: string;
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
}

// ================= User/Auth =================
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
}

// ================= Reports =================
export interface Report {
  id: string;
  name: string;
  type: 'daily' | 'weekly' | 'monthly';
  generatedAt: string;
  status: 'pending' | 'completed' | 'failed';
  dataUrl?: string;
}

// ================= Batch/Activity =================
export interface Batch {
  id: string;
  name: string;
  totalEmails: number;
  sentEmails: number;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
}
