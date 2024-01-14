import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fShortenNumber } from 'src/utils/format-number';

// ----------------------------------------------------------------------
// AppWidgetSummary component to display summary information with an icon, title, and total.
export default function AppWidgetSummary({ title, total, icon, color = 'primary', sx, ...other }) {
  return (
    <Card
      component={Stack}
      spacing={3}
      direction="row"
      sx={{
        px: 3,
        py: 5,
        borderRadius: 2,
        ...sx,
      }}
      {...other}
    >
      {/* Display the icon if provided */}
      {icon && <Box sx={{ width: '4%', height: '4%', minWidth: '3rem', minHeight: '3rem' }}>{icon}</Box>}

      <Stack spacing={0.5}>
          {/* Display the title */}
        <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
          {title}
        </Typography>
        {/* Display the total */}
        <Typography variant="h4" >{fShortenNumber(total)}</Typography>

      </Stack>
    </Card>
  );
}

// Prop types for the AppWidgetSummary component.
AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
};
