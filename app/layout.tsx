import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import Link from "next/link";
import Image from 'next/image';
export const metadata = {
    title: 'Adeos FE',
    description: 'Extract engineering drawing using ocr and image processing',
    openGraph: {
        title: 'Adeos FE Documentation',
        description: 'Extract engineering drawing using ocr and image processing',
        url: 'https://adeos-fe.coffeeinc.in',
        images: [
            {
                url: '/favicon.ico',
                width: 1200,
                height: 630,
                alt: 'Adeos FE Open Graph Image'
            }
        ],
        siteName: 'Adeos FE Docs'
    },
    twitter: {
        card: 'summary_large_image',
        site: '@coffeeinc_in',
        creator: '@coffeeinc_in'
    }
}

const banner = <Banner storageKey="opensource-announcement">📢 This documentation is now open source! We welcome all developers to contribute and share best practices for React, Next.js, backend development, and more. <Link href="https://github.com/coffeeinc-in/benchmark.git">Join us on GitHub</Link> 🚀</Banner>
const navbar = (
    <Navbar
        logo={
            <Link href={"/"} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <Image src="/favicon.ico" alt="Adeos FE Logo" width={32} height={32} />
                <span className="text-lg font-bold">
                    Adeos FE
                </span>
            </Link>
        }
    />
)
const footer = <Footer>                            <span className="flex items-center gap-2 ">
    Powered by{" "}
    <img
        alt="Coffee"
        style={{ height: "2.5rem", width: "auto" }}
        src="https://coffeeinc.in/assets/coffee_2023_low_res.png"
    />
</span></Footer>

export default async function RootLayout({ children }) {
    return (
        <html
            // Not required, but good for SEO
            lang="en"
            // Required to be set
            dir="ltr"
            // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
            suppressHydrationWarning
        >
            <Head
            // ... Your additional head options
            >
                <link rel="shortcut icon" href="/images/general/icon.svg" />
                <link rel="stylesheet" href="/styles/nextra-overrides.css" />
                {/* Your additional tags should be passed as `children` of `<Head>` element */}
            </Head>
            <body>
                <Layout
                    banner={banner}
                    navbar={navbar}
                    pageMap={await getPageMap()}
                    docsRepositoryBase="https://github.com/coffeeinc-in/adeos-fe-docs"
                    footer={
                        footer
                    }
                // ... Your additional layout options
                >
                    {children}
                </Layout>
            </body>
        </html>
    )
}