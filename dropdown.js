import React, { useState, useEffect } from "react";
import { Label } from "reactstrap";
import "./style.scss";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

function DropDownList(props) {
  const { label, Data, setSelected, multiple, showSelected, onChange } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState([]);
  const [selectedName, setSelectedName] = useState("Select");
  const [isHeight, setIsHeight] = useState(160);
  const [isScrol, setIsScrol] = useState(false);

  useEffect(() => {
    if (Data) {
      if (Data.length < 7) {
        var Height = Data.length * 30 + 2;
        setIsHeight(Height);
        setIsScrol(false);
      } else {
        setIsHeight(160);
        setIsScrol(true);
      }
    }
  }, [Data]);

  const handleMultipleSelect = () => {
    const checkedValues = Array.from(
      document.querySelectorAll('input[type="checkbox"]')
    )
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => parseInt(checkbox.value));
    // setSelected(checkedValues);
    return checkedValues;
  };

  function handleChange(event) {
    const { name, value, checked } = event.target;
    // console.log("name value", name, value);
    setSelectedName(name);
    setIsChecked(value);

    if (Data) {
      setIsOpen(false);
      setSelected({ name, value });
    }
  }

  return (
    <>
      <Label>{label}</Label>
      <br />
      <div
        className="dropdown-list"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {showSelected ? selectedName : "Select"}
        <KeyboardArrowDownRoundedIcon className="arrow" />
      </div>
      {Data ? (
        <div
          className="dropdown-sublist"
          style={{
            display: isOpen ? "block" : "none",
            height: `${isHeight}px`,
            overflowY: isScrol ? "scroll" : "none",
          }}
          onClick={() => {
            if (!multiple) setIsOpen(false);
          }}
        >
          {Data.map((item) => (
            <>
              <input
                className="dropdown-input"
                type="checkbox"
                name={item.name}
                checked={!multiple ? isChecked == item.id : null}
                value={item.id}
                onChange={
                  !multiple ? handleChange : onChange(handleMultipleSelect())
                }
              />
              <label className="dropdown-label">{item.name}</label>
              <br />
            </>
          ))}
        </div>
      ) : (
        <div
          className="dropdown-sublist2"
          onClick={() => {
            setIsOpen(false);
          }}
          style={{
            display: isOpen ? "flex" : "none",
          }}
        >
          No Record Found
        </div>
      )}
    </>
  );
}

export default DropDownList;
