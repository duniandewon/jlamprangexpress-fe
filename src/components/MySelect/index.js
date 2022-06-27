import { useState } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import styles from "components/MySelect/styles";

import Input from "components/SuiInput";
import Typography from "components/SuiTypography";

function SuiSelect({ size, label, options, onSelect }) {
  const [selectOpen, setSelectOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(options);

  const { root, optionsContainer, options: OPTIONS, option, container } = styles(size, selectOpen);

  const resetStates = () => {
    setFiltered(options);
    setSearch("");
  };

  const handleToggleSelect = () => {
    setSelectOpen((prev) => !prev);
    resetStates();
  };

  const handleSelect = (op) => {
    setSelected(op);
    onSelect(op);
    handleToggleSelect();
  };

  const handleFilter = (e) => {
    setSearch(e.target.value);
    setFiltered(options.filter((op) => op.value.toLowerCase().includes(e.target.value)));
  };

  return (
    <Box sx={root}>
      <Box sx={container} onClick={handleToggleSelect}>
        {selected.value || label} <ExpandMoreIcon fontSize="small" />
      </Box>
      <Box sx={optionsContainer}>
        <Box mb={1}>
          <Input placeholder="Cari" value={search} onChange={handleFilter} />
        </Box>
        <Box sx={OPTIONS}>
          {filtered.length ? (
            filtered.map((op) => (
              <Box sx={option} onClick={() => handleSelect(op)} key={op.id}>
                {op.value}
              </Box>
            ))
          ) : (
            <Typography variant="h6" textAlign="center" my={1}>
              Tidak ada yang ditemukan
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

SuiSelect.defaultProps = {
  size: "large",
};

SuiSelect.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  label: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
};

export default SuiSelect;
