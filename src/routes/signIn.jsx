import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from "../components/Copyright";
import {useState} from "react";
import {createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from "../firebase-config";
import {useAuth} from "../contexts/AuthContext";
const theme = createTheme();

export default function SignIn() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    // const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("");
            setLoading(true);
            await login(loginEmail, loginPassword);
            console.log("Operation completed");
            // history.push("/");
        } catch(e) {
            setError("Failed to log in");
            console.log(e.message);
        }

        setLoading(false)
    }

    //
    // const login = async (event: React.FormEvent<HTMLFormElement>) => {
    //     try{
    //         event.preventDefault();
    //         const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    //         console.log(user)
    //     }catch (e) {
    //         console.log(e.message);
    //     }
    //
    // }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(event)=>{setLoginEmail(event.target.value)}}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(event)=>{setLoginPassword(event.target.value)}}


                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}



export function SignInTemplate() {
    const [registerEmail, setRegisterEmail] = useState("");
    const [RegisterPassword, setRegisterPassword] = useState("");

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser)=>{
        setUser(currentUser)
    });

    const register = async () => {
        try{
            const user = await createUserWithEmailAndPassword(auth, registerEmail, RegisterPassword);
            console.log(user)
        }catch (e) {
            console.log(e.message);
        }
    }

    const login = async () => {
        try{
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            console.log(user)
        }catch (e) {
            console.log(e.message);
        }

    }

    const logout = async () => {
        await signOut(auth);
    }

    return(
        <div>
            <div>
                <h3> Register User </h3>
                <input placeholder="Email..." onChange={(event) => {setRegisterEmail(event.target.value)}}/>
                <input placeholder="Password..." onChange={(event)=>{setRegisterPassword(event.target.value)}}/>
                <button onClick={register}> Create User</button>
            </div>

            <div>
                <h3> Login </h3>
                <input
                    placeholder="Email..."
                    onChange={(event)=>{setLoginEmail(event.target.value)}}
                />
                <input
                    placeholder="Password..."
                    onChange={(event)=>{setLoginPassword(event.target.value)}}
                />
                <button onClick={login}> Login</button>
            </div>

            <h4> User Logged In: </h4>
            {user?.email}
            <button onClick={logout}> Sign Out</button>
        </div>

    );

}
