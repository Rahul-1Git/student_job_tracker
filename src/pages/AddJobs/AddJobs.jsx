import React, { useState } from "react";
import axios from "axios";
import "./addjobs.css";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const AddJobs = () => {
  const [item, setItem] = useState({
    company: "",
    role: "",
    status: "",
    appliedDate: "",
    link: "",
  });

  const navigate = useNavigate();

  function inputHandler(e) {
    const { name, value } = e.target;
    setItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleClick(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/createJob",
        item
      );
      console.log("Job created successfully:", response.data);
      toast.success("add the job successfully", { position: "top-right" });
      navigate("/");
    } catch (error) {
      console.error("Error creating job:", error);
    }
  }

  return (
    <div className="add">
      <h1>Add Job Application</h1>
      <form className="section" onSubmit={handleClick}>
        <div>
          <label htmlFor="company">Company</label>
          <input
            type="text"
            name="company"
            placeholder="company"
            onChange={inputHandler}
          />
        </div>
        <div>
          <label htmlFor="role">Role</label>
          <input
            type="text"
            name="role"
            placeholder="role"
            onChange={inputHandler}
          />
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <select name="status" id="" onChange={inputHandler}>
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </div>
        <div>
          <label htmlFor="date">Date of Application</label>
          <input type="date" name="appliedDate" id="" onChange={inputHandler} />
        </div>
        <div>
          <label htmlFor="link">Link</label>
          <input
            type="text"
            name="link"
            placeholder="link"
            onChange={inputHandler}
          />
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddJobs;
