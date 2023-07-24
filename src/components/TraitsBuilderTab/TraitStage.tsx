import { Circle, Layer, Rect, Stage } from "react-konva";
import { Stage as StageType } from "konva/lib/Stage";

import CanvasImage from "../shared/CanvasImage";
import { State } from "./index.d";

interface TraitStageProps {
  state: State;
  traitWidth: number;
  stageRef?: React.RefObject<StageType>;
}

const TraitStage = (props: TraitStageProps) => {
  const { state, traitWidth, stageRef } = props;
  return (
    <Stage width={traitWidth} height={traitWidth} ref={stageRef}>
      <Layer>
        <Circle
          x={traitWidth / 2}
          y={traitWidth / 2}
          fillLinearGradientStartPoint={{ x: 0, y: 0 }}
          fillLinearGradientEndPoint={{ x: 0, y: traitWidth }}
          fillLinearGradientColorStops={[
            0,
            state.bgColor,
            0.8,
            state.bgColorAlt,
          ]}
          radius={traitWidth / 2}
        />
      </Layer>
      <Layer>
        <CanvasImage
          canvasWidth={traitWidth}
          imageURL={state.iconBlobURL}
          scale={state.iconScale}
          xOffset={state.iconXOffset}
          yOffset={state.iconYOffset}
        />
        {state.recolorIcon && (
          <Rect
            x={0}
            y={0}
            width={traitWidth}
            height={traitWidth}
            fill={state.iconColor}
            globalCompositeOperation="source-in"
          />
        )}
      </Layer>
    </Stage>
  );
};

export default TraitStage;
