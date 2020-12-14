import React from "react";
import Button from "../Button/Button";
import DropDownCard from "../DropDownCard/DropDownCard";

const ButtonDropDown = (props: any) => {
  const [open, setOpen] = React.useState<Boolean>(false);
  const [year, setYear] = React.useState<String>('All');
  let dropDownRef: any = null;
  function handleClick(e: any) {
    if (dropDownRef && !dropDownRef.contains(e.target) && open) {
      setOpen(false);
    }
  }
  React.useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
  return (
    <div
        ref={(element) => { 
            dropDownRef = element
        }}
    >
      <Button onButtonClick={() => setOpen(open => !open)} icon={props.icon} iconText={props.iconText}> Filter by Year </Button>
      {open && <DropDownCard data={props.data} selectedYear={year} setSelectedYear={(year: string) => { 
          setOpen(false);
          setYear(year);
          props.filterByYear(year);
          }} />}
    </div>
  );
};

export default ButtonDropDown;
