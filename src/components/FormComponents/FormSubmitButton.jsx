import Image from "next/image";
import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton";

const FormSubmitButton = ({
  children,
  onClick,
  showArrow = false,
  type = "button",
  ...rest
}) => {
  return (
    <PrimaryButton
      type={type}
      onClick={onClick}
      endIcon={
        showArrow ? (
          <Image
            src="/assets/explore-page-assets/right-arrow.svg"
            alt=""
            width={18}
            height={18}
          />
        ) : undefined
      }
      sx={{
        width: "100%",
        minWidth: 0,
        maxWidth: "none",
        height: 52,
        fontSize: 16,
        fontWeight: 400,
        borderRadius: "100px",
      }}
      {...rest}
    >
      {children}
    </PrimaryButton>
  );
};

export default FormSubmitButton;
