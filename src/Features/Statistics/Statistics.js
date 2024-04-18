import jsPDF from 'jspdf';
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as XLSX from 'xlsx';
import PTSerif from '../Todos/PTSerif-Regular.ttf';
import {getStatistics} from "./statSlice";
import {Link} from "react-router-dom";
import {IoChevronBack} from "react-icons/io5";
import StatFooter from "../../Components/statFooter";
import StatTable from "../../Components/statTable";
import moment from "moment";
import {saveAs} from 'file-saver';
import 'jspdf-autotable';

function Statistics() {
    const dispatch = useDispatch();
    const {data, loading, error} = useSelector((state) => state.stat);
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
        const {value} = e.target;
        setStartDate(value);
    };

    const onChangeEndDate = (e) => {
        const {value} = e.target;
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
    const exportAsExcel = useCallback(() => {
        const filteredData = data.firms.map((item, index) => ({
            "№": index + 1,
            "Фирма": item.firm,
            "Кирим": item.incomes,
            "Чиқим": item.outcomes,
            "Жами": item.all,
        }))

        const ws = XLSX.utils.json_to_sheet(filteredData);
        // Calculate the maximum length of the content in each column
        const colWidth = filteredData.map(row =>
            Object.values(row).map(val =>
                (val.toString().length + 5 || 10)
            )
        );

        // Set the width of the column based on the maximum length
        ws['!cols'] = Object.keys(filteredData[0]).map((k, i) =>
            ({wch: Math.max(...colWidth.map(row => row[i]))})
        );
        const wb = {Sheets: {'Ҳисобот': ws}, SheetNames: ["Ҳисобот"]};
        const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
        // auto columns width
        const statistics = new Blob([excelBuffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'});
        let date = new Date().toLocaleDateString()
        let fileName = `Ҳисобот-${date}.xlsx`
        saveAs(statistics, fileName);
    }, [data])

    const exportAsPDF = useCallback(() => {
                const doc = new jsPDF();
                // change font which read cyrillic and utf-8
                doc.addFileToVFS(PTSerif);
                doc.addFont(PTSerif, "PTSerif", "normal");
                doc.setFont("PTSerif");
                doc.setFontSize(12);
                doc.text(`Сана: ${new Date(startDate).toLocaleDateString("ru-RU")} - ${new Date(endDate).toLocaleDateString("ru-RU")}`, 10, 10);
                // text in green color
                doc.setTextColor(0, 128, 0);
                doc.text("Киримлар :", 10, 20);
                doc.setTextColor(0, 0, 0, 0.7);
                doc.text(`${data.incomes.toLocaleString('ru-RU')}  сўм`, 35, 20);
                // text in red color
                doc.setTextColor(255, 0, 0);
                doc.text("Чиқимлар :", 10, 30);
                // color 70% black
                doc.setTextColor(0, 0, 0, 0.7);
                doc.text(`${data.outcomes.toLocaleString('ru-RU')}  сўм`, 35, 30);
                // // text in black color
                doc.setTextColor(0, 0, 0);
                doc.text("Жами :", 10, 40);
                doc.setTextColor(0, 0, 0, 0.7);
                doc.text(`${data.all.toLocaleString('ru-RU')}  сўм`, 35, 40);

                const tableColumn = ["№", "Фирма", "Кирим", "Чиқим", "Жами"];

                doc.autoTable({
                    head: [tableColumn],
                    body: [...data.firms.map((item, index) => [
                        index + 1,
                        item.firm,
                        item.incomes,
                        item.outcomes,
                        item.all
                    ])],
                    startY: 50,
                    theme: "grid",
                    styles: {
                        font: "PTSerif",
                        fontSize: 10,
                        cellPadding: 2,
                        halign: "center",
                        valign: "middle",
                    },
                })

                const dateStr = new Date().toLocaleDateString("ru-RU");
                const fileName = `Ҳисобот-${dateStr}.pdf`;
                doc.save(fileName);
            },
            [data]
        )
    ;

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
                                <IoChevronBack/>
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
                                    <div className={"d-flex gap-3 flex-wrap"}>
                                        {/*  download as pdf or excel button*/}
                                        <button className="btn btn-success" onClick={exportAsExcel}>Эгзел</button>
                                        <button className="btn btn-danger" onClick={exportAsPDF}>ПДФ</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <StatTable data={data.firms}/>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Statistics;
