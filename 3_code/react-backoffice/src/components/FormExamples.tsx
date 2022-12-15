import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { Autocomplete, Box, BoxProps, Button, ButtonProps, FormControl, FormControlLabel, FormControlLabelProps, FormControlProps, IconButton, InputAdornment, InputLabel, InputLabelProps, MenuItem, OutlinedInput, OutlinedInputProps, Select, Stack, Switch, SwitchProps, TextField, TextFieldProps } from "@mui/material";
import { DateTimePicker } from "@mui/lab";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import UploadFileIcon from '@mui/icons-material/UploadFile';

import { IInputSelectProps } from "../interfaces/componentsInterface";
import { quillFormats, quillModules } from "../utils/reactQuillHelper";

const mockOptions: { label: string, value: string }[] = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
]

export default function FormExamples() {
  const FormHook = useForm();
  const FormFieldArray = useFieldArray({
    control: FormHook.control, 
    name: "attributes",
  });
  console.log(FormFieldArray)

  const InputIdProps: TextFieldProps = {
    label: "ID", size: "small", fullWidth: true, disabled: true,
    value: "eg: random-char-id",
    helperText: "ID akan di-generate otomatis saat di simpan.",
  }
  const InputTextProps: TextFieldProps = {
    label: "Contoh Text", size: "small", fullWidth: true, required: true,
    ...FormHook.register("text"),
  }
  const [InputPasswordType, setInputPasswordType] = useState<string>("password");
  const InputPasswordProps = {
    formControlProps: { fullWidth: true, required: true, variant: "outlined", color: "primary", size: "small" } as FormControlProps,
    inputLabelProps: { htmlFor: "input-password" } as InputLabelProps,
    inputProps: {
      id: "input-password", type: InputPasswordType, label: "Password", required: true,
      ...FormHook.register("password"),
    } as OutlinedInputProps,
  }
  const InputDateProps = {
    controllerProps: { control: FormHook.control, name: "date", defaultValue: null, rules: { required: true } },
    datePickerProps: {
      label: "Contoh Tanggal", disablePast: true,
      renderInput: (params: any) => <TextField {...params} size="small" required fullWidth />,
    },
  }
  const InputSelectProps: IInputSelectProps = {
    formControlProps: { fullWidth: true, required: true },
    inputLabelProps: { id: "select-renungan-select-label" },
    selectProps: {
      label: "Contoh Select", size: "small", fullWidth: true, required: true,
      id: "select-renungan-select", labelId: "select-renungan-select-label",
      defaultValue: mockOptions[0].value,
      ...FormHook.register("select"),
    },
    options: mockOptions,
  }
  const InputAutocompleteProps = {
    controllerProps: { control: FormHook.control, name: "autocomplete", defaultValue: [] },
    autocompleteProps: {
      id: "input-autocomplete", multiple: true, filterSelectedOptions: true,
      options: mockOptions,
      getOptionLabel: (option: typeof mockOptions[0]) => option.label,
      // isOptionEqualToValue
    },
    inputProps: {
      label: "Contoh Autocomplete", size: "small", placeholder: "Pilih...",
    } as TextFieldProps,
  }
  const InputSwitchProps = {
    controllerProps: { control: FormHook.control, name: "switch", defaultValue: false },
    formControlLabelProps: { label: "Contoh Switch", labelPlacement: "end" } as FormControlLabelProps,
    switchProps: { size: "medium" } as SwitchProps,
  }
  const InputImageProps = {
    label: "Upload Image",
    previewProps: {
      component: "img", loading: "lazy",
      src: FormHook.watch("image")&&FormHook.watch("image")[0]?URL.createObjectURL(FormHook.watch("image")[0]):"",
    } as BoxProps,
    buttonProps: { size: "small", fullWidth: true, variant: "contained", component: "label", startIcon: <UploadFileIcon /> } as ButtonProps,
    inputProps: {
      component: "input", type: "file", accept: "image/*", hidden: true,
      ...FormHook.register("image"),
      // onChange: (e: any) => { setCurrDataRowImg(e.target.files[0]);setCurrDataRowImgComp(URL.createObjectURL(e.target.files[0])) }
    } as BoxProps,
  }
  const [InputQuillValue, setInputQuillValue] = useState<string>("");
  const InputQuillProps = {
    modules: quillModules, formats: quillFormats, theme: "snow",
    placeholder: "Contoh Quill",
    value: InputQuillValue, onChange: setInputQuillValue,
  }

  const FormHandleSubmit = async (data: any) => {
    console.log("result", data)
  }

  return (
    <Stack component="form" autoComplete="off" spacing={2} onSubmit={FormHook.handleSubmit(FormHandleSubmit)}>
      <TextField {...InputIdProps} />
      <TextField {...InputTextProps} />
      <FormControl {...InputPasswordProps.formControlProps}>
        <InputLabel {...InputPasswordProps.inputLabelProps}>{InputPasswordProps.inputProps.label}</InputLabel>
        <OutlinedInput
          {...InputPasswordProps.inputProps}
          endAdornment={
            <InputAdornment position="end" sx={{ mr: 1 }}>
              <IconButton edge="end"
                onClick={() => setInputPasswordType(Boolean(InputPasswordType === "text") ? "password" : "text")}
              >
                {Boolean(InputPasswordType === "password") ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Controller
        {...InputDateProps.controllerProps}
        render={({field}) => (
          <DateTimePicker {...InputDateProps.datePickerProps} value={field.value} onChange={field.onChange} />
        )}
      />
      <FormControl {...InputSelectProps.formControlProps}>
        <InputLabel {...InputSelectProps.inputLabelProps}>
          {InputSelectProps.selectProps.label}
        </InputLabel>
        <Select {...InputSelectProps.selectProps}>
          { InputSelectProps.options.map((item, index) => (
            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
          )) }
        </Select>
      </FormControl>
      <Controller
        {...InputAutocompleteProps.controllerProps}
        render={({field}) => (
          <Autocomplete
            {...field} onChange={(e: any, newValue: any) => field.onChange(newValue)}
            {...InputAutocompleteProps.autocompleteProps}
            renderInput={(params) => ( <TextField {...params} {...InputAutocompleteProps.inputProps} /> )}
          />
        )}
      />
      <Controller
        {...InputSwitchProps.controllerProps}
        render={({field}) => (
          <FormControlLabel
            {...InputSwitchProps.formControlLabelProps}
            control={<Switch {...InputSwitchProps.switchProps} {...field} checked={field.value} />}
          />
        )}
      />
      <Stack spacing={1}>
        <Box {...InputImageProps.previewProps} />
        <Button {...InputImageProps.buttonProps}>
          {InputImageProps.label}
          <Box {...InputImageProps.inputProps} />
        </Button>
      </Stack>
      <Box className="admin-quill">
        <ReactQuill {...InputQuillProps} />
      </Box>
      <Button type="submit" variant="contained">{"Submit"}</Button>
    </Stack>
  )
}
