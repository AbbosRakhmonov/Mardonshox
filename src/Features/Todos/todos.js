import React, {useCallback, useEffect, useState} from "react";
import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver';
import {Link, useParams} from "react-router-dom";
import ConstTable from "../../Components/constTable";
import PlusButton from "../../Components/plusButton";
import ConstModal from "../../Components/Modal/constModal";
import WarningModal from "../../Components/Modal/warningModal";
import {IoChevronBack} from "react-icons/io5";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import PTSerif from "./PTSerif-Regular.ttf";
import {useDispatch, useSelector} from "react-redux";
import {
    createReport,
    deleteReport,
    getReports,
    updateReport,
} from "./todoSlice";
import TodoFooter from "../../Components/todoFooter";
import moment from "moment";

function Todos() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {reports, loading, firmName} = useSelector((state) => state.report);
    const [currentTodo, setCurrentTodo] = useState(null);
    const [warningModal, setWarningModal] = useState(false);
    const [modal, setModal] = useState(false);
    const [isChecked, setIsChecked] = useState(true);
    const [startDate, setStartDate] = useState(() => {
        const today = moment();
        return moment(today).startOf("month").toISOString().substring(0, 10);
    });
    const [endDate, setEndDate] = useState(() => {
        const today = moment();
        return moment(today).endOf("month").toISOString().substring(0, 10);
    });
    const toggleModal = () => {
        setModal(!modal);
        setCurrentTodo(null);
    };
    const toggleWarningModal = () => {
        setWarningModal(!warningModal);
        setCurrentTodo(null);
    };
    const addTodo = (e) => {
        e.preventDefault();
        const obj = {
            income: Number(e.target?.income?.value) || 0,
            outcome: Number(e.target?.outcome?.value) || 0,
            comment: e.target.comment.value,
            firm: id,
            createdAt: new Date(e.target.createdAt.value).toISOString(),
        };
        dispatch(createReport(obj)).then(({error}) => {
            if (!error) toggleModal();
        });
    };
    const editTodo = (data) => {
        setModal(true);
        setCurrentTodo(data);
    };
    const deleteTodo = (data) => {
        setCurrentTodo(data);
        setWarningModal(true);
    };
    const saveEditedTodo = (e) => {
        e.preventDefault();
        const obj = {
            ...currentTodo,
            income: e.target?.income?.value || 0,
            outcome: e.target?.outcome?.value || 0,
            comment: e.target.comment.value,
            createdAt: new Date(e.target.createdAt.value).toISOString(),
        };
        dispatch(updateReport(obj)).then(({error}) => {
            if (!error) toggleModal();
        });
    };
    const deleteCurrentTodo = (e) => {
        e.preventDefault();
        dispatch(deleteReport(currentTodo._id)).then(({error}) => {
            if (!error) toggleWarningModal();
        });
    };
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
        const filteredData = reports.map((item, index) => ({
            "№": index + 1,
            "Сана": new Date(item.createdAt).toLocaleDateString("ru-RU"),
            "Кирим": item.income,
            "Чиқим": item.outcome,
            "Изоҳ": item.comment
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
        const data = new Blob([excelBuffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'});
        let date = new Date().toLocaleDateString()
        let fileName = `${firmName}-Ҳисобот-${date}.xlsx`
        saveAs(data, fileName);
    }, [reports, firmName])

    const exportAsPDF = useCallback(() => {
        const doc = new jsPDF();
        // change font which read cyrillic and utf-8
        doc.addFileToVFS(PTSerif);
        doc.addFont(PTSerif, "PTSerif", "normal");
        doc.setFont("PTSerif");
        doc.setFontSize(12);
        doc.text(`Фирма: ${firmName}`, 10, 10);
        doc.text(`Сана: ${new Date().toLocaleDateString("ru-RU")}`, 10, 20);

        const tableColumn = ["№", "Сана", "Кирим", "Чиқим", "Изоҳ"];

        doc.autoTable({
            head: [tableColumn],
            body: [...reports.map((item, index) => [
                index + 1,
                new Date(item.createdAt).toLocaleDateString("ru-RU"),
                item.income,
                item.outcome,
                item.comment
            ])],
            startY: 30,
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
        const fileName = `${firmName}-Ҳисобот-${dateStr}.pdf`;
        doc.save(fileName);
    }, [reports, firmName]);

    useEffect(() => {
        if (isChecked) {
            const s = new Date(startDate);
            s.setHours(0, 0, 0, 0);
            const e = new Date(endDate);
            e.setHours(23, 59, 59, 999);
            dispatch(
                getReports({
                    id,
                    startDate: s.toISOString(),
                    endDate: e.toISOString(),
                })
            );
        } else {
            dispatch(
                getReports({
                    id,
                    startDate: "",
                    endDate: "",
                })
            );
        }
    }, [dispatch, id, startDate, endDate, isChecked]);

    if (loading) return <>loading...</>;
    return (
        <div className={"container"}>
            <WarningModal
                isOpen={warningModal}
                toggle={toggleWarningModal}
                success={deleteCurrentTodo}
            />
            <ConstModal
                isOpen={modal}
                body={"todo"}
                toggle={toggleModal}
                comment={currentTodo?.comment}
                out={currentTodo?.outcome}
                inc={currentTodo?.income}
                date={currentTodo?.createdAt}
                success={currentTodo ? saveEditedTodo : addTodo}
            />
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
                        <h5 className={"h5"}>{firmName}</h5>
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
            <TodoFooter data={reports}/>
            <div className="row">
                <div className="col-md-12">
                    <ConstTable
                        data={reports}
                        edit={editTodo}
                        del={deleteTodo}
                        loading={loading}
                    />
                </div>
            </div>
            <PlusButton onClick={() => setModal(true)}/>
        </div>
    );
}

export default Todos;
