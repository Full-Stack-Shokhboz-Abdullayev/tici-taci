import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import O from '../../assets/images/o.svg';
import X from '../../assets/images/x.svg';
import { useCreateGame } from '../../hooks';
import Button from '../core/design/Button';
import Input from '../core/design/Input';
import SelectSwitch from '../core/design/SelectSwitch';

const signs = [
  {
    label: 'X',
    img: X,
    value: 'X'
  },
  {
    label: 'O',
    img: O,
    value: 'O'
  }
];

const CreateGameForm: FC = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    errors,
    touched,
    isSubmitting,
    setFieldValue,
    isOpen,
    resetForm
  } = useCreateGame(navigate);

  useEffect(() => {
    isOpen && resetForm();
  }, [isOpen]);

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-2xl text-center my-2">Create The Game!</h3>
      <div className="my-4">
        <h4 className="my-2 font-bold text-lg">Your name please:</h4>
        <div className="mx-2">
          <Input
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.maker.name}
            id="maker.name"
            styleType="black"
            className="w-full"
            placeholder="John Doe"
          />
          <span className="text-red-600 inline-block mt-2">
            {errors.maker?.name && touched.maker?.name && errors.maker.name}
          </span>
        </div>
      </div>
      <div className="my-4">
        <h4 className="my-2 font-bold text-lg">Game title that you want:</h4>
        <div className="mx-2">
          <Input
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.title}
            id="title"
            styleType="black"
            className="w-full"
            placeholder="The joyyee"
          />
          <span className="text-red-600 inline-block mt-2">
            {errors.title && touched.title && errors.title}
          </span>
        </div>
      </div>
      <div className="my-4">
        <h4 className="my-2 font-bold text-lg">X or O?</h4>
        <SelectSwitch
          value={values.maker.sign}
          options={signs}
          onChange={(value) => setFieldValue('maker.sign', value)}
        ></SelectSwitch>
      </div>
      <div className="flex justify-center mt-8 mx-2">
        <Button
          disabled={
            !values.maker.name ||
            !values.title ||
            !values.maker.sign ||
            isSubmitting
          }
          type="submit"
          styleType="yellow"
          className="block w-full border-black border-2 "
        >
          Launch it{' '}
          <span role="img" aria-label="rocket">
            🚀
          </span>
        </Button>
      </div>
    </form>
  );
};

export default CreateGameForm;
