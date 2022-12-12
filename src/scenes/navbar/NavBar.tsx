import React, {useState} from 'react';
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery
} from "@mui/material";
import {Search, Message, DarkMode, LightMode, Notifications, Help, Menu, Close} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {useNavigate} from "react-router-dom";
import {ThemeType} from "../../theme";
import FlexBetween from "../../components/FlexBetween";

const NavBar = () => {
    const user = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const isNoneMobileScreens = useMediaQuery("(min-width:1000px)");

    const theme: ThemeType = useTheme();
    const dark = theme.palette.neutral.dark;
    const neutralLight = theme.palette.neutral.light;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    const fullName = user && `${user.firstName} ${user.lastName}`
     // @ts-ignore
    return (

        <FlexBetween  padding="1rem 6%" >
            <FlexBetween gap="1.75rem">
                <Typography fontWeight="bold" fontSize="clamp(1rem,2rem,2.25rem)" color="primary">
                    FaceBlog
                </Typography>
            </FlexBetween>
        </FlexBetween>
    );
};

export default NavBar;