import React, { useEffect, useState } from "react";
import { Cell, Column, HeaderCell, Table } from "rsuite-table";
import { IoTrash } from "react-icons/io5";

function ConstTable({ data, edit, del, loading }) {
  const [heightOfTable, setHeightOfTable] = useState(0);
  const getHeight = () => {
    const headerHeight = document.querySelector("header")?.offsetHeight;
    const footerHeight = document.querySelector(".footer-bottom")?.offsetHeight;
    const topOfTableHeight =
      document.querySelector(".top-of-table")?.offsetHeight;
    return (
      (window.innerHeight - footerHeight - headerHeight - topOfTableHeight) *
      0.85
    );
  };
  useEffect(() => {
    window.addEventListener("resize", () => {
      setHeightOfTable(getHeight());
    });
    setHeightOfTable(getHeight());
  }, []);
  return (
    <Table
      data={data}
      cellBordered={true}
      wordWrap={"break-word"}
      loading={loading}
      height={heightOfTable}
      affixHeader={true}
      renderEmpty={() => {
        return <div className="rs-table-body-info">No data found</div>;
      }}
      rowHeight={30}
      onRowClick={edit}
    >
      <Column fixed verticalAlign={"middle"} width={70}>
        <HeaderCell>№</HeaderCell>
        <Cell>
          {(rowData, rowIndex) => {
            return rowIndex + 1;
          }}
        </Cell>
      </Column>
      <Column fixed verticalAlign={"middle"} width={90}>
        <HeaderCell>Сана</HeaderCell>
        <Cell>
          {(rowData) => (
            <span>
              {new Date(rowData.createdAt).toLocaleDateString("ru-RU")}
            </span>
          )}
        </Cell>
      </Column>
      <Column flexGrow={1} verticalAlign={"middle"}>
        <HeaderCell style={{ background: "#009A42" }}>Кирим</HeaderCell>
        <Cell>
          {(rowData) => <span>{rowData.income.toLocaleString("ru-RU")}</span>}
        </Cell>
      </Column>
      <Column flexGrow={1} verticalAlign={"middle"}>
        <HeaderCell style={{ background: "#ED0B2F" }}>Чиким</HeaderCell>
        <Cell>
          {(rowData) => <span>{rowData.outcome.toLocaleString("ru-RU")}</span>}
        </Cell>
      </Column>
      <Column flexGrow={3}>
        <HeaderCell verticalAlign={"middle"}>Изох</HeaderCell>
        <Cell dataKey="comment" />
      </Column>
      <Column verticalAlign={"middle"} width={50}>
        <HeaderCell>...</HeaderCell>
        <Cell>
          {(rowData) => (
            <button
              className={"btn btn-danger rounded-pill p-1"}
              onClick={(e) => {
                e.stopPropagation();
                del(rowData);
              }}
            >
              <IoTrash size={"1.5rem"} />
            </button>
          )}
        </Cell>
      </Column>
    </Table>
  );
}

export default ConstTable;
