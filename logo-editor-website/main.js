import { inject } from '@vercel/analytics'
// import some helper that is exposed by your current framework to determine the right mode manually
import { dev } from '$app/environment'

inject( {
    mode: dev ? 'development' : 'production',
} )