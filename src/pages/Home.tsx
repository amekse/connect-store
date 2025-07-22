import ActionBar from "../components/ActionBar";
import ContentList from "../components/ContentList";
import TitleBar from "../components/TitleBar";

import "../styles/Home.styles.css";

function Home() {
    return (
        <div className="homeContainer">
            <TitleBar />
            <ActionBar />
            <ContentList />
        </div>
    )
}

export default Home;