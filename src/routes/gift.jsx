import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  capitalize,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  Snackbar,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { v4 } from "uuid";
import { CategoriesContext } from "../contexts/CategoriesContext";
import { addGift, getGiftByAsin } from "../firebase/detabase";
import { AuthContext } from "../contexts/AuthContext";
import { Alert } from "@mui/lab";

const theme = createTheme();
// const baseUrl =  'https://amazon-mock-server.vercel.app'
const baseUrl = "http://localhost:8080";

export default function NewGift() {
  const { currentUser } = useContext(AuthContext);
  const params = useParams();
  const navigate = useNavigate();
  const { categoryName: categoryNameFromProps } = params;

  const { categoriesByName, categories } = useContext(CategoriesContext);
  const [message, setMessage] = useState("");
  const [amazonUrl, setAmazonUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState(
    categoriesByName[categoryNameFromProps]
  );
  const [isValidLink, setIsValidLink] = useState("");

  useEffect(() => {
    setCategory(categoriesByName[categoryNameFromProps]);
    console.log(categoryNameFromProps, categoriesByName[categoryNameFromProps]);
  }, [categoriesByName, categoryNameFromProps]);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log({
      amazonUrl,
      category,
    });
    setIsLoading(true);

    fetch(`http://localhost:8080/parse-amazon?url=${amazonUrl}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.asin) {
          getGiftByAsin(data.asin).then(async (gifts) => {
            if (gifts && gifts.length > 0) {
              // TODO: Add stat in UI.
              console.log("Gift already exists");
              setMessage("Gift already exists");
            } else {
              const newGift = {
                ...data,
                categoryId: category,
                id: v4(),
                addedBy: currentUser.uid,
                addedOn: Date.now(),
              };
              await addGift(newGift).catch(() => setIsLoading(false));
              setMessage("Successfully added new item.");
              navigate(`/category/${categories[category]}`);
            }
            setIsLoading(false);
          });
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  function urlPatternValidation(URL) {
    const regex = new RegExp(
      "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
    );
    return regex.test(URL);
  }

  function handleLinkChange(e) {
    const tmpLink = e.target.value;
    setAmazonUrl(tmpLink);
  }

  function validateLink() {
    setIsValidLink(!amazonUrl || urlPatternValidation(amazonUrl));
  }

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        autoHideDuration={3000}
        open={!!message}
        onClose={() => setMessage("")}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert onClose={() => setMessage("")} severity="warning">
          {message}
        </Alert>
      </Snackbar>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Add your Gift suggestion
          </Typography>

          <Box component="form" noValidate sx={{ mt: 6 }}>
            <Grid item xs={6} sl={6} style={{ margin: "0 0 10px 0" }}>
              <FormControl fullWidth required>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Category"
                  onChange={handleChange}
                >
                  {Object.entries(categories).map(
                    ([categoryId, categoryName]) => (
                      <MenuItem key={categoryId} value={categoryId}>
                        {capitalize(categoryName)}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sl={6}>
                <TextField
                  autoComplete="Amazon Url"
                  name="amazon-url"
                  required
                  fullWidth
                  id="amazon-url"
                  label="Amazon Url"
                  autoFocus
                  onChange={handleLinkChange}
                  onBlur={validateLink}
                />
              </Grid>
            </Grid>
            {/*TODO make it a new page thank you for your contribution */}
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
                disabled={!isValidLink || isLoading}
                endIcon={isLoading ? <CircularProgress size={16} /> : null}
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
