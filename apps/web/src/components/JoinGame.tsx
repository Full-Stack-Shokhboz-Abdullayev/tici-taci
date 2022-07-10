import { FC } from 'react';
import { useCheckGame, useModal } from '../hooks';
import Button from './core/design/Button';
import Input from './core/design/Input';
import JoinGameForm from './JoinGame/JoinGameForm';

const JoinGame: FC = () => {
  const { open } = useModal(<JoinGameForm />, {});
  const {
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    values
  } = useCheckGame(open);
  return (
    <form
      className="flex flex-col w-full sm:w-2/3 md:w-1/3 lg:w-1/3 m-6 md:m-0"
      onSubmit={handleSubmit}
    >
      <h3 className="text-2xl text-center my-2">Join The Game!</h3>
      <Input
        styleType="yellow"
        className="my-2 text-center"
        placeholder="Enter the game code!"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.code}
        id="code"
      ></Input>
      <span className="text-red-600 text-center">
        {errors.code && touched.code && errors.code}
      </span>
      <Button
        disabled={(!!errors.code && !!touched.code) || isSubmitting}
        styleType="yellow"
        className="my-2"
        type="submit"
      >
        Enter
      </Button>
    </form>
  );
};

export default JoinGame;
