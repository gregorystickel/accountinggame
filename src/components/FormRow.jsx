import React from "react";
import classes from "./FormRow.module.css"

const FormRow = ({ name, index }) => {
  return (
    <div>
      <input
        name={name + "date" + index}
        type="text"
        id={name + "date" + index}
        placeholder="mm/dd"
      />

      <select name={name + "type" + index} id="r1type">
        <option value="revenue">Revenue</option>
        <option value="deferred">Deferred</option>
        <option value="cash">Cash</option>
        <option value="receivable">Receivable</option>
        <option value="contra">Contra</option>
        <option value="liabilty">System Credit(Liability)</option>
      </select>
      <label htmlFor={name + "cr" + index}>CR:</label>
      <input
        className={classes.resize}
        type="number"
        name={name + "cr" + index}
        id={name + "cr" + index}
      />
      <label htmlFor={name + "dr" + index}>DR:</label>
      <input
        className={classes.resize}
        type="number"
        name={name + "dr" + index}
        id={name + "dr" + index}
      />
    </div>
  );
};

export default FormRow;
