

import ContactDetails from '@/components/ContactDetails';
import { websiteName } from '@/constants/constants.mjs';
import { hostname } from '@/constants/hostname.mjs';
import React from 'react';

export async function generateMetadata() {
  const host = await hostname()

  return {
    title: `Contact - ${websiteName}`,
    description: 'Get in touch with Ahmad Robin through phone or WhatsApp.',
    keywords: [
      'Ahmad Robin',
      'contact',
      'phone',
      'WhatsApp',
      'Personal Website',
      'Jharfuk',
    ],
    other: {
      'twitter:image': 'https://yourwebsite.com/path-to-image.jpg',
      'twitter:card': 'summary_large_image',
      'og:url': `${host}/contact`,
      'og:image': 'https://yourwebsite.com/path-to-image.jpg',
      'og:type': 'website',
      locale: 'en_US',
    },
    image: 'https://yourwebsite.com/path-to-image.jpg',
    url: `${host}/contact`,
  };
}

const ContactPage = () => {
  return (
    <section className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Ahmad Robin</h1>
      <ContactDetails />
    </section>
  );
};

export default ContactPage;
