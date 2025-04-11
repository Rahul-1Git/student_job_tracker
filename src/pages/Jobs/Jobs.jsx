import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Jobs.css";
import { NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:8000/api/getAllJob");
      setJobs(response.data);
    }
    fetchData();
  }, []);

  const deleteUser = async (jobId) => {
    await axios
      .delete(`http://localhost:8000/api/deleteJob/${jobId}`)
      .then((response) => {
        setJobs((prev) => prev.filter((job) => job._id !== jobId));
        console.log(response);
        toast.success("deleted successfully ", { position: "top-right" });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const filteredJobs =
    statusFilter === "All"
      ? jobs
      : jobs.filter((job) => job.status === statusFilter);

  return (
    <div className="job">
      <header className="header">
        <select
          name="status"
          onChange={(e) => setStatusFilter(e.target.value)}
          value={statusFilter}
        >
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </header>

      <div className="job_list">
        <div className="alljob">
          {filteredJobs.map((data, index) => {
            return (
              <div className="item">
                <ul key={index}>
                  <li>
                    <b>Company:</b> {data.company}
                  </li>
                  <li>
                    <b>Role:</b> {data.role}
                  </li>
                  <li>
                    <b>Status: </b>
                    {data.status}
                  </li>
                  <li>
                    <b>Application date:</b> {data.appliedDate.slice(0, 10)}
                  </li>
                  <li>
                    <b>Link:</b>{" "}
                    <a
                      href={
                        data.link.startsWith("http://") ||
                        data.link.startsWith("https://")
                          ? data.link
                          : `https://${data.link}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      link
                    </a>
                  </li>
                  <div className="edit">
                    <NavLink to={`/edit/` + data._id}>
                      <button>
                        <BiSolidEdit />
                      </button>
                    </NavLink>
                    <button onClick={() => deleteUser(data._id)}>
                      <MdDelete />
                    </button>
                  </div>
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
