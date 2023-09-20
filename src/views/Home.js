import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../components/Navbar";
import { faBookOpen, faFlaskVial } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
// import axios from "axios";
import Cookies from 'universal-cookie';
import { styled } from '@mui/material/styles';

export default function Home() {
  const [insArr, setInsArr] = useState([0, 0, 0, 0]);
  const [theory, settheory] = useState();

  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.9)',
      boxShadow: theme.shadows[1],
      fontSize: 15,
    },
  }));




  // async function getallquestions() {
  //   try {
  //     await axios.get("http://127.0.0.1:8000/api/theoryquest/",{
        // headers: {
        //     'content-type': 'text/json',

        // }
  //     }).then(res=>{
  //       console.log(res.data)
  //     })
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // console.log(theory);

  // useEffect(() => {
  //   if (!insArr) {
  //     var newArr = [];
  //     for (var i = 0; i < 10; i++) {
  //       newArr.push("");
  //     }
  //     setInsArr([...newArr]);
  //   } else {
  //     var i = 0;
  //     var cloneArr = [...insArr];
  //     while (cloneArr[i].length >= 1) {
  //       i++;
  //       if (i === cloneArr.length) {
  //         break;
  //       }
  //     }
  //   }
  // }, [insArr]);

  // useEffect(() => {
  //   getallquestions();
  // }, []);

  function handleInput(i, val) {
    var cloneA = [...insArr];
    cloneA[i] = val;
    var ni = i + 1;
    setInsArr([...cloneA]);
    retId("insD" + i).innerHTML = val;

    retId("insD" + i).classList.remove("inputtedIns");
    retId("insD" + i).classList.add("insDDone");
    if (retId("insD" + ni) && !retId("insD" + ni).classList.contains("insDDone"))
      retId("insD" + ni).classList.add("inputtedIns");
    retId("mainQD" + i).classList.remove("mainInsQ");
    console.log(val);
  }

  function retId(idn) {
    return document.getElementById(idn);
  }

  const subjects = [
    ["CN", "Computer Networks"],
    ["TCS", "Theory of Computer Science"],
    ["DWM", "Data Warehouse Model"],
    ["SE", "Software Engineering"],
    ["PGM", "Probabilistic Graphical Models"],
  ];

  return (
    <>
      <Navbar />
      <div className="fullbg">
        <div className="dashbgI"></div>
        <div className="sliderSub">
          <div className="divf fdirc sliderSec">
            <p className="inSH">
              <FontAwesomeIcon icon={faBookOpen} />
            </p>
            <div className="divf fdirc allSlSec">
              {subjects.map((el) => {
                return (
                  <>
                    <LightTooltip title={el[1]} placement="right-start">
                      <div className="divIndS">
                        <button className={el[0] === "CN" ? "indSub ccSub" : "indSub"}>{el[0]}</button>
                      </div>
                    </LightTooltip>
                  </>
                );
              })}
            </div>
          </div>
          <div className="divf fdirc sliderSec">
            <p className="inSH">
              <FontAwesomeIcon icon={faFlaskVial} />
            </p>
            <div className="divf fdirc allSlSec">
              {subjects.map((el) => {
                return (
                  <>
                    <LightTooltip title={el[1]} placement="right-start">
                      <div className="divIndS">
                        <button className="indSub">{el[0]}</button>
                      </div>
                    </LightTooltip>

                  </>
                );
              })}
            </div>
          </div>
        </div>
        <div className="divf mainContent fdirc pLeft">
          <div className="infoC divf ">
            <p className="infP">
              <span>Academic Year</span>Hello
            </p>
            <p className="infP">
              <span>Academic Year</span>Hello
            </p>
            <p className="infP">
              <span>Academic Year</span>Hello
            </p>
            <p className="infP">
              <span>Academic Year</span>Hello
            </p>
            <p className="infP">
              <span>Academic Year</span>Hello
            </p>
          </div>
          <div className="infoC">
            <p className="infP">
              <span>Faculty Name</span>Vaishali Dabholkar
            </p>
          </div>
          <div className="quesT">
            <table>
              <thead>
                <tr>
                  <th>Questions</th>
                  <th>Feedback</th>
                </tr>
              </thead>
              <tbody>
                {insArr &&
                  insArr.map((el, i) => {
                    return (
                      <>
                        <tr>
                          <td className="quesText">
                            How will you rate the teacher?
                          </td>
                          <td>
                            <div
                              id={"mainQD" + i}
                              className="divf posR mainInsQ"
                            >
                              <div
                                id={"insD" + i}
                                className={i === 0 ? "insD inputtedIns" : "insD"}
                                onClick={(e) => {
                                  retId("mainQD" + i).classList.add("mainInsQ");
                                }}
                              ></div>
                              <div className="divf fdirc dropIns">
                                <button
                                  onClick={() => {
                                    handleInput(i, "Confident");
                                  }}
                                >
                                  Confident
                                </button>
                                <button
                                  onClick={() => {
                                    handleInput(i, "Good");
                                  }}
                                >
                                  Good
                                </button>
                                <button
                                  onClick={() => {
                                    handleInput(i, "Fair");
                                  }}
                                >
                                  Fair
                                </button>
                                <button
                                  onClick={() => {
                                    handleInput(i, "Not good");
                                  }}
                                >
                                  Not good
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="divf" style={{ gap: "0.5rem" }}>
            <input placeholder="Enter any comments..." className="specIns" />
            <button className="specBut">Submit</button>
          </div>
        </div>
      </div>
    </>
  );
}
