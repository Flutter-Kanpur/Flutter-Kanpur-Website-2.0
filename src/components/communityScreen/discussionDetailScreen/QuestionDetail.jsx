import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const QuestionDetail = ({ question = {} }) => {
  const tags = Array.isArray(question.tags) ? question.tags : [];
  const images = Array.isArray(question.images) ? question.images : [];
  const avatar =
    question.avatar || "/assets/community-page-assets/avatar-icon.svg";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <Typography
        sx={{
          fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
          fontSize: "22px",
          fontWeight: 700,
          color: "#000000",
          lineHeight: 1.3,
        }}
      >
        {question.title}
      </Typography>

      {tags.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {tags.map((tag) => (
            <Box
              key={tag}
              sx={{
                bgcolor: "#E4E9FF",
                color: "#33415C",
                borderRadius: "999px",
                px: "14px",
                py: "7px",
                fontSize: "13px",
                fontWeight: 500,
                fontFamily:
                  'var(--font-product-sans), "Product Sans", sans-serif',
              }}
            >
              {tag}
            </Box>
          ))}
        </Box>
      )}

      {question.body && (
        <Typography
          sx={{
            fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
            fontSize: "15px",
            color: "#6D6D6D",
            lineHeight: 1.6,
          }}
        >
          {question.body}
        </Typography>
      )}

      {images.length > 0 && (
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            gap: "10px",
            mx: "-16px",
            px: "16px",
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
        >
          {images.map((src, idx) => (
            <Box
              key={`${src}-${idx}`}
              component="img"
              src={src}
              alt=""
              sx={{
                width: "160px",
                height: "104px",
                borderRadius: "12px",
                objectFit: "cover",
                flexShrink: 0,
              }}
            />
          ))}
        </Box>
      )}

      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Box
          component="img"
          src={avatar}
          alt={question.author || "Author"}
          sx={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            objectFit: "cover",
            flexShrink: 0,
          }}
        />
        <Box>
          <Typography
            sx={{
              fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
              fontSize: "14px",
              fontWeight: 600,
              color: "#000000",
              lineHeight: 1.3,
            }}
          >
            {question.author}
          </Typography>
          <Typography
            sx={{
              fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
              fontSize: "12px",
              color: "#9CA3AF",
              lineHeight: 1.3,
            }}
          >
            {question.postedLabel}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionDetail;
