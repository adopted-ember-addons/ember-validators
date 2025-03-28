export default function validateFormat(value: any, options: any, model: any, attribute: any): true | {
    type: any;
    value: any;
    context: any;
    message: any;
};
export namespace regularExpressions {
    let email: RegExp;
    let phone: RegExp;
    let url: RegExp;
}
