// import React from 'react';
// import type { Metadata } from 'next';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import Grid from '@mui/material/Grid';
// import { config } from '@/config';

// import request from '@/components/dashboard/request/requestform'


// export const metadata: Metadata = {
//   title: `Request List | Dashboard | ${config.site.name}`,
// };

// export default function Page(): React.JSX.Element {
//   return (
//     <Stack spacing={3}>
//       <Typography variant="h4">Request List</Typography>
//       <Grid container spacing={3} sx={{ flexGrow: 1 }}>
//         <Grid item xs={12}>
//           <Requestform/>
//         </Grid>
//       </Grid>
//     </Stack>
//   );
// }



import React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { config } from '@/config';

import Requestform from '@/components/dashboard/request/requestform';

export const metadata: Metadata = {
  title: `Request List | Dashboard | ${config.site.name}`,
};

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <Typography variant="h4">Request List</Typography>
      <Grid container spacing={3} sx={{ flexGrow: 1 }}>
        <Grid item xs={12}>
          <Requestform />
        </Grid>
      </Grid>
    </Stack>
  );
}
