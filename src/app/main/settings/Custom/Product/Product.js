import { Button, TextField, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "src/app/main/Navbar/Navbar";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSelector } from "react-redux";
import { UpdateCustom, fetchCustomColums } from "src/actions/dataActions";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const companyIds = useSelector(state => state.companies.ids);
  const createdBy = localStorage.getItem("userId");
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [textBox, setTextBox] = useState([{ company_id: parseInt(createdBy), is_active: 0 }]);
  const [customData, setCustomData] = useState({
    company_id: 2,
    column_name: " ",
  })

  const navigate = useNavigate();

  const fetchColum = async () => {
    setLoading(true)
    const response = await fetchCustomColums()
    // console.log(response)
    setLoading(false)

    if (response?.status == 'success' && response?.data.length) {
      console.log(response?.data, "response?.data")
      return setTextBox(response?.data)
    } else if (response?.status != 'success') {
      toast.error('error')
      return setError('error')
    }

  }

  useEffect(() => {
    fetchColum()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  const handleAdd = (id) => {
    setTextBox([...textBox, { company_id: parseInt(createdBy), is_active: 0, id: textBox.length + 1, column_name: "" }]);
  };

  const handleRemovetextBox = (id) => {
    const filterBox = textBox.filter((data) => data.id != id);
    setTextBox(filterBox);
  };

  const handleChangeTextBox = (index, e) => {
    const updatedTextBox = [...textBox];
    updatedTextBox[index].column_name = e.target.value;
    setTextBox(updatedTextBox);
    console.log("textBox", textBox);

  };

  const handleSubmit = async (index, e) => {
    if (textBox) {
      const requestBody = textBox.filter(textdata => !!textdata.column_name)
      if (!requestBody.length) return toast.error('fill column name')
      const response = await UpdateCustom(textBox)
      if (response.status === 'success') {
        // return toast.success(response?.message)

        toast.success(response?.message);
        // Redirect to the dashboard page
        navigate('/dash');
        return;

      }
      if (response?.response?.status?.toString().startsWith('4')) {
        return toast.error(response?.response?.data?.error)
      }
      toast.error("server down, try again !!!")
    }
  };

  console.log("CustomFields", textBox);


  return (
    <div>
      <Navbar Component={() => <div></div>} sx={{ minHeight: 40 }} />
      <div className="m-[35px] w-full flex flex-col items-center">
        <div
          className="w-1/2 flex flex-col justify-center items-center rounded-[16px] p-[30px] shadow-md"
          style={{ backgroundColor: "#FAFBFD" }}
        >
          <h1 className="font-500 mb-20">Custom Fields</h1>
          {textBox.map((box, index) => {
            return (
              <div className="flex justify-start items-center gap-40 mt-8 mb-16">
                <div className="w-1/2 md:w-3/5">
                  <TextField
                    required
                    id="outlined-required"
                    label="Enter column name"
                    type="text"
                    size="small"
                    className="w-full"
                    disabled={box.is_active && box.is_active == 1}
                    value={box.column_name}
                    // value={customData?.column_name}
                    onChange={(e) => handleChangeTextBox(index, e)}
                  />
                </div>
                <div className="w-1/2 md:w-2/5 flex justify-row gap-[15px] ">
                  <Button
                    variant="outlined"
                    size="small"
                    className="rounded-4"
                    onClick={() => handleAdd(box.id)}
                  >
                    <AddIcon />
                  </Button>
                  {/* <Tooltip title="Value is already added" placement="top" disabled={box.is_active == 0}> */}
                  <Button
                    variant="outlined"
                    size="small"
                    disabled={box.is_active == 1}
                    className="rounded-4"
                    onClick={() => handleRemovetextBox(box.id)}
                  >
                    <RemoveIcon />
                  </Button>
                  {/* </Tooltip> */}
                </div>
              </div>
            );
          })}


          <div className="flex w-full justify-end items-end gap-10 mt-12">
            <Button
              style={{ borderRadius: 8 }}
              className=""
              to="#"
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button
              style={{ borderRadius: 8 }}
              className=""
              to="#"
              variant="contained"
            //   color="primary"
            // disabled={!messageToggle}
            // onClick={() => handleReviewSubmit()}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Product;
