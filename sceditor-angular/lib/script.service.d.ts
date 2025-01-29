interface Scripts {
    name: string;
    src: string;
}
export declare class ScriptService {
    private scripts;
    constructor(scriptStore: Scripts[]);
    load(...scripts: string[]): Promise<any[]>;
    loadScript(name: string): Promise<unknown>;
}
export {};
