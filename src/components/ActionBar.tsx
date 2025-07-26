import "../styles/ActionBar.styles.css";
import { Box, Button, Checkbox, FormControlLabel, Input, InputAdornment, MenuItem, Select, Slider, Typography, type SelectChangeEvent } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { ApparelCatalogSortingOrder } from "../enums";
import type { ActionbarStore } from "../types";
import { useEffect, useState } from "react";

function ActionBar( props:ActionbarStore ) {
    const { loading, actionBarState, setFilterFree, setFilterPaid, setFilterViewOnly, searchByKeyword, setPricingMax, setPricingMin, setSorting, resetFilters } = props;
    const [localPriceRangeMem, setLocalPriceRangeMem] = useState<number[]>([0, 999]);

    const handleSort = (event: SelectChangeEvent) => {
        setSorting(event.target.value as ApparelCatalogSortingOrder);
    }

    const handlePriceRange = (_event: Event, newValue: number[]) => {
        setPricingMin(newValue[0]);
        setPricingMax(newValue[1]);
        setLocalPriceRangeMem(newValue);
    }

    useEffect(() => {
        setLocalPriceRangeMem([actionBarState.filterMinPricing, actionBarState.filterMaxPricing])
    }, [actionBarState])

    return (
        <Box className="actionBarContainer">
            <Input fullWidth disableUnderline placeholder="Find the items you're looking for" sx={{ height: '48px' }} 
                endAdornment={
                    <InputAdornment position="end">
                        <SearchIcon />
                    </InputAdornment>
                }
                onChange={(e) => searchByKeyword(e.target.value)}
                value={actionBarState.searchKeyword}
            />
            <Box bgcolor="background.default" className="pricingOptionBar">
                <Box className="boxRowPricingOptions">
                    <Typography noWrap>Pricing Option</Typography>
                    <FormControlLabel label={<Typography noWrap>Paid</Typography>} control={<Checkbox checked={actionBarState.filterPaid} onChange={setFilterPaid} />} />
                    <FormControlLabel label={<Typography noWrap>Free</Typography>} control={<Checkbox checked={actionBarState.filterFree} onChange={setFilterFree} />} />
                    <FormControlLabel label={<Typography noWrap>View Only</Typography>} control={<Checkbox checked={actionBarState.filterViewOny} onChange={setFilterViewOnly} />} />
                </Box>
                <Box className="boxRowSliderAndReset">
                    <Slider 
                        onChange={handlePriceRange}
                        value={localPriceRangeMem}
                        style={{ width: '30%' }}
                        valueLabelDisplay="auto"
                        min={0}
                        max={999}
                        disabled={!(actionBarState.filterPaid && !actionBarState.filterFree && !actionBarState.filterViewOny)}
                        color="secondary"
                    />
                    <Button sx={{ color: '#ffffff' }} onClick={resetFilters}>Reset</Button>
                </Box>
            </Box>
            <Box className="boxRowSortBy">
                <Typography color="textPrimary">Sort by</Typography>
                <Select value={actionBarState.sortingOrder} onChange={handleSort} variant="standard" defaultValue={ApparelCatalogSortingOrder.NAME} sx={{ width: '30vh', bgcolor: 'background.paper' }}>
                    <MenuItem value={ApparelCatalogSortingOrder.NAME}>Name</MenuItem>
                    <MenuItem value={ApparelCatalogSortingOrder.PRICEASC}>Lower Price</MenuItem>
                    <MenuItem value={ApparelCatalogSortingOrder.PRICEDESC}>Higher Price</MenuItem>
                </Select>
            </Box>
        </Box>
    )
}

export default ActionBar;