import { useEffect, useState } from "react";
import * as S from "./AddExerciseModal.style";
import { Action as RoutineAction } from "../../hooks/useRoutine";
import { Day, Action as DayAction } from "../../hooks/useDay";
import ExercisePartLabel from "../ExercisePartLabel/ExercisePartLabel";
import ExerciseCard from "../ExerciseCard/ExerciseCard";
import { ExercisePart, partLabels } from "../../constants/excercise";
import Button from "../Button/Button";
import useRoutineAPI, { ResponseExercise } from "../../api/useRoutineAPI";
import useExerciseDiaryAPI from "../../api/useExerciseDiaryAPI";
import { getNewExercise } from "../../hooks/useExercise";
import { useLocation } from "react-router";

interface Props {
  dayIndex: number;
  dispatch: React.Dispatch<RoutineAction> | React.Dispatch<DayAction>;
  setIsOpenedAddExerciseModal: React.Dispatch<React.SetStateAction<boolean>>;
  day: Day;
}

export default function AddExerciseModal({
  dayIndex,
  dispatch,
  setIsOpenedAddExerciseModal,
  day,
}: Props) {
  const [exercises, setExercises] = useState<ResponseExercise[]>([]);
  const [selectedPart, setSelectedPart] = useState<ExercisePart>("가슴");
  const { requestExerciseOfPart } = useRoutineAPI();
  const { requestAddExercise } = useExerciseDiaryAPI();
  const location = useLocation();
  const handleSelected = (exercisePart: ExercisePart): void => {
    setSelectedPart(exercisePart);
  };

  const handleCreateExercise = (exerciseName: string, exercisePart: ExercisePart) => {
    dispatch({
      type: "CREATE_EXERCISE",
      dayIndex,
      exerciseName,
      exercisePart,
    });
    // console.log(day);
    const newExercise = getNewExercise(day.exercises.length, exerciseName, exercisePart);
    const payload = { ...newExercise, exerciseNum: day.exercises.length + 1, id: day.id };

    if (location.pathname === "/diary") {
      requestAddExercise(payload);
    }
  };

  const handleCloseModal = () => {
    setIsOpenedAddExerciseModal(false);
  };

  const handleUpdateExercisesOfPart = async (selectedPart: ExercisePart) => {
    const exercises = await requestExerciseOfPart(selectedPart);
    setExercises(exercises);
  };

  useEffect(() => {
    handleUpdateExercisesOfPart(selectedPart);
  }, [selectedPart]);

  return (
    <S.Overlay>
      <S.Wrapper>
        <S.PartsWrapper>
          {partLabels.map(({ exercisePart, type }) => (
            <S.ExercisePartLabelWrapper
              onClick={() => {
                handleSelected(exercisePart);
              }}
            >
              <ExercisePartLabel
                exercisePart={exercisePart}
                type={type}
                selectedPart={selectedPart}
              />
            </S.ExercisePartLabelWrapper>
          ))}
        </S.PartsWrapper>
        <S.ExercisesWrapper>
          {exercises.map(({ exerciseName, exercisePart }) => (
            <S.ExerciseCardWrapper
              onClick={() =>
                handleCreateExercise(exerciseName, exercisePart as ExercisePart)
              }
            >
              <ExerciseCard exerciseName={exerciseName} exercisePart={selectedPart} />
            </S.ExerciseCardWrapper>
          ))}
        </S.ExercisesWrapper>
        <S.ButtonBox>
          <Button display="flex" size="large" type="border" onClick={handleCloseModal}>
            닫기
          </Button>
        </S.ButtonBox>
      </S.Wrapper>
    </S.Overlay>
  );
}
