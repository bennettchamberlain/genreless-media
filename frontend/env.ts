export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-13'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const useCdn = process.env.NODE_ENV === 'production'

// Stripe Keys - Use environment variables only
export const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
export const stripeSecretKey = process.env.STRIPE_SECRET_KEY 