import React from "react";

function statFooter(props) {
  const { incomes, outcomes, all } = props;
  return (
    <div
      className={
        "footer-bottom overflow-auto alert alert-secondary m-0 my-alert d-flex gap-5 justify-content-center"
      }
    >
      <span className={"h5 footer-text text-success text-sm-center"}>
        Киримлар: &nbsp;{incomes.toLocaleString("ru-RU")}
      </span>
      <span className={"h5 footer-text text-danger text-sm-center"}>
        Чикимлар: &nbsp;{outcomes.toLocaleString("ru-RU")}
      </span>
      <span className={"h5 footer-text text-sm-center"}>
        Жами: &nbsp;{all.toLocaleString("ru-RU")}
      </span>
    </div>
  );
}

export default statFooter;
