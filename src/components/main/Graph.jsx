import {useDots} from "../../hooks/dots";

export function Graph() {

    const {width, height, clickHandler} = useDots()

    return (
        <div className="panel-element">
            <div className="panel-element-inner">
                <canvas id="area-image" width={width} height={height} onClick={clickHandler} />
            </div>
        </div>
    )
}