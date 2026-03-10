const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "http://localhost:5000/api" : "/api");

type ApiEnvelope<T> = {
  data: T;
};

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`GET ${path} failed with status ${response.status}`);
  }
  const json = (await response.json()) as ApiEnvelope<T>;
  return json.data;
}

export async function apiPost<TPayload extends object, TResult>(
  path: string,
  payload: TPayload,
): Promise<TResult> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`POST ${path} failed with status ${response.status}`);
  }
  return (await response.json()) as TResult;
}
