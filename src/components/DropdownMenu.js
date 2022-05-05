import * as React from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

export default function MenuListComposition({
  options = [],
  onClick = () => null,
  getIcon = () => null,
}) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event) => {
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
      return;
    }
    if (event.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div onMouseEnter={handleOpen} onMouseLeave={handleClose}>
      <IconButton ref={anchorRef}>{getIcon()}</IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} onKeyDown={handleListKeyDown}>
                  {options.map((option) => (
                    <MenuItem
                      key={option.id}
                      onClick={() => {
                        onClick(option);
                        handleClose();
                      }}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
