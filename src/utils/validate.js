export const validate_password = /^[0-9]{11}$/;
export const validate_email = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

export function validate_emails(value){
    return validate_email.test(value)
}