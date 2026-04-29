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

const RAZORPAY_SDK_URL = 'https://checkout.razorpay.com/v1/checkout.js'
let sdkPromise = null

function loadRazorpaySdk() {
  if (window.Razorpay) return Promise.resolve()
  if (sdkPromise) return sdkPromise
  sdkPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = RAZORPAY_SDK_URL
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => {
      sdkPromise = null
      reject(new Error('Failed to load payment gateway'))
    }
    document.head.appendChild(script)
  })
  return sdkPromise
}

export async function openRazorpay({ amount, customerName, email, phone, onSuccess, onFailure }) {
  try {
    await loadRazorpaySdk()
  } catch (err) {
    onFailure(err.message)
    return
  }

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
