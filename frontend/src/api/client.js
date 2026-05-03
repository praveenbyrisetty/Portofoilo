/**
 * API client for the FastAPI backend.
 */
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function fetchJSON(endpoint) {
  const res = await fetch(`${API_BASE}${endpoint}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function getProfile() {
  return fetchJSON('/api/profile');
}

export async function getProjects() {
  return fetchJSON('/api/projects');
}

export async function getProject(id) {
  return fetchJSON(`/api/projects/${id}`);
}

export async function getSkills() {
  return fetchJSON('/api/skills');
}

export async function getTimeline() {
  return fetchJSON('/api/timeline');
}

export async function getLabs() {
  return fetchJSON('/api/labs');
}

export async function submitContact(data) {
  const res = await fetch(`${API_BASE}/api/contact/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Contact error: ${res.status}`);
  return res.json();
}
