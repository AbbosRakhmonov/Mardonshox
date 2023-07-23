import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStatistics } from "./statSlice";
import { Link } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import StatFooter from "../../Components/statFooter";
import StatTable from "../../Components/statTable";
import moment from "moment";

function Statistics() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.stat);
  const [isChecked, setIsChecked] = useState(true);
  const [startDate, setStartDate] = useState(() => {
    const today = moment();
    return moment(today).startOf("month").toISOString().substring(0, 10);
  });
  const [endDate, setEndDate] = useState(() => {
    const today = moment();
    return moment(today).endOf("month").toISOString().substring(0, 10);
  });

  const onChangeStartDate = (e) => {
    const { value } = e.target;
    setStartDate(value);
  };

  const onChangeEndDate = (e) => {
    const { value } = e.target;
    setEndDate(value);
  };

  const handleIsChecked = (e) => {
    const today = moment();
    const start = moment(today).startOf("month").toISOString().substring(0, 10);
    const end = moment(today).endOf("month").toISOString().substring(0, 10);
    if (e.target.checked) {
      setStartDate(start);
      setEndDate(end);
    } else {
      setStartDate("");
      setEndDate("");
    }

    setIsChecked(e.target.checked);
  };
  useEffect(() => {
    if (isChecked) {
      const s = new Date(startDate);
      s.setHours(0, 0, 0, 0);
      const e = new Date(endDate);
      e.setHours(23, 59, 59, 999);
      dispatch(
        getStatistics({
          startDate: s.toISOString(),
          endDate: e.toISOString(),
        })
      );
    } else {
      dispatch(
        getStatistics({
          startDate: "",
          endDate: "",
        })
      );
    }
  }, [dispatch, startDate, endDate, isChecked]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  console.log(data);
  return (
    <section>
      <StatFooter
        incomes={data?.incomes}
        outcomes={data?.outcomes}
        all={data?.all}
      />
      <div className="container">
        <div className="row top-of-table my-3">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <Link
                to={-1}
                className={"h5 d-flex align-items-center text-decoration-none"}
              >
                <IoChevronBack />
                <span>Ортга қайтиш</span>
              </Link>
            </div>
            <div className="row mt-4 my-2 px-2">
              <div className="col-12">
                <div className="d-flex flex-wrap flex-column flex-sm-row gap-3 gap-md-5">
                  <div className="d-flex gap-2 align-items-center">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      style={{
                        width: "1.5rem",
                        height: "1.5rem",
                      }}
                      checked={isChecked}
                      onChange={handleIsChecked}
                      id="exampleCheck1"
                    />
                    <label
                      className="form-check-label"
                      style={{
                        fontSize: "1rem",
                      }}
                      htmlFor="exampleCheck1"
                    >
                      Филтрлаш
                    </label>
                  </div>
                  <div className={"d-flex gap-3 flex-wrap"}>
                    <div className="d-flex align-items-center gap-3">
                      <label
                        className={`form-check-label ${
                          !isChecked ? "text-muted" : ""
                        }`}
                        style={{
                          fontSize: "1rem",
                        }}
                        htmlFor="date1"
                      >
                        Бошлангич сана :
                      </label>
                      <input
                        type="date"
                        className="form-control w-auto"
                        id={"date1"}
                        aria-label="Date"
                        name={"startDate"}
                        value={startDate}
                        disabled={!isChecked}
                        onChange={onChangeStartDate}
                      />
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <label
                        className={`form-check-label ${
                          !isChecked ? "text-muted" : ""
                        }`}
                        style={{
                          fontSize: "1rem",
                        }}
                        htmlFor="date2"
                      >
                        Тугаш сана :
                      </label>
                      <input
                        type="date"
                        className="form-control w-auto"
                        id={"date2"}
                        aria-label="Date"
                        name={"endDate"}
                        value={endDate}
                        disabled={!isChecked}
                        onChange={onChangeEndDate}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <StatTable data={data.firms} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Statistics;
