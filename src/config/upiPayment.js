export const UPI_ID = '9081668490@kotakbank'
export const PAYEE_NAME = 'Cake & Crumb'
export const ACCOUNT_HOLDER_NAME = 'Momin Akbarhusen Gulamali'

export function buildUpiLink({ amount, orderId }) {
  const params = new URLSearchParams({
    pa: UPI_ID,
    pn: PAYEE_NAME,
    am: String(amount),
    cu: 'INR',
    tn: orderId,
    tr: orderId,
  })
  return `upi://pay?${params.toString()}`
}
