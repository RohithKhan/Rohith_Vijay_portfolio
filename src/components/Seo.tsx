import { Helmet } from 'react-helmet-async';
import { profile } from '@/data/content';

export function Seo() {
  const url = 'https://rohith-vijay-portfolio.vercel.app/';
  const title = 'Rohith Vijay — Engineer & Frontend Developer';
  const description = 'Engineer and Frontend Developer building scalable web applications and immersive digital experiences.';

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
      <meta property="og:site_name" content="Rohith Vijay" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content="https://rohith-vijay-portfolio.vercel.app/portfolio_preview.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://rohith-vijay-portfolio.vercel.app/portfolio_preview.png" />

      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
