import { request } from '@umijs/max';

export async function getList(params?: Record<string, any>) {
  return request('/api/admin/system_dict', {
    params,
  });
}

export async function removeItem(keys: string[]) {
  return request(`/api/admin/system_dict/${keys.join(',')}`, {
    method: 'DELETE',
  });
}

export async function addItem(params: Record<string, any>) {
  return request('/api/admin/system_dict', {
    method: 'POST',
    data: params,
  });
}

export async function updateItem(params: Record<string, any>) {
  return request(`/api/admin/system_dict/${params.key_}`, {
    method: 'PUT',
    data: params,
  });
}
