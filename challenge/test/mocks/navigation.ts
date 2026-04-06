/* eslint-disable @typescript-eslint/no-explicit-any */

let pathname = "/";
let params: Record<string, string> = {};
let searchParams = new URLSearchParams();

const push = jest.fn();
const back = jest.fn();
const replace = jest.fn();
const prefetch = jest.fn();

export function useRouter() {
  return { push, back, replace, prefetch };
}

export function usePathname() {
  return pathname;
}

export function useParams() {
  return params;
}

export function useSearchParams() {
  return {
    get: (key: string) => searchParams.get(key),
    toString: () => searchParams.toString(),
  } as any;
}

export function __setPathname(nextPathname: string) {
  pathname = nextPathname;
}

export function __setParams(nextParams: Record<string, string>) {
  params = nextParams;
}

export function __setSearchParams(next: Record<string, string | undefined | null>) {
  const sp = new URLSearchParams();
  Object.entries(next).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    sp.set(key, String(value));
  });
  searchParams = sp;
}

export function __getRouterMocks() {
  return { push, back, replace, prefetch };
}

export function __resetNavigationMocks() {
  pathname = "/";
  params = {};
  searchParams = new URLSearchParams();
  push.mockReset();
  back.mockReset();
  replace.mockReset();
  prefetch.mockReset();
}
