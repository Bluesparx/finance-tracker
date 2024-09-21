import React, { useEffect, useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import BarChartIcon from "@mui/icons-material/BarChart";
import Header from "../../components/Header";
import { addTransaction, getTransactions } from "../../utils/ApiRequest";
import Analytics from "./Analytics";
import ModalForm from "./ModalForm";
import TableData from "./TableData";
import "./home.css";

const Home = () => {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const [cUser, setcUser] = useState(null); // for current user
  const [show, setShow] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [frequency, setFrequency] = useState("7");
  const [type, setType] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [view, setView] = useState("table");

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setValues({
      title: "",
      amount: "",
      description: "",
      category: "",
      date: "",
      transactionType: "",
    });
    setShow(true);
  };

  const [values, setValues] = useState({
    title: "",
    amount: "",
    description: "",
    category: "",
    date: "",
    transactionType: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, amount, description, category, date, transactionType } = values;

    if (!title || !amount || !description || !category || !date || !transactionType) {
      toast.error("Please enter all the fields", toastOptions);
      return;
    }

    try {
      const { data } = await axios.post(addTransaction, {
        title: title,
        amount: amount,
        description: description,
        category: category,
        date: date,
        transactionType: transactionType,
        userId: cUser?._id, 
      });

      if (data.success) {
        toast.success(data.message, toastOptions);
        handleClose();
        setRefresh(!refresh);
      } else {
        toast.error(data.message, toastOptions);
      }
    } catch (error) {
      toast.error("Error occurred while adding transaction.", toastOptions);
    }
  };

  const handleReset = () => {
    setType("all");
    setStartDate(null);
    setEndDate(null);
    setFrequency("7");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setcUser(user);
      setRefresh(true); // Trigger fetch 
    }
  }, []);

  useEffect(() => {
    if (!cUser) return; 

    const fetchAllTransactions = async () => {
      try {
        const { data } = await axios.post(getTransactions, {
          userId: cUser._id,
          frequency,
          startDate,
          endDate,
          type,
        });
        setTransactions(data.transactions);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        toast.error("Failed to fetch transactions", toastOptions);
      }
    };

    fetchAllTransactions();
  }, [cUser, refresh, frequency, endDate, type, startDate]);

  const handleTableClick = () => setView("table");
  const handleChartClick = () => setView("chart");

  return (
    <>
      <Header />
      <Container className="mt-3">
        <div className="filterRow">
          <div className="text-white">
            <Form.Group className="mb-3">
              <Form.Label>Time Frame</Form.Label>
              <Form.Select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                <option value="7">Last Week</option>
                <option value="30">Last Month</option>
                <option value="365">Last Year</option>
                <option value="custom">Custom</option>
              </Form.Select>
            </Form.Group>
          </div>

          <div className="text-white">
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="all">All</option>
                <option value="expense">Expense</option>
                <option value="credit">Earned</option>
              </Form.Select>
            </Form.Group>
          </div>

          <div className="text-white iconBtnBox">
            
            <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} 
              onClick={handleTableClick}>
              <FormatListBulletedIcon
                sx={{ marginRight: "8px" }}
                className={view === "table" ? "iconActive" : "iconDeactive"}
              />
              <span>View Table</span>
            </div>

            <div
              style={{ display: "flex", alignItems: "center", cursor: "pointer", marginLeft: "16px" }}
              onClick={handleChartClick}
            >
              <BarChartIcon
                sx={{ marginRight: "8px" }}
                className={view === "chart" ? "iconActive" : "iconDeactive"}
              />
              <span>View Charts</span>
            </div>

          </div>
          <div className="add-modal">
          <Button onClick={handleShow} className="addNew" variant="secondary">
            Add New
          </Button>
            <ModalForm
            show={show}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            values={values}
            handleChange={handleChange}
            mode="add"
          />
          </div>
        </div>

        {frequency === "custom" && (
          <div className="date">
            <div className="form-group">
              <label className="text-white">Start Date:</label>
              <DatePicker
                selected={startDate}
                onChange={setStartDate}
                selectsStart
                startDate={startDate}
                endDate={endDate}
              />
            </div>
            <div className="form-group">
              <label className="text-white">End Date:</label>
              <DatePicker
                selected={endDate}
                onChange={setEndDate}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
              />
            </div>
          </div>
        )}

        <div className="containerBtn">
          <Button className="reset-btn" variant="secondary" onClick={handleReset}>
            Reset Filter
          </Button>
        </div>

        {view === "table" ? (
          <TableData data={transactions} user={cUser} />
        ) : (
          <Analytics transactions={transactions} user={cUser} />
        )}

        <ToastContainer />
      </Container>
    </>
  );
};

export default Home;
