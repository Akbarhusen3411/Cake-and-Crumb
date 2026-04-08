import { ORDERS_SCRIPT_URL } from '../config/googleSheetOrders'

/**
 * Save order admin links to Google Sheet so admin can manage from there.
 * Customer gets clean WhatsApp message, admin taps links from the Sheet.
 */
export function saveOrderToSheet({
  orderId,
  customerName,
  phone,
  items,
  total,
  delivery,
  date,
  confirmLink,
  shippedLink,
  cancelLink,
  rejectLink,
}) {
  if (!ORDERS_SCRIPT_URL) return

  fetch(ORDERS_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({
      action: 'order',
      orderId,
      customerName,
      phone,
      items,
      total,
      delivery,
      date,
      confirmLink,
      shippedLink,
      cancelLink,
      rejectLink,
      timestamp: new Date().toISOString(),
    }),
  }).catch(() => {})
}
