import { FormInputProps, FormTextareaProps } from '@/typings';

export const FormArea = ({ onSubmit, children }: any) => (
  <form
    className="flex flex-col p-5 max-w-2xl mx-auto mb-10"
    onSubmit={onSubmit}
  >
    {children}
  </form>
);

export const FormSubtitle = ({ children }: any) => (
  <h3 className="text-sm text-yellow-500">{children}</h3>
);

export const FormTitle = ({ children }: any) => (
  <h4 className="text-3xl font-bold">{children}</h4>
);

export const FormDivider = () => <hr className="py-3 mt-2"></hr>;

export const FormInput = ({
  value,
  placeholder,
  type,
  register,
}: FormInputProps) => (
  <label className="block mb-5">
    <span className="text-gray-700">{value}</span>
    <input
      {...register}
      className="shadow border rounded py-2 px-3 form-input my-1 block w-full ring-yellow-500 outline-none focus:ring"
      placeholder={placeholder}
      type={type}
    />
  </label>
);

export const FormTextarea = ({
  value,
  placeholder,
  rows,
  register,
}: FormTextareaProps) => (
  <label className="block mb-5">
    <span className="text-gray-700">{value}</span>
    <textarea
      {...register}
      className="shadow border rounded py-2 px-3 mt-1 block w-full ring-yellow-500 outline-none focus:ring"
      placeholder={placeholder}
      rows={rows ? rows : 5}
    />
  </label>
);

export const FormError = ({ isError, children }: any) => (
  <div>{isError && <span className="text-red-500">{children}</span>}</div>
);

export const FormSubmit = () => (
  <input
    value="submit"
    type="submit"
    className="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 mt-5 rounded cursor-pointer"
  />
);
