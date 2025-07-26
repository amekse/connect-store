import { Box, Typography } from "@mui/material";
import ActionBar from "../components/ActionBar";
import ContentList from "../components/ContentList";
import TitleBar from "../components/TitleBar";

import "../styles/Home.styles.css";
import useActionbarControl from "../hooks/actionBarControl";
import useFetchHomeCatalog from "../hooks/homeCatalog";
import { useEffect } from "react";

function Home() {
    const controlBarActions = useActionbarControl();
    const { showList, initialize, loading: listLoading } = controlBarActions;
    const { apparelCatalog, isPending: fetchLoading, error } = useFetchHomeCatalog();

    useEffect(() => {
        if (apparelCatalog && apparelCatalog.length > 0) {
            initialize(apparelCatalog);
        }
    }, [apparelCatalog])
    
    return (
        <Box bgcolor="background.paper" className="homeContainer">
            <TitleBar />
            <Box className="homeContentSection">
                <ActionBar {...controlBarActions} />
                {
                    error ? <Typography color="error">Oops, something went wrong.</Typography> :
                    <ContentList showList={showList} loading={fetchLoading} />
                }
            </Box>
        </Box>
    )
}

export default Home;