import styles from "./Detail_page.module.css";
import React from "react";

const List=({label, item})=>{
    return (
        <div className={styles.row}>
            <div className={styles.list}>
                <label htmlFor={label}>{label}</label>
            </div>
            {item}
        </div>
    );
}
export default List;