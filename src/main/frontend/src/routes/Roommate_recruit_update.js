import React, { useEffect, useState } from 'react';
import {useForm, Controller} from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from "../components/recruit/roommate/Roommate_recruit_write.module.css";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "../components/recruit/datepicker.css";

const Roommate_recruit_update=()=>{
    const navigate = useNavigate();
    const {boardId}=useParams();
    const{register, control, setValue, handleSubmit, watch, formState: {errors}}=useForm();
    
    return (
        <div>
            수정
        </div>
    );
}
export default Roommate_recruit_update