import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import FormField, { fieldSx } from "./FormField";

const FormSelect = ({
  label,
  id,
  value,
  options = [],
  placeholder = "-select-",
  onChange,
  selectedValues = [],
  openDirection = "up",
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

   const displayValue =
    Array.isArray(value)
      ? value.length > 0 
        ? value[value.length - 1]
        : placeholder
      : value || placeholder;

  useEffect(() => {
    const handleOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleSelect = (option) => {
    onChange?.(option);
    setOpen(false);
  };

  return (
    <FormField label={label} htmlFor={id}>
      <Box ref={ref} sx={{ position: "relative", width: "100%" }}>
        <Box
          component="button"
          type="button"
          id={id}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((previous) => !previous)}
          sx={{
            ...fieldSx,
            width: "100%",
            height: "48px",
            pl: "15px",
            pr: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color:
              (Array.isArray(value) ? value.length > 0 : Boolean(value))
                ? "#111111"
                : "#B0B0B0",
            cursor: "pointer",
            textAlign: "left",
            fontFamily: "inherit",
            fontSize: "14px",
            appearance: "none",
            WebkitAppearance: "none",
            "&:focus": {
              outline: "none",
            },
            
          }}
        >
          <Box
            component="span"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              
            }}
          >
            {displayValue}
          </Box>

          <Box
            component="svg"
            aria-hidden
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
            sx={{
              position: "absolute",
              right: "20px",
              top: "50%",
              transform: open
                ? "translateY(-50%) rotate(180deg)"
                : "translateY(-50%)",
              transition: "transform 0.15s ease",
              pointerEvents: "none",
              
            }}
          >
            <path
              d="M1 1l5 5 5-5"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Box>
        </Box>

        {open && (
          <Box
            component="div"
            role="listbox"
            sx={{
              position: "absolute",
              ...(openDirection === "up"
                ? { bottom: "53px" }
                : { top: "53px" }),
              left: 0,
              right: 0,
              width: "100%",
              maxHeight: "220px",
              overflowY: "auto",
              overflowX: "hidden",
              backgroundColor: "#FFFFFF",
              border: "1px solid #D9D9D9",
              borderRadius: "8px",
              boxSizing: "border-box",
              zIndex: 9999,
              boxShadow: "0 4px 14px rgba(0, 0, 0, 0.12)",
              WebkitOverflowScrolling: "touch",
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#C7C7C7",
                borderRadius: "10px",
              },
            }}
          >
            {options.map((option) => {
              const selected = selectedValues.includes(option);

              return (
                <Box
                  key={option}
                  component="button"
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => handleSelect(option)}
                  sx={{
                    width: "100%",
                    minHeight: "44px",
                    px: "15px",
                    py: "10px",
                    border: 0,
                    backgroundColor: selected ? "#F3F6FF" : "#FFFFFF",
                    color: "#111111",
                    fontFamily: "inherit",
                    fontSize: "14px",
                    textAlign: "left",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    boxSizing: "border-box",
                    "&:hover": {
                      backgroundColor: "#F5F5F5",
                    },
                    
                  }}
                >
                  {option}
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
    </FormField>
  );
};

export default FormSelect;
