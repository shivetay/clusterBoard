import type { Metadata } from 'next';

/** Logged-in app surfaces: do not index or follow links into the app shell. */
export const privateAppRobots: Metadata['robots'] = {
  index: false,
  follow: false,
  googleBot: { index: false, follow: false },
};

export const privateAppMetadata: Metadata = {
  robots: privateAppRobots,
};
