import AppAppBar from "@/component/header/header.user";
import { Container, } from "@mui/material";


export default function RootLayout({ children }: { children: React.ReactNode }) {

    return (
        <>
            <Container sx={{
                marginBottom: "15vh",

            }}>
                <AppAppBar />
            </Container>
            <Container>
                {children}
            </Container>
        </>


    )
}
