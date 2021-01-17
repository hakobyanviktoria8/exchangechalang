import React, {useEffect, useState} from "react";
import "./Exchange.css";
import CAD from "../Flags/CAD.jpg";
import HKD from "../Flags/HKD.png";
import ISK from "../Flags/ISK.png";
import PHP from "../Flags/PHP.png";
import DKK from "../Flags/DKK.png";
import HUF from "../Flags/HUF.png";
import CZK from "../Flags/CZK.png";
import AUD from "../Flags/AUD.png";
import RON from "../Flags/RON.png";
import SEK from "../Flags/SEK.png";
import IDR from "../Flags/IDR.png";
import INR from "../Flags/INR.png";
import BRL from "../Flags/br.png";
import RUB from "../Flags/ru.png";
import HRK from "../Flags/hr.png";
import JPY from "../Flags/jp.png";
import THB from "../Flags/th.png";
import CHF from "../Flags/CHF.png";
import SGD from "../Flags/sg.png";
import PLN from "../Flags/pl.png";
import BGN from "../Flags/bg.png";
import TRY from "../Flags/TRY.svg";
import CNY from "../Flags/cn.png";
import NOK from "../Flags/no.png";
import NZD from "../Flags/nz.png";
import ZAR from "../Flags/za.png";
import USD from "../Flags/us.png";
import MXN from "../Flags/mx.png";
import ILS from "../Flags/il.png";
import GBP from "../Flags/gb.png";
import KRW from "../Flags/kr.png";
import MYR from "../Flags/my.png";

const Exchange=(props)=>{
    const [date, setDate] = useState("");
    const [values,setValues] = useState({});
    const [selectValueHave,setSelectValueHave] = useState("AUD");
    const [selectValueWant,setSelectValueWant] = useState("AUD");
    const [inputValueHave,setInputValueHave] = useState(1);
    const [inputValueWant,setInputValueWant] = useState("");
    const [inputValueHaveRates,setInputValueHaveRates] = useState({});
    const flagsObj={
        "CAD":[CAD, "CAD dollar", "C$"],
        "HKD":[HKD,"HKD dollar","HK$"],
        "ISK":[ISK,"ISK króna","Íkr"],
        "PHP":[PHP,"peso","₱"],
        "DKK":[DKK, "DKK krone", "Kr"],
        "HUF":[HUF, "forint", "Ft"],
        "CZK":[CZK, "koruna", "Kč"],
        "AUD":[AUD, "AUD dollar", "A$"],
        "RON":[RON, "RON leu", "lei"],
        "SEK":[SEK, "SEK krona", "kr"],
        "IDR":[IDR, "rupiah", "Rp"],
        "INR":[INR, "rupee", "₹"],
        "BRL":[BRL, "real", "R$"],
        "RUB":[RUB, "ruble", "₽"],
        "HRK":[HRK, "kuna", "kn"],
        "JPY":[JPY, "yen", "¥"],
        "THB":[THB, "baht", "฿"],
        "CHF":[CHF, "franc", "Fr"],
        "SGD":[SGD, "SGD dollar", "S$"],
        "PLN":[PLN, "złoty", " zł"],
        "BGN":[BGN, "lev", "Лв"],
        "TRY":[TRY, "lira", "₺"],
        "CNY":[CNY, "renminbi", "¥"],
        "NOK":[NOK, "NOK krone", "kr"],
        "NZD":[NZD, "NZD dollar", "N$"],
        "ZAR":[ZAR, "rand", "R"],
        "USD":[USD, "US dollar", "$"],
        "MXN":[MXN, "peso", "Mex$"],
        "ILS":[ILS, "Shekel", "₪"],
        "GBP":[GBP, "sterling", "£"],
        "KRW":[KRW, "won", "₩"],
        "MYR":[MYR, "ringgit", "RM"]
    };

    useEffect(() => {
        fetch("https://api.exchangeratesapi.io/latest?base")
            .then(response => response.json())
            .then(results => {
                setDate(results.date);
                setValues(results.rates);
            });
        fetch("https://api.exchangeratesapi.io/latest?base="+ selectValueHave)
            .then(response => response.json())
            .then(results => {
                setInputValueHaveRates(results.rates);
                setInputValueWant("")
            })
    },[selectValueHave,inputValueHave,selectValueWant]);


    const handleSubmit=(event)=>{
        event.preventDefault();
        setInputValueWant((inputValueHave * inputValueHaveRates[selectValueWant]).toFixed(2));
    };
    //select change
    const handleChangeSelectHave=(event)=>{
        setSelectValueHave(event.target.value)
    };
    const handleChangeSelectWant=(event)=>{
        setSelectValueWant(event.target.value)
    };
    //input change
    const handleChangeInputHave=(event)=>{
        setInputValueHave(event.target.value);
    };
    const handleChangeInputWant=(event)=>{
        setInputValueWant(event.target.value)
    };

    return(
        <div className={"Exchange"}>
            <h1>Amazing Currency Converter</h1>

            <form onSubmit={handleSubmit}>
                {/*have money*/}
                <label>
                    I have
                    <input type="number" min="1" value={inputValueHave} onChange={handleChangeInputHave} />

                    <select value={selectValueHave} onChange={handleChangeSelectHave}>
                        {Object.keys(values).sort().map(value =>
                            <option key={value} value={value}>{flagsObj[value][1]}</option>
                       )}
                    </select>
                </label>

                {/*want exchange*/}
                <label className={"label"}>
                    I want
                    <input type="text" readOnly={true}  value={inputValueWant} onChange={handleChangeInputWant}  placeholder={0.00}/>

                    <select value={selectValueWant} onChange={handleChangeSelectWant}>
                        {Object.keys(values).sort().map(value =>
                            <option key={value} value={value}>{flagsObj[value][1]}</option>
                       )}
                    </select>
                </label>
                <br/>
                <img src={flagsObj[selectValueHave][0]} alt=""/>
                <input type="submit" value="Exchange" className={"button"}/>
                <img src={flagsObj[selectValueWant][0]} alt=""/>
            </form>
            <div className={"message"}>
                <p>You can see the result here!</p><br/>
                <p style={{display:inputValueWant?"block":"none"}}>
                    Your <b>{inputValueHave} {flagsObj[selectValueHave][2]} </b>will currently buy you <b>{inputValueWant} {flagsObj[selectValueWant][2]}</b>
                </p>
            </div>
            <hr/>
            <div className={"footer"}>
                <span>Last update: {date}</span>
                <span>Copyright &copy; 2021 Viktorya</span>
            </div>
        </div>
    )
};
export default Exchange