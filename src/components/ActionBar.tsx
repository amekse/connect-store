import useActionbarControl from "../hooks/actionBarControl";

function ActionBar() {
    const { showList, loading, actionBarState, initialize, setFilterFree, setFilterPaid, setFilterViewOnly, searchByKeyword, setPricingMax, setPricingMin, setSorting } = useActionbarControl();

    return (<>Action Bar</>)
}

export default ActionBar;