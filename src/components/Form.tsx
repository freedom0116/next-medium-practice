import { FormInputProps, FormTextareaProps } from '@/typings';

export const FormInput = ({
  title,
  placeholder,
  type,
  register,
}: FormInputProps) => (
  <label className="block mb-5">
    <span className="text-gray-700">{title}</span>
    <input
      {...register}
      className="form-object"
      placeholder={placeholder}
      type={type}
    />
  </label>
);

export const FormTextarea = ({
  title,
  placeholder,
  rows,
  register,
}: FormTextareaProps) => (
  <label className="block mb-5">
    <span className="text-gray-700">{title}</span>
    <textarea
      {...register}
      className="form-object"
      placeholder={placeholder}
      rows={rows ? rows : 5}
    />
  </label>
);

export const FormError = ({ isError, content }: any) => (
  <div>{isError && <span className="text-red-500">{content}</span>}</div>
);

export const FormSubmit = () => (
  <input
    value="submit"
    type="submit"
    className="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 mt-5 rounded cursor-pointer"
  />
);
