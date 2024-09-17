

import ContactDetails from '@/components/ContactDetails';
import { contactMetaImage, websiteName } from '@/constants/constants.mjs';
import { hostname } from '@/constants/hostname.mjs';
import React from 'react';
export async function generateMetadata() {
  const host = await hostname();
  return {
    title: `Contact - ${websiteName}`,
    description: 'আহম্মাদ রবিনের সাথে ফোন বা WhatsApp এর মাধ্যমে যোগাযোগ করুন। জিজ্ঞাসা, মতামত বা সহযোগিতার জন্য যোগাযোগ করুন।',
     keywords: [
      'Ahmmad Robin',
      'আহমাদ রবিন',
      'Phone',
      'WhatsApp',
      'Contact Information',
      'যোগাযোগ তথ্য',
      'যোগাযোগ', 
      'ফোন',   
    ],
    url: `${host}/contact`,
    canonical: `${host}/contact`, 
    image: contactMetaImage,
    other: {
      'twitter:image': contactMetaImage,
      'twitter:card': 'summary_large_image',
      'twitter:title': `Contact - ${websiteName}`,
      'twitter:description': 'আহম্মাদ রবিনের সাথে ফোন বা WhatsApp এর মাধ্যমে যোগাযোগ করুন। যে কোন প্রশ্ন বা সহযোগিতার জন্য যোগাযোগ করুন।',
      'og:title': `Contact - ${websiteName}`,
      'og:description': 'ফোন বা WhatsApp এর মাধ্যমে আহম্মাদ রবিনের সাথে যোগাযোগ করুন। আপনার প্রশ্ন এবং মতামত স্বাগত।',
      'og:url': `${host}/contact`,
      'og:image': contactMetaImage,
      'og:type': 'website',
      'og:site_name': websiteName,
      "og:locale": "bn_BD",
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
