import { CONTACT, SITE_NAME, SITE_URL } from "@/lib/constants";

export const privacyPolicy = {
  effectiveDate: "July 19, 2026",
  lastUpdated: "July 19, 2026",
  sections: [
    {
      title: "Introduction",
      paragraphs: [
        `${SITE_NAME} ("we," "us," or "our") operates ${SITE_URL} and provides residential and commercial cleaning services in the Oklahoma City area and surrounding communities.`,
        "This Privacy Policy explains how we collect, use, disclose, and protect information when you visit our website, submit a form, call us, or interact with our advertising.",
        "By using our website, you agree to the practices described in this policy. If you do not agree, please do not use our website.",
      ],
    },
    {
      title: "Information We Collect",
      paragraphs: [
        "We may collect the following types of information:",
      ],
      list: [
        "Contact information you provide, such as your name, email address, phone number, and property details.",
        "Quote and booking information, including square footage, property type (residential or commercial), service type, and maintenance frequency preferences.",
        "Communications you send us through contact forms, quote requests, email, or phone.",
        "Technical and usage information, such as your IP address, browser type, device information, pages visited, and referring URLs.",
        "Advertising and analytics data collected through cookies, pixels, and similar technologies when you interact with our website or ads.",
      ],
    },
    {
      title: "How We Use Your Information",
      paragraphs: [
        "We use the information we collect to:",
      ],
      list: [
        "Respond to quote requests, booking inquiries, and customer support messages.",
        "Provide, schedule, and manage cleaning services.",
        "Improve our website, services, and customer experience.",
        "Measure the performance of our marketing and advertising campaigns.",
        "Send service-related communications and follow-up messages.",
        "Protect our website, business, and users from fraud or misuse.",
        "Comply with legal obligations.",
      ],
    },
    {
      title: "Cookies & Tracking Technologies",
      paragraphs: [
        "Our website may use cookies, web beacons, pixels, and similar technologies to remember preferences, understand how visitors use our site, and measure advertising performance.",
        "You can control cookies through your browser settings. Disabling cookies may affect certain website features.",
      ],
    },
    {
      title: "Google Advertising & Analytics",
      paragraphs: [
        "We may use Google services such as Google Ads, Google Analytics, Google Tag Manager, and conversion tracking to understand website traffic and measure advertising results.",
        "Google may use cookies and similar technologies to show you ads based on your visits to this website and other websites on the Internet. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the Internet.",
        "You may opt out of personalized advertising by visiting Google Ads Settings at https://adssettings.google.com.",
        "You may opt out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on at https://tools.google.com/dlpage/gaoptout.",
        "For more information about how Google uses data, visit https://policies.google.com/technologies/partner-sites.",
      ],
    },
    {
      title: "Third-Party Services",
      paragraphs: [
        "We may share information with trusted third-party service providers that help us operate our business, including:",
      ],
      list: [
        "Form and email delivery providers (such as Web3Forms) used to process quote and contact submissions.",
        "Website hosting, analytics, and advertising platforms (including Google).",
        "Communication tools used to respond to customer inquiries.",
      ],
      paragraphsAfter: [
        "These providers may process information on our behalf according to their own privacy policies and applicable law. We do not sell your personal information.",
      ],
    },
    {
      title: "How We Share Information",
      paragraphs: [
        "We may disclose information when necessary to:",
      ],
      list: [
        "Service providers who assist us in operating our website and business.",
        "Comply with law, regulation, legal process, or governmental request.",
        "Protect the rights, property, or safety of our business, customers, or others.",
        "In connection with a business transfer, such as a merger or acquisition.",
      ],
      paragraphsAfter: [
        "We do not sell or rent personal information to third parties for their own marketing purposes.",
      ],
    },
    {
      title: "Data Retention",
      paragraphs: [
        "We retain personal information only as long as necessary to fulfill the purposes described in this policy, respond to inquiries, provide services, meet legal requirements, and resolve disputes.",
      ],
    },
    {
      title: "Your Choices & Rights",
      paragraphs: [
        "Depending on your location, you may have the right to request access to, correction of, or deletion of certain personal information we hold about you.",
        "You may opt out of marketing emails by contacting us or using unsubscribe instructions when provided.",
        "You may limit certain online tracking through your browser settings and the advertising opt-out tools listed above.",
        "To make a privacy-related request, contact us using the information below.",
      ],
    },
    {
      title: "Children's Privacy",
      paragraphs: [
        "Our website and services are not directed to children under 13, and we do not knowingly collect personal information from children under 13. If you believe a child has provided us personal information, please contact us so we can delete it.",
      ],
    },
    {
      title: "Changes to This Policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time. The updated version will be posted on this page with a revised \"Last Updated\" date. Continued use of our website after changes are posted constitutes acceptance of the updated policy.",
      ],
    },
    {
      title: "Contact Us",
      paragraphs: [
        `If you have questions about this Privacy Policy or our data practices, contact ${SITE_NAME}:`,
      ],
      contact: true,
    },
  ],
} as const;
