// The route list: which address shows which page.
// Every page sits inside AppLayout, so all of them get the bars.
// Pages in the SignedInOnly group need an account; the rest are open to everyone.
import { createBrowserRouter, RouterProvider } from 'react-router'
import AppLayout from './AppLayout.jsx'
import NotFoundPage from './NotFoundPage.jsx'
import HomePage from '@/home/HomePage.jsx'
import LiveTvPage from '@/live-tv/LiveTvPage.jsx'
import MoviesPage from '@/movies/MoviesPage.jsx'
import MovieDetailsPage from '@/movies/MovieDetailsPage.jsx'
import SeriesDetailsPage from '@/movies/SeriesDetailsPage.jsx'
import TvGuidePage from '@/live-tv/TvGuidePage.jsx'
import ShortsPage from '@/shorts/ShortsPage.jsx'
import ShortsPlayerPage from '@/shorts/ShortsPlayerPage.jsx'
import SignInPage from '@/auth/SignInPage.jsx'
import SignUpPage from '@/auth/SignUpPage.jsx'
import VerifyCodePage from '@/auth/VerifyCodePage.jsx'
import OutOfRegionPage from '@/auth/OutOfRegionPage.jsx'
import SignedInOnly from './SignedInOnly.jsx'
import SearchPage from '@/search/SearchPage.jsx'
import MorePage from '@/my-account/MorePage.jsx'
import ProfilePage from '@/my-account/ProfilePage.jsx'
import MyStuffPage from '@/my-account/MyStuffPage.jsx'
import MyLibraryPage from '@/my-account/MyLibraryPage.jsx'
import BundlesPage from '@/bundles/BundlesPage.jsx'
import SubscriptionHistoryPage from '@/bundles/SubscriptionHistoryPage.jsx'
import NotificationsPage from '@/notifications/NotificationsPage.jsx'
import WatchPage from '@/video-player/WatchPage.jsx'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      // ── Open to everyone ──
      // Home is the shop window: signed-out visitors can look, but every tap leads to Sign In
      // (WONA's landing page works the same way)
      { path: '/', element: <HomePage /> },
      // Shorts stays open: MTN's design has a "Join the conversation" sheet for signed-out viewers
      { path: '/shorts', element: <ShortsPage /> },
      // ":id" is a blank to fill in: /shorts/tn1 opens the player with id "tn1"
      { path: '/shorts/:id', element: <ShortsPlayerPage /> },
      { path: '/signin', element: <SignInPage /> },
      { path: '/signup', element: <SignUpPage /> },
      { path: '/verify-code', element: <VerifyCodePage /> },
      { path: '/out-of-region', element: <OutOfRegionPage /> },

      // ── Account needed (as in WONA): signed out → Sign In, then straight back here ──
      {
        element: <SignedInOnly />,
        children: [
          { path: '/live-tv', element: <LiveTvPage /> },
          { path: '/tv-guide', element: <TvGuidePage /> },
          { path: '/movies', element: <MoviesPage /> },
          { path: '/movie/:id', element: <MovieDetailsPage /> },
          { path: '/series/:id', element: <SeriesDetailsPage /> },
          // kind = movie | episode | live | trailer
          { path: '/watch/:kind/:id', element: <WatchPage /> },
          { path: '/search', element: <SearchPage /> },
          { path: '/more', element: <MorePage /> },
          { path: '/profile', element: <ProfilePage /> },
          { path: '/my-stuff', element: <MyStuffPage /> },
          { path: '/my-library', element: <MyLibraryPage /> },
          { path: '/bundles', element: <BundlesPage /> },
          { path: '/subscription-history', element: <SubscriptionHistoryPage /> },
          { path: '/notifications', element: <NotificationsPage /> },
        ],
      },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
