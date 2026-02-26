// Razorpay configuration
// Replace with your live key when going to production
export const RAZORPAY_KEY_ID = 'rzp_test_XXXXXXXXX' // TODO: Replace with actual test key

export const RAZORPAY_CONFIG = {
  currency: 'INR',
  name: 'Cake & Crumb',
  description: 'The Gourmet Chocolate & Berry Boutique',
  image: '/images/logo.jpg',
  theme: {
    color: '#3E2723',
  },
}

export function openRazorpay({ amount, customerName, email, phone, onSuccess, onFailure }) {
  const options = {
    key: RAZORPAY_KEY_ID,
    amount: amount * 100, // Razorpay expects paise
    currency: RAZORPAY_CONFIG.currency,
    name: RAZORPAY_CONFIG.name,
    description: RAZORPAY_CONFIG.description,
    image: RAZORPAY_CONFIG.image,
    prefill: {
      name: customerName,
      email: email || '',
      contact: phone,
    },
    theme: RAZORPAY_CONFIG.theme,
    handler: (response) => {
      onSuccess(response.razorpay_payment_id)
    },
    modal: {
      ondismiss: () => {
        onFailure('Payment cancelled')
      },
    },
  }

  const rzp = new window.Razorpay(options)
  rzp.on('payment.failed', (response) => {
    onFailure(response.error.description)
  })
  rzp.open()
}
