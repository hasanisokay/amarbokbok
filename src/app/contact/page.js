

import ContactDetails from '@/components/ContactDetails';
import { contactMetaImage, websiteName } from '@/constants/constants.mjs';
import { hostname } from '@/constants/hostname.mjs';
import React from 'react';
export async function generateMetadata() {
  const host = await hostname();
  return {
    title: `Contact - ${websiteName}`,
    description: 'Get in touch with Ahmad Robin via phone or WhatsApp. Reach out for inquiries, feedback, or collaborations.',
    keywords: [
      'Ahmad Robin',
      'Contact',
      'Phone',
      'WhatsApp',
      'Personal Website',
      'Jharfuk',
      'Reach Out',
      'Contact Information'
    ],
    url: `${host}/contact`,
    image: contactMetaImage,
    other: {
      'twitter:image': contactMetaImage,
      'twitter:card': 'summary_large_image',
      'twitter:title': `Contact - ${websiteName}`,
      'twitter:description': 'Connect with Ahmad Robin through phone or WhatsApp. Reach out for any inquiries or collaborations.',
      'og:title': `Contact - ${websiteName}`,
      'og:description': 'Get in touch with Ahmad Robin through phone or WhatsApp. Your inquiries and feedback are welcome.',
      'og:url': `${host}/contact`,
      'og:image': contactMetaImage,
      'og:type': 'website',
      'og:site_name': websiteName,
      locale: 'en_US',
    },
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
