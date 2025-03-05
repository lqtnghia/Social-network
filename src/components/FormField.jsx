import { Controller } from 'react-hook-form';

const FormField = ({ control, label, name, Component, type }) => {
  return (
    <div>
      <p className="bm-1 text-dark-100 text-sm font-bold">{label}</p>
      <Controller
        control={control}
        name={name}
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
          <Component {...field} control={control} type={type} />
        )}
      />
    </div>
  );
};

export default FormField;
