// import React from 'react';
// import type { Metadata } from 'next';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import Grid from '@mui/material/Grid';  
// import { config } from '@/config';
// import UserTable from '@/components/dashboard/userlist/user-table';

// export const metadata: Metadata = {
//   title: `User List | Dashboard | ${config.site.name}`,
// };

// export default function Page(): React.JSX.Element {
//   return (
//     <Stack spacing={3}>
//       <Typography variant="h4">User List</Typography>
//       <Grid container spacing={3} sx={{ flexGrow: 1 }}>
//         <Grid item xs={12}> 
//           <UserTable />
//         </Grid>
//       </Grid>
//     </Stack>
//   );
// }


"use client";

import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import { config } from '@/config';
import UserTable from '@/components/dashboard/userlist/user-table';

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3} sx={{ flexGrow: 1 }}>
      <Typography variant="h4">User List</Typography>
      <UserTable />
    </Stack>
  );
}
