import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJoinGame } from '../../hooks';
import Button from '../core/design/Button';
import Input from '../core/design/Input';

const JoinGameForm: FC = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    errors,
    touched,
    isSubmitting,
    title,
  } = useJoinGame(navigate);
  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
        console.log(errors);
      }}
    >
      <h3 className="text-2xl text-center my-2">Join The Game - {title}!</h3>
      <div className="my-4">
        <h4 className="my-2 font-bold text-lg">Your name please:</h4>
        <div className="mx-2">
          <Input
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.name}
            id="name"
            styleType="black"
            className="w-full"
            placeholder="John Doe"
          />
          <span className="text-red-600 inline-block mt-2">
            {errors.name && touched.name}
          </span>
        </div>
      </div>
      <div className="flex justify-center mt-8 mx-2">
        <Button
          disabled={!values.name || isSubmitting}
          type="submit"
          styleType="yellow"
          className="block w-full border-black border-2"
        >
          Enjoin (enjoy by joining!)
          <span role="img" aria-label="rocket">
            🚀
          </span>
        </Button>
      </div>
    </form>
  );
};

export default JoinGameForm;
