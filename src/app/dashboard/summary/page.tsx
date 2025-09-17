
// import * as React from 'react';
// import type { Metadata } from 'next';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import Grid from '@mui/material/Grid';

// import { config } from '@/config';

// import { Summaryform } from '@/components/dashboard/summary/summaryform';

// export const metadata = {
//   title: `Summary | Dashboard | ${config.site.name}`,
// } satisfies Metadata;

// export default function Page(): React.JSX.Element {
//   return (
//     <Stack spacing={3}>
//       <div>
//         <Typography variant="h4">Summary</Typography>
//       </div>
//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <Summaryform/>
//         </Grid>
//       </Grid>
//     </Stack>
//   );
// }


import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { config } from '@/config';
import Summaryform from '@/components/dashboard/summary/summaryform'; 

export const metadata = {
  title: `Summary | Dashboard | ${config.site.name}`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4">Summary</Typography>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Summaryform /> 
        </Grid>
      </Grid>
    </Stack>
  );
}
