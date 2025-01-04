import React, { useEffect, useMemo, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { Box, ListItemIcon, MenuItem } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import SellIcon from '@mui/icons-material/Sell';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import { useDataContext } from '../../Context/DataContext';


export default function PrusuctTableBuyer({buyerId}) {
    const [data, setData] = useState([]); // Ensure data is an array for compatibility
    const [rowCount, setRowCount] = useState(0); // Represents total items, not total pages

    const [status, setStatus] = useState(false);

    const { state, dispatch } = useDataContext();
    const handleClickOpen = (id) => {
        dispatch({
            type: "openDialog", payload: {
                isOpenBuyer: false,
                isOpenProduct: true,
                data: { id },
            }
        });
        setStatus(!status)
    };

    const columns = useMemo(
        () => [

            { header: 'ID', accessorKey: 'id', enableClickToCopy: true },
            { header: 'Name', accessorKey: 'title' },
            {
                header: 'Price Purchase (DA)',
                accessorKey: 'pricePurchace',
                // Custom styling with a primary color
                Cell: ({ cell }) => (
                    <Box
                        component="span"
                        sx={(theme) => ({
                            backgroundColor: theme.palette.primary.main,
                            borderRadius: '0.25rem',
                            color: '#fff',
                            maxWidth: '9ch',
                            p: '0.25rem',
                        })}
                    >
                        {cell.getValue()?.toLocaleString?.('da-DZ', {
                            style: 'currency',
                            currency: 'DZD',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                        })}
                    </Box>
                ),
            }, { header: 'Buyer', accessorKey: 'buyerName' },
            { header: 'Description', accessorKey: 'description' },
            {
                header: 'Price Sale (DA)',
                accessorKey: 'priceSale',
                // Custom conditional format and styling
                Cell: ({ cell }) => {
                    const pricePurchace = cell.row.original.pricePurchace; // Access the current row's pricePurchace
                    return (
                        <Box
                            component="span"
                            sx={(theme) => ({
                                backgroundColor:
                                    cell.getValue() === null
                                        ? theme.palette.error.dark
                                        : cell.getValue() <= pricePurchace
                                            ? theme.palette.warning.dark
                                            : theme.palette.success.dark,
                                borderRadius: '0.25rem',
                                color: '#fff',
                                maxWidth: '9ch',
                                p: '0.25rem',
                            })}
                        >
                            {cell.getValue() === null ? "Not Buyed yet" : cell.getValue()?.toLocaleString?.('da-DZ', {
                                style: 'currency',
                                currency: 'DZD',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                            })}
                        </Box>
                    );
                },
            },
            { header: 'Date', accessorKey: 'date' },
        ],
        []
    );

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });

    useEffect(() => {
        const fetchData = async () => {
            console.log("Fetching data for buyerId:", buyerId); 
            let fetchedData;
    
            if (buyerId) {
                fetchedData = await window.sqlite.personDB?.readProductByIdBuyer(Number(buyerId), pagination.pageIndex + 1, pagination.pageSize);
            } else {
                fetchedData = await window.sqlite.personDB?.readProductsFilter(null, pagination.pageIndex + 1, pagination.pageSize);
            }
    
            setData(fetchedData || []); // Update data state
            
            console.log("Data for table:", fetchedData); // Debug fetched data
        };
    
        fetchData();
    }, [pagination.pageIndex, pagination.pageSize, buyerId, status]);

    
    // Initialize useMaterialReactTable with your columns and data
    const table = useMaterialReactTable({
        columns,
        data,
        manualFiltering: true,
        manualSorting: true,
        manualPagination: true,

        enableColumnFilterModes: true,
        enableColumnOrdering: true,
        enableGrouping: true,
        enableColumnPinning: true,
        enableFacetedValues: true,
        enableRowActions: true,


        onPaginationChange: setPagination,
        rowCount,
        state: { pagination },
        renderRowActionMenuItems: ({ row, closeMenu }) => [
            <MenuItem key={0} onClick={() => {
                closeMenu()
                handleClickOpen(row.original.id); // Pass the id here
            }} sx={{ m: 0 }}>
                <ListItemIcon><SellIcon /></ListItemIcon>Price Sale
            </MenuItem>,
            <MenuItem key={1} onClick={() => {
                closeMenu();

            }} sx={{ m: 0 }}>
                <ListItemIcon><DeleteIcon /></ListItemIcon>Delete
            </MenuItem>,
            <MenuItem key={2} onClick={() => closeMenu()} sx={{ m: 0 }}>
                <ListItemIcon><AutoFixNormalIcon /></ListItemIcon>Update
            </MenuItem>,
        ],

    });

    return (
        <MaterialReactTable
            table={table}
            // Pass pagination props explicitly if required by your setup
            pagination={{
                pageIndex: pagination.pageIndex,
                pageSize: pagination.pageSize,
                onPageChange: (pageIndex) => setPagination(prev => ({ ...prev, pageIndex })),
                onPageSizeChange: (pageSize) => setPagination(prev => ({ ...prev, pageSize })),
            }}
        />
    );
}
