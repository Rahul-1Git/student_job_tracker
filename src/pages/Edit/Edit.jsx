import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./Edit.css";

const Edit = () => {
  const { id } = useParams();
  const [update, setUpdate] = useState({
    company: "",
    role: "",
    status: "",
    appliedDate: "",
    link: "",
  });

  const navigate = useNavigate();

  function handleChnages(e) {
    const { name, value } = e.target;
    setUpdate((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/getJob/${id}`)
      .then((response) => {
        setUpdate(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  async function submitForm(e) {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8000/api/updateJob/${id}`,
        update
      );
      console.log("Job updated successfully:", response.data);
      toast.success("updated successfully ", { position: "top-right" });
      navigate("/");
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
    }
  }

  return (
    <div className="add">
      <h1>Update Job Application</h1>
      <form className="section" onSubmit={submitForm}>
        <div>
          <label htmlFor="company">Company</label>
          <input
            type="text"
            name="company"
            placeholder="company"
            onChange={handleChnages}
            value={update.company}
          />
        </div>
        <div>
          <label htmlFor="role">Role</label>
          <input
            type="text"
            name="role"
            placeholder="role"
            onChange={handleChnages}
            value={update.role}
          />
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <select
            name="status"
            id=""
            onChange={handleChnages}
            value={update.status}
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </div>
        <div>
          <label htmlFor="date">Date of Application</label>
          <input
            type="date"
            name="appliedDate"
            id=""
            value={update.appliedDate.slice(0, 10)}
            onChange={handleChnages}
          />
        </div>
        <div>
          <label htmlFor="link">Link</label>
          <input
            type="text"
            name="link"
            placeholder="link"
            onChange={handleChnages}
            value={update.link}
          />
        </div>

        <button>Update</button>
      </form>
    </div>
  );
};

export default Edit;
