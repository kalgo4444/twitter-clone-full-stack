import NextAuthProvider from '@/providers/next-auth-provider'
import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '../providers/theme-provider'
import '../styles/globals.css'

const jet_brains = JetBrains_Mono({
	variable: '--font-jetbrains-mono',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: 'Twitter Clone'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
		>
			<body className={`${jet_brains.className} antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					<NextAuthProvider>{children}</NextAuthProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
