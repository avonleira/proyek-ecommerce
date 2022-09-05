import { Box, Stack, Typography } from "@mui/material";
import { Fragment } from "react";
import { MyScrollToRef } from "./MyScrollToRef";

export interface IStickySideNavProps {
  label: string
  sectionRef?: React.MutableRefObject<any>
  children?: IStickySideNavProps[]
}

interface IItemProps {
  index: string
  depth: number
  padding: number
  item: IStickySideNavProps
  setOpenAccordion?: React.Dispatch<React.SetStateAction<boolean>>
}

function StickySideNavItem(props: IItemProps): JSX.Element {
  const handleClickItem = () => {
    MyScrollToRef(props.item.sectionRef);
    if (props.setOpenAccordion) props.setOpenAccordion(false);
  }

  return (
    <Fragment>
      <Box
        sx={{
          borderLeft: "2px solid", borderLeftColor: "transparent",
          "&:hover" : { borderLeftColor: "primary.light" }
        }}
      >
        <Typography key={props.index}
          variant="body2" component="span" fontWeight={!Boolean(props.depth)?"bold":"light"}
          onClick={handleClickItem}
          sx={{
            pl: props.padding, cursor: "pointer",
            "&:hover": { color: "primary.main" }
          }}
        >
          <Typography component="span" color={!Boolean(props.depth)?"primary.main":"primary.light"}>{"# "}</Typography>
          {props.item.label}
        </Typography>
      </Box>
      { Boolean(props.item.children) ? (
        <Fragment>
          { props.item.children?.map((chd, index2) =>
            <StickySideNavItem key={`ci-${props.index}.${index2}`} depth={props.depth + 1}
              index={`${props.index}.${index2}`} item={chd} padding={props.padding + 2}
              setOpenAccordion={props.setOpenAccordion}
            />
          ) }
        </Fragment>
      ) : null }
    </Fragment>
  )
}

interface IProps {
  sx?: any
  items?: IStickySideNavProps[]
  setOpenAccordion?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function StickySideNav(props: IProps) {
  const { items = [] } = props;
  return (
    <Box
      sx={{
        position: "sticky", top: 90, maxWidth: '100%', overflowY: "auto",
        maxHeight: { xs: "60vh", md: "78vh" },
        ...props.sx
      }}>
      <Stack spacing={1}>
        { items?.map((item, index) => (
          <StickySideNavItem
            key={`c-${index}`} item={item} index={String(index)}
            depth={0} padding={1.5}
            setOpenAccordion={props.setOpenAccordion}
          />
        )) }
      </Stack>
    </Box>
  )
}
