import { useEffect, useState } from "react";
import "./App.css";
import image from "./images/logo.svg";
function App() {
  const [bill, setBill] = useState("");
  const [people, setPeople] = useState("");
  const [tip, setTip] = useState(0);
  const [peopleError, setPeopleError] = useState(false);
  const [active, setActive] = useState(null);

  const tipAmount = ((bill * tip) / people).toFixed(2);
  const totalPerPerson = ((bill * (1 + tip)) / people).toFixed(2);
  const showTip =
    tipAmount === "NaN" || tipAmount === "Infinity" ? "0.00" : tipAmount;
  const showTotal =
    totalPerPerson === "NaN" || totalPerPerson === "Infinity"
      ? "0.00"
      : totalPerPerson;

  useEffect(() => {
    if (people === 0) {
      return setPeopleError(true);
    } else {
      return setPeopleError(false);
    }
  }, [people]);

  const percents = [
    { id: 1, precent: 5 },
    { id: 2, precent: 10 },
    { id: 3, precent: 15 },
    { id: 4, precent: 25 },
    { id: 5, precent: 50 },
  ];

  const handleClick = (el) => {
    if (active === el) {
      setActive(null);
    } else {
      setActive(el);
    }
  };
  const reset = () => {
    setBill(0);
    setPeople("");
    setTip(0);
  };
  return (
    <div className="App">
      <img src={image} alt="logo" className="logo" />
      <div className="container">
        <div className="forms">
          <label className="label" form="bill">
            Bill
          </label>
          <input
            className="input-bill"
            placeholder="0"
            type="number"
            value={bill}
            min={0}
            name="bill"
            onChange={(e) => {
              setBill(e.target.valueAsNumber);
            }}
          />
          <span className="select">Select Tip %</span>
          <div className="select-tip">
            {percents.map((percent) => (
              <button
                key={percent.id}
                className={`${
                  active === percent.precent ? "active button" : " button"
                }`}
                onClick={() => {
                  setTip(percent.precent / 100);
                  handleClick(percent.precent);
                }}
              >
                {percent.precent}%
              </button>
            ))}
            <input
              className="costum"
              onChange={(e) => setTip(e.target.value / 100)}
              placeholder="costum"
            />
          </div>
          <label className="label" form="people">
            Number of People {peopleError ? "can't be zero" : ""}
          </label>
          <input
            className="input-classname"
            placeholder="0"
            type="number"
            value={people}
            min={0}
            name="people"
            onChange={(e) => {
              setPeople(e.target.valueAsNumber);
            }}
          />
        </div>
        <div className="tip">
          <div className="amount">
            <div className="tip-account">
              <p>tim amount</p>
              <span>/ person:</span>
            </div>
            <span className="show-account">${showTip}</span>
          </div>
          <div className="amount">
            <div className="tip-account">
              <p> total</p>
              <span>/ person:</span>
            </div>
            <span className="show-account">${showTotal}</span>
          </div>
          <button className="reset" onClick={reset}>
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
