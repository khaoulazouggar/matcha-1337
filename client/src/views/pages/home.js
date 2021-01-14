import React from "react"
import "../../css/home.css"
import test from "../../photos/test.jpeg"
import checked from "../../photos/checked.svg"
import cancel from "../../photos/cancel.svg"


function Home() {
    return (
        <div className="cards">
            <div className="card">
                <img className="card-img" alt="" src={test} />
                <div className="card-name">alane </div>
                <div>
                    <img className="card-icon" alt="" src={checked} />
                    <img className="card-icon" alt="" src={cancel} />
                </div>
            </div>
            <div className="card"></div>
        </div>
    );
}

export default Home