


import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { config } from '@/config';
import { UserTable } from '@/components/dashboard/userlist/user-table';

export const metadata = {
  title: `User List | Dashboard | ${config.site.name}`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4">User List</Typography>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <UserTable />
        </Grid>
      </Grid>
    </Stack>
  );
}
