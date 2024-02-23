interface CheckServiceUseCase{
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error:string) => void;

export class CheckService implements CheckServiceUseCase{
    constructor(
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) {
        
    }

    public async execute(url:string):Promise<boolean> {
        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`ERROR EN LA REQUEST ${url}`);
            }
            this.successCallback();
            return true;
        } catch (error) {
            this.errorCallback(`${error}`);
            console.log(`${error}`);
            return false;
        }
    }
}