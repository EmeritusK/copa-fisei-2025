import Header from "./components/header"
import Footer from "./components/footer"

// app/(main)/layout.tsx
export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="main-layout min-h-screen flex flex-col" style={{ background: 'var(--background)' }}>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    )
}