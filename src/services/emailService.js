import emailjs from "@emailjs/browser";

// EmailJS configuration — replace with your actual IDs
// Sign up free at https://emailjs.com (200 emails/month)
const SERVICE_ID = "service_cf28zsj"; // TODO: Replace with your EmailJS service ID
const CUSTOMER_TEMPLATE_ID = "template_4o4nqu8"; // TODO: Replace with customer confirmation template
const BAKERY_TEMPLATE_ID = "template_XXXXXXX"; // TODO: Replace with bakery notification template
const PUBLIC_KEY = "XXXXXXXXXXXXXXX"; // TODO: Replace with your EmailJS public key

export async function sendOrderConfirmation({
  orderId,
  customerName,
  email,
  phone,
  items,
  subtotal,
  deliveryFee,
  total,
  address,
  area,
  date,
  timeSlot,
  paymentMethod,
  paymentId,
}) {
  if (!email) return; // Email is optional

  const itemsList = items
    .map((i) => `${i.name} x${i.quantity} — ₹${i.price * i.quantity}`)
    .join("\n");

  const templateParams = {
    order_id: orderId,
    customer_name: customerName,
    customer_email: email,
    customer_phone: phone,
    items_list: itemsList,
    subtotal: `₹${subtotal}`,
    delivery_fee: deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`,
    total: `₹${total}`,
    delivery_address: `${address}, ${area}`,
    delivery_date: date,
    time_slot: timeSlot,
    payment_method:
      paymentMethod === "online" ? "Paid Online" : "Cash on Delivery",
    payment_id: paymentId || "N/A",
  };

  try {
    // Send to customer
    if (email) {
      await emailjs.send(
        SERVICE_ID,
        CUSTOMER_TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY,
      );
    }
    // Send to bakery
    await emailjs.send(
      SERVICE_ID,
      BAKERY_TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY,
    );
  } catch (err) {
    console.warn("Email send failed (EmailJS not configured):", err);
  }
}

export function generateOrderId(customerName = '') {
  // Get initials from customer name (first + last name first letters)
  const words = customerName.trim().split(/\s+/).filter(Boolean)
  const initials = words.length >= 2
    ? (words[0][0] + words[words.length - 1][0]).toUpperCase()
    : words.length === 1
      ? (words[0][0] + (words[0][1] || 'X')).toUpperCase()
      : 'CC'

  // Date part: DDMMYY
  const now = new Date()
  const dd = String(now.getDate()).padStart(2, '0')
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const yy = String(now.getFullYear()).slice(-2)
  const dateKey = `${dd}${mm}${yy}`

  // Sequential order number (resets daily, stored in localStorage)
  let orderNum = 1
  try {
    const stored = JSON.parse(localStorage.getItem('cake-crumb-order-counter') || '{}')
    if (stored.date === dateKey) {
      orderNum = (stored.count || 0) + 1
    }
    localStorage.setItem('cake-crumb-order-counter', JSON.stringify({ date: dateKey, count: orderNum }))
  } catch {}

  return `CC-${initials}-${dateKey}-${String(orderNum).padStart(4, '0')}`
}
