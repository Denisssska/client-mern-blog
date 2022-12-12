import React from 'react';
import styled, {StyledComponent} from "@emotion/styled";
import {Box, BoxTypeMap, Theme} from "@mui/material";
import {OverridableComponent} from "@mui/material/OverridableComponent";
import {PropsOf} from "@emotion/react";


const FlexBetween: StyledComponent<PropsOf<OverridableComponent<BoxTypeMap>> & { theme?: Theme }, {}, {}> = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

})
export default FlexBetween;