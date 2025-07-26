import { Box, Skeleton } from "@mui/material";
import "../styles/ItemCard.styles.css"

function ItemCard() {
    return (
        <Box className="itemCardContainer itemColumnFlex itemCardSkeletonContainer">
            <Skeleton height={'90%'} width={'100%'} />
            <Skeleton height={30} width={'100%'} />
        </Box>
    )
}

export default ItemCard;