import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import FuseUtils from "@fuse/utils";
import { API } from "aws-amplify";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/auth";
import JwtService from "src/app/auth/services/jwtService";
import jwtServiceConfig from "src/app/auth/services/jwtService/jwtServiceConfig";

export const getProduct = createAsyncThunk(
  "userDatabase/product/getProduct",
  async (productId, { dispatch, getState }) => {
    // const response = await axios.get(`/api/ecommerce/products/${productId}`);
    //  const data = await response;
    const query = `query MyQuery {
    getBranch (id:"${productId}"){
      address {
        address_line1
        address_line2
        city
        country
        state
        zip_code
      }
      _id
      branch_name
      contacts {
        contact
        name
        tag
      }
      email
      
      no_of_floors
      org_id
      floors {
        _id
        floor
        name
        no_of_rooms
        status
      }
      rooms {
        _id
        name
        status
        no_of_beds
        floor_id
      }
      category
      description
    }
  }
  
    `;
    let result = null;
    try {
      const response = await API.graphql({
        query: query,
      });

      result = response?.data?.getBranch;

      let floors = result?.floors?.map((floor) => {
        const rooms = result?.rooms?.filter(
          (room) => room?.floor_id === floor?._id
        );
        return {
          ...floor,
          rooms: rooms,
        };
      });

      result = { ...result, id: result?._id, floors: floors };
      console.log("resp product", result);
    } catch (error) {
      if (error?.response?.status == 403) {
        JwtService.logout();
      }
      console.log("getOrg ERROR", error);
    }
    const data = await result;
    return data;
  }
);

export const removeProduct = createAsyncThunk(
  "userDatabase/product/removeProduct",
  async (val, { dispatch, getState }) => {
    const { id } = getState().userDatabase.product;
    await axios.delete(`/api/ecommerce/products/${id}`);
    return id;
  }
);

export const saveProduct = createAsyncThunk(
  "userDatabase/product/saveProduct",
  async (params, { dispatch, getState, rejectWithValue }) => {
    if (params?.id) {
      params = { ...params, id: undefined, wifiUserCreatedTime: undefined };
    }

    try {
      const response = await JwtService.post(
        jwtServiceConfig.addWifiUser,
        params
      );
      const data = await response?.data;
      console.log("saveeeeeeeeeeeeeeeeeeeeeeeeeeeee", response);
      return data;
    } catch (error) {
      return rejectWithValue("Something went Wrong");
    }
  }
);

const productSlice = createSlice({
  name: "userDatabase/product",
  initialState: null,
  reducers: {
    resetProduct: () => null,
    newProduct: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          wifiUserName: "",
          wifiUserLoginId: "",
          wifiUserPassword: "",
          wifiUserMobileNo: "",
          wifiUserMac: "",
          wifiUserMaxDevices: null,
          institutionBranchId: null,
          institutionMasterId: null,
          institutionGatewayDetailId: null,
          wifiUserCreatedBy: null,
          statusMasterId: 1,
          wifiUsersType: null,
        },
      }),
    },
  },
  extraReducers: {
    [getProduct.fulfilled]: (state, action) => action.payload,
    [saveProduct.fulfilled]: (state, action) => action.payload,
    [removeProduct.fulfilled]: (state, action) => null,
  },
});

export const { newProduct, resetProduct } = productSlice.actions;

export const selectProduct = ({ userDatabase }) => userDatabase.product;

export default productSlice.reducer;
