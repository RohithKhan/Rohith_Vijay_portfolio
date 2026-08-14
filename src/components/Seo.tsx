import { Helmet } from 'react-helmet-async';
import { profile } from '@/data/content';

export function Seo() {
  const url = 'https://rohithkhan.dev';
  const title = `${profile.name} — ${profile.role}`;
  const description = profile.subtitle;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role,
    description,
    url,
    email: `mailto:${profile.email}`,
    sameAs: [profile.github, profile.linkedin],
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content="https://bolt.new/static/og_default.png" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://bolt.new/static/og_default.png" />

      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
