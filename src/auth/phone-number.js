// Phone numbers. Users type the local Ghana form, 10 digits starting with 0 (e.g. 0244123456).
// The server's username for that number is the operator prefix + the number (e.g. "amngh0244123456"),
// and the login name adds "@operator" (e.g. "amngh0244123456@afriplaymtnghana").
import { operator } from '@/app-settings/operators.js'

// Keep only digits, at most 10 (what the number box allows)
export const cleanNumber = (typed) => typed.replace(/\D/g, '').slice(0, 10)

export const isValidNumber = (number) => /^0\d{9}$/.test(number)

export const usernameFor = (number) => `${operator.username_prefix}${number}`

export const loginNameFor = (number) => `${usernameFor(number)}@${operator.operator_uid}`

// The number we're signing in with, kept between the number page and the code page
// (sessionStorage: forgotten when the tab closes)
const PENDING = 'mtntv:pending-number'
export const rememberNumber = (number) => sessionStorage.setItem(PENDING, number)
export const pendingNumber = () => sessionStorage.getItem(PENDING) || ''
export const forgetNumber = () => sessionStorage.removeItem(PENDING)
