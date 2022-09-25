import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: 'v2tkzg4u',
    dataset: 'production',
    apiVersion: '2022-09-25',
    useCdn: true,
    token: process.env.PROJECT_ECOMMERCE_TOKEN
})

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);