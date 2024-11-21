import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import JwtService from "src/app/auth/services/jwtService";
import jwtServiceConfig from "src/app/auth/services/jwtService/jwtServiceConfig";
import dataReducer from "src/reducers/dataReducer";

export const getGateway = createAsyncThunk(
  "products/getGateway",
  async (params, { dispatch, getState }) => {
    const { ...otherParams } = params
    const data = {
      startIndex:0,
      lastIndex:10,
      "institutionMasterId":getState()?.user?.data?.institutionMasterId,
      ...otherParams,
    };
    let result = null;
    try {
      const response = await JwtService.post(
        jwtServiceConfig.getAllGateway,
        params
      );
      result = response?.data?.content;
      result = result.map(function (item) {
        return {
          ...item,
          id: item.institutionGatewayDetailId,
          total: response?.data?.totalNumberOfElements,
        };
      });
      result.total = response?.data?.totalNumberOfElements;
    } catch (error) {
      if (error?.response?.status === 403) {
        JwtService.logout();
      }
      throw error;
    }
    return result;
  }
);

export const addGatewayDetails = createAsyncThunk(
  "institutionGateWayDetails/addNewInstitutionGatewayDetails",
  async (params, { dispatch, getState }) => {
    console.log("vina", params);
    const data = {
      startIndex: 0,
      lastIndex: 10,
      ...params,
    };
    let result = null;
    const master = getState()?.user?.data;
    console.log(master, "master");
    console.log(
      params.institutionGatewaySecreatKey,
      "params.institutionGatewaySecreatKey"
    );
    try {
      const response = await JwtService.post(
        jwtServiceConfig.addGateways +
        "?institutionGatewaySecreatKey=" +
        params.institutionGatewaySecreatKey,
        {
          // ...data,
          institutionGatewayStatusId: data?.institutionGatewayStatusId,
          institutionGatewayVersion: data?.institutionGatewayVersion,
          institutionGatewayAuthdir: data?.institutionGatewayAuthdir,
          institutionGatewayLocation: data?.institutionGatewayLocation,
          institutionGatewayHashName: data?.institutionGatewayHashName,
          institutionGatewayUrl: data?.institutionGatewayUrl,
          institutionGatewayMac: data?.institutionGatewayMac,
          institutionGatewaySerialNo: data?.institutionGatewaySerialNo,
          institutionBranchId: data?.institutionBranchId,
          institutionGatewayName: data?.institutionGatewayName,

          institutionMasterId: data?.institutionMasterId,
          institutionGatewayCreatedBy: master?.userId,
        }
      );
      result = response?.data;
      console.log(response, "respo");
      result = result.map(function (item) {
        return {
          ...item,
          id: item.institutionGatewayDetailId,
          total: response?.data?.totalNumberOfElements,
        };
      });
    } catch (error) {
      if (error?.response?.status == 403) {
        JwtService.logout();
      }
    }
    return result;
  }
);

export const updateGatewayDetails = createAsyncThunk(
  "institutionGateWayDetails/addNewInstitutionGatewayDetails",
  async (params, { dispatch, getState }) => {
    const data = {
      startIndex: 0,
      lastIndex: 10,
      ...params,
    };
    let result = null;
    const master = getState()?.user?.data
    try {
      const response = await JwtService.post(jwtServiceConfig.getwayUpdate 
        + "?institutionGatewaySecreatKey=",
        {
          institutionGatewayDetailId: data?.institutionGatewayDetailId,
          institutionGatewayStatusId: data?.institutionGatewayStatusId,
          institutionGatewayVersion: data?.institutionGatewayVersion,
          institutionGatewayAuthdir: data?.institutionGatewayAuthdir,
          institutionGatewayLocation: data?.institutionGatewayLocation,
          institutionGatewayHashName: data?.institutionGatewayHashName,
          institutionGatewayUrl: data?.institutionGatewayUrl,
          institutionGatewayMac: data?.institutionGatewayMac,
          institutionGatewaySerialNo: data?.institutionGatewaySerialNo,
          institutionBranchId: data?.institutionBranchId,
          institutionGatewayName: data?.institutionGatewayName,
          institutionMasterId: data?.institutionMasterId,
          institutionGatewayCreatedBy: master?.userId,
        }
      );
      result = response?.data;
      result = result.map(function (item) {
        return {
          ...item,
          id: item.institutionGatewayDetailId,
          total: response?.data?.totalNumberOfElements,
        };
      });

    } catch (error) {
      if (error?.response?.status == 403) {
        JwtService.logout();
      }
    }
    return result;
  }
);




export const removeProducts = createAsyncThunk(
  "surfingPolicies/products",
  async (productIds, { dispatch, getState }) => {
    const query = ``;
    await axios.delete("/api/ecommerce/products", { data: productIds });

    return productIds;
  }
);

const productsAdapter = createEntityAdapter({});

export const { selectAll: selectBranches, selectById: selectProductById } =
  productsAdapter.getSelectors((state) => state.surfingPolicies?.products);

const productsSlice = createSlice({
  name: "surfingPolicies/products",
  initialState: productsAdapter.getInitialState({
    searchText: "",
  }),
  reducers: {
    setProductsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || "" }),
    },
  },
  extraReducers: {
    [getGateway.fulfilled]: productsAdapter.setAll,
    [removeProducts.fulfilled]: (state, action) =>
      productsAdapter.removeMany(state, action.payload),
  },
});

export const { setProductsSearchText } = productsSlice.actions;

export const selectProductsSearchText = ({ surfingPolicies }) =>
  surfingPolicies.products.searchText;

export default productsSlice.reducer;
