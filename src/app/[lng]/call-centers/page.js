"use client";
import React from "react";
import { Table } from "antd";

const sharedOnCell = (_, index) => {
  if (index === 1) {
    return {
      colSpan: 0,
    };
  }
  return {};
};
const columns = [
  {
    title: "Наименование",
    dataIndex: "key",
    rowScope: "row",
  },
  {
    title: "Телефоны доверия",
    dataIndex: "name",
    render: (text) => <a>{text}</a>,
    onCell: (_, index) => ({
      colSpan: index === 1 ? 5 : 1,
    }),
  },
  {
    title: "Контакты справочных служб",
    dataIndex: "age",
    onCell: sharedOnCell,
  },
  {
    title: "Home phone",
    colSpan: 2,
    dataIndex: "tel",
    onCell: (_, index) => {
      if (index === 3) {
        return {
          rowSpan: 2,
        };
      }
      // These two are merged into above cell
      if (index === 4) {
        return {
          rowSpan: 0,
        };
      }
      if (index === 1) {
        return {
          colSpan: 0,
        };
      }
      return {};
    },
  },
  {
    title: "Phone",
    colSpan: 0,
    dataIndex: "phone",
    onCell: sharedOnCell,
  },
  {
    title: "Address",
    dataIndex: "address",
    onCell: sharedOnCell,
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    tel: "0571-22098909",
    phone: 18889898989,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    tel: "0571-22098333",
    phone: 18889898888,
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    tel: "0575-22098909",
    phone: 18900010002,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 18,
    tel: "0575-22098909",
    phone: 18900010002,
    address: "London No. 2 Lake Park",
  },
  {
    key: "5",
    name: "Jake White",
    age: 18,
    tel: "0575-22098909",
    phone: 18900010002,
    address: "Dublin No. 2 Lake Park",
  },
];

const CallCenters = () => {
  return (
    <section className="section section--publish call__container">
      <div className="container">
        <div className="call">
          <h2 className="title title-left text-low title-h2 call__title">
            Call-центры государственных органов РК
          </h2>
          <div className="call__content">
            <Table
              columns={columns}
              dataSource={data}
              bordered
              pagination={false}
            />
            ;
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallCenters;
