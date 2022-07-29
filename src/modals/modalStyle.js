export default (width, height) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 3,
  width: {
    xs: "90%",
    md: width || "auto",
  },
  height: {
    xs: "90%",
    md: height || "auto",
  },
});
