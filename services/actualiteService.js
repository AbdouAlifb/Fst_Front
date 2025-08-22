

import http from '@/lib/httpClient';

/**
 * List actualités/évènements
 * @param {Object} params { page, limit, q, kind, type, department, status, from, to, sort }
 * @returns {Promise<{items: Array, pagination: Object|null}>}
 */
export async function fetchActualites(params = {}) {
  const { data } = await http.get('/api/actualites', { params });
  // Controller returns: { data: [...], pagination: {...} }
  const items = data?.data ?? [];
  const pagination = data?.pagination ?? null;
  return { items, pagination };
}

/**
 * Get one by id or slug
 * @param {string} idOrSlug
 * @returns {Promise<Object>} doc
 */
export async function fetchActualite(idOrSlug) {
  const { data } = await http.get(`/api/actualites/${idOrSlug}`);
  // Controller returns: { data: {...} }
  return data?.data ?? null;
}
