import { Helmet } from 'react-helmet-async';
import { profile, faqs } from '@/data/content';

export function Seo() {
  const url = 'https://rohith-vijay-portfolio.vercel.app/';
  const title = 'Rohith Vijay | Freelance Web Developer & SEO Specialist in Chennai';
  const description =
    'Explore Rohith Vijay, a freelance web developer in Chennai specializing in MERN stack development, SEO, and high-performing business websites.';
  const previewImage = 'https://rohith-vijay-portfolio.vercel.app/portfolio_preview.png';

  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. Person
      {
        '@type': 'Person',
        '@id': `${url}#person`,
        name: profile.name,
        alternateName: ['Rohith Vijay Developer', 'Rohith Vijay SEO Specialist'],
        url: url,
        image: previewImage,
        jobTitle: 'Freelance Web Developer & SEO Specialist',
        worksFor: {
          '@type': 'Organization',
          name: 'Freelance / Self-Employed',
        },
        description:
          'Freelance Web Developer and SEO Specialist in Chennai specializing in MERN stack development, React, Next.js, and high-performance business websites.',
        email: `mailto:${profile.email}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: profile.locality,
          addressRegion: profile.region,
          addressCountry: 'IN',
        },
        sameAs: [profile.github, profile.linkedin],
        knowsAbout: [
          'Freelance Web Development',
          'MERN Stack Development',
          'React.js',
          'Next.js',
          'Node.js',
          'TypeScript',
          'Technical SEO',
          'On-Page SEO',
          'Core Web Vitals Optimization',
          'Schema Markup',
          'Local SEO Chennai',
          'Augmented Reality',
        ],
      },

      // 2. WebSite
      {
        '@type': 'WebSite',
        '@id': `${url}#website`,
        url: url,
        name: 'Rohith Vijay | Freelance Web Developer & SEO Specialist in Chennai',
        alternateName: 'Rohith Vijay Portfolio',
        description: description,
        publisher: {
          '@id': `${url}#person`,
        },
        inLanguage: 'en-US',
      },

      // 3. ProfilePage
      {
        '@type': 'ProfilePage',
        '@id': `${url}#profilepage`,
        url: url,
        name: 'Rohith Vijay Portfolio & Professional Profile',
        isPartOf: {
          '@id': `${url}#website`,
        },
        mainEntity: {
          '@id': `${url}#person`,
        },
      },

      // 4. ProfessionalService
      {
        '@type': 'ProfessionalService',
        '@id': `${url}#service`,
        name: 'Rohith Vijay — Freelance Web Development & SEO Services',
        url: url,
        image: previewImage,
        email: profile.email,
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          addressLocality: profile.locality,
          addressRegion: profile.region,
          addressCountry: 'IN',
        },
        areaServed: [
          {
            '@type': 'City',
            name: 'Chennai',
          },
          {
            '@type': 'AdministrativeArea',
            name: 'Tamil Nadu',
          },
          {
            '@type': 'Country',
            name: 'India',
          },
        ],
        provider: {
          '@id': `${url}#person`,
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Freelance Web Development & SEO Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Freelance Website Development',
                description:
                  'Modern, responsive, conversion-focused websites engineered with React, TypeScript, and clean CSS.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'MERN Stack Development',
                description:
                  'Full-stack web application development using MongoDB, Express.js, React, and Node.js with secure APIs and role-based permissions.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Technical SEO & Performance Optimization',
                description:
                  'Schema.org structured data, Core Web Vitals optimization, heading hierarchy, and search engine crawlability improvements.',
              },
            },
          ],
        },
      },

      // 5. FAQPage
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      {/* Open Graph */}
      <meta property="og:site_name" content="Rohith Vijay" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={previewImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={previewImage} />

      {/* JSON-LD Graph */}
      <script id="schema-graph" type="application/ld+json">
        {JSON.stringify(schemaGraph)}
      </script>
    </Helmet>
  );
}
