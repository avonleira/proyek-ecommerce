import { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import StickySideNav, { IStickySideNavProps } from "../components/StickySideNav";

interface IProps {
  children: any
  sideNavItems: IStickySideNavProps[]
  accordionTitle?: string
}

export default function AdminPagesMainLayout(props: IProps) {
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const [openAccordion, setOpenAccordion] = useState<boolean>(false);

  return (
    <Box>
      <Grid container spacing={{ xs: 3, md: 6 }} direction={{ xs: "column-reverse", lg: "row" }}>
        <Grid item xs={12} md={9}>
          { props.children }
        </Grid>
        <Grid item xs={12} md={3}>
          { upMd ? (<StickySideNav items={props.sideNavItems} />) : (
            <Accordion elevation={3} expanded={openAccordion} onChange={() => setOpenAccordion(!openAccordion)}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight="bold">
                  <Typography variant="inherit" component="span" color={"primary"}>{"# "}</Typography>
                  {props.accordionTitle ?? "Daftar Isi"}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <StickySideNav items={props.sideNavItems} setOpenAccordion={setOpenAccordion} />
              </AccordionDetails>
            </Accordion>
          ) }
        </Grid>
      </Grid>
    </Box>
  )
}
