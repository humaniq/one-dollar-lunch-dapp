import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import "./CollapsibleView.sass";
import colors from "utils/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square={false} {...props} />
))(({ theme }) => ({
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={
      <ExpandMoreIcon
        sx={{
          color: colors.blueOcean,
          fontSize: 24,
        }}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  paddingLeft: theme.spacing(1.3),
  paddingRight: theme.spacing(1.3),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0),
  borderTop: "0.5px solid rgba(0, 0, 0, .125)",
}));

interface CollapsibleViewProps {
  title: string;
}

export const CollapsibleView: React.FC<CollapsibleViewProps> = ({
  children,
  title,
}) => {
  return (
    <div className="collapsible">
      <Accordion>
        <AccordionSummary>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 400,
              color: colors.blueOcean,
            }}
          >
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </div>
  );
};
