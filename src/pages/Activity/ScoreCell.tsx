import { Component, Show, createSignal, createEffect } from 'solid-js';
import { Button, Flex, Input, IconButton } from '@hope-ui/solid';
import { XMark, Check, Pencil } from '@app/icons';
import { ColoredScore } from '@app/components';
import { Score } from '@app/types';

import { useParams } from '@solidjs/router';
import { booleanSignal, errorSignal } from '@app/hooks';
import { addScore, updateScore } from '@app/db/scores';
import { nanoid } from 'nanoid';

interface Props {
  score?: Score
  student_id: string
}
const ScoreCell: Component<Props> = (props) => {
  let inputRef: HTMLInputElement | undefined;
  const { reportError } = errorSignal;
  const params = useParams<{ activityid: string }>();
  const edit = booleanSignal();
  const [score, setScore] = createSignal('');

  createEffect(() => {
    if (props.score !== undefined) {
      setScore(props.score.points.toString());
    }
  });

  createEffect(() => {
    if (edit.active() && inputRef !== undefined) {
      inputRef.focus();
      inputRef.select();
    }
  });

  const handleAdd = () => {
    addScore({
      id: nanoid(),
      points: parseInt(score()),
      student_id: props.student_id,
      activity_id: params.activityid,
    })
      .then(() => {
        edit.disable();
      })
      .catch((err) => {
        void reportError('New Score', err);
      });
  };

  const handleUpdate = () => {
    if (props.score === undefined) return;
    updateScore({ id: props.score.id, points: parseInt(score()) })
      .then(() => {
        edit.disable();
      })
      .catch((err) => {
        void reportError('Updating Score', err);
      });
  };

  return (
    <Show
      when={!edit.active()}
      fallback={
        <Flex alignItems="center" justifyContent="end" gap="$2">
          <Input
            ref={inputRef}
            type="number"
            value={score()}
            onInput={(ev) => setScore(ev.currentTarget.value)}
            max={100}
            min={0}
            size="md"
            width="$20"
            invalid={score() !== '' && parseInt(score()) > 100}
          />
          <IconButton
            size="xs"
            aria-label=""
            icon={<Check w="$4" h="$4" />}
            colorScheme="success"
            disabled={score().trim() === '' || parseInt(score()) > 100 || parseInt(score()) < 0}
            onClick={props.score === undefined ? handleAdd : handleUpdate}
          />
          <IconButton
            size="xs"
            aria-label=""
            icon={<XMark w="$4" h="$4" />}
            colorScheme="danger"
            onClick={edit.disable}
          />
        </Flex>
      }
    >
      <Show
        when={props.score !== undefined}
        fallback={
          <Button onClick={edit.enable} size="xs" variant="outline" colorScheme="neutral">
            Calificar
          </Button>
        }
      >
        <Flex justifyContent="end" alignItems="center">
          <ColoredScore score={props.score!.points} />
          <IconButton
            ml="$2"
            variant="ghost"
            size="xs"
            aria-label="Editar nota"
            colorScheme="neutral"
            icon={<Pencil w="$4" h="$4" />}
            onClick={edit.enable}
          />
        </Flex>
      </Show>
    </Show>
  );
};

export default ScoreCell;
