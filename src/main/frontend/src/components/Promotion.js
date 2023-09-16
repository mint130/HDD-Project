import React, {useState, useEffect, useRef} from "react";
import axios, {postForm} from "axios";
import {useForm} from 'react-hook-form';
import styles from "./sign_up/Signup.module.css";

function Promotion() {

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>홍보</h1>
        </div>
    );
}

export default Promotion