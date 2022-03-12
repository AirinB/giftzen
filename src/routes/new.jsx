import {Box, Card, Container, Link, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import {styled} from "@mui/material/styles";
import Page from "../components/Page";
import RegisterForm from "../components/RegisterForm";



const SectionStyle = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: 464,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(2, 0, 2, 2)
}));


const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(12, 0)
}));

export default function NewAccount() {
    return (
        <>
                 <div>
                    Already have an account? &nbsp;
                    <Link underline="none" variant="subtitle2" component={RouterLink} to="/login">
                        Login
                    </Link>
                </div>

            <Container>
                <ContentStyle>
                    <Box sx={{ mb: 5 }}>
                        <Typography variant="h4" gutterBottom>
                            Get started absolutely free.
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                            Free forever. No credit card needed.
                        </Typography>
                    </Box>

                    {/*<AuthSocial />*/}

                    <RegisterForm />

                    <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
                        By registering, I agree to Minimal&nbsp;
                        <Link underline="always" color="textPrimary">
                            Terms of Service
                        </Link>
                        &nbsp;and&nbsp;
                        <Link underline="always" color="textPrimary">
                            Privacy Policy
                        </Link>
                        .
                    </Typography>

                    <Typography
                        variant="subtitle2"
                        sx={{
                            mt: 3,
                            textAlign: 'center',
                            display: { sm: 'none' }
                        }}
                    >
                        Already have an account?&nbsp;
                        <Link underline="hover" to="/login" component={RouterLink}>
                            Login
                        </Link>
                    </Typography>
                </ContentStyle>
            </Container>

        </>

    );
}
