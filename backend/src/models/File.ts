import { Result } from "../core/Result";

interface FileProps {
    data: ArrayBuffer | Buffer;
    extension: string;
}

export class File {
    public static create(props: FileProps): Result<File> {
        if (props.extension === '' || typeof props.extension !== 'string') {
            return Result.fail('Invalid file extension');
        }

        return Result.ok(new File(props));
    }

    private constructor(public readonly props: FileProps) {}

    get extension(): string {
        return this.props.extension;
    }
}
