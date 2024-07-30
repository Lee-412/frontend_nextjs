
import AppHeader from "@/component/header/header.login";
import { Container, } from "@mui/material";


export default function RootLayout({ children }: { children: React.ReactNode }) {


    return (

        <Container>
            <AppHeader />
            <div style={{ marginBottom: "10vh" }}></div>
            {children}
        </Container>

    )
}
