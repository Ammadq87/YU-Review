import axios from "axios";
import { useEffect, useState } from "react";
import utils from "../../models/utils";

// fields, endpoints, type={review, signup, login}
export default function Form (props) {
    
    const api = axios.create({
        baseURL: 'http://localhost:3000/api'
    })

    const defualtForm = () => {
        const fields = props?.data?.fields;
        const _defaultForm = {};
        fields.forEach(field => {
            let value;
            if (field.type === 'text')
                value = 'N/A';
            else if (field.type === 'range' || field.type === 'checkbox')
                value = 0;
            _defaultForm[field.label.split(' ').join('')] = value
        })
        return _defaultForm;
    }

    const [formInput, setFormInput] = useState(defualtForm());

    

    const handleFormChange = (e, field) => {
        let value = e.target.value;
        
        if (field.type === 'checkbox') 
            value = e.target.checked ? 1 : 0
        else if (field.type === 'range' || field.type === 'checkbox')
            value = parseInt(value);

        setFormInput({...formInput, [field.label.split(' ').join('')]: value});
    }

    const GenerateField = (field, i) => {
        return (
            <tr key={i}>
                <td className='field'>
                    <label htmlFor="">{field.label}:</label>
                    <input value={field?.value} min={0} max={5} type={field.type} onChange={e => handleFormChange(e, field)}/>
                </td>
            </tr>
        )
    }

    const handleSubmit = async () => {
        if (props?.data?.type === 'Login') {
            try {
                res = await api.post(`/${props?.data?.endPoint}`, formInput);
                if (res.status === 200) {
                    // handleErrorMsg('Logged In');
                    console.log('Logged In');
                    location.href = '/'
                } 
            } catch (e) {
                // handleErrorMsg('Invalid Credentials');
                console.log('Invalid Credentials');
            }
        }

        else if (props?.data?.type === 'SignUp') {
            const res = await api.post(`/review/course`, formInput);
            console.log(res);
        }
        
        else if (props?.data?.type === 'Review') {
            const _utils = new utils();
            // validate form input first
            if (formInput.hasOwnProperty('ProfessorName'))
                formInput['ProfessorName'] = formInput['ProfessorName'].split(' ').map(name => {
                    return name.charAt(0).toUpperCase()+name.substring(1, name.length);
                }).join('_');

            if (props?.data?.reviewType === 'course') {
                formInput['CourseCode'] = _utils.getCodeFromUrl(location.href.split('/')[4], 'course');
            }

            props?.data?.fields.forEach(field => {
                if (field.type === 'checkbox' || field.type === 'range')
                    formInput[field.label] = parseInt(formInput[field.label]);
            })

            try {
                const res = await api.post('/review/course', formInput);
            } catch (err) {
                console.log(err);
            }

        }
    } 

    const ExtraComponents = () => {
        const components = {
            'Login': <tr>
                        <td className='actionItems'>
                            <button type='button' onClick={handleSubmit}>Log In</button>
                            <a href="/SignUp">Sign Up?</a>
                            <a href="">Forgot Password?</a>
                            {/* <p>{errorMsg}</p> */}
                        </td>
                    </tr>,
            'SignUp': <tr>
                        <td className='actionItems'>
                            <button type='button' onClick={handleSubmit}>Get Started!</button>
                            <a href="/Login">Already have an account?</a>
                        </td>
                    </tr>,
            'Review': <tr>
                        <td className='actionItems'>
                            <button type='button' onClick={handleSubmit}>Submit</button>
                        </td>
                    </tr> 
        }
        
        return (
            components[props?.data?.type]
        )

    }

    return (
        <div className="form">
            <table>
                <tbody>
                    {
                        props?.data?.fields.map((field, i) => {
                            return (
                                GenerateField(field, i)
                            )
                        })
                    }

                    {ExtraComponents()}

                </tbody>
            </table>

        </div>
    )
}

