import React, { useEffect } from "react";
import { Spinner as BSpinner } from "react-bootstrap";
import styles from "./spinnerStyle.module.css";

function Spinner() {
    useEffect(()=>{

        document.body.style.overflow='hidden'
        return ()=>{
            document.body.style.overflow='auto'
        }
    },[])
  return (
    <div className={styles.spinnerContainer}>
      <BSpinner animation="border" role="status" className={styles.spinner}>
        <span className="sr-only">Loading...</span>
      </BSpinner>
    </div>
  );
}

export default Spinner;

// rfcrdx
// rfc
