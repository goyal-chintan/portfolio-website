export function usePathname() {
  return "/";
}

export function useSearchParams() {
  return new URLSearchParams();
}

export function useRouter() {
  return {
    push: () => undefined,
    replace: () => undefined,
    prefetch: async () => undefined,
    back: () => undefined,
    forward: () => undefined,
    refresh: () => undefined,
  };
}

export function redirect(url: string) {
  throw new Error(`next/navigation redirect(${url}) called inside Storybook`);
}

export function notFound() {
  throw new Error("next/navigation notFound() called inside Storybook");
}

