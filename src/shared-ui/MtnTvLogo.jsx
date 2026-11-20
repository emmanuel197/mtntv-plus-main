// The MTN TV+ logo. Shared because the navbar, phone top bar and sign-in screens all show it.
// The image is imported (not written as a "/path" string) so Vite bundles it and gives it a cache-safe name.
import logoUrl from '@/images-and-icons/mtn-tv-plus-logo.png'

export default function MtnTvLogo({ className = 'size-10' }) {
  return <img src={logoUrl} alt="MTN TV+" className={`rounded-lg ${className}`} />
}
