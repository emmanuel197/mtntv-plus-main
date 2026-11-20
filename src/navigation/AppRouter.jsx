// The route list: which address shows which page.
// Every page sits inside AppLayout, so all of them get the bars.
import { createBrowserRouter, RouterProvider } from 'react-router'
import AppLayout from './AppLayout.jsx'
import NotFoundPage from './NotFoundPage.jsx'
import HomePage from '@/home/HomePage.jsx'
import LiveTvPage from '@/live-tv/LiveTvPage.jsx'
import TvChannelsPage from '@/live-tv/TvChannelsPage.jsx'
import MoviesPage from '@/movies/MoviesPage.jsx'
import ShortsPage from '@/shorts/ShortsPage.jsx'
import ShortsPlayerPage from '@/shorts/ShortsPlayerPage.jsx'
import SignInPage from '@/sign-in-and-sign-up/SignInPage.jsx'
import SignUpPage from '@/sign-in-and-sign-up/SignUpPage.jsx'
import SearchPage from '@/search/SearchPage.jsx'
import MorePage from '@/my-account/MorePage.jsx'
import ProfilePage from '@/my-account/ProfilePage.jsx'
import MyStuffPage from '@/my-account/MyStuffPage.jsx'
import MyLibraryPage from '@/my-account/MyLibraryPage.jsx'
import BundlesPage from '@/bundles/BundlesPage.jsx'
import SubscriptionHistoryPage from '@/bundles/SubscriptionHistoryPage.jsx'
import NotificationsPage from '@/notifications/NotificationsPage.jsx'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/live-tv', element: <LiveTvPage /> },
      { path: '/tv-channels', element: <TvChannelsPage /> },
      { path: '/movies', element: <MoviesPage /> },
      { path: '/shorts', element: <ShortsPage /> },
      // ":id" is a blank to fill in: /shorts/tn1 opens the player with id "tn1"
      { path: '/shorts/:id', element: <ShortsPlayerPage /> },
      { path: '/signin', element: <SignInPage /> },
      { path: '/signup', element: <SignUpPage /> },
      { path: '/search', element: <SearchPage /> },
      { path: '/more', element: <MorePage /> },
      { path: '/profile', element: <ProfilePage /> },
      { path: '/my-stuff', element: <MyStuffPage /> },
      { path: '/my-library', element: <MyLibraryPage /> },
      { path: '/bundles', element: <BundlesPage /> },
      { path: '/subscription-history', element: <SubscriptionHistoryPage /> },
      { path: '/notifications', element: <NotificationsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
