import {createTheme, ThemeProvider} from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FileUpload from "../components/FIleUpload";
import {Link} from "react-router-dom";
import {useState} from "react";
import {FormControl, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

const theme = createTheme();

export default function NewGift() {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [productLink, setProductLink] = useState("");
    const [photoLink, setPhotoLink] = useState("");
    const [category, setCategory] = useState('');
    const [isValidLink, setIsValidLink] = useState('');

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    function handleSubmit(e) {
        //    TODO create state variables for all of the fields
        //  1. create a json object
        //  2. make an http request
        const obj = {
            "title": title,
            "price": price,
            "link": productLink,
            "category": category
        }
        console.log(obj);
    }

    function urlPatternValidation(URL){
        const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
        return regex.test(URL);
    }

    function handleLinkChange(e) {
        const tmpLink = e.target.value;
        setProductLink(tmpLink);
    }

    function validateLink () {
        setIsValidLink(!productLink || urlPatternValidation(productLink));
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Typography component="h1" variant="h5">
                        Add your Gift suggestion
                    </Typography>

                    <Box component="form" noValidate sx={{mt: 6}}>
                        <Grid item xs={6} sl={6} style={{margin:'0 0 10px 0'}}>
                            <FormControl fullWidth required>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={category}
                                    label="Category"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Anniversary</MenuItem>
                                    <MenuItem value={20}>Christmas</MenuItem>
                                    <MenuItem value={30}>Birthday</MenuItem>
                                    <MenuItem value={30}>Valentines</MenuItem>
                                    <MenuItem value={30}>Woman</MenuItem>
                                    <MenuItem value={30}>Man</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sl={6}>
                                <TextField
                                    autoComplete="title"
                                    name="title"
                                    required
                                    fullWidth
                                    id="title"
                                    label="title"
                                    autoFocus
                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="price"
                                    label="price"
                                    name="price"
                                    autoComplete="price"
                                    onChange={(e) => {
                                        setPrice(e.target.value)
                                    }}
                                />

                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="link"
                                    label="link"
                                    name="link"
                                    autoComplete="link"
                                    onChange={handleLinkChange}
                                    onBlur={validateLink}
                                    error={!isValidLink}
                                />

                            </Grid>
                            <Grid item xs={12}>
                                <FileUpload/>
                            </Grid>
                        </Grid>
                        <Link to={'/'} style={{textDecoration: "none"}}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                onClick={handleSubmit}
                            >
                                Add gift to the list
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
