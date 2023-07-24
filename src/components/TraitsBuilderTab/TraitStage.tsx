import { Circle, Layer, Rect, Stage } from "react-konva";
import { Stage as StageType } from "konva/lib/Stage";

import CanvasImage from "../shared/CanvasImage";
import { State } from "./index.d";

interface TraitStageProps {
  state: State;
  traitWidth: number;
  stageRef?: React.RefObject<StageType>;
  factor?: number;
}

const TraitStage = (props: TraitStageProps) => {
  const { state, traitWidth, stageRef, factor = 1 } = props;
  const width = traitWidth * factor;
  return (
    <Stage width={width} height={width} ref={stageRef}>
      <Layer>
        <Circle
          x={width / 2}
          y={width / 2}
          fillLinearGradientStartPoint={{ x: 0, y: 0 }}
          fillLinearGradientEndPoint={{ x: 0, y: width }}
          fillLinearGradientColorStops={[
            0,
            state.bgColor,
            0.8,
            state.bgColorAlt,
          ]}
          radius={width / 2}
        />
      </Layer>
      <Layer>
        <CanvasImage
          canvasWidth={width}
          imageURL={state.iconBlobURL}
          scale={state.iconScale * factor}
          xOffset={state.iconXOffset * factor}
          yOffset={state.iconYOffset * factor}
        />
        {state.recolorIcon && (
          <Rect
            x={0}
            y={0}
            width={width}
            height={width}
            fill={state.iconColor}
            globalCompositeOperation="source-in"
          />
        )}
      </Layer>
    </Stage>
  );
};

export default TraitStage;
