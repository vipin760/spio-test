import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { apiClient } from "app/configs/apiClient";

//GET

export const getProducts = createAsyncThunk(
  "employeeMaster/products/getProduct",
  async (params, { dispatch, getState }) => {
    let result = null;
    try {
      const response = await apiClient().get("/employee/all-employee");
      result = response?.data;
    } catch (error) {
      if (error?.response?.status == 403) {
        JwtService.logout();
      }
    }
    return result;
  }
);

//DELETE
export const removeProducts = createAsyncThunk(
  "employeeMaster/products",
  async (productIds, { dispatch, getState }) => {
    const query = ``;
    await axios.delete("/api/ecommerce/products", { data: productIds });
    return productIds;
  }
);

// Search

export const searchFilter = createAsyncThunk(
  "employeeMaster/products",
  async ({ val, page = 1, limit = 10 }, { dispatch, getState }) => {
    const query = ``;
    try {
      const response = await apiClient().get(`employee/all-employee?search=${val}&&page=${page}&&limit=${limit}`);
      return response?.data;
    } catch (err) {
      if (err?.response?.status == 403) {
        JwtService.logout();
      }
    }
  }
);

const productsAdapter = createEntityAdapter({
  selectId: (product) => product.tbl_connect_employee_id,
});

export const { selectAll: selectBranches, selectById: selectProductById } =
  productsAdapter.getSelectors((state) => state?.didMaster?.products || productsAdapter.getInitialState());

const productsSlice = createSlice({
  name: "employeeMaster",
  initialState: productsAdapter.getInitialState({
    searchText: "",
    meta: {}
  }),
  reducers: {

    setProductsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (value) => ({ payload: value || "" }),
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.data = action?.payload?.data
    }
    ),
      builder.addCase(searchFilter.fulfilled, (state, action) => {
        state.meta = action?.payload?.meta?.totalRecords
        state.data = action.payload?.data;
      })
  }
});

export const { setProductsSearchText } = productsSlice.actions;

export const selectProductsSearchText = (state) => {
  return state?.employeeMaster?.products?.searchText || ""
};

export default productsSlice.reducer;
