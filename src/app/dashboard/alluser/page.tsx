

// import React from 'react';
// import type { Metadata } from 'next';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import Grid from '@mui/material/Grid';
// import { config } from '@/config';

// import AllUser from '@/components/dashboard/userslist/all-user';


// export const metadata: Metadata = {
//   title: `User List | Dashboard | ${config.site.name}`,
// };

// export default function Page(): React.JSX.Element {
//   return (
//     <Stack spacing={3}>
//       <Typography variant="h4">All Users</Typography>
//       <Grid container spacing={3} sx={{ flexGrow: 1 }}>
//         <Grid item xs={12}>
//           <AllUser /> 
//         </Grid>
//       </Grid>
//     </Stack>
//   );
// }





'use client';

import React from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import { config } from '@/config';

import AllUser from '@/components/dashboard/userslist/all-user';


export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <Typography variant="h4">All Users</Typography>
      <Box sx={{ width: '100%' }}>
        <AllUser />
      </Box>
    </Stack>
  );
}
