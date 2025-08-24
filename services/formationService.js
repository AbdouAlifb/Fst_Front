import http from '@/lib/httpClient';

/** List formations (logs added) */
export async function fetchFormations(params = {}) {
  const url = '/api/formations';
  console.debug('[fetchFormations] GET', url, params);
  try {
    const res = await http.get(url, { params });
    const data = res?.data;
    console.debug('[fetchFormations] status:', res?.status);
    console.debug('[fetchFormations] keys:', Object.keys(data || {}));
    if (Array.isArray(data?.data)) {
      console.debug('[fetchFormations] count:', data.data.length);
      if (data.data[0]) console.debug('[fetchFormations] first item sample:', data.data[0]);
    } else {
      console.debug('[fetchFormations] unexpected payload shape:', data);
    }
    return {
      items: data?.data ?? [],
      pagination: data?.pagination ?? null,
      raw: data
    };
  } catch (err) {
    console.error(
      '[fetchFormations] error:',
      err?.response?.status,
      err?.response?.data || err?.message
    );
    throw err;
  }
}

/** Get one formation by id or slug (optional) */
export async function fetchFormation(idOrSlug) {
  const url = `/api/formations/${idOrSlug}`;
  console.debug('[fetchFormation] GET', url);
  const { data } = await http.get(url);
  return data?.data ?? null;
}
