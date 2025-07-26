import { Box, Typography } from "@mui/material";
import type { ApparelItem } from "../types";
import "../styles/ItemCard.styles.css"
import { PricingOption } from "../enums";

function ItemCard(props:ApparelItem) {
    const { id, creator, title, pricingOption, imagePath, price } = props;

    const pricingTextSelector = ():string => {
        switch(pricingOption) {
            case PricingOption.FREE: return 'FREE';
            case PricingOption.PAID: return `$${price}`;
            case PricingOption.VIEW_ONLY:
            default: return 'View Only';
        }
    }

    return (
        <Box className="itemCardContainer itemColumnFlex">
            <img src={imagePath} alt="" className="itemCardImage" />
            <Box className="itemRowFlex">
                <Box className="itemColumnFlex">
                    <Typography variant="subtitle1" fontWeight={800} color="textPrimary">{title}</Typography>
                    <Typography variant="body1" color="textPrimary">{creator}</Typography>
                </Box>
                <Typography variant="h6" fontWeight={800} color="textPrimary">{pricingTextSelector()}</Typography>
            </Box>
        </Box>
    )
}

export default ItemCard;