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
import {setLogout, setMode} from "../../state/slice";

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

    return (
        // @ts-ignore
        <FlexBetween padding="1rem 6%" backgroundColor={"alt"}>
            <FlexBetween gap="1.75rem">
                <Typography fontWeight="bold" fontSize="clamp(1rem,2rem,2.25rem)" color="primary"
                            onClick={() => navigate("/home")} sx={{
                    "&:hover": {color: primaryLight, cursor: "pointer"}
                }}>
                    FaceBlog
                </Typography>
                {isNoneMobileScreens && (
                    // @ts-ignore
                    <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap={"3rem"}
                                 padding={"0.1rem 1.5rem"}>
                        <InputBase placeholder="Search..."/>
                        <IconButton>
                            <Search/>
                        </IconButton>
                    </FlexBetween>
                )}
            </FlexBetween>
            {/*desktop nav*/}
            {isNoneMobileScreens ? (<FlexBetween gap={"2rem"}>
                <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === "dark" ? (
                        <DarkMode sx={{fontSize: "25px"}}/>
                    ) : <LightMode sx={{color: dark, fontSize: "25px"}}/>}
                </IconButton>
                <Message sx={{fontSize: "25px"}}/>
                <Notifications sx={{fontSize: "25px"}}/>
                <Help sx={{fontSize: "25px"}}/>
                <FormControl variant="standard">
                    <Select
                        value={fullName}
                        sx={{
                            backgroundColor: neutralLight,
                            width: "150px",
                            borderRadius: "0.25rem",
                            p: "0.25rem 1rem",
                            "&.MuiSelect-select:focus": {
                                backgroundColor: neutralLight
                            },
                            "&.MuiSvgIcon-root": {
                                pr: "0.25rem",
                                width: "3rem"
                            }
                        }}>
                        <MenuItem value={fullName}>
                            <Typography>{fullName}</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => dispatch(setLogout())}>
                            Log Out
                        </MenuItem>
                    </Select>
                </FormControl>
            </FlexBetween>) : (<IconButton></IconButton>)}
        </FlexBetween>
    );
};

export default NavBar;