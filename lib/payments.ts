/**
 * 決済の境界。
 * 本番では Stripe Checkout または Payment Intent に差し替える。
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type CheckoutSession = {
  id: string;
  amount: number;
  currency: "jpy";
  quantity: number;
};

export type CardDetails = {
  number: string;
  expiry: string;
  cvc: string;
  holderName: string;
};

export async function createCheckout(
  amount: number,
  quantity: number,
): Promise<CheckoutSession> {
  if (amount <= 0 || quantity <= 0) {
    throw new Error("支払い金額が正しくありません");
  }
  await delay(400);
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? `cs_mock_${crypto.randomUUID()}`
      : `cs_mock_${Date.now()}`;
  return { id, amount, currency: "jpy", quantity };
}

export async function confirmPayment(
  sessionId: string,
  card: CardDetails,
): Promise<{ paid: true; paymentId: string }> {
  const digits = card.number.replace(/\s/g, "");
  if (digits.length < 13 || digits.length > 19) {
    throw new Error("カード番号を確認してください");
  }
  if (!/^\d{2}\/\d{2}$/.test(card.expiry)) {
    throw new Error("有効期限は MM/YY で入力してください");
  }
  if (!/^\d{3,4}$/.test(card.cvc)) {
    throw new Error("セキュリティコードを確認してください");
  }
  if (!card.holderName.trim()) {
    throw new Error("カード名義を入力してください");
  }
  await delay(900);
  return { paid: true, paymentId: `pi_mock_${sessionId}` };
}
