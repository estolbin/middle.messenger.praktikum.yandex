enum METHOD {
        GET = 'GET',
        POST = 'POST',
        PUT = 'PUT',
        PATCH = 'PATCH',
        DELETE = 'DELETE'
}

type Options = {
    method: METHOD;
    data?: Record<string, unknown> | string;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class HTTPTransport {
  private queryStringify(data: Record<string, unknown>): string {
    const params = Object.entries(data)
      .map(([key, value]) => {
        if (value === null || value === undefined) return '';
        return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
      })
      .filter(Boolean);

    return params.length > 0 ? `?${params.join('&')}` : '';
  }

  get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.GET });
  }

  post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.POST });
  }

  put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.PUT });
  }

  patch(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.PATCH });
  }

  delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.DELETE });
  }

  request(url: string, options: Options = { method: METHOD.GET }): Promise<XMLHttpRequest> {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      const urlWithQuery = method === METHOD.GET && data && typeof data !== 'string'
        ? `${url}${this.queryStringify(data as Record<string, unknown>)}`
        : url;

      xhr.open(method, urlWithQuery);

      // eslint-disable-next-line func-names
      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(typeof data === 'string' ? data : JSON.stringify(data));
      }
    });
  }
}
