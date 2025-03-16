import { FormHelperText } from '@mui/material';
import { Controller } from 'react-hook-form';

// Component chưa sài
// eslint-disable-next-line no-unused-vars
const FormField = ({ control, label, name, Component, error, type }) => {
  return (
    <div>
      <p className="bm-1 text-dark-100 text-sm font-bold">{label}</p>
      <Controller
        control={control}
        name={name}
        defaultValue=""
        // render={({ field: onChange, value, name }) => {
        //   return (
        //     <Component
        //       onChange={onChange}
        //       value={value}
        //       name={name}
        //       control={control}
        //       type={type}
        //     />
        //   );
        // }}
        render={({ field }) => (
          <Component
            {...field}
            control={control}
            type={type}
            fullWidth
            error={error?.message}
          />
        )}
      />
      {error?.message && (
        <FormHelperText error={true}>{error.message}</FormHelperText>
      )}
    </div>
  );
};

export default FormField;
