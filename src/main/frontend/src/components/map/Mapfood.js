import React, {useEffect} from "react";
import styles from "./Mapfood.module.css";
import {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";


/*global kakao*/

const {kakao} =window;

function MapPage(){
    let markers = [];
    let ps;
    let infowindow;
    let map;
    const [x, setX] = useState([]);


    useEffect(() => {

        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(37.5529284, 126.9211407),
            level: 5,
        };

        map = new window.kakao.maps.Map(container, options);
        map.setMaxLevel(5); //지도 확대 정도 제한
        //map.setDraggable(false); //지도 drag 불가능

        // 장소 검색 객체를 생성합니다
        ps = new window.kakao.maps.services.Places();


        // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
        infowindow = new window.kakao.maps.InfoWindow({
            zIndex: 1,
            disableAutoPan: true //자동으로 지도 이동하는거 막기
        });

    })
// 키워드로 장소를 검색

    const searchPlaces = ()=>{

        let keyword = '홍대' + document.getElementById('keyword').value;
        if (keyword == '홍대') {
            alert('키워드를 입력해주세요!');
            return false;
        }

        // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
        ps.keywordSearch( keyword, placesSearchCB);
    }

// 키워드 검색 완료 시 호출되는 콜백함수
    const placesSearchCB = (data, status, pagination)=> {

        if (status === kakao.maps.services.Status.OK) {

            // 정상적으로 검색이 완료됐으면
            // 검색 목록과 마커를 표출합니다
            displayPlaces(data);

            // 페이지 번호를 표출합니다

            displayPagination(pagination);


        } else if (status === kakao.maps.services.Status.ZERO_RESULT ) {

            alert('검색 결과가 존재하지 않습니다.');
            return;

        } else if (status === kakao.maps.services.Status.ERROR ) {

            alert('검색 결과 중 오류가 발생했습니다.');
            return;
        }
    }

    const displayPlaces = (places)=>{
        const div = document.getElementById('storeinfo');
        div.style.display = 'none'
        let listEl = document.getElementById('placesList'),
            menuEl = document.getElementById('menu_wrap'),
            fragment = document.createDocumentFragment(),
            bounds = new kakao.maps.LatLngBounds(),
            listStr = '';

        // 검색 결과 목록에 추가된 항목들을 제거합니다

        removeAllChildNods(listEl);


        // 지도에 표시되고 있는 마커를 제거합니다
        removeMarker();

        for ( let i=0; i<places.length; i++ ) {
            // 마커를 생성하고 지도에 표시합니다
            let placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
            let marker = addMarker(placePosition, i);
            let itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            bounds.extend(placePosition);

            // 마커와 검색결과 항목을 클릭했을때
            // 해당 장소에 인포윈도우에 장소명을 표시합니다

            (function(marker, title,plat, plng, address,phone) {
                const div = document.getElementById('storeinfo');

                kakao.maps.event.addListener(marker, 'click', function() {
                    document.getElementById('storeName').value = title;
                    document.getElementById('lat').value = plat;
                    document.getElementById('lng').value = plng;
                    document.getElementById('address').value = address;
                    document.getElementById('phoneNum').value = phone;
                    displayInfowindow(marker, title);
                    if(div.style.display === 'none')  {
                        div.style.display = 'block';
                    }
                });

                itemEl.onclick =  function () {
                    document.getElementById('storeName').value = title;
                    document.getElementById('lat').value = plat;
                    document.getElementById('lng').value = plng;
                    document.getElementById('address').value = address;
                    document.getElementById('phoneNum').value = phone;
                    displayInfowindow(marker, title);
                    if(div.style.display === 'none')  {
                        div.style.display = 'block';
                    }
                };


            })(marker, places[i].place_name, places[i].y,places[i].x,places[i].road_address_name,places[i].phone);


            fragment.appendChild(itemEl);

        }


        // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
        listEl.appendChild(fragment);
        menuEl.scrollTop = 0;

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        //map.setBounds(bounds);
    }


    function getListItem(index, places) {
        let el = document.createElement('li'),
            itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                '<div class="info">' +
                '   <h5>' + places.place_name + '</h5>';

        if (places.road_address_name) {
            itemStr += '    <span>' + places.road_address_name + '</span>' +
                '   <span class="jibun gray">' +  places.address_name  + '</span>';
        } else {
            itemStr += '    <span>' +  places.address_name  + '</span>';
        }

        itemStr += '  <span class="tel">' + places.phone  + '</span>' +
            '</div>';

        el.innerHTML = itemStr;
        el.className = 'item';

        return el;
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    const addMarker = (position, idx,title) => {
        var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
            imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
            imgOptions =  {
                spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
            },
            markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
            marker = new kakao.maps.Marker({
                position: position, // 마커의 위치
                image: markerImage
            });

        marker.setMap(map); // 지도 위에 마커를 표출합니다
        markers.push(marker);  // 배열에 생성된 마커를 추가합니다

        return marker;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    const removeMarker = () => {
        for ( let i = 0; i < markers.length; i++ ) {
            markers[i].setMap(null);
        }
        markers = [];
    }

    // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
    const displayPagination = (pagination) => {
        let paginationEl = document.getElementById('pagination'),
            fragment = document.createDocumentFragment(),
            i;

        // 기존에 추가된 페이지번호를 삭제합니다
        while (paginationEl.hasChildNodes()) {
            paginationEl.removeChild (paginationEl.lastChild);
        }

        for (i=1; i<=pagination.last; i++) {
            let el = document.createElement('a');
            el.href = "#";
            el.innerHTML = i;

            if (i===pagination.current) {
                el.className = 'on';
            } else {
                el.onclick = (function(i) {
                    return function() {
                        pagination.gotoPage(i);
                    }
                })(i);
            }

            fragment.appendChild(el);
        }
        paginationEl.appendChild(fragment);
    }




    // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
    // 인포윈도우에 장소명을 표시합니다
    // 카테고리 선택 , 식당 추가 버튼
    const displayInfowindow = (marker, title) => {


        let content =
            '<div style="padding:3px;z-index:1; font-size:11px;">'
            + title +
            '</div>';
        infowindow.setContent(content);
        infowindow.open(map, marker);

    }

    const handleSubmit=()=>{

        let lat = document.getElementById('lat').value;
        let lng = document.getElementById('lng').value;
        let storeName = document.getElementById('storeName').value;
        let address = document.getElementById('address').value;
        let phoneNum = document.getElementById('phoneNum').value;

        //post 요청 보낼 url
        axios.post('http://localhost:8080/api/map/addMarker', {
            lat: lat,
            lng: lng,
            storeName: storeName,
            address: address,
            phoneNum: phoneNum,
            category : x

        }, {
            headers: { 'Content-type': 'application/json' }
        })
            .then((response) => {
                alert('저장되었습니다.');

            })
            .catch(error => console.error(error.response));
    };

    // 검색결과 목록의 자식 Element를 제거하는 함수입니다
    const removeAllChildNods = (el) => {
        while (el.hasChildNodes()) {
            el.removeChild (el.lastChild);
        }
    }

    const handleRadiobtn = (e) => {
        console.log(e.target.value)
        setX(e.target.value)
    }

    return(

        <div className={styles.container}>
            <div className={styles.keyword_wrap}>
                <div className={styles.select}>
                    <a className={styles.foodselect} href="/api/map">맛집</a>
                    <a className={styles.cafenone} href="/api/mapcafe">카페</a>
                </div>
                <div id="map" className={styles.map} >
                </div>

                <div id="menu_wrap" className={styles.bg_white}>
                    <div className={styles.option}>
                        <div>
                            <input type="text" id="keyword" size="15" />
                            <button onClick={searchPlaces}>검색</button>
                        </div>
                    </div>
                    <hr></hr>
                    <ul id="placesList"></ul>
                    <div id="pagination"></div>
                </div>
            </div>
            <div className={styles.filter}>
                <button type="button">일식</button>
                <button type="button">양식</button>
                <button type="button">한식</button>
                <button type="button">중식</button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className={styles.info} >
                    <div className={styles.storeinfo} id ='storeinfo'>
                        <div className={styles.noneDiv}>
                            <input type="text" id="lat" name="lat" ></input>
                            <input type="text" id="lng" name="lng" ></input>
                            <input type="text" id="phoneNum" name="phoneNum" ></input>
                        </div>
                        <div className={styles.storename}>
                            <input type="text" id="storeName" name="storeName" ></input>
                            <input type="text" id="address" name="address" ></input>
                        </div>

                        <div className={styles.selectcategory}>
                            <p>카테고리를 선택하세요.</p>
                            <label>
                                <input type="radio" id ="category1" name ="category" value="1" checked={x === "1"} onChange={handleRadiobtn}/>
                                한식
                            </label>
                            <label>
                                <input type="radio" id ="category2" name ="category" value="2" checked={x === "2"} onChange={handleRadiobtn}/>
                                일식
                            </label>
                            <label>
                                <input type="radio" id ="category3" name ="category" value="3" checked={x === "3"} onChange={handleRadiobtn}/>
                                양식
                            </label>
                            <label>
                                <input type="radio" id ="category4" name ="category" value="4" checked={x === "4"} onChange={handleRadiobtn}/>
                                중식
                            </label>

                        </div>
                        <button type="submit">식당 추가하기</button>
                    </div>
                </div>
            </form>


        </div>

    );
}
export default MapPage