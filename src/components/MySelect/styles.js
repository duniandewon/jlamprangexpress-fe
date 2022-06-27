import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";

import pxToRem from "assets/theme/functions/pxToRem";

export default (selectSize, selectOpen) => {
  const { dark, text, light, inputColors } = colors;
  const { size, fontWeightRegular } = typography;
  const { borderWidth, borderRadius } = borders;

  let selectSizeValue;

  if (selectSize === "small") {
    selectSizeValue = pxToRem(32);
  } else if (selectSize === "large") {
    selectSizeValue = pxToRem(48);
  } else {
    selectSizeValue = pxToRem(40);
  }

  return {
    root: {
      px: pxToRem(12),
      border: `${borderWidth[1]} solid ${inputColors.borderColor.main}`,
      borderRadius: borderRadius.md,
      fontSize: selectSize === "small" ? size.xs : size.sm,
      fontWeight: fontWeightRegular,
      position: "relative",
      height: selectSizeValue,
      color: text.main,
      display: "flex",
      alignItems: "center",
    },
    container: {
      height: "100%",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flex: 1,
    },
    optionsContainer: {
      px: pxToRem(12),
      py: pxToRem(12),
      position: "absolute",
      left: 0,
      right: 0,
      zIndex: 2,
      top: pxToRem(39),
      backgroundColor: "#fff",
      display: selectOpen ? "block" : "none",
      border: `${borderWidth[1]} solid ${inputColors.borderColor.main}`,
      borderRadius: `0 0 ${borderRadius.md} ${borderRadius.md}`,
    },
    options: {
      overflowY: "auto",
      maxHeight: pxToRem(200),
    },
    option: {
      p: 1,
      borderRadius: borderRadius.md,
      color: text.main,
      "&:hover": {
        backgroundColor: light.main,
        color: dark.main,
        cursor: "pointer",
      },
    },
  };
};
