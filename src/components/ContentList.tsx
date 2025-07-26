import { Box } from "@mui/material";
import type { ContentListProps } from "../types";
import ItemCard from "./ItemCard";
import ItemCardSkeleton from "./ItemCardSkeleton";
import "../styles/ContentList.styles.css";

const skeletonArray = Array.from({length: 12}, (_,i)=>i);

function ContentList(props:ContentListProps) {
    const { loading, showList = [] } = props;

    return(
        <Box className="contentListContainer">
            {
                loading && skeletonArray.map((i) => <ItemCardSkeleton key={i} />)
            }
            {
                !loading && showList.map((item) => <ItemCard key={item.id} {...item} />)
            }
        </Box>
    )
}

export default ContentList;