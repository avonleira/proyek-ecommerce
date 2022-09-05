import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface IProps {
  title?: string
  children?: JSX.Element
  elevation?: number
  titleProps: any
}

export default function MyAccordion(props: IProps) {
  const { title = "", children, elevation = 2, titleProps } = props;
  return (
    <Accordion elevation={elevation}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontWeight={"bold"} {...titleProps}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </Accordion>
  )
}
