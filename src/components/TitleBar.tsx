import { Box } from "@mui/material";
import "../styles/Titlebar.styles.css";

function TitleBar() {
    return (
        <Box bgcolor="background.default" className="titleBarContainer">
            <span className="titleText">CONNECT</span>
        </Box>
    )
}

export default TitleBar;