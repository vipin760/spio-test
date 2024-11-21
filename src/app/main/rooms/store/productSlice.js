import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import FuseUtils from '@fuse/utils'
import { API, Auth } from 'aws-amplify'
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/auth'

export const getProduct = createAsyncThunk(
  'bedsApp/product/getProduct',
  async (productId) => {
    const ids = `${productId}`.split('_')
    const roomId = ids[0]
    const branchId = ids[1]
    console.log('branchIdbranchId', ids)
    const query = `query MyQuery {
    getBranch (id:"${branchId}"){
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
      beds {
        name
        floor_id
        room_id
        branch_id
        org_id
        device_id
        status
        _id
      }
      category
      description
    }
  }
  
    `
    let result = null
    try {
      const response = await API.graphql({
        query: query,
      })

      result = response?.data?.getBranch
      let beds = []
      result?.beds?.forEach((e) => {
        if (e.room_id == roomId) {
          beds.push(e)
        }
      })

      const room = result?.rooms?.find((item) => item?._id == roomId)
      console.log('resp room room', room)
      const floor = result?.floors?.find((item) => item?._id == room?.floor_id)
      if (room) {
        result = {
          ...room,
          id: productId,
          branch_id: branchId,
          beds: beds,
          room_id: room?._id,
          branch_name: result?.branch_name,
          room_name: room?.name,
          floor_name: floor?.name,
        }
      }

      console.log('resp room', result)
    } catch (error) {
      console.log('getOrg ERROR', error)
    }
    const data = await result
    return data
  },
)

export const removeProduct = createAsyncThunk(
  'bedsApp/product/removeProduct',
  async (val, { dispatch, getState }) => {
    const { id } = getState().bedsApp.product
    await axios.delete(`/api/ecommerce/products/${id}`)
    return id
  },
)
export const saveProduct = createAsyncThunk(
  'bedsApp/product/saveProduct',
  async (productData, { dispatch, getState }) => {
    const { id } = getState().bedsApp
    const userData = await Auth.currentAuthenticatedUser()
    let beds = [],
      updateBedsList = []
    productData?.beds?.forEach((bed) => {
      if (!bed?._id) {
        beds.push({
          ...bed,
          branch_id: productData?.branch_id,
          floor_id: productData?.floor_id,
          room_id: productData?.room_id,
          org_id: userData.attributes['custom:org_id'],
        })
      } else {
        const { _id, ...rest } = bed
        const obj = {
          ...rest,
          branch_id: productData?.branch_id,
          floor_id: productData?.floor_id,
          room_id: productData?.room_id,
          org_id: userData.attributes['custom:org_id'],
          status: 'ACTIVE',
        }
        updateBedsList.push({ bed_id: _id, bed: obj })
      }
    })
    let result = null
    if (beds?.length > 0) {
      const params = { branch_id: productData?.branch_id, beds: beds }
      const query = `mutation createBeds($branch_id: ID!, $beds: [BedInput]! ) {
        createBeds(branch_id: $branch_id, beds: $beds) {
          _id
          branch_id
          name
          org_id
          status
          floor_id
          device_id  
        }
      }
      `

      try {
        const response = await API.graphql({
          query: query,
          variables: params,
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })
        console.log('createBeds resp', response?.data?.createBeds)
        result = response?.data?.createBeds
      } catch (error) {
        console.log('service history ERROR', error)
      }
    } else if (updateBedsList?.length > 0) {
      result = await Promise.all(
        updateBedsList?.map((bed) => {
          return updateBedData(bed)
        }),
      )
    }

    // const response = await axios.put(`/api/ecommerce/products/${id}`, productData);

    const data = await result

    return data
  },
)

// export const updateProduct = createAsyncThunk(
//   'bedsApp/product/saveProduct',
//   async (productData, { dispatch, getState }) => {
//     try {
//       const userData = await Auth.currentAuthenticatedUser();
//       let beds = productData?.beds?.map((bed) => {
//         const { _id, ...rest } = bed;
//         const obj = { ...rest, branch_id: productData?.branch_id, floor_id: productData?.floor_id, room_id: productData?.room_id, org_id: userData.attributes['custom:org_id'], status: "ACTIVE" }

//         return { bed_id: _id, bed: obj }
//       })
//       console.log("bedsbeds", beds)
//       const result = await Promise.all(beds?.map((bed) => {
//         return updateBedData(bed)
//       }))
//       console.log("updateBed0", result)

//       const data = await result;
//       return data;
//     } catch (e) {
//       console.log("updateBeddddd error", e)
//     }
//   }
// );
const updateBedData = async (params) => {
  const query = `mutation manageBed($bed_id: ID!, $bed: BedInput! ) {
    manageBed(bed_id: $bed_id, bed: $bed) {
      _id
      branch_id
      device_id
      floor_id
      name
      org_id
      room_id
      status
    }
  }
  `
  let result = null
  try {
    const response = await API.graphql({
      query: query,
      variables: params,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })
    console.log('manageBed resp', response?.data?.manageBed)
    result = response?.data?.manageBed
  } catch (error) {
    console.log('manageBed ERROR', error)
  }
  return result
}

const productSlice = createSlice({
  name: 'bedsApp/product',
  initialState: null,
  reducers: {
    resetProduct: () => null,
    newProduct: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          id: '',
          branch_id: null,
          name: '',
          status: 'ACTIVE',
          floor_id: null,
          room_id: null,
          active: true,
        },
      }),
    },
  },
  extraReducers: {
    [getProduct.fulfilled]: (state, action) => action.payload,
    [saveProduct.fulfilled]: (state, action) => action.payload,
    [removeProduct.fulfilled]: (state, action) => null,
  },
})

export const { newProduct, resetProduct } = productSlice.actions

export const selectProduct = ({ bedsApp }) => bedsApp?.product || {}
export default productSlice.reducer
