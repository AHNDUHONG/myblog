import { ReactNode } from "react"
import Sidebar from "../sidebar/Sidebar";

const Layout = ({ children}: { children: ReactNode}) => {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
};

export default Layout;