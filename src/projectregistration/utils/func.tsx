export const formatPeriod = (value: string): string => {
    const onlyNumbers = value.replace(/[^0-9]/g, "");
    let formatted = "";
  
    if (onlyNumbers.length <= 8) {
      const year = onlyNumbers.slice(0, 4);
      const month = onlyNumbers.slice(4, 6);
      const day = onlyNumbers.slice(6, 8);
  
      formatted = `${year}${month ? `.${month}` : ""}${day ? `.${day}` : ""}`;
    } else {
      const year1 = onlyNumbers.slice(0, 4);
      const month1 = onlyNumbers.slice(4, 6);
      const day1 = onlyNumbers.slice(6, 8);
      const year2 = onlyNumbers.slice(8, 12);
      const month2 = onlyNumbers.slice(12, 14);
      const day2 = onlyNumbers.slice(14, 16);
  
      formatted = `${year1}${month1 ? `.${month1}` : ""}${day1 ? `.${day1}` : ""} ~ ${year2}${month2 ? `.${month2}` : ""}${day2 ? `.${day2}` : ""}`;
    }
  
    return formatted;
  };
  
  export const validatePeriodInput = (inputValue: string): string => {
    const onlyNumbers = inputValue.replace(/[^0-9]/g, "");
  
    const year1 = onlyNumbers.slice(0, 4);
    let month1 = onlyNumbers.slice(4, 6);
    let day1 = onlyNumbers.slice(6, 8);
    const year2 = onlyNumbers.slice(8, 12);
    let month2 = onlyNumbers.slice(12, 14);
    let day2 = onlyNumbers.slice(14, 16);
  
    if (month1.length === 2) {
      if (parseInt(month1, 10) > 12) month1 = "12";
      if (parseInt(month1, 10) === 0) month1 = "01";
    }
    if (day1.length === 2) {
      if (parseInt(day1, 10) > 31) day1 = "31";
      if (parseInt(day1, 10) === 0) day1 = "01";
    }
    if (month2.length === 2) {
      if (parseInt(month2, 10) > 12) month2 = "12";
      if (parseInt(month2, 10) === 0) month2 = "01";
    }
    if (day2.length === 2) {
      if (parseInt(day2, 10) > 31) day2 = "31";
      if (parseInt(day2, 10) === 0) day2 = "01";
    }
  
    return `${year1}${month1 || ""}${day1 || ""}${year2 || ""}${month2 || ""}${day2 || ""}`;
  };
  