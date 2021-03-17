import React, { useState } from "react";
import { connect } from "react-redux";
import {
  InputGroup,
  FormControl,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { textTruncate } from "../../helpers/utils";
import DatePicker from "react-datepicker";
import { formatDate } from "../../helpers/utils";
import {getTasks} from '../../store/action'
import "react-datepicker/dist/react-datepicker.css";
import styles from "./searchStyle.module.css";

const statusOptions = [
  { label: "All", value: "" },
  { label: "Active", value: "active" },
  { label: "Done", value: "done" },
];

const sortOptions = [
  { label: "All", value: "" },
  { label: " A-Z  ", value: "a-z" },
  { label: " Z-A  ", value: "z-a" },
  { label: "Creation date oldest", value: "creation_date_oldest" },
  { label: "Creation date newest", value: "creation_date_newest" },
  { label: "Completion date oldest", value: "completion_date_oldest" },
  { label: "Completion date newest", value: "completion_date_newest" },
];

const dateOption = [
  { label: "Created befor", value: "create_lte" },
  { label: "Created after", value: "create_gte" },
  { label: "Complete befor", value: "complete_lte" },
  { label: "Complete after", value: "complete_gte" },
];

function Search({getTasks}) {
  const [status, setStatus] = useState({
    value: "",
  });

  const [sort, setSort] = useState({
    value: "",
  });
  const [search, setSearch] = useState("");

  const [dates, setDates] = useState({
    create_lte: null,

    create_gte: null,

    complete_lte: null,

    complete_gte: null,
  });

  const handleChangeDate = (value, name) => {
    setDates({
      ...dates,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const params = {};
    search && (params.search = search);
    sort.value && (params.sort = sort.value);
    status.value && (params.status = status.value);

    for (let key in dates) {
      const value = dates[key];
      if (value) {
        const date = formatDate(value.toISOString());

        params[key] = date;
      }
    }
    getTasks(params);
  };
  return (
    <div>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search"
          onChange={(event) => setSearch(event.target.value)}
        />
        <DropdownButton
          as={InputGroup.Prepend}
          variant="outline-secondary"
          title={status.value ? status.label : "Status"}
          id="input-group-dropdown-1"
        >
          {statusOptions.map((option, index) => (
            <Dropdown.Item
              active={status.value === option.value}
              key={index}
              onClick={() => setStatus(option)}
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </DropdownButton>

        <DropdownButton
          as={InputGroup.Prepend}
          variant="outline-secondary"
          title={sort.value ? textTruncate(sort.label, 6) : "Sort"}
          id="input-group-dropdown-1"
        >
          {sortOptions.map((option, index) => (
            <Dropdown.Item
              active={sort.value === option.value}
              key={index}
              onClick={() => setSort(option)}
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <Button variant="outline-primary" onClick={handleSubmit}>
          Search
        </Button>

        <InputGroup.Append></InputGroup.Append>
      </InputGroup>
      <div className={styles.dateBlock}>
        {dateOption.map((option, index) => (
          <div style={{ width: "400px" }} key={index}>
            <div>{option.label}</div>
            <div>
              <DatePicker
                selected={dates[option.value]}
                onChange={(value) => handleChangeDate(value, option.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



const mapDispatchToProps = {
    getTasks
};

export default connect(null, mapDispatchToProps)(Search);
