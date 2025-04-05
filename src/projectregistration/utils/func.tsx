export const formatPeriod = (value: string): string => {
    const onlyNumbers = value.replace(/[^0-9]/g, "");
    let formatted = "";
  
    if (onlyNumbers.length <= 6) {
      const year = onlyNumbers.slice(0, 4);
      const month = onlyNumbers.slice(4, 6);
  
      formatted = `${year}${month ? `.${month}` : ""}`;
    } else {
      const year1 = onlyNumbers.slice(0, 4);
      const month1 = onlyNumbers.slice(4, 6);
      const year2 = onlyNumbers.slice(6, 10);
      const month2 = onlyNumbers.slice(10, 12);
  
      formatted = `${year1}${month1 ? `-${month1}` : ""} ~ ${year2}${month2 ? `-${month2}` : ""}`;
    }
  
    return formatted;
  };
  
  export const validatePeriodInput = (inputValue: string): string => {
    const onlyNumbers = inputValue.replace(/[^0-9]/g, "");
  
    const year1 = onlyNumbers.slice(0, 4);
    let month1 = onlyNumbers.slice(4, 6);
    const year2 = onlyNumbers.slice(6, 10);
    let month2 = onlyNumbers.slice(10, 12);
  
    if (month1.length === 2) {
      if (parseInt(month1, 10) > 12) month1 = "12";
      if (parseInt(month1, 10) === 0) month1 = "01";
    }
    if (month2.length === 2) {
      if (parseInt(month2, 10) > 12) month2 = "12";
      if (parseInt(month2, 10) === 0) month2 = "01";
    }

  
    return `${year1}${month1 || ""}${year2 || ""}${month2 || ""}`;
  };
  