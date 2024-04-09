import { Button, Text, TextField } from '@shopify/polaris';
import { useCallback, useMemo, useState } from 'react';
import ReactConfetti from 'react-confetti';
import { Controller, useForm } from 'react-hook-form';
import ReactJoyride from 'react-joyride';
import { useNavigate } from 'react-router-dom';
import { Task, useTasks } from './TasksContextProvider';

const FIRST_VISIT_KEY = 'isFirstVisit';

export const CreateTask = () => {
  const [created, setCreated] = useState(false);
  const { onAdd } = useTasks();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Task>();

  const navigate = useNavigate();

  const isFirstVisit = useMemo(() => {
    return localStorage.getItem(FIRST_VISIT_KEY);
  }, []);

  const onSubmit = useCallback(
    (data: Task) => {
      onAdd(data);
      setCreated(true);
      !isFirstVisit && localStorage.setItem(FIRST_VISIT_KEY, 'true');
    },
    [isFirstVisit, onAdd]
  );

  return (
    <div className="w-[500px] mx-auto mt-8">
      {created ? (
        <div className="text-center">
          <div className="mb-8">
            <Text as="h2">Task created successfully!</Text>
          </div>
          <Button variant="primary" onClick={() => navigate('/tasks')}>
            Back to task list
          </Button>
          <ReactConfetti />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-center">
            <Text as="h2">Create new task</Text>
          </div>
          <div className="mb-4 title-tour">
            <Controller
              name="title"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field, fieldState: { invalid } }) => (
                <TextField
                  label="Title"
                  autoComplete="off"
                  {...field}
                  error={invalid}
                />
              )}
            />
          </div>
          <div className="mb-4 description-tour">
            <Controller
              name="description"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field, fieldState: { invalid } }) => (
                <TextField
                  label="Description"
                  autoComplete="off"
                  {...field}
                  error={invalid}
                />
              )}
            />
          </div>
          <div className="text-center">
            <input type="submit" />
          </div>
          {!isFirstVisit && (
            <ReactJoyride
              steps={[
                {
                  target: '.title-tour',
                  content: 'A title is very important',
                },
                {
                  target: '.description-tour',
                  content: 'A description is very important too',
                },
              ]}
            />
          )}
        </form>
      )}
    </div>
  );
};
