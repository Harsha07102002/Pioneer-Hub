import React, { useEffect, useMemo, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useDispatch, useSelector } from "react-redux";
import { setFilterValue } from "../redux/jobSlice";

export default function FilterCard() {
  const { allJobs, filterValue } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(filterValue);

  // Memoized filter data for performance optimization
  const filterData = useMemo(() => {
    const locations = [...new Set(allJobs.map((job) => job.location))];
    const roles = [...new Set(allJobs.map((job) => job.title))];
    const salaries = [...new Set(allJobs.map((job) => job.salary))].map(
      (salary) => {
        if (salary < 40000) return "0-40K";
        if (salary >= 42000 && salary <= 100000) return "42K-1lakh";
        return "1lakh to 5lakh";
      }
    );

    return [
      { filterType: "Location", array: locations },
      { filterType: "Role", array: roles },
      { filterType: "Salary", array: [...new Set(salaries)] },
    ];
  }, [allJobs]);

  // Change handler for selected filter value
  const changeHandler = (value, type) => {
    setSelectedValue({ type, value });
  };

  useEffect(() => {
    if (selectedValue) {
      // Dispatch filter value to Redux
      dispatch(setFilterValue(selectedValue));
    }
  }, [dispatch, selectedValue]);

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3 border-t border-gray-300" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={`filter-${index}`}>
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div className="flex items-center space-x-2 my-2" key={itemId}>
                  <RadioGroupItem
                    value={item}
                    id={itemId}
                    onClick={() => changeHandler(item, data.filterType)} // Pass the type as well
                  />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
