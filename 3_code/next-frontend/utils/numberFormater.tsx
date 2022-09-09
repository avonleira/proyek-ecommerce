// Number Formater with default configs values
import NumberFormat from 'react-number-format'

interface IProps {
  displayType?: "text" | "input"
  thousandSeparator?: string
  decimalSeparator?: string
  prefix?: string
  value?: number
}

export default function MyNumberFormat(props: IProps) {
  const { displayType = "text" } = props;
  const { thousandSeparator = "." } = props;
  const { decimalSeparator = "," } = props;
  const { prefix = "Rp " } = props;
  const { value = 0 } = props;

  return (
    <NumberFormat
      displayType={displayType}
      thousandSeparator={thousandSeparator}
      decimalSeparator={decimalSeparator}
      prefix={prefix}
      value={value}
    />
  )
}
