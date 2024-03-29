import React from 'react';
import { Stack, useTheme, Typography } from '@mui/material';
import { FormSX } from './Auth.styles';
import { createTheme } from '@mui/material/styles';
import CellTowerIcon from '@mui/icons-material/CellTower';
const themess = createTheme({
  palette: {
    logocolor: {
      light: '#00285E',
    },
  },
});

function AuthOutlet({ children, header }) {
  const theme = useTheme();
  return (
    <form>
      <Stack
        gap={3}
        sx={{
          ...FormSX,
          border: `1px solid ${theme.palette.grey.border}`,
          background: theme.palette.grey[50],
        }}
      >
        {header ? (
                  <img  src={'http://localhost:5173/assets/logo.png'} />
       
        ) : (
          <img
            src={
              theme.palette.mode === 'dark'
                ? 'https://picsum.photos/100/50'
                : 'https://picsum.photos/200/300'
            }
            alt="logo"
          />
        )}
        {children}
      </Stack>
    </form>
  );
}

export default AuthOutlet;
