import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';

export const CompaniesSearch = (props) => {
  const change=(e)=>{
    props.onchangetext(e.target.value);
console.log("ggg",e.target.value);
};
  return (
  <Card sx={{ p: 2 }}>
    <OutlinedInput 
      defaultValue=""
      fullWidth
      placeholder="Search sites"
      onChange={change}
      startAdornment={(
        <InputAdornment   position="start">
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      )}
      sx={{ maxWidth: 500 }}
    />
  </Card>
)
};
