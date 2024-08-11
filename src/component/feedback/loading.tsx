import { Container, Typography } from "@mui/material";
import { Hourglass } from "react-loader-spinner";
import Divider from '@mui/material/Divider';


const LoadingPage = () => {
    return (
        <Container
            sx={{
                width: '100vw',
                height: '96vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                textAlign: 'center',
            }}>
            <Hourglass
                visible={true}
                height="80"
                width="80"
                ariaLabel="hourglass-loading"
                colors={['#306cce', '#72a1ed']}
            />
            <Divider sx={{
                width: '20vw',
                mt: '5vh'

            }}></Divider>
            <Typography variant="h6" mt={2}>Loading data...</Typography>

        </Container >
    )
}

export default LoadingPage;
