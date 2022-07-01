import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Collapse, Grid, IconButton } from "@mui/material";

function SuccessFailureAlert({
  openSuccessAlert,
  message,
  openFailureAlert,
  setopenSuccessAlert,
  setopenFailureAlert,
}) {
  return (
    <Grid item xs={12} md={12} lg={12}>
      <div>
        <Collapse in={openSuccessAlert}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setopenSuccessAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {message}
          </Alert>
        </Collapse>
        <Collapse in={openFailureAlert}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setopenFailureAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {message}
          </Alert>
        </Collapse>
      </div>
    </Grid>
  );
}

export default SuccessFailureAlert;
