import { To } from "react-router-dom"
import { InputLabelProps, SelectProps } from "@mui/material"

export interface BreadCrumbItems {
  label: string
  path: To
}

export interface IInputSelectProps {
  formControlProps: Object
  inputLabelProps: InputLabelProps
  selectProps: SelectProps
  options: { value: string, label: string }[]
}