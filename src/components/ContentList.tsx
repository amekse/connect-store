import { Box, Button } from "@mui/material";
import type { ContentListProps } from "../types";
import ItemCard from "./ItemCard";
import ItemCardSkeleton from "./ItemCardSkeleton";
import "../styles/ContentList.styles.css";
import { useEffect, useRef, useState } from "react";
import { itemLoadLimit } from "../constants";

const skeletonArray = Array.from({length: 12}, (_,i)=>i);

function ContentList(props:ContentListProps) {
    const { loading, showList = [] } = props;
    const paginatorRef = useRef(null);
    const [paginate, setPaginate] = useState(false);
    const [itemLimit, setItemLimit] = useState(itemLoadLimit);

    useEffect(() => {
        if (!loading) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    setPaginate(entry.isIntersecting);
                },
                {
                    root: null,
                    rootMargin: '0px',
                    threshold: 0.1
                }
            );

            const currentPaginator = paginatorRef.current;
            if(currentPaginator) {
                observer.observe(currentPaginator);
            }

            return () => {
                if (currentPaginator) {
                    observer.unobserve(currentPaginator);
                }
            }
        }
    }, [loading])

    const handleLoadMore = () => {
        if (showList.length - itemLimit >= itemLoadLimit) {
            setItemLimit(itemLimit + itemLoadLimit);
        } else {
            setItemLimit(itemLimit + (showList.length - itemLimit));
        }
    }

    useEffect(() => {
        if (paginate) {
            handleLoadMore()
        }
    }, [paginate])


    if (loading) {
        return (
            <Box className="contentListContainer">
                {skeletonArray.map((i) => <ItemCardSkeleton key={i} />)}
            </Box>
        )
    }

    return(
        <Box className="contentListContainer">
            {
                !loading && showList.map((item, index) => index < itemLimit && <ItemCard key={item.id} {...item} />)
            }
            <div style={{ display: itemLimit < showList.length ? 'block' : 'none' }} ref={paginatorRef} >
                <Button onClick={handleLoadMore} variant="text">Load more</Button>
            </div>
        </Box>
    )
}

export default ContentList;