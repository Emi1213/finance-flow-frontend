import { Textarea } from "@nextui-org/input";
import { FieldHookConfig, useField } from "formik";
interface FMKTextAreaProps {
  label: string;
  name: string;
}

export const FMKTextArea: React.FC<FMKTextAreaProps> = ({
  label,
  ...props
}) => {
  const [field, meta] = useField(props as FieldHookConfig<any>);

  return (
    <div className="w-full">
      <Textarea
        label={label}
        {...field}
        {...props}
        description={meta.touched && meta.error ? meta.error : undefined}
      />
    </div>
  );
};
