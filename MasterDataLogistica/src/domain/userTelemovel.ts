import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface UserTelemovelProps {
    value: string;
}

export class UserTelemovel extends ValueObject<UserTelemovelProps> {
    get value(): string {
        return this.props.value;
    }

    private constructor(props: UserTelemovelProps) {
        super(props);
    }

    public static create(telemovel: string): Result<UserTelemovel> {
        const guardResult = Guard.againstNullOrUndefined(telemovel, 'telemovel');
        if (!guardResult.succeeded) {
            return Result.fail<UserTelemovel>(guardResult.message);
        } else {
            return Result.ok<UserTelemovel>(new UserTelemovel({ value: telemovel }))
        }
    }
}