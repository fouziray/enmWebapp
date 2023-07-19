import { styled } from '@mui/material/styles';

const ApexChart = (() => import('react-apexcharts'), {
  ssr: false,
  loading: () => null
});

export const Chart = styled(ApexChart)``;
