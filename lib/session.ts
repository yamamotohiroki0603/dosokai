export type Registration = {
  name: string;
  email: string;
  className: string;
  verified: boolean;
  quantity: number;
  paid: boolean;
  paymentId?: string;
};

const STORAGE_KEY = "dosokai.registration";

const empty: Registration = {
  name: "",
  email: "",
  className: "",
  verified: false,
  quantity: 1,
  paid: false,
};

function canUseStorage() {
  return typeof window !== "undefined";
}

export function getRegistration(): Registration {
  if (!canUseStorage()) return { ...empty };
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...empty };
    return { ...empty, ...JSON.parse(raw) };
  } catch {
    return { ...empty };
  }
}

export function saveRegistration(next: Registration) {
  if (!canUseStorage()) return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function updateRegistration(patch: Partial<Registration>): Registration {
  const next = { ...getRegistration(), ...patch };
  saveRegistration(next);
  return next;
}

export function clearRegistration() {
  if (!canUseStorage()) return;
  sessionStorage.removeItem(STORAGE_KEY);
}
