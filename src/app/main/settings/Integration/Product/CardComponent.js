
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getGoogleCode } from "app/store/fuse/integrationSlice";
import { fetchReviews, resetBusinessAccount } from "./ProductSlice";
import axios from "axios";

const CardComponent = ({ item, isIntegrated }) => {
  const [showEditButton, setShowEditButton] = useState(false);
  const { googleIntegration } = useSelector(
    (state) => state.fuse.googleintegration
  );

  const { institutionGatewayDetailId } = useSelector(
    (state) => state.fuse.selectLocation
  );

  const dispatch = useDispatch();

  const [googleStatus, setGoogleStatus] = useState(item?.account_status === 1);
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      dispatch(getGoogleCode({ url: "/google/business/accounts?code=", code }));
    }
  }, [dispatch]);
 
  // FUNCTION FOR GOOGLE INTEGRATION 
  const handleIntegrateClick = (url) => {
    if (item.platformName === "Google" && googleIntegration) {
      window.location.href = googleIntegration;
    } else {
      setShowEditButton(true);
    }
  };

  // FUNCTION FOR UNLINK GOOGLE INTEGRATION
  const handleResetAccount = async () => {
    try {
      const response = await dispatch(resetBusinessAccount({ institutionGatewayDetailId }));
      if (response?.payload?.status === "success") {
        setGoogleStatus(false);
      }
    } catch (error) {
      console.error("Error in handleResetAccount:", error);
    }
  };

  return (
    <div
      style={{
        width: "220px",
        backgroundColor: "#FAFBFD",
        boxShadow: "0 3px 3px rgba(14, 31, 53, 0.25)",
        marginBottom: "15px",
        padding: "25px",
      }}
      className="rounded-[16px]"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {showEditButton ? (
          <img
            src="assets/images/Settings/fill.png"
            alt=""
            style={{
              height: "24px",
              width: "24px",
            }}
          />
        ) : null}

        <img
          src={item.platformIcon}
          alt=""
          style={{
            height: "80px",
            width: "80px",
            marginLeft: "35px",
            marginRight: "35px",
          }}
        />

        {showEditButton ? (
          <img
            src={"assets/images/Settings/check.png"}
            alt=""
            style={{
              height: "24px",
              width: "24px",
            }}
          />
        ) : null}
      </div>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          paddingTop: "10px",
        }}
      >
        <p>{item.platformName}</p>
        {showEditButton || isIntegrated ? (
          <Button
            style={{
              borderWidth: "1px",
              borderRadius: "8px",
              borderColor: "#161614",
              backgroundColor: "#fff",
              width: "100%",
              marginTop: "10px",
            }}
            variant="outlined"
          >
            {isIntegrated ? "Integrated" : "Edit"}
          </Button>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Button
              onClick={() => {
                handleIntegrateClick(item?.platformAuthURL, item.platformId);
              }}
              disabled={googleStatus}
              style={{
                width: "100%",
                backgroundColor:
                  googleStatus ? "#ccc" : "#F30002",
                color: "#fff",
                borderRadius: "8px",
                fontFamily: "sans-serif",
                fontWeight: "400",
                fontSize: "16px",
                marginTop: "10px",
              }}
              size="small"
              variant="contained"
            >
              Integrate
            </Button>

            {googleStatus && item.platformName === "Google" && (
              <Button
                sx={{
                  border: "1px solid #000",
                  borderRadius: "8px",
                  color: " #000",
                  fontSize: "16px",
                  cursor: "pointer",
                  padding: "12px 20px 12px 20px",
                  "&:hover": {
                    bgcolor: "red",
                    color: " #FFFFFF",
                    border: "1px solid #FFFFFF",
                  },
                }}

                onClick={handleResetAccount}>
                {" "}
                Unlinked
              </Button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default CardComponent;
