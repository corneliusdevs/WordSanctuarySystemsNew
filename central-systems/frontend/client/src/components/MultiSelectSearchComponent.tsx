"use client";

import React from "react";
import {
  SelectWithSearch,
  SelectWithSearchOptionType,
} from "./SelectSearchComponent";

interface MultiSelectSearchComponentProps {
  placeholderText: string;
  placeholderSearchText: string;
  searchEmptyText: string;
  options: SelectWithSearchOptionType[];
  selectedValue: string;
  setSelectedValue: (value:string)=> void;
}

export const MultiSelectSearchComponent = ({
  placeholderText,
  placeholderSearchText,
  searchEmptyText,
  options,
  selectedValue,
  setSelectedValue,
}: MultiSelectSearchComponentProps) => {


  return (
    <div className="px-2">
      <SelectWithSearch
        placeholderText={placeholderText}
        placeholderSearchText={placeholderSearchText}
        searchEmptyText={searchEmptyText}
        options={options}
        value={selectedValue}
        setValue={setSelectedValue}
      />

   
    </div>
  );
};
