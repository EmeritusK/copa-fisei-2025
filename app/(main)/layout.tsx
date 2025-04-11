import Footer from "./components/footer"
import Header from "./components/header"

// app/(main)/layout.tsx
export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="main-layout min-h-screen bg-background flex flex-col">
            <Header></Header>  
            <main className="flex-grow">{children}</main>
            <Footer></Footer>
        </div>
    )
}