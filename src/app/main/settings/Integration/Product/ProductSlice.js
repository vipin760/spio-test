import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "app/configs/apiClient";

export const platfomrs = createAsyncThunk(
    "integration",
    async (params, thunkAPI) => {
        const { id, value, styleValue, GR_name, rating } = params;
        const response = await apiClient().post('platforms/company-platforms');

        console.log(".............Res", response?.data?.data);

        return response?.data?.data;
    }
);


export const resetBusinessAccount = createAsyncThunk(
    'business/resetAccount', // Add a type string
    async ({ institutionGatewayDetailId }, thunkAPI) => {
      try {
        const response = await apiClient().post(`/google/business/reset`, {
          platform_id: 1,
          gateway_details_id: institutionGatewayDetailId,
        });
        return response.data; // Ensure you return the data
      } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message); // Ensure this is not commented out
      }
    }
  );
  
  
  export const fetchReviews = createAsyncThunk(
    "/fetch/reviews",
    async ({ page = 1, limit = 10, data, url }) => {
        const response = await apiClient().get(url, {
            params: {
                page: page,
                limit: limit,
                source: data?.source,
                search: data?.search,
                endDate: data?.endDate,
                isAnswered: data?.isAnswered,
                datePeriod: data?.datePeriod,
                startDate: data?.startDate,
                locationName: data?.locationName
            }
        });

        console.log({ response: response });
        return response.data;
    }
);
// export const sendPltaformId = createAsyncThunk(
//     "integration",
//     async (params, thunkAPI) => {
//         const { id, value, styleValue, GR_name, rating } = params;
//         const response = await apiClient().post('platforms/company-platforms');

//         console.log(".............Res", response?.data?.data);

//         return response?.data?.data;
//     }
// );



// // Autogenrate Chatgpt response
// const handleAutogenerateReply = async (id, value, styleValue, GR_name, rating) => {
//     try {
//         if (value) {
//             textValues(value)
//             const response = await dispatch(autoGenerateReviews({ id, value, styleValue, GR_name, rating }));
//             // console.log("response?.requestStatus---------------->", response?.meta?.requestStatus);
//             setReplyText(response.payload);
//             setGeneratedReview([...generatedReview, response.payload])
//             setOne(false)
//         }
//         setPlaceholder("")
//     } catch (err) {
//         console.log(err);
//         // toast.error(err.message);
//     }
// }