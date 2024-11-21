import React, { useEffect, useRef, useState } from 'react';
import Navbar from "../../../Navbar/Navbar";
import "../livecdr.css";
import ProductTable from './productTable';
import withReducer from 'app/store/withReducer';
import reducer from '../store';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { searchFilter, setProductsSearchText } from '../store/productSlice';


const Product = () => {

    const dispatch = useDispatch();
    const [filterLabel, setFilterLabel] = useState([
        "Country", "Mobile Number", "Virtual Number", "Transition ID", "DID", "Start Date", "End Date", "Contestant Name", "Status"
    ]);
    const [openFilterOption, setOpenFilterOption] = useState(false);
    const [filterList, setFilterList] = useState([]);
    const filterRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchColumn, setSearchColumn] = useState("");
    const searchText = useSelector((state) => state?.LiveCDR?.product?.searchText);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setOpenFilterOption(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, []);

    // HANDLING SEARCH FUNCTION
    const handleSearchChange = ((event) => {
        dispatch(setProductsSearchText(event.target.value));
    }
    );

    return (
        <div>
            {/* <Navbar Component={() => <div></div>} sx={{ minHeight: 40 }} /> */}
            <div className="p-[20px] sm:p-[30px]">
                <div className='flex justify-between items-center mb-20'>
                    <h1 className='font-500'>Live CDR</h1>
                    <Paper
                        component={motion.div}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                        className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0"
                    >
                        <FuseSvgIcon color="disabled">heroicons-solid:search</FuseSvgIcon>

                        <Input
                            placeholder="Search User"
                            className="flex flex-1"
                            disableUnderline
                            fullWidth
                            value={searchText}
                            inputProps={{
                                'aria-label': 'Search',
                            }}
                            onChange={(ev) => handleSearchChange(ev)}
                        />
                    </Paper>
                </div>
                <ProductTable searchTerm={searchTerm} searchColumn={searchColumn} />
            </div>
        </div>
    )
}

export default withReducer('LiveCDR', reducer)(Product)
