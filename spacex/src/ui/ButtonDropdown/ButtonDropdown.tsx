import React from "react";
import Button from "../Button/Button";
import DropDownCard from "../DropDownCard/DropDownCard";

interface ButtonDropdownProps {
  data: string[],
  selected: string,
  icon:string,
  iconText: string,
  filterByYear: (year: string) => void,
}

const ButtonDropDown = (props: ButtonDropdownProps) => {
  const [open, setOpen] = React.useState<Boolean>(false);
  let dropDownRef = React.useRef<HTMLDivElement>(null);
  function handleClick(e: any) {
    if (dropDownRef.current !== null && !dropDownRef.current.contains(e.target) && open) {
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
    <div ref={dropDownRef} >
      <Button onButtonClick={() => setOpen(open => !open)} icon={props.icon} iconText={props.iconText}> Filter by Year </Button>
      {open && <DropDownCard data={props.data} selectedYear={props.selected} setSelectedYear={(year: string) => { 
          setOpen(false);
          props.filterByYear(year);
          }} />}
    </div>
  );
};

export default ButtonDropDown;
