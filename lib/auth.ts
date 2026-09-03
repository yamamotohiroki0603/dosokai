/**
 * メール認証の境界。
 * 本番では Resend + Magic Link や NextAuth などに差し替える。
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const MOCK_VERIFICATION_CODE = "123456";

export async function sendVerification(email: string): Promise<void> {
  const trimmed = email.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    throw new Error("メールアドレスの形式が正しくありません");
  }
  await delay(650);
}

export async function verifyCode(
  email: string,
  code: string,
): Promise<{ token: string }> {
  await delay(500);
  const normalized = code.replace(/\s/g, "");
  if (normalized !== MOCK_VERIFICATION_CODE) {
    throw new Error("認証コードが正しくありません");
  }
  return { token: `mock_${encodeURIComponent(email.trim())}` };
}
