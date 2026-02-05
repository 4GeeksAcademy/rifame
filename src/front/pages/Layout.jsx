import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"

export const Layout = () => {
    return (
        <ScrollToTop>
            <div style={{minHeight: "100vh", display: "flex", flexDirection: "column"}}>
                <Navbar />
                <main style={{flex: 1}}>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </ScrollToTop>
    )
}