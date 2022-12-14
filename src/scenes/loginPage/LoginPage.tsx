import React from 'react';
import {Box, Typography, useMediaQuery, useTheme} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {ThemeType} from "../../theme";

const LoginPage = () => {
    const theme: ThemeType = useTheme()
    const navigate = useNavigate();
    const isNoneMobileScreens = useMediaQuery("(min-width:1000px)")
    return (
        <Box>
            <Box width="100%" sx={{backgroundColor: theme.palette.background.alt}} p="1rem 6%" textAlign="center">
                <Typography fontWeight="bold" fontSize="32px" color="primary">
                    Face-blog
                </Typography>
            </Box>
            <Box sx={{backgroundColor: theme.palette.background.alt}} width={isNoneMobileScreens ? "50%" : "93%"}
                 p={"2rem"} m={"2rem auto"} borderRadius={"1.5rem"}>
                <Typography fontWeight={"500"} variant={"h5"} sx={{mb: "1.5rem"}}>
                    Welcome welcome
                </Typography>
            </Box>
        </Box>

    );
};

export default LoginPage;