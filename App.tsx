import { Button, Icon, Text } from '@shopify/polaris';
import { MenuIcon } from '@shopify/polaris-icons';
import { useCallback } from 'react';
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd';
import ReactJoyride from 'react-joyride';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { useTasks } from './TasksContextProvider';

function App() {
  const navigate = useNavigate();
  const { tasks, reorder } = useTasks();
  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) {
        return;
      }

      reorder(result.source.index, result.destination.index);
    },
    [reorder]
  );

  return (
    <div className="w-[500px] mx-auto mt-8">
      <div className="flex justify-end">
        <Button variant="primary" onClick={() => navigate('/create-task')}>
          Create task
        </Button>
      </div>
      <div className="flex flex-col mt-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable-task">
            {(provided, snapshot) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {tasks.map((t, index) => {
                  return (
                    <Draggable
                      draggableId={`${t.title}-${index}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div
                            key={`${t.title}-${index}`}
                            className="flex items-center bg-gray-200 p-4 mb-4"
                          >
                            <div
                              className={`mr-4 ${index === 1 ? 'dd-tour' : ''}`}
                            >
                              <Icon source={MenuIcon} tone="base" />
                            </div>
                            <div className="flex flex-col">
                              <Text as="h2">{t.title}</Text>
                              <Text as="p">{t.description}</Text>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      {tasks.length > 1 && (
        <ReactJoyride
          steps={[
            {
              target: '.dd-tour',
              content: 'You can the order by drag & drop this handle',
            },
          ]}
        />
      )}
    </div>
  );
}

export default App;
