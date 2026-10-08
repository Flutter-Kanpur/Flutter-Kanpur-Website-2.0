import Box from "@mui/material/Box";

const ChipList = ({ items = [], onDelete }) => {
  if (!items.length) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        mt: "5px",
      }}
    >
      {items.map((item) => (
        <Box
          key={item}
          component="button"
          type="button"
          onClick={() => onDelete?.(item)}
          sx={{
            height: "40px",
            px: "17px",
            border: 0,
            borderRadius: "22px",
            backgroundColor: "#4167F2",
            color: "#FFFFFF",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "inherit",
            fontSize: "14px",
            lineHeight: 1,
            cursor: onDelete ? "pointer" : "default",
            whiteSpace: "nowrap",
          }}
        >
          <Box component="span">{item}</Box>

          {onDelete && (
            <Box
              component="span"
              aria-hidden
              sx={{
                fontSize: "20px",
                lineHeight: "16px",
                fontWeight: 300,
                mt: "-1px",
              }}
            >
              ×
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default ChipList;
