// react
import { useState } from "react";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import debounce from "lodash/debounce";

// mui icons
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Checkbox, Chip, FormLabel, Stack } from "@mui/material";

// ----------------------------------------------------------------------
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function RHFAutocompleteAsync({
  name,
  apiQuery,
  queryKey = "search",
  debounceTime = 500,
  getOptionLabel = (option: any) => option.name,
  isOptionEqualToValue = (option: any, newValue: any) =>
    option._id === newValue._id,
  multiple = false,
  variant = "outlined",
  outerLabel,
  EndIcon,
  placeholder,
  StartIcon,
  externalParams = {},
  renderOption = (props: any, option: any, { selected }: any) => {
    return (
      <li {...props} key={option._id}>
        <Checkbox
          key={option._id}
          icon={icon}
          checkedIcon={checkedIcon}
          style={{ marginRight: 8 }}
          checked={selected}
        />
        {getOptionLabel(option)}
      </li>
    );
  },
  renderTags = (tagValue: any, getTagProps: any) => {
    return tagValue.map((option: any, index: any) => (
      <Chip
        {...getTagProps({ index })}
        key={option._id}
        label={getOptionLabel(option)}
      />
    ));
  },
  ...other
}: any): JSX.Element {
  // states
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);

  // api
  const [trigger, { data, isLoading, isFetching }]: any = apiQuery;

  // constants
  const label = other.label;

  // debounce
  const triggerDebounce = debounce((newInputValue) => {
    trigger({ params: { [queryKey]: newInputValue, ...externalParams } });
  }, debounceTime);

  // on changes
  const onChanged = (e: any, newValue: any, onChange: any) => {
    onChange(newValue);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={(form) => {
        return (
          <Stack gap="0.6rem">
            {outerLabel && <FormLabel>{outerLabel}</FormLabel>}
            <Autocomplete
              {...form.field}
              multiple={multiple}
              id={name}
              open={open}
              autoComplete
              includeInputInList
              filterSelectedOptions
              noOptionsText="No option"
              options={data ?? []}
              disableCloseOnSelect
              {...other}
              onOpen={() => {
                trigger({
                  params: { ...externalParams },
                });
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
              isOptionEqualToValue={isOptionEqualToValue}
              getOptionLabel={getOptionLabel}
              loading={isLoading || isFetching}
              onChange={(e: React.SyntheticEvent, newValue: any) => {
                onChanged(e, newValue, form.field.onChange);
              }}
              onInputChange={(event, newInputValue) => {
                triggerDebounce.cancel();
                if (newInputValue.trim()) triggerDebounce(newInputValue);
              }}
              filterOptions={(x) => x}
              renderOption={renderOption}
              renderTags={renderTags}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  placeholder={placeholder}
                  error={Boolean(form.fieldState.error)}
                  helperText={form.fieldState.error?.message}
                  variant={variant}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {isLoading || isFetching ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {EndIcon ?? params.InputProps.endAdornment}
                      </>
                    ),
                    ...(StartIcon && { startAdornment: StartIcon }),
                  }}
                />
              )}
            />
          </Stack>
        );
      }}
    />
  );
}
