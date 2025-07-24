import { Box } from "@mui/material";
import ActionBar from "../components/ActionBar";
import ContentList from "../components/ContentList";
import TitleBar from "../components/TitleBar";

import "../styles/Home.styles.css";
import useActionbarControl from "../hooks/actionBarControl";

function Home() {
    const controlBarActions = useActionbarControl();
    const {} = controlBarActions;
    
    return (
        <Box bgcolor="background.default" className="homeContainer">
            <TitleBar />
            <Box bgcolor="background.paper" className="homeContentSection">
                <ActionBar {...controlBarActions} />
                <ContentList />
            </Box>
        </Box>
    )
}

export default Home;