import React from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
  isWithinInterval,
} from "date-fns";
const DatePicker = ({
  currentMonth,
  setCurrentMonth,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onConfirm,
  onCancel,
}) => {
  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="flex items-center justify-between p-2">
        <button
          onClick={prevMonth}
          className="p-1 transition duration-200 transform hover:-translate-x-1 inline-flex items-center justify-center text-gray-500 hover:text-gray-700"
        >
          {"<"}
        </button>
        <span className="text-lg text-gray-700">
          {format(currentMonth, dateFormat)}
        </span>
        <button
          onClick={nextMonth}
          className="p-1 transition duration-200 transform hover:translate-x-1 inline-flex items-center justify-center text-gray-500 hover:text-gray-700"
        >
          {">"}
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "eee";
    const days = [];
    let startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col-span-1" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="grid grid-cols-7">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDateWeek = startOfWeek(monthStart);
    const endDateWeek = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDateWeek;
    let formattedDate = "";

    while (day <= endDateWeek) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        const dayIsSelected =
          (startDate && isSameDay(day, startDate)) ||
          (endDate && isSameDay(day, endDate));
        const dayIsInRange =
          startDate &&
          endDate &&
          isWithinInterval(day, { start: startDate, end: endDate });

        days.push(
          <div
            className={`col-span-1 flex items-center justify-center p-2 cursor-pointer ${
              isSameMonth(day, monthStart) ? "text-gray-700" : "text-gray-400"
            } ${
              dayIsSelected
                ? "bg-blue-600 text-white"
                : dayIsInRange
                ? "bg-blue-200"
                : ""
            }`}
            key={day}
            onClick={() => onDateClick(cloneDay)}
          >
            <span className="text-sm">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="flex flex-col">{rows}</div>;
  };

  const onDateClick = (day) => {
    if (!startDate || (startDate && endDate && day < startDate)) {
      setStartDate(day);
      setEndDate(null);
    }
    else if (startDate && !endDate && day >= startDate) {
      setEndDate(day);
    }
    else if (startDate && isSameDay(day, startDate)) {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const handleOk = () => {
    onConfirm(startDate, endDate);
  };

  const handleCancel = () => {
    onCancel(); 
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 max-w-max-content" style={{width:"max-content"}}>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      <div className="flex justify-end space-x-2 mt-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-black"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-white"
          onClick={handleOk}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default DatePicker;
