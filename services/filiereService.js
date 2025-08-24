import http from '@/lib/httpClient';

/** List filières (optionally filtered by formation id/slug) */
export async function fetchFilieres(params = {}) {
  const { data } = await http.get('/api/filieres', { params });
  return { items: data?.data ?? [], pagination: data?.pagination ?? null };
}

/** Get one filière by id or slug */
export async function fetchFiliere(idOrSlug) {
  const { data } = await http.get(`/api/filieres/${idOrSlug}`);
  return data?.data ?? null;
}
