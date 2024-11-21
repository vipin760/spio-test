// import React, { useEffect, useState } from "react";
// import CardComponent from "./CardComponent";
// import Navbar from "src/app/main/Navbar/Navbar";
// import { data } from "./Data";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getGoogle,
//   selectGoogleBusiness,
// } from "app/store/fuse/integrationSlice";
// import { Box, Button, Modal, Radio } from "@mui/material";
// import { platfomrs } from "./ProductSlice";

// const Product = () => {

//   const [googleUrl, setGoogleUrl] = useState("");
//   const [selectId, setSelectId] = useState("");
//   const [selectedValue, setSelectedValue] = useState("");
//   const [integratedCard, setIntegratedCard] = useState("");
//   const [open, setOpen] = useState(true);

//   const { googleIntegration, googleCode } = useSelector(
//     (state) => state.fuse.googleintegration
//   );

//   console.log("googleCode", googleCode);

//   const dispatch = useDispatch();

//   const handleChange = (event) => {
//     setSelectedValue(event.target.value);
//   };

//   useEffect(() => {
//     dispatch(
//       getGoogle({
//         url: `/google/oauth`,
//       })
//     );
//   }, [dispatch]);

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handlePlatforms = async () => {


//     const response = await dispatch(platfomrs());

//     console.log("RESSSSSSSSSSSSSS", response);


//   }

//   useEffect(() => {

//     handlePlatforms()
//   }, [])



//   const handleSave = () => {
//     console.log(selectId, "selectId");
//     if (selectId) {
//       dispatch(
//         selectGoogleBusiness({
//           url: `google/business/account`,
//           name: selectId,
//         })
//       );
//       setIntegratedCard("Google");
//     }
//     setOpen(false);
//     const newUrl = window.location.origin + window.location.pathname;
//     window.history.replaceState({}, document.title, newUrl);
//   };

//   const handleSelectId = (name) => {
//     setSelectId(name);
//   };

//   return (
//     <div>
//       <Navbar Component={() => <div></div>} sx={{ minHeight: 40 }} />
//       <div
//         className="flex flex-col gap-[40px]"
//         style={{ flex: 1, padding: "25px" }}
//       >
//         <div className="flex flex-col">
//           <h1
//             style={{
//               fontFamily: "sans-serif",
//               fontSize: "20px",
//               fontWeight: "bold",
//             }}
//           >
//             Integrations
//           </h1>
//           <p
//             className="font-400 mt-6 w-full xl:w-3/4 text-[16px]"
//             style={{ color: "#6B6B6B" }}
//           >
//             Integrate the platforms where you receive or want to receive
//             reviews. Connect with Google and Facebook directly via the login, so
//             you can reply to reviews from the Public reviews section. For the
//             other platforms, simply enter your page link to import reviews. We
//             don't import all the reviews but the most recent ones.
//           </p>
//         </div>
//         {googleCode.length !== 0 && (
//           <Modal
//             open={open}
//             onClose={handleClose}
//             aria-labelledby="child-modal-title"
//             aria-describedby="child-modal-description"
//             BackdropProps={{ style: { backgroundColor: "rgba(0,0,0,0.1)" } }}
//           >
//             <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-500 bg-white border-2 border-black p-10 md:p-40 rounded-[16px]">
//               <div className="flex flex-col gap-[20px]">
//                 <div className="flex flex-col">
//                   <h2 id="child-modal-title text-500">
//                     Please select the business account
//                   </h2>
//                 </div>
//                 <div className="flex flex-row">
//                   {googleCode.map((data, index) => (
//                     <div
//                       key={index}
//                       className="flex"
//                       onClick={() => handleSelectId(data.name)}
//                     >
//                       <Radio
//                         checked={selectedValue === data.name}
//                         onChange={handleChange}
//                         value={data.name}
//                         name="radio-buttons"
//                         inputProps={{ "aria-label": data.name }}
//                       />
//                       <p className="p-8 border m-3 hover:bg-red hover:text-[white]">
//                         {data.accountName}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="flex flex-row justify-end ">
//                   <Button
//                     variant="outlined"
//                     className="rounded-6 h-[40px] bg-red text-white hover:bg-[#df1717] hover:text-[#ede7e7]"
//                     size="small"
//                     onClick={handleSave}
//                   >
//                     Save
//                   </Button>
//                 </div>
//               </div>
//             </Box>
//           </Modal>
//         )}

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
//           {data.map((item, index) => (
//             <CardComponent
//               key={index}
//               item={item}
//               isIntegrated={item.title === integratedCard}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Product;




import React, { useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import Navbar from "src/app/main/Navbar/Navbar";
import { data } from "./Data";
import { useDispatch, useSelector } from "react-redux";
import {
  getGoogle,
  selectGoogleBusiness,
} from "app/store/fuse/integrationSlice";
import { Box, Button, Modal, Radio } from "@mui/material";
import { platfomrs } from "./ProductSlice";

const Product = () => {
  const [googleUrl, setGoogleUrl] = useState("");
  const [selectId, setSelectId] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [integratedCard, setIntegratedCard] = useState("");
  const [open, setOpen] = useState(true);

  const { googleIntegration, googleCode } = useSelector(
    (state) => state.fuse.googleintegration
  );

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    dispatch(
      getGoogle({
        url: `/google/oauth`,
      })
    );
  }, [dispatch]);

  const handleClose = () => {
    setOpen(false);
  };

  const [integrationItems, setIntegrationItems] = useState()

  const handlePlatforms = async () => {
    try {
      const params = {
        id: "123",
        value: "Sample Value",
        styleValue: "Standard",
        GR_name: "Google Review",
        rating: 5,
      };

      const response = await dispatch(platfomrs(params)).unwrap();
      console.log("Auto-generated review response:", response);
      setIntegrationItems(response)
    } catch (error) {
      console.error("Error in auto-generating reviews:", error);
    }
  };

  useEffect(() => {
    handlePlatforms();
  }, []);

  const handleSave = () => {
    console.log(selectId, "selectId");
    if (selectId) {
      dispatch(
        selectGoogleBusiness({
          url: `google/business/account`,
          name: selectId,
        })
      );
      setIntegratedCard("Google");
    }
    setOpen(false);
    const newUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, newUrl);
  };

  const handleSelectId = (name) => {
    setSelectId(name);
  };

  useEffect(() => {
    console.log("integrationItems:", integrationItems); // Check the structure of integrationItems
  }, [integrationItems]);


  return (
    <div>
      <Navbar Component={() => <div></div>} sx={{ minHeight: 40 }} />
      <div
        className="flex flex-col gap-[40px]"
        style={{ flex: 1, padding: "25px" }}
      >
        <div className="flex flex-col">
          <h1
            style={{
              fontFamily: "sans-serif",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Integrations
          </h1>
          <p
            className="font-400 mt-6 w-full xl:w-3/4 text-[16px]"
            style={{ color: "#6B6B6B" }}
          >
            Integrate the platforms where you receive or want to receive
            reviews. Connect with Google and Facebook directly via the login, so
            you can reply to reviews from the Public reviews section. For the
            other platforms, simply enter your page link to import reviews. We
            don't import all the reviews but the most recent ones.
          </p>
        </div>
        {googleCode.length !== 0 && (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
            BackdropProps={{ style: { backgroundColor: "rgba(0,0,0,0.1)" } }}
          >
            <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-500 bg-white border-2 border-black p-10 md:p-40 rounded-[16px]">
              <div className="flex flex-col gap-[20px]">
                <div className="flex flex-col">
                  <h2 id="child-modal-title text-500">
                    Please select the business account
                  </h2>
                </div>
                <div className="flex flex-row">
                  {googleCode.map((data, index) => (
                    <div
                      key={index}
                      className="flex"
                      onClick={() => handleSelectId(data.name)}
                    >
                      <Radio
                        checked={selectedValue === data.name}
                        onChange={handleChange}
                        value={data.name}
                        name="radio-buttons"
                        inputProps={{ "aria-label": data.name }}
                      />
                      <p className="p-8 border m-3 hover:bg-red hover:text-[white]">
                        {data.accountName}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-row justify-end ">
                  <Button
                    variant="outlined"
                    className="rounded-6 h-[40px] bg-red text-white hover:bg-[#df1717] hover:text-[#ede7e7]"
                    size="small"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </Box>
          </Modal>
        )}

        {/* {integrationItems} */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">

          {integrationItems && Array.isArray(integrationItems) // Check if integrationItems is an array
            ? integrationItems.map((item, index) => (
              <CardComponent
                key={index}
                item={item}
                isIntegrated={item.platformName === integratedCard}
              />
            ))
            : <p>No integration items available.</p> 
          }

        </div>
      </div>
    </div>
  );
};

export default Product;
