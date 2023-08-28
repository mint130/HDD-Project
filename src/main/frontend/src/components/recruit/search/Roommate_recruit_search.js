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
        <div className={styles.search}>
            <dl className={styles.row}>
                <dt className={styles.item}>성별</dt>
                <dd>
                    <select className={styles.select} name="sex" value={searchParams.sex} onChange={(e) => handleInputChange("sex", e.target.value)}>
                        <option value="M">남성</option>
                        <option value="F">여성</option>
                    </select>
                </dd>
            </dl>
            <dl className={styles.row}>
                <label>흡연 여부</label>
                <input
                    type="checkbox"
                    name="smoke"
                    checked={searchParams.smoke}
                    onChange={(e) => handleInputChange("smoke", e.target.checked)}
                />
            </dl>
            <dl className={styles.row}>
                <label>유형</label>
                <select className={styles.select} name="dormType" value={searchParams.dormType} onChange={(e)=>handleInputChange("dormType", parseInt(e.target.value))}>
                    <option value="">선택 안 함</option>
                    <option value={1}>1기숙사</option>
                    <option value={2}>2기숙사</option>
                    <option value={3}>3기숙사</option>
                    <option value={0}>자취</option>
                </select>
            </dl>

            <button onClick={handleSearch}>검색</button>
        </div>
    );
}

export default Roommate_recruit_search;
