declare global {
    interface Window {
        // added in public/dynamic_env.js
        dynamicEnv: {
            [key: string]: string;
        };
    }
}

export default function getEnvVar(varName: string): string {
    if (!varName.startsWith('REACT_APP_')) {
        throw new Error("varName must start with REACT_APP_ otherwise it's not picked up by the build step");
    }
    const result = window.dynamicEnv[varName] || process.env[varName];

    if (result === null || result === undefined) {
        // We want this to show in the production console. Because the error that this causes will only
        // show up in a misconfigure production build

        // TODO: It would be even better if we could report the issue to a central error logging service
        // tslint:disable-next-line:no-console
        console.error(varName + ' was not specified in the .env file or as environment variable');
        return varName;
    } else {
        return result;
    }
}
