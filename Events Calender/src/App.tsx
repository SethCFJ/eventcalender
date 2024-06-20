import { useState } from "react";
import CalenderGrid from "./components/CalenderGrid/CalenderGrid";
import MonthSelector from "./components/MonthSelector/MonthSelector";

function App() {
  const [date, setDate] = useState(new Date());

  const updateDate = (change: number) => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + change);
    setDate(newDate);
  };

  return (
    <>
      <MonthSelector date={date} updateDate={updateDate} />
      <CalenderGrid date={date} />
    </>
  );
}

export default App;
