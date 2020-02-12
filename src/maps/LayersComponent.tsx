// Multiple Value Autocomplete
// Used for selection box, shows chip based on search and allows user to delete
import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 500,
      "& > * + *": {
        marginTop: theme.spacing(3)
      }
    }
  })
);

export default function Tags() {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <Autocomplete
          multiple
          id="tags-outlined"
          options={stubbedData}
          getOptionLabel={option => option.dataset}
          defaultValue={[stubbedData[0]]}
          filterSelectedOptions
          renderInput={params => (
            <TextField
              {...params}
              variant="outlined"
              label="Layers"
              placeholder="Topic Selection"
              fullWidth
            />
          )}
        />
      </div>
    );
  }

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const stubbedData = [
  { dataset: "Education Facilities", value: "query string" },
  { dataset: "Airports", value: "query string" },
  { dataset: "Median Household Income", value: "query string" },
  { dataset: "Median Household Price", value: "query string" },
  { dataset: "Cost of Living", value: "query string" }];