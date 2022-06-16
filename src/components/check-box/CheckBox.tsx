import React, { useState } from "react";
import "./CheckBox.sass";
import CheckIcon from "@mui/icons-material/Check";
import colors from "utils/colors";

interface CheckBoxProps {
  onChecked?: (state: boolean) => void;
  checked?: boolean;
}

export const CheckBox = ({ onChecked, checked = false }: CheckBoxProps) => {
  const [selected, setSelected] = useState(checked);

  return (
    <div
      onClick={() => {
        setSelected(!selected);
        onChecked?.(selected);
      }}
      className={`checkbox ${selected ? "checked" : ""}`}
    >
      {selected && (
        <CheckIcon
          sx={{
            fontSize: 16,
            color: colors.white,
          }}
        />
      )}
    </div>
  );
};
