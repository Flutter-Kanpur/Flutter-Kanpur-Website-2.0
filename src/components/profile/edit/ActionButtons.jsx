import { Button } from "@mui/material";
import RevampButton from "@/components/buttons/revampbutton/RevampButton";

export default function ActionButtons({ loading, handleUpdate, router }) {
  return (
    <>
      <RevampButton
        text={loading ? "Updating..." : "Submit"}
        onClick={handleUpdate}
        disabled={loading}
      />

      <Button
        fullWidth
        variant="text"
        onClick={() => router.back()}
        sx={{ mt: 1, color: "#000", textTransform: "none", fontSize: "1rem" }}
      >
        Cancel
      </Button>
    </>
  );
}