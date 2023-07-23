import React, { useEffect, useState } from "react";
import { Cell, Column, HeaderCell, Table } from "rsuite-table";

function StatTable({ data }) {
  const [heightOfTable, setHeightOfTable] = useState(0);
  const getHeight = () => {
    const headerHeight = document.querySelector("header")?.offsetHeight;
    const footerHeight = document.querySelector(".footer-bottom")?.offsetHeight;
    const topOfTableHeight =
      document.querySelector(".top-of-table")?.offsetHeight;
    return (
      (window.innerHeight - footerHeight - headerHeight - topOfTableHeight) *
      0.9
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
      height={heightOfTable}
      affixHeader={true}
      renderEmpty={() => {
        return <div className="rs-table-body-info">No data found</div>;
      }}
      rowHeight={30}
    >
      <Column fixed verticalAlign={"middle"} width={70}>
        <HeaderCell>№</HeaderCell>
        <Cell>
          {(rowData, rowIndex) => {
            return rowIndex + 1;
          }}
        </Cell>
      </Column>
      <Column fixed verticalAlign={"middle"} width={200}>
        <HeaderCell>Фирма</HeaderCell>
        <Cell>{(rowData) => <span>{rowData.firm}</span>}</Cell>
      </Column>
      <Column flexGrow={1} verticalAlign={"middle"}>
        <HeaderCell style={{ background: "#009A42" }}>Кирим</HeaderCell>
        <Cell>
          {(rowData) => <span>{rowData.incomes.toLocaleString("ru-RU")}</span>}
        </Cell>
      </Column>
      <Column flexGrow={1} verticalAlign={"middle"}>
        <HeaderCell style={{ background: "#ED0B2F" }}>Чиким</HeaderCell>
        <Cell>
          {(rowData) => <span>{rowData.outcomes.toLocaleString("ru-RU")}</span>}
        </Cell>
      </Column>
      <Column flexGrow={1} verticalAlign={"middle"}>
        <HeaderCell>Жами</HeaderCell>
        <Cell>
          {(rowData) => <span>{rowData.all.toLocaleString("ru-RU")}</span>}
        </Cell>
      </Column>
    </Table>
  );
}

export default StatTable;
