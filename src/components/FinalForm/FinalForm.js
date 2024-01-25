import React, { useState, useEffect, useRef } from "react";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";

export default function FinalForm({ formData }) {
  return (
    <Container sx={{ pt: 2, pb: 2 }}>
      <Box noValidate p={1}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            {/* Render FormHeader */}
            {formData.map((field) => {
              if (field.type === "FormHeader") {
                return (
                  <React.Fragment key={field.id}>
                    <Typography variant="h6">{field.title}</Typography>
                    <Typography variant="p">{field.subtitle}</Typography>
                  </React.Fragment>
                );
              }
              return null;
            })}
          </Grid>
        </Grid>
      </Box>
      <Box component="form" noValidate p={2}>
        <Grid container spacing={2}>
          {/* Render TextFields */}
          {formData.map((field) => {
            if (field.type === "TextField") {
              if (!field.isCheckbox) {
                return (
                  <Grid key={field.id} item xs={12} sm={12} md={6} lg={4}>
                    <TextField
                      fullWidth
                      id={field.for}
                      label={field.label}
                      name={field.for}
                      value={field.value}
                      color="secondary"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                );
              }
              if (field.isCheckbox) {
                return (
                  <Grid key={field.id} item xs={12} sm={12} md={6} lg={4}>
                    <FormControlLabel
                      label={field.label}
                      control={
                        <Checkbox
                          id={field.for}
                          name={field.for}
                          checked={
                            field.value.toLowerCase() === "yes" ? true : false
                          }
                          title={field.label}
                          readOnly
                          //   onChange={(e) => onValueChecked(e)}
                        />
                      }
                    />
                  </Grid>
                );
              }
            }
            return null;
          })}
        </Grid>
        <Grid my={2} item xs={5} sm={5} md={3} lg={2}>
          <Button
            fullWidth
            type="button"
            style={{ textTransform: "capitalize" }}
            variant="contained"
            // onClick={(e) => submitPMSApp(e)}
          >
            Submit
          </Button>
        </Grid>
      </Box>
    </Container>
  );
}
