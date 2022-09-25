import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = sanityClient({
    projectId: 'v2tkzg4u',
    dataset: 'production',
    apiVersion: '2022-09-25',
    useCdn: true,
    token: process.env.PROJECT_ECOMMERCE_TOKEN
})