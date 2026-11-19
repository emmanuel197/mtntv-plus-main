// The route list: which address shows which page.
// Every page sits inside AppLayout, so all of them get the bars.
import { createBrowserRouter, RouterProvider } from 'react-router'
import AppLayout from './AppLayout.jsx'
import NotFoundPage from './NotFoundPage.jsx'
import HomePage from '@/home/HomePage.jsx'
import LiveTvPage from '@/live-tv/LiveTvPage.jsx'
import ShortsPage from '@/shorts/ShortsPage.jsx'
import SearchPage from '@/search/SearchPage.jsx'
import MorePage from '@/my-account/MorePage.jsx'
import BundlesPage from '@/my-account/BundlesPage.jsx'
import NotificationsPage from '@/my-account/NotificationsPage.jsx'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/live-tv', element: <LiveTvPage /> },
      { path: '/shorts', element: <ShortsPage /> },
      { path: '/search', element: <SearchPage /> },
      { path: '/more', element: <MorePage /> },
      { path: '/bundles', element: <BundlesPage /> },
      { path: '/notifications', element: <NotificationsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
