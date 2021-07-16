const NO_CONTENT = 204;

export default class HttpService {
  static async fetch<T>(url: string, init?: RequestInit) {
    const res = await fetch(url, init);
    if (!res.ok) {
      throw new Error(await res.text());
    }
    if (res.status !== NO_CONTENT) {
      return await res.json() as T;
    }
  }

  static get<T>(url: string) {
    return this.fetch<T>(url);
  }

  static post<T>(url: string, data: any) {
    return this.fetch<T>(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
  }

  static patch<T>(url: string, data: any) {
    return this.fetch<T>(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
  }

  static delete<T>(url: string) {
    return this.fetch<T>(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
