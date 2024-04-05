import React, { useState, useEffect, useContext } from "react";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import { Link } from "react-router-dom";
import dataContext from "../../context/datacontext";

const Dashboard = () => {
  const { loggedUser, webCode, capStone } = useContext(dataContext);

  const [taskScoreChartData, setTaskScoreChartData] = useState({
    labels: ["Task Score", "Remaining Score"],
    datasets: [
      {
        data: [0, 100], // Initial data
        backgroundColor: ["#4b0dba", "#cd2a2e"],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://caps-be.onrender.com/api/tasks");
        const data = await response.json();

        const totalScore = data.reduce((sum, task) => sum + task.score, 0);
        const remainingScore = 4200 - totalScore;

        setTaskScoreChartData({
          labels: ["Task Score", "Remaining Score"],
          datasets: [
            {
              data: [totalScore, remainingScore],
              backgroundColor: ["#4b0dba", "#cd2a2e"],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching task score data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means the effect runs once on mount

  const [attendanceChartData, setAttendanceChartData] = useState({
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [
          loggedUser.presentDays,
          loggedUser.totalDays - loggedUser.presentDays,
        ],
        backgroundColor: ["#4CAF50", "#FF5733"],
      },
    ],
  });

  useEffect(() => {
    // Fetch attendance data or perform any necessary operations
    const fetchData = async () => {
      try {
        // Fetch attendance data from an API
        const response = await fetch(
          "https://caps-be.onrender.com/api/attendance"
        );
        const data = await response.json();

        // Update attendanceChartData with the fetched data
        setAttendanceChartData({
          labels: ["Present", "Absent"],
          datasets: [
            {
              data: [data.presentDays, data.totalDays - data.presentDays],
              backgroundColor: ["#4CAF50", "#FF5733"],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means the effect runs once on mount

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://caps-be.onrender.com/api/tasks");
        const data = await response.json();

        setTaskScoreChartData({
          labels: data.map((task) => `Day-${task.day}`),
          datasets: [
            {
              label: "Task Score",
              data: data.map((task) => task.score),
              backgroundColor: "#4b0dba",
              borderJoinStyle: "round",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching task score data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means the effect runs once on mount

  // Function to update task score data
  const updateTaskScoreData = async () => {
    try {
      const response = await fetch("https://caps-be.onrender.com/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(/* updated task score data */),
      });

      const updatedData = await response.json();
    } catch (error) {
      console.error("Error updating task score data:", error);
    }
  };

  return (
    <section className="dashboard pt-2">
      <div className="activity_box container">
        <h3 className="text-center p-2">Attendance</h3>
        <PieChart chartData={attendanceChartData} />
      </div>
      <br />
      <div className="activity_box container">
        <h3 className="text-center p-2">Activities</h3>
        <div className="cps gap-5">
          <div className="ckata">
            <div className="head">CodeKata Problem Solved</div>
            <div className="score text-center">{loggedUser.codeKata}</div>
          </div>
          <div className="wkata">
            <div className="head">WebKata Problem Solved</div>
            <div className="score text-center">{loggedUser.webKata}</div>
          </div>
        </div>
      </div>
      <br />
      <div className="activity_box container">
        <h3 className="text-center p-2">Task Status</h3>
        <BarChart chartData={taskScoreChartData} />
      </div>
      <br />
      <div className="activity_box container">
        <h3 className="text-center p-2">Event Status</h3>
        <div className="cps gap-5">
          <div className="ckata">
            <div className="head">Webcode-1 Score</div>
            <div className="score text-center">
              {webCode ? webCode.score : "Not Submitted"}
            </div>
            <div className="text-center mb-2">
              <Link to="/webcode" className="view_btn">
                View
              </Link>
            </div>
          </div>
          <div className="wkata">
            <div className="head">Capstone-1 Score</div>
            <div className="score text-center">
              {capStone ? capStone.score : "Not Submitted"}
            </div>
            <div className="text-center mb-2">
              <Link to="/capstone" className="view_btn">
                View
              </Link>
            </div>
          </div>
          <div className="wkata">
            <div className="head">Mock Interview Avg</div>
            <div className="score text-center">{loggedUser.mockInterview}</div>
            <div className="text-center mb-2">
              <Link to="/mock" className="view_btn">
                View
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
