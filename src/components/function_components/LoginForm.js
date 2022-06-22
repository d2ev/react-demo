import { useFormik } from "formik"

export default function LoginForm() {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate: validteForm,
        onSubmit: values => {
            alert(JSON.stringify(values));
        }

    })

    function validteForm(values) {
        const error = {}
        // if (values.email === '') {
        //     error.email = "Email is required"
        // }
        // if (values.password === '') {
        //     error.password = "Password is required"
        // }

        Object.entries(values).map(item => {
            if (item[1] === '') {
                error[item[0]] = `${item[0]} is required`;
            }
        })

        return error;
    }

    return (
        <div className="container-fluid">
            <form onSubmit={formik.handleSubmit} style={{width:'300px'}} className="m-auto">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input name="email" value={formik.values.email} onChange={formik.handleChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailError" className="text-danger">{formik.errors.email}</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input name="password" value={formik.values.password} onChange={formik.handleChange} type="password" className="form-control" id="exampleInputPassword1" />
                    <div id="passwordError" className="text-danger">{formik.errors.password}</div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>

    )
}