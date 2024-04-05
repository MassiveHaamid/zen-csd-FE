import React, { useContext, useEffect } from "react";
import { roadMap, roadMapData, roadMapRes } from "../data";
import { FaAngleDown, FaAngleUp, FaGooglePlay } from "react-icons/fa";
import dataContext from "../context/datacontext";
import { ToastContainer, Zoom } from "react-toastify";

const Roadmap = () => {
  const {
    isLoading,
    head,
    width,
    day,
    setDay,
    data,
    setData,
    flag,
    setFlag,
    frontEndCode,
    setFrontEndCode,
    frontEndURL,
    setFrontEndURL,
    backEndCode,
    setBackEndCode,
    backEndURL,
    setBackEndURL,
    handleTask,
    setHead,
  } = useContext(dataContext);

  useEffect(() => {
    setData(roadMapData[day]);
    setFrontEndCode("");
    setFrontEndURL("");
    setBackEndCode("");
    setBackEndURL("");
  }, [day, head]);

  useEffect(() => {
    setHead("Class");
  }, []);

  return (
    <section className="rdmap">
      <div className="main_container p-2 d-flex justify-content-between gap-3">
        <div className="left">
          <div
            className="class_head d-flex px-3 
        justify-content-between align-items-center"
          >
            {day === 0 ? (
              <h3>Join the class on time!</h3>
            ) : (
              <>
                <h3>Join the Class</h3>
                <button
                  className="play_btn"
                  data-bs-toggle="modal"
                  data-bs-target="#myModal"
                >
                  <FaGooglePlay />
                </button>
              </>
            )}
          </div>
          <div className="session_container">
            <div className="session_area">
              <span session_details>
                <span session_title>{data.title}</span>
                <br />
                {data.time}
              </span>
              <hr />
              <div className="session_content">Contents:</div>
              <div>
                <span className="session_content_details text-secondary">
                  {data.content}
                </span>
              </div>
              <div className="session_content mt-3">Pre-read:</div>
              <div>
                <span className="session_content_details text-secondary">
                  {data.preread}
                </span>
              </div>
            </div>
          </div>
          {data.activity !== "" ? (
            <div className="activity ml-1 mt-3 mb-2">Activities</div>
          ) : (
            ""
          )}
          {data.activity && (
            <div className="session_container">
              <div className="session_area">
                <div>
                  <div>
                    <div className="d-flex justify-content-between">
                      <div className="task_link">{data.activity}</div>
                      <span
                        className="task_toggle text-white"
                        data-bs-toggle="collapse"
                        onClick={() => setFlag(!flag)}
                      >
                        {flag ? <FaAngleDown /> : <FaAngleUp />}
                      </span>
                    </div>
                  </div>
                  <div className="collapse">
                    <div className="card-body">
                      <div className="tags_List">
                        <div className="tag_Title">Tags:</div>
                        {data.tags !== "" &&
                          data.tags.map((tag, index) => (
                            <div key={index} className="tag_Item">
                              {" "}
                              {tag}{" "}
                            </div>
                          ))}
                      </div>
                      <div className="p-0">
                        <form onSubmit={handleTask}>
                          <div
                            className="task_area"
                            style={{ padding: "16px" }}
                          >
                            <div className="sbmission">
                              <div className="form-group mt-2">
                                {(data.task === "fs" ||
                                  data.task === "fe" ||
                                  data.task === "fb") && (
                                  <>
                                    <label
                                      htmlFor="FrontEndSourceCode"
                                      className="label_style mb-0"
                                    >
                                      Front-end Source code
                                    </label>
                                    <div>
                                      <input
                                        className="frmInputs"
                                        id="FrontEndSourceCode"
                                        name="FrontEndSourceCode"
                                        placeholder="Enter Front-end Source code link"
                                        type="url"
                                        required
                                        value={frontEndCode}
                                        onChange={(e) =>
                                          setFrontEndCode(e.target.value)
                                        }
                                        autoComplete="off"
                                      />
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                            {(data.task === "fe" || data.task === "fb") && (
                              <>
                                <label
                                  htmlFor="FrontEndDeployedURL"
                                  className="label_style mb-0"
                                >
                                  Front-end Deployed URL
                                </label>
                                <div>
                                  <input
                                    className="frmInputs"
                                    name="FrontEndDeployedURL"
                                    id="FrontEndDeployedURL"
                                    placeholder="Enter Front-end Deployed URL"
                                    required
                                    value={frontEndURL}
                                    onChange={(e) =>
                                      setFrontEndURL(e.target.value)
                                    }
                                    type="url"
                                    autoComplete="off"
                                  />
                                </div>
                              </>
                            )}
                            {(data.task === "bs" ||
                              data.task === "be" ||
                              data.task === "fb") && (
                              <>
                                <label
                                  htmlFor="BackEndSourceCode"
                                  className="label_style mb-0"
                                >
                                  Back-end Source code
                                </label>
                                <div>
                                  <input
                                    className="frmInputs"
                                    id="BackEndSourceCode"
                                    name="BackEndSourceCode"
                                    placeholder="Enter Back-end Source code"
                                    required
                                    value={backEndCode}
                                    onChange={(e) =>
                                      setBackEndCode(e.target.value)
                                    }
                                    type="url"
                                    autoComplete="off"
                                  />
                                </div>
                              </>
                            )}
                            {(data.task === "be" || data.task === "fb") && (
                              <>
                                <label
                                  htmlFor="BackEndDeployedURL"
                                  className="label_style mb-0"
                                >
                                  Back-end Deployed URL
                                </label>
                                <div>
                                  <input
                                    className="frmInputs"
                                    name="BackEndDeployedURL"
                                    id="BackEndDeployedURL"
                                    placeholder="Enter Back-end Deployed URL"
                                    required
                                    value={backEndURL}
                                    onChange={(e) =>
                                      setBackEndURL(e.target.value)
                                    }
                                    type="url"
                                    autoComplete="off"
                                  />
                                </div>
                              </>
                            )}
                          </div>
                          <div className="task_submitBtn">
                            <button>
                              {isLoading ? (
                                <span className="spinner-border spinner-border-sm text-warning"></span>
                              ) : (
                                "Submit"
                              )}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="right">
          <div className="roadmap_container">
            <div className="roadmap_area">
              <div className="progress_head">
                <div>Sessions Roadmap</div>
                <div className="ssnsContainer">
                  {width >= 992
                    ? roadMap.map((item) => {
                        return (
                          <div
                            key={item.no}
                            className="rdmap_icon_container completed"
                            onClick={() => setDay(Number(item.no))}
                          >
                            <h6>{item.no}</h6>
                            <div></div>
                          </div>
                        );
                      })
                    : roadMapRes.map((item) => {
                        return (
                          <div
                            key={item.no}
                            className="rdmap_icon_container completed"
                            onClick={() => setDay(Number(item.no))}
                          >
                            <h6>{item.no}</h6>
                            <div className={item.dir}></div>
                          </div>
                        );
                      })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Session Link</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <a
                className="recording_link text-dark"
                href={data.link}
                target="_blank"
                rel="noreferrer"
              >
                {data.link}
              </a>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        transition={Zoom}
        draggable={false}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="dark"
      />
    </section>
  );
};

export default Roadmap;
