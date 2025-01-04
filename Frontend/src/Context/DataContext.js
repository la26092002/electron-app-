import React, { createContext, useContext, useMemo, useReducer } from "react";

// Define the initial state
const initialState = {
  Buyers: [],
  Products: [],
  FilterProducts: [],
  Dialog: {
    isOpenBuyer: false,
    isOpenProduct: false,
    isOpenProductDelete: false,
    data: null, // You can store any dialog-related data here
  },
  research: {//this part is for research
    buyerId: null,
    productId: null,
  },
  
};

// Define the reducer function to handle state transitions
const reducer = (state, action) => {
  switch (action.type) {
    case "addProduct":
      return { ...state, Products: [action.payload, ...state.Products] };
    case "getProducts":
      return { ...state, Products: action.payload };
      case "modifyProduct":
        return {
            ...state,
            Products: state.Products.map((product) =>
              product.id === action.payload.id
                ? {
                    ...product,
                    title: action.payload.title,
                    pricePurchace: action.payload.pricePurchace,
                    description: action.payload.description,
                  }
                : product
            ),
        };
    
    case "modifyProductPriceSale":
      return {
        ...state,
        Products: state.Products.map((product) =>
          product.id === action.payload.id
            ? { ...product, priceSale: action.payload.priceSale }
            : product
        ),
      };

      case "deleteProduct":
    return {
        ...state,
        Products: state.Products.filter((product) => product.id !== action.payload.id),
    };



    case "addBuyer":
      return { ...state, Buyers: [action.payload, ...state.Buyers] };
    case "getBuyers":
      return { ...state, Buyers: action.payload };
    case "modifyBuyer":
      return {
        ...state,
        Buyers: state.Buyers.map((buyer) =>
          buyer.id === action.payload.id ? action.payload : buyer
        ),
      };

    // Dialog actions
    case "openDialog":
      return {
        ...state,
        Dialog: action.payload, // Open the dialog and pass the payload (optional)
      };
    case "closeDialog":
      return {
        ...state,
        Dialog: {
          isOpenBuyer: false,
          isOpenProduct: false,
          isOpenProductDelete: false,
          isOpenProductUpdate: false,
          data: null,
        }, // Close the dialog and clear any data
      };
    case "setDialogData":
      return {
        ...state,
        Dialog: { ...state.Dialog, data: action.payload }, // Set or modify the dialog data
      };



    //
    case "getFilterProducts":
      return { ...state, FilterProducts: action.payload };





    // Update research state
    case "setResearchBuyerId":
      return {
        ...state,
        research: { ...state.research, buyerId: action.payload,productId:null },
      };
    case "setResearchProductId":
      return {
        ...state,
        research: { ...state.research, productId: action.payload,buyerId:null },
      };

    default:
      throw new Error();
  }
};

// Create the context
export const DataContext = createContext();

// Create a component that will provide the context
export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

// Create a hook to use the context
export const useDataContext = () => {
  return useContext(DataContext);
};
