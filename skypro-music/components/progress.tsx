import style from "./style_components/progress.module.css"

type ProgressProps = {
    max: number;
    value: number;
    step: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Progress({
    max,
    value,
    step,
    onChange,
}: ProgressProps) {
    return <input 
                className={style.progress}
                type="range"
                min={0}
                max={max}
                value={value}
                step={step}
                onChange={onChange}
            />
}