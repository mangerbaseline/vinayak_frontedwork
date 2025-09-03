// 'use client';

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import { useColorScheme } from '@mui/material/styles';

// import { NoSsr } from '@/components/core/no-ssr';

// const HEIGHT = 60;
// const WIDTH = 60;

// type Color = 'dark' | 'light';

// export interface LogoProps {
//   color?: Color;
//   emblem?: boolean;
//   height?: number;
//   width?: number;
// }

// export function Logo({ color = 'dark', emblem, height = HEIGHT, width = WIDTH }: LogoProps): React.JSX.Element {
//   let url: string;

//   if (emblem) {
//     url = color === 'light' ? '/assets/logo-emblem.svg' : '/assets/logo-emblem--dark.svg';
//   } else {
//     url = color === 'light' ? '/assets/logo.svg' : '/assets/logo--dark.svg';
//   }

//   return <Box alt="logo" component="img" height={height} src={url} width={width} />;
// }

// export interface DynamicLogoProps {
//   colorDark?: Color;
//   colorLight?: Color;
//   emblem?: boolean;
//   height?: number;
//   width?: number;
// }

// export function DynamicLogo({
//   colorDark = 'light',
//   colorLight = 'dark',
//   height = HEIGHT,
//   width = WIDTH,
//   ...props
// }: DynamicLogoProps): React.JSX.Element {
//   const { colorScheme } = useColorScheme();
//   const color = colorScheme === 'dark' ? colorDark : colorLight;

//   return (
//     <NoSsr fallback={<Box sx={{ height: `${height}px`, width: `${width}px` }} />}>
//       <Logo color={color} height={height} width={width} {...props} />
//     </NoSsr>
//   );
// }


'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
// import { useColorScheme } from '@mui/material/styles';
import { NoSsr } from '@/components/core/no-ssr';
import { Typography } from '@mui/material';

const DEFAULT_SIZE = 150;  

type Color = 'dark' | 'light';

export interface LogoProps {
  // color?: Color;
  // emblem?: boolean;
  height?: number;
  width?: number;
}

export function Logo({ height = DEFAULT_SIZE, width = DEFAULT_SIZE }: LogoProps): React.JSX.Element {
  // let url: string = '/assets/baseline.jpg';
  const url: string = '/assets/baseline.jpg';


  return (
    <Box
      component="img"
      src={url}
      alt="logo"
      height={`${height}px`}  
      width={`${width}px`}
      sx={{
        borderRadius: '50%',
        objectFit: 'contain',
        backgroundColor: 'transparent',
        display: 'block',
        maxWidth: '100%',
      }}
    />
  );
}

export interface DynamicLogoProps {
  colorDark?: Color;
  colorLight?: Color;
  emblem?: boolean;
  height?: number;
  width?: number;
}

export function DynamicLogo({
  // colorDark = 'light',
  // colorLight = 'dark',
  height = DEFAULT_SIZE,
  width = DEFAULT_SIZE,
  ...props
}: DynamicLogoProps): React.JSX.Element {
  // const { colorScheme } = useColorScheme();
  // const color = colorScheme === 'dark' ? colorDark : colorLight;

  return (
    <NoSsr fallback={<Box sx={{ height: `${height}px`, width: `${width}px` }} />}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Logo  height={height} width={width} {...props} />
        <Typography
          variant="h6"
          sx={{
            m: 0,
            p: 0,
            fontWeight: 600,
            color: 'text.primary',
            textDecoration: 'none',
          }}
        >
          Baseline IT Development
        </Typography>
      </Box>
    </NoSsr>
  );
}
