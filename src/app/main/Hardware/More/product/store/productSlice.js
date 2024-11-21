import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import FuseUtils from "@fuse/utils";
import { API } from "aws-amplify";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/auth";
import JwtService from "src/app/auth/services/jwtService";
import sha256 from "js-sha256";
import history from '@history';
export const getProduct = createAsyncThunk(
  "eCommerceApp/product/getProduct",
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
      console.log("getOrg ERROR", error);
    }
    const data = await result;
    return data;
  }
);

export const removeProduct = createAsyncThunk(
  "eCommerceApp/product/removeProduct",
  async (val, { dispatch, getState }) => {
    const { id } = getState().eCommerceApp.product;
    await axios.delete(`/api/ecommerce/products/${id}`);
    return id;
  }
);

// export const saveProduct = createAsyncThunk(
//   'eCommerceApp/product/saveProduct',
//   async (productData, { dispatch, getState, rejectWithValue }) => {

// console.log("branchdata", productData)
// const { id } = getState().eCommerceApp;

// const query = `mutation ($input:  BranchInput!,$id: ID) {
//   createBranch(id:$id,input: $input) {
//     email
//     branch_name
//     no_of_floors
//     _id
//     }
//   }`
// let result = null;
// console.log("branchdata", productData)
// try {
//   const params = {
//     address: productData?.address,
//     branch_name: productData?.branch_name,
//     email: productData?.email,
//     no_of_floors: productData.no_of_floors,
//     description: productData?.description,
//     category: productData?.category,
//     floors: productData?.floors?.map((floor) => ({
//       ...floor, id: floor?._id, _id: undefined,
//       rooms: floor?.rooms?.map((room) => ({ ...room, id: room?._id, _id: undefined, floor_id: undefined }))
//     })),
//     status: productData?.status || 'ACTIVE',
//     category: productData?.category,
//     description: productData?.description,
//   }
//   const response = await API.graphql({
//     query: query,
//     variables: { input: params, id: productData?.id || undefined },
//     authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
//   })
//   console.log("resp", response?.data?.createBranch)
//   result = response?.data?.createBranch;
//   return { ...productData, id: result?._id, _id: result?._id };
// } catch (error) {
//   console.log('service history ERROR', error)
//   return rejectWithValue(error?.errors?.map((err)=>(err?.message || '')).join(", "))
// }

//     return rejectWithValue("Something went Wrong");
//   }
// );
export const saveProduct = createAsyncThunk(
  "gateway/product/savegatewaydetails",
  async (data, { getState }) => {
    let result = null;
    const institutionGatewaySecreatKey = sha256(
      data?.institutionGatewaySecreatKey
    );
    console.log("sha256", sha256(data.institutionGatewaySecreatKey));
    const masterID = localStorage.getItem("institutionMasterId");
    const branchID = localStorage.getItem("institutionBranchId");
    const createdBy = localStorage.getItem("userId");
    try {
      const response = await JwtService.post(
        `institutionGateWayDetails/addNewInstitutionGatewayDetails?institutionGatewaySecreatKey=${institutionGatewaySecreatKey}`,
        {
          // ...data,
          // "institutionGatewayDetailId":getState().user?.data?.institutionMasterId,
          institutionMasterId: masterID
            ? masterID
            : getState().user?.data?.institutionMasterId,
          institutionBranchId: branchID
            ? branchID
            : getState().user?.data?.institutionBranchId,
          institutionGatewayStatusId: 1,
          institutionGatewayUrl: data?.institutionGatewayUrl,
          institutionGatewayName: data?.institutionGatewayName,
          institutionGatewayMac: data?.institutionGatewayMac,
          institutionGatewayVersion: data?.institutionGatewayVersion,
          institutionGatewayLocation: data?.institutionGatewayName,
          institutionGatewayAuthdir: "opennds_auth",
          institutionGatewayCreatedBy: createdBy
            ? createdBy
            : getState().user?.data?.userId,
        }
      );
      if (response.data.statusCode == 200) {
        console.log("gateway update", response);
        result = response?.data;
        window.location.reload();
        return result;
      }
    } catch (error) {
      console.log("get access error", error);
      if (error.response.status == 403) {
        JwtService.logout();
      }
    }
  }
);

const productSlice = createSlice({
  name: "eCommerceApp/product",
  initialState: null,
  reducers: {
    resetProduct: () => null,
    newProduct: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          id: "",
          branch_name: "",
          category: "",
          description: "",
          email: "",
          status: "ACTIVE",
          contacts: {},
          no_of_floors: "",
          floors: [],
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

export const selectProduct = ({ eCommerceApp }) => eCommerceApp.product;

export default productSlice.reducer;
