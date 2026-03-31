import * as Yup from 'yup';
export const loginSchema = Yup.object({
    username: Yup.string().required('Enter Your User Name'),
    password: Yup.string().min(4).required('Please Enter Your Password')
})
