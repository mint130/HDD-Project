import React, { useEffect, useState } from 'react';
import styles from "./Roommate_recruit_search.module.css"
function Roommate_recruit_search({ onSearch }) {


    const [searchParams, setSearchParams] = useState({
        sex: "M", dormType: null, smoke: false
    });

    useEffect(() => {
        // searchParams가 변경될 때마다 작업을 수행
        //console.log("searchParams:", searchParams);
    }, [searchParams]); // searchParams가 변경될 때만 useEffect가 호출됨

    const handleInputChange = (name, value) => {
        //console.log("name:", name);
        //console.log("value:", value);
        let newSearchParams;

        if(value === null|| value===''||Number.isNaN(value))
        {
            const {[name]:deletedField, ...rest}=searchParams;

            newSearchParams={...rest};
        }
        else
        {
            newSearchParams={...searchParams, [name]:value}
        }


        setSearchParams(newSearchParams);

    };

    const handleSearch = () => {
        onSearch(searchParams);
    };

    return (
        <div className={styles.block}>
            <div className={styles.table}>
                <dl className={styles.column}>
                    <dt className={styles.item}>성별</dt>
                    <dd className={styles.content}>
                        <select className={styles.select} name="sex" value={searchParams.sex} onChange={(e) => handleInputChange("sex", e.target.value)}>
                            <option value="M">남성</option>
                            <option value="F">여성</option>
                        </select>
                    </dd>
                </dl>
                <dl className={styles.column}>
                    <dt className={styles.item}>흡연 여부</dt>
                    <dd className={styles.content}>
                        <input
                            type="checkbox"
                            name="smoke"
                            className={styles.checkbox}
                            checked={searchParams.smoke}
                            onChange={(e) => handleInputChange("smoke", e.target.checked)}
                        />
                    </dd>
                </dl>
                <dl className={styles.column}>
                    <dt className={styles.item}>유형</dt>
                    <dd className={styles.content}>
                        <select className={styles.select} name="dormType" value={searchParams.dormType} onChange={(e)=>handleInputChange("dormType", parseInt(e.target.value))}>
                            <option value="">선택 안 함</option>
                            <option value={1}>1기숙사</option>
                            <option value={2}>2기숙사</option>
                            <option value={3}>3기숙사</option>
                            <option value={0}>자취</option>
                        </select>
                    </dd>

                </dl>
            </div>
            <div className={styles.btn_area}>
                <button className={styles.btn_type + " " + styles.btn_secondary} onClick={handleSearch}>검색</button>
            </div>

        </div>
    );
}

export default Roommate_recruit_search;
