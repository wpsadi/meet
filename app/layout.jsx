import { Inter } from "next/font/google";
import "./globals.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Nav } from "@/components/nav";
import { Foot } from "@/components/foot";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PulseConnect",
  description: "Fast Online video conferencing app",
  icons:{
    icon:"/favicon.ico"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className={inter.className}>
        <div className="sticky top-0">
        <Nav/>
        </div>

        <div className="min-h-[90vh]">
        {children}
        </div>
        <Foot/>
        


      </body>
    </html>
  );
}
