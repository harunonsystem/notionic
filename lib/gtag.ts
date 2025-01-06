import { BLOG } from '@/blog.config'

export const GA_TRACKING_ID = BLOG.analytics.gaConfig.measurementId

declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void
  }
}
// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events/
export const event = ({ action, category, label, level }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: level
  })
}
