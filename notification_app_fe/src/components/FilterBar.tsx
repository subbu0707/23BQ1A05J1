import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { NotificationType } from "../types";

interface FilterBarProps {
  selectedType: NotificationType;
  onFilterChange: (type: NotificationType) => void;
  onClearRead?: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  selectedType,
  onFilterChange,
  onClearRead,
}) => {
  return (
    <Box
      sx={{
        mb: 3,
        display: "flex",
        gap: 2,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="notification-type-label">Filter by Type</InputLabel>
        <Select
          labelId="notification-type-label"
          id="notification-type-select"
          value={selectedType}
          label="Filter by Type"
          onChange={(e) => onFilterChange(e.target.value as NotificationType)}
        >
          <MenuItem value="All">All Notifications</MenuItem>
          <MenuItem value="Placement">Placement</MenuItem>
          <MenuItem value="Result">Result</MenuItem>
          <MenuItem value="Event">Event</MenuItem>
        </Select>
      </FormControl>

      {onClearRead && (
        <Button
          variant="outlined"
          onClick={onClearRead}
          sx={{ textTransform: "none" }}
        >
          Clear Read Status
        </Button>
      )}
    </Box>
  );
};

export default FilterBar;
