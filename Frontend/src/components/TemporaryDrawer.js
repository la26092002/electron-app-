import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import CategoryIcon from "@mui/icons-material/Category";
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import StoreIcon from '@mui/icons-material/Store';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import FilterListIcon from '@mui/icons-material/FilterList';
import HomeIcon from '@mui/icons-material/Home';

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function TemporaryDrawer({ status, setStatus }) {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(status);
  }, [status]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    setStatus(newOpen);
  };

  const getIconComponent = (index) => {
    switch (index) {
      case 0:
        return <AddBusinessIcon />;
      case 1:
        return <Diversity3Icon />;
      case 2:
        return <FilterListIcon />;
      case 3:
        return <PointOfSaleIcon />;
        

      default:
        return null;
    }
  };



  const clickComponent = (index) => {
    switch (index) {
      case 0:
        navigate("product");
        break;
      case 1:
        navigate("Buyers");
        break;
      case 2:
        navigate("ProductsFilter");
        break;
      case 3:
        navigate("Benefits");
        break;


      default:
        navigate("/product");
        break;
    }
  };




  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {["Products", "Buyers", "Products Filter", "Benefits"].map(
          (text, index) => (
            <ListItem key={text} onClick={() => clickComponent(index)} disablePadding>
              <ListItemButton >
                <ListItemIcon>{getIconComponent(index)}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>

    </Box>
  );

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
