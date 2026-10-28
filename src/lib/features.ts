/** The contact form is only shown once a form endpoint is configured (inlined at build time). */
export const contactFormEnabled = Boolean(process.env.NEXT_PUBLIC_FORM_ENDPOINT);
